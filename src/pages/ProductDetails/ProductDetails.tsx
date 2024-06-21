import moment from "moment";
import { FC, MouseEvent, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { getImageUrl } from "@/utils/imageUtil";
import { useAppDispatch, useAppSelector } from "@/hooks";

import Button from "@/components/Button";
import type { IProduct } from "@/components/ProductCard/types";
import Review from "@/components/Review";
import type { ReviewProps } from "@/components/Review/types";

import { actions, selectors } from "@/redux/cart";

import { getProductByIdAPI } from "@/services/product";

const ProductDetailsPage: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectors.products);
  const buyerDetails = useAppSelector(selectors.buyerDetails);

  const [product, setProducts] = useState<IProduct | null>(null);

  const handleLoad = useCallback(async () => {
    try {
      const response = await getProductByIdAPI(Number(id));

      const formattedProduct: IProduct = {
        id: response.id,
        title: response.name,
        category: response.category,
        description: response.description,
        imageUrl: getImageUrl(response.base64Image),
        price: response.price,
        rating: response.rating,
        quantity: response.stockQuantity,
        reviews: response.reviews,
      };

      setProducts(formattedProduct);
    } catch (error) {
      toast.error("Failed to fetch product!");
    }
  }, [id]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  const productInCart = products.find((item) => item.id === Number(id));
  const quantityInCart = productInCart ? productInCart.quantity : 0;

  const handleAddToCart = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(
      actions.callAddToBasket(
        buyerDetails.id,
        buyerDetails.shoppingCart.id,
        product as IProduct
      )
    );
  };

  const handleRemoveFromCart = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(
      actions.callRemoveFromBasket(
        buyerDetails.id,
        productInCart?.lineItem as number
      )
    );
  };

  return (
    <div className="px-8 py-6 bg-white rounded-md">
      <div className="flex flex-col items-center">
        <div
          className="w-full h-96 overflow-hidden rounded-lg mb-6"
          style={{ maxWidth: "500px" }}
        >
          <img
            src={product?.imageUrl}
            alt={product?.imageUrl}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="w-full">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {product?.title}
          </h1>
          <p className="text-3xl tracking-tight text-gray-900 mt-2">
            ${product?.price.toFixed(2)}
          </p>

          <div className="mt-6 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Stock</h3>
              <p className="text-base text-gray-600">11 in stock</p>
            </div>

            {quantityInCart > 0 ? (
              <div className="flex justify-between items-center mt-4 gap-6">
                <Button onClick={handleRemoveFromCart}>-</Button>
                <span>{quantityInCart}</span>
                <Button onClick={handleAddToCart}>+</Button>
              </div>
            ) : (
              <Button onClick={handleAddToCart} className="mt-4">
                Add to basket
              </Button>
            )}
          </div>
        </div>

        <div className="mt-10 w-full">
          <h3 className="text-sm font-medium text-gray-900">Category</h3>
          <p className="mt-4 text-sm text-gray-600 capitalize">
            {product?.category}
          </p>
        </div>

        <div className="mt-10 w-full">
          <h3 className="text-sm font-medium text-gray-900">About this item</h3>
          <p className="mt-4 text-sm text-gray-600">{product?.description}</p>
        </div>

        <div className="mt-10 w-full">
          <h3 className="text-sm font-medium text-gray-900">Reviews</h3>
          <div className="mt-4 flex flex-col gap-3">
            {product?.reviews && product?.reviews?.length > 0 ? (
              product?.reviews?.map((review) => {
                const reviewProps: ReviewProps = {
                  id: review.id,
                  comment: review.content,
                  date: !review.createdDate
                    ? moment().format("MMM DD, YYYY, h:mm a")
                    : moment(review.createdDate).format("MMM DD, YYYY, h:mm a"),
                  product: product?.title,
                  rating: review.rating,
                  buyer: "Test User",
                };

                return <Review key={review.id} {...reviewProps} />;
              })
            ) : (
              <h2 className="font-bold">No reviews found.</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
