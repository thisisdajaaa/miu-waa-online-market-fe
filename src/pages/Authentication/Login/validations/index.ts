import * as Yup from "yup";

export const LoginFormValidationSchema = Yup.object().shape({
  email: Yup.string().label("Email").required().email().min(6).max(40),
  password: Yup.string().label("Password").required().min(8).max(15),
});
