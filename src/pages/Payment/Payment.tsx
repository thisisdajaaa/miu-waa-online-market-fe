import { FC } from "react";
import { Link } from "react-router-dom";

import clsxm from "@/utils/clsxmUtil";
import { useAppSelector } from "@/hooks";

import { mappedCountryList } from "@/constants/country";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";

import { selectors } from "@/redux/cart";

const PaymentPage: FC = () => {
  const products = useAppSelector(selectors.products);
  const total = useAppSelector(selectors.total);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="border-t py-4">
            {products.map((item) => (
              <div
                key={item.id}
                className={clsxm("flex py-4 justify-between bg-white")}
              >
                <div className="flex items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <p className="font-semibold text-lg text-gray-900">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            ))}

            <div className="flex justify-between items-center mb-6 mt-8">
              <p className="text-gray-700 text-lg">Subtotal</p>
              <p className="font-semibold text-lg text-gray-900">
                ${total.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-700 text-lg">Shipping</p>
              <p className="font-semibold text-lg text-gray-900">$6.99</p>
            </div>
            <div className="flex justify-between items-center border-t pt-4">
              <p className="text-lg font-semibold text-gray-900">Total due</p>
              <p className="text-lg font-semibold text-gray-900">
                ${(total + 6.99).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Shipping information</h2>
          <form>
            <Input
              name="email"
              label="Email"
              isRequired
              placeholder="Enter your email"
            />
            <Input
              name="fullName"
              label="Full Name"
              isRequired
              placeholder="Enter your Full Name"
            />
            <Select
              name="country"
              label="Country"
              isRequired
              options={mappedCountryList}
            />
            <Input
              name="address"
              label="Address"
              isRequired
              placeholder="Enter your Address"
            />
            <Input
              name="cardNumber"
              label="Card Number"
              isRequired
              placeholder="1234 1234 1234 1234"
            />
            <div className="flex space-x-2">
              <Input
                name="expiry"
                label="Expiry"
                isRequired
                placeholder="MM / YY"
              />
              <Input name="cvc" label="CVC" isRequired placeholder="CVC" />
            </div>
            <div className="mt-4">
              <label className="flex items-center text-lg">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                />
                <span className="ml-2">Billing info is same as shipping</span>
              </label>
            </div>
            <div className="mt-4">
              <label className="flex items-center text-lg">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                />
                <span className="ml-2">
                  Save my info for 1-click checkout with Link
                </span>
              </label>
            </div>
            <Button className="w-full mt-6" onClick={() => {}}>
              Pay
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            By clicking Pay, you agree to the{" "}
            <Link
              to="https://link.com/terms"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Link Terms
            </Link>{" "}
            and{" "}
            <Link
              to="https://link.com/privacy"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
