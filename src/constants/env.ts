export const isProd = import.meta.env.MODE === "production";
export const isLocal = import.meta.env.MODE === "development";

export const showLogger = isLocal
  ? true
  : import.meta.env.VITE_SHOW_LOGGER === "true" || false;
