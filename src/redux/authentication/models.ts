import type { UserDetailResponse } from "@/types/server/user";

export type AuthenticationState = {
  userDetails: UserDetailResponse;
};
