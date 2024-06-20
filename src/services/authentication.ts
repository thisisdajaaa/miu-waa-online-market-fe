import { onParseResponse } from "@/utils/axiosUtil";

import type { LoginForm } from "@/pages/Authentication/Login/types";
import type { RegistrationForm } from "@/pages/Authentication/Registration/types";

import type { UserDetailResponse } from "@/types/server/user";

export const loginAPI = async (values: LoginForm): Promise<string> => {
  const response = await onParseResponse<string>({
    method: "post",
    url: "/auth/login",
    data: values,
  });

  return response;
};

export const registrationAPI = async (
  values: RegistrationForm
): Promise<string> => {
  const response = await onParseResponse<string>({
    method: "post",
    url: "/auth/register",
    data: values,
  });

  return response;
};

export const getLoggedInUserAPI = async (): Promise<UserDetailResponse> => {
  const response = await onParseResponse<UserDetailResponse>({
    method: "get",
    url: "/users/showMe",
  });

  return response;
};

export const logoutAPI = async (): Promise<unknown> => {
  const response = await onParseResponse<unknown>({
    method: "post",
    url: "/auth/logout",
  });

  return response;
};
