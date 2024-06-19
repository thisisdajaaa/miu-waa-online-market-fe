/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, MouseEvent, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/hooks";

import Button from "@/components/Button";
import { IProduct } from "@/components/ProductCard/types";
import Review from "@/components/Review";

import { actions, selectors } from "@/redux/cart";

import { reviews } from "./fixtures";

const ProductDetails: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectors.products);
  const product: IProduct = location.state.product;

  useEffect(() => {
    // Fetch product details based on id
  }, [id]);

  const productInCart = products.find((item) => item.id === Number(id));
  const quantityInCart = productInCart ? productInCart.quantity : 0;

  const handleAddToCart = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(actions.callAddToBasket(product));
  };

  const handleRemoveFromCart = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(actions.callRemoveToBasket(Number(id)));
  };

  return (
    <div className="px-8 py-6 bg-white rounded-md">
      <div className="flex flex-col items-center">
        <div
          className="w-full h-96 overflow-hidden rounded-lg mb-6"
          style={{ maxWidth: "500px" }}
        >
          <img
            src={product.imageUrl}
            alt={product.imageUrl}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="w-full">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {product.title}
          </h1>
          <p className="text-3xl tracking-tight text-gray-900 mt-2">
            ${product.price.toFixed(2)}
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
            {product.category}
          </p>
        </div>

        <div className="mt-10 w-full">
          <h3 className="text-sm font-medium text-gray-900">About this item</h3>
          <p className="mt-4 text-sm text-gray-600">{product.description}</p>
        </div>

        <div className="mt-10 w-full">
          <h3 className="text-sm font-medium text-gray-900">Reviews</h3>
          <div className="mt-4 flex flex-col gap-3">
            {reviews.map((review) => (
              <Review key={review.id} {...review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
