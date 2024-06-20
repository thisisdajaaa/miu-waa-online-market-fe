import * as Yup from "yup";

export const BuyerReviewFormValidationSchema = Yup.object().shape({
  rating: Yup.number().label("Rating").required().min(1).max(5),
  content: Yup.string().label("Content").required(),
});
