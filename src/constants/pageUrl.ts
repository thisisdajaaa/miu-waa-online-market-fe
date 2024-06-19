export const PATHS = Object.freeze({
  BASE: "/",
  LOGIN: "/login",
  REGISTRATION: "/registration",
  HOME: "/home",
  AUTH: "/auth",
  PRODUCTS: "/products",
  PRODUCT_DETAILS: "/products/:id",
  ORDERS: "/orders",
  ORDER_DETAILS: "/orders/:id",
  SHOP_SETTINGS: "/shop-settings",
});

export const WILDCARD = "/*";

export const WILDCARD_PATHS = Object.freeze({
  AUTH: `${PATHS.AUTH}${WILDCARD}`,
  HOME: `${PATHS.HOME}${WILDCARD}`,
  PRODUCTS: `${PATHS.PRODUCTS}${WILDCARD}`,
  ORDERS: `${PATHS.ORDERS}${WILDCARD}`,
});

export const NON_AUTHENTICATED_URLS = Object.freeze({
  LOGIN: `${PATHS.AUTH}${PATHS.LOGIN}`,
  REGISTRATION: `${PATHS.AUTH}${PATHS.REGISTRATION}`,
});

export const AUTHENTICATED_URLS = Object.freeze({
  HOME: PATHS.HOME,
  PRODUCTS: PATHS.PRODUCTS,
  ORDERS: PATHS.ORDERS,
});
