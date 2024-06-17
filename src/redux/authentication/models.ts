import type { UserDetailResponse } from "@/types/server/user";

export type AuthenticationState = {
  accessToken: string;
  refreshToken: string;
  userDetails: UserDetailResponse;
};
