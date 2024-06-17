import type { UserDetailResponse } from "@/types/server/user";

import type { AuthenticationState } from "./models";

export const initialUserDetails: UserDetailResponse = {
  id: null,
  email: "",
  name: "",
};

export const initialAuthenticationState: AuthenticationState = {
  accessToken: "",
  refreshToken: "",
  userDetails: initialUserDetails,
};
