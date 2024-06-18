import type { Option } from "@/types/client";

import type { RegistrationForm } from "../types";

export const initialRegistrationForm: RegistrationForm = {
  firstName: "",
  middleName: "",
  lastName: "",
  password: "",
  email: "",
  confirmPassword: "",
  role: "",
};

export const roleList: Option[] = [
  {
    label: "Seller",
    value: "Seller",
  },
  {
    label: "Buyer",
    value: "Buyer",
  },
];
