import { FormikContext, useFormik } from "formik";
import { FC, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import clsxm from "@/utils/clsxmUtil";
import { getImageUrl } from "@/utils/imageUtil";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { mappedCountryList } from "@/constants/country";
import { AUTHENTICATED_URLS } from "@/constants/pageUrl";

import Button from "@/components/Button";
import FormInput from "@/components/Formik/FormInput";
import FormSelect from "@/components/Formik/FormSelect";

import { actions, selectors } from "@/redux/cart";

import {
  addAddressAPI,
  createPaymentAPI,
  placeOrderAPI,
} from "@/services/order";
import { getShoppingCartAPI } from "@/services/shoppingCart";

import { AddressDetailRequest } from "@/types/server/address";
import { OrderDetailRequest } from "@/types/server/order";
import { PaymentDetailRequest } from "@/types/server/payment";
import { ShoppingCartDetailResponse } from "@/types/server/shoppingCart";

import { initialPaymentForm } from "./fixtures";
import { PaymentForm } from "./types";
import { PaymentFormValidationSchema } from "./validations";

const PaymentPage: FC = () => {
  const total = useAppSelector(selectors.total);
  const buyerDetails = useAppSelector(selectors.buyerDetails);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const handleSubmit = async (values: PaymentForm) => {
    try {
      const total = cart?.lineItems.reduce(
        (acc, curr) => (acc += curr.product.price * curr.quantity),
        0
      );

      const addressPayload: AddressDetailRequest = {
        street: values.street,
        city: values.city,
        state: values.state,
        postalCode: values.postalCode,
        country: values.country,
      };

      const addressResponse = await addAddressAPI(
        buyerDetails.id,
        addressPayload
      );

      const orderPayload: OrderDetailRequest = {
        buyerId: buyerDetails.id,
        orderDate: new Date(),
        totalAmount: (total as number) || 0,
        billingAddress: addressResponse,
        shippingAddress: addressResponse,
        status: "PLACED",
        sellerId: cart?.lineItems[0].product.sellerId as number,
      };

      const orderResponse = await placeOrderAPI(buyerDetails.id, orderPayload);
      const orderId = orderResponse.id;

      const paymentPayload: PaymentDetailRequest = {
        cardNumber: values.cardNumber,
        expiryDate: values.expiry,
        cvv: values.cvv,
        amount: (total as number) || 0,
        paymentMethod: "debit",
      };

      const paymentResponse = await createPaymentAPI(
        buyerDetails.id,
        orderId,
        paymentPayload
      );

      if (addressResponse.id && orderResponse.id && paymentResponse.id) {
        dispatch(actions.callSetResetCart());

        navigate(AUTHENTICATED_URLS.ORDERS);
        toast.success("Successfully made an order!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const formikBag = useFormik<PaymentForm>({
    initialValues: initialPaymentForm,
    validationSchema: PaymentFormValidationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <FormikContext.Provider value={formikBag}>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="border-t py-4">
              {cart?.lineItems.map((item) => {
                const totalProductPrice =
                  (item?.quantity as number) * (item?.product?.price as number);

                return (
                  <div
                    key={item.id}
                    className={clsxm("flex py-4 justify-between bg-white")}
                  >
                    <div className="flex items-center">
                      <img
                        src={getImageUrl(item.product.base64Image)}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold">
                          {item.product.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {" "}
                          {item.product.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {" "}
                          x{item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-lg text-gray-900">
                      ${totalProductPrice.toFixed(2)}
                    </p>
                  </div>
                );
              })}

              <div className="flex justify-between items-center mb-6 mt-8">
                <p className="text-gray-700 text-lg">Subtotal</p>
                <p className="font-semibold text-lg text-gray-900">
                  ${total.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <p className="text-lg font-semibold text-gray-900">Total due</p>
                <p className="text-lg font-semibold text-gray-900">
                  ${total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Shipping information</h2>

            <FormInput
              name="email"
              label="Email"
              isRequired
              placeholder="Enter your email"
            />
            <FormInput
              name="fullName"
              label="Full Name"
              isRequired
              placeholder="Enter your Full Name"
            />
            <FormSelect
              name="country"
              label="Country"
              isRequired
              options={mappedCountryList}
            />
            <FormInput
              name="street"
              label="Street"
              isRequired
              placeholder="Enter your Street"
            />
            <FormInput
              name="city"
              label="City"
              isRequired
              placeholder="Enter your City"
            />
            <FormInput
              name="state"
              label="State"
              isRequired
              placeholder="Enter your State"
            />
            <FormInput
              name="postalCode"
              label="Postal Code"
              isRequired
              placeholder="Enter your Postal Code"
            />
            <FormInput
              name="cardNumber"
              label="Card Number"
              isRequired
              placeholder="1234 1234 1234 1234"
            />
            <div className="flex space-x-2">
              <FormInput
                name="expiry"
                label="Expiry"
                isRequired
                placeholder="MM / YY"
              />
              <FormInput name="cvv" label="CVV" isRequired placeholder="CVV" />
            </div>

            <Button
              className="w-full mt-6"
              onClick={formikBag.submitForm}
              isLoading={formikBag.isSubmitting}
            >
              Pay
            </Button>

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
    </FormikContext.Provider>
  );
};

export default PaymentPage;
