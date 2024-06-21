import * as Yup from "yup";

import { mappedCountryList } from "@/constants/country";

export const PaymentFormValidationSchema = Yup.object().shape({
  email: Yup.string().label("Email").required().email().min(6).max(40),

  fullName: Yup.string().label("Full Name").required().min(4).max(100),

  street: Yup.string().label("Street").required().min(4).max(100),

  city: Yup.string().label("City").required().min(2).max(100),

  state: Yup.string().label("State").required().min(2).max(100),

  postalCode: Yup.string().label("Postal Code").required().min(4).max(10),

  country: Yup.string()
    .label("Country")
    .required()
    .oneOf(mappedCountryList.map(({ value }) => value)),

  cardNumber: Yup.string().label("Card Number").required().min(16).max(16),

  expiry: Yup.string()
    .label("Expiry")
    .required()
    .matches(/(0[1-9]|1[0-2])\/\d{2}/, "Expiry date is not valid"),

  cvv: Yup.string().label("CVC").required().min(3).max(4),
});
