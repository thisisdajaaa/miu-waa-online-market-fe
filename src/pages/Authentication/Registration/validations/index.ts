import * as Yup from "yup";

export const RegistrationFormValidationSchema = Yup.object().shape({
  firstName: Yup.string().label("First Name").required().min(4).max(40),

  middleName: Yup.string().label("Middle Name").min(4).max(40),

  lastName: Yup.string().label("Last Name").required().min(4).max(40),

  email: Yup.string().label("Email").required().email().min(6).max(40),

  password: Yup.string().label("Password").required().min(8).max(15),

  confirmPassword: Yup.string()
    .label("Confirm Password")
    .required()
    .when("password", {
      is: (val: string) => !!val && val.length > 0,
      then: (schema) =>
        schema.oneOf([Yup.ref("password")], "Passwords must match"),
    }),
});
