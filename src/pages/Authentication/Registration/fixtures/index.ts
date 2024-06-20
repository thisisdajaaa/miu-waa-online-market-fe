import type { Option } from "@/types/client";

import type { RegistrationForm } from "../types";

export const initialRegistrationForm: RegistrationForm = {
  name: "",
  password: "",
  email: "",
  confirmPassword: "",
  role: "",
};

export const roleList: Option[] = [
  {
    label: "Seller",
    value: "SELLER",
  },
  {
    label: "Buyer",
    value: "BUYER",
  },
];
