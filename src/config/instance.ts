import axios, { AxiosInstance } from "axios";

const baseInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
});

export { baseInstance };
