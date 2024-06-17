import axios, { AxiosInstance } from "axios";

import logger from "@/utils/loggerUtil";

import { store } from "@/redux/store";

import { refreshToken } from "@/services/authentication";

const baseInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
});

baseInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.authentication.accessToken;

    if (token && config?.headers)
      config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return baseInstance(originalRequest);
      } catch (refreshError) {
        logger(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { baseInstance };
