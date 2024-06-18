import * as Yup from "yup";

import { categoryList } from "@/constants/category";

export const ProductFormValidationSchema = Yup.object().shape({
  details: Yup.object().shape({
    name: Yup.string().label("Name").required().min(2).max(50),

    description: Yup.string().label("Description").required().min(10).max(500),

    price: Yup.number().label("Price").required().min(1),

    category: Yup.string()
      .label("Category")
      .required()
      .oneOf(categoryList.map(({ value }) => value)),

    image: Yup.mixed().label("Image").required(),

    quantity: Yup.number().label("Quantity").required().min(1),
  }),
});
