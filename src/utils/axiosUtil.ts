import { AxiosError, AxiosRequestConfig } from "axios";

import { baseInstance } from "@/config/instance";

import logger from "./loggerUtil";

export const onParseResponse = async <T>(args: AxiosRequestConfig) => {
  let formattedResponse: T;

  try {
    const { data } = await baseInstance({ ...args });

    formattedResponse = data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const data = axiosError.response?.data as T;

    logger(axiosError);

    formattedResponse = data;
  }

  return formattedResponse;
};
