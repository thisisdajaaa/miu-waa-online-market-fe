import { FC } from "react";
import { BsStarFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import clsxm from "@/utils/clsxmUtil";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { AUTHENTICATED_URLS } from "@/constants/pageUrl";

import Button from "@/components/Button";
import type { IProduct } from "@/components/ProductCard/types";

import { actions, selectors } from "@/redux/cart";

const ShoppingCartPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectors.products);
  const total = useAppSelector(selectors.total);

  const handleAddToCart = (product: IProduct) => {
    dispatch(actions.callAddToBasket(product));
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch(actions.callRemoveToBasket(productId));
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Shopping Basket</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          {cart.map((item, index) => (
            <div
              key={item.id}
              className={clsxm(
                "flex p-4 border rounded-lg justify-between shadow-md bg-white",
                index !== cart.length - 1 && "mb-4"
              )}
            >
              <div className="flex items-center">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <div className="flex">
                    {Array(item.rating || 0)
                      .fill(0)
                      .map((_, i) => (
                        <BsStarFill key={i} className="h-5 text-yellow-500" />
                      ))}
                  </div>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-lg font-semibold">
                    ₱{item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center gap-6">
                <Button onClick={() => handleRemoveFromCart(item.id)}>-</Button>
                <span>{item.quantity}</span>
                <Button onClick={() => handleAddToCart(item)}>+</Button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border rounded-lg shadow-md bg-white">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-8">
            <span>Subtotal ({cart.length} items):</span>
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
    </div>
  );
};

export default ShoppingCartPage;
