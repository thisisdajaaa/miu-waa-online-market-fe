import * as Yup from "yup";

import { roleList } from "../fixtures";

export const RegistrationFormValidationSchema = Yup.object().shape({
  name: Yup.string().label("First Name").required().min(4).max(100),

  email: Yup.string().label("Email").required().email().min(6).max(40),

  password: Yup.string().label("Password").required().min(8).max(15),

  role: Yup.string()
    .label("Role")
    .required()
    .oneOf(roleList.map(({ value }) => value)),

  confirmPassword: Yup.string()
    .label("Confirm Password")
    .required()
    .when("password", {
      is: (val: string) => !!val && val.length > 0,
      then: (schema) =>
        schema.oneOf([Yup.ref("password")], "Passwords must match"),
    }),
});
