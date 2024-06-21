import type { UserDetailResponse } from "@/types/server/user";

import type { AuthenticationState } from "./models";

export const initialUserDetails: UserDetailResponse = {
  id: 0,
  email: "",
  name: "",
  role: "",
};

export const initialAuthenticationState: AuthenticationState = {
  userDetails: initialUserDetails,
};
