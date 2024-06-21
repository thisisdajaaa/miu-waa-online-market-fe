import { FC, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsStarFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import clsxm from "@/utils/clsxmUtil";
import { getImageUrl } from "@/utils/imageUtil";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { AUTHENTICATED_URLS } from "@/constants/pageUrl";

import Button from "@/components/Button";
import type { IProduct } from "@/components/ProductCard/types";

import { actions, selectors } from "@/redux/cart";

import { getShoppingCartAPI } from "@/services/shoppingCart";

import { ProductDetailResponse } from "@/types/server/product";
import { ShoppingCartDetailResponse } from "@/types/server/shoppingCart";

const ShoppingCartPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const total = useAppSelector(selectors.total);
  const buyerDetails = useAppSelector(selectors.buyerDetails);
  const products = useAppSelector(selectors.products);

  const [cart, setCart] = useState<ShoppingCartDetailResponse | null>(null);

  const handleLoad = useCallback(async () => {
    try {
      const response = await getShoppingCartAPI(buyerDetails.id);
      setCart(response);
    } catch (error) {
      toast.error("Failed to fetch shopping cart!");
    }
  }, [buyerDetails.id]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  const handleAddToCart = (product: ProductDetailResponse) => {
    const formattedProduct: IProduct = {
      id: product.id,
      title: product.name,
      category: product.category,
      description: product.description,
      imageUrl: getImageUrl(product.base64Image),
      price: product.price,
      rating: product.rating,
      quantity: product.stockQuantity,
      reviews: product.reviews,
    };

    dispatch(
      actions.callAddToBasket(
        buyerDetails.id,
        buyerDetails.shoppingCart.id,
        formattedProduct
      )
    );
  };

  const handleRemoveFromCart = (lineItem: number) => {
    dispatch(actions.callRemoveFromBasket(buyerDetails.id, lineItem));

    setCart((prevCart) => {
      if (!prevCart) return prevCart;

      const updatedLineItems = prevCart.lineItems.filter(
        (item) => item.id !== lineItem
      );

      return {
        ...prevCart,
        lineItems: updatedLineItems,
      };
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Shopping Basket</h2>

      {!cart?.lineItems?.length ? (
        <h2 className="font-bold">No line items found.</h2>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            {cart?.lineItems.map((item, index) => {
              const foundProduct = products?.find(
                (product) => product.lineItem === item.id
              );

              const totalProductPrice =
                (foundProduct?.quantity as number) *
                (foundProduct?.price as number);

              return (
                <div
                  key={item.id}
                  className={clsxm(
                    "flex p-4 border rounded-lg justify-between shadow-md bg-white",
                    index !== cart?.lineItems.length - 1 && "mb-4"
                  )}
                >
                  <div className="flex items-center">
                    <img
                      src={getImageUrl(item.product.base64Image)}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">
                        {item.product.name}
                      </h4>
                      <div className="flex">
                        {Array(item.product.rating || 0)
                          .fill(0)
                          .map((_, i) => (
                            <BsStarFill
                              key={i}
                              className="h-5 text-yellow-500"
                            />
                          ))}
                      </div>
                      <p className="text-sm text-gray-500">
                        {item.product.description}
                      </p>
                      <p className="text-lg font-semibold">
                        ₱{totalProductPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center gap-6">
                    <Button onClick={() => handleRemoveFromCart(item.id)}>
                      -
                    </Button>
                    <span>{foundProduct?.quantity}</span>
                    <Button onClick={() => handleAddToCart(item.product)}>
                      +
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-4 border rounded-lg shadow-md bg-white">
            <h3 className="text-lg font-bold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-8">
              <span>Subtotal ({cart?.lineItems?.length} items):</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => navigate(AUTHENTICATED_URLS.PAYMENT)}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartPage;
