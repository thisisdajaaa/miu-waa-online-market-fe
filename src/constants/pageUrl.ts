export const PATHS = Object.freeze({
  BASE: "/",
  RECORD: "/:id",
  LOGIN: "/login",
  REGISTRATION: "/registration",
  HOME: "/home",
  AUTH: "/auth",
  PRODUCTS: "/products",
  PRODUCT_DETAILS: "/:id",
  ORDERS: "/orders",
  ORDER_DETAILS: "/orders/:id",
  SHOPPING_CART: "/shopping-cart",
  PAYMENT: "/payment",
});

export const WILDCARD = "/*";

export const WILDCARD_PATHS = Object.freeze({
  AUTH: `${PATHS.AUTH}${WILDCARD}`,
  HOME: `${PATHS.HOME}${WILDCARD}`,
  PRODUCTS: `${PATHS.PRODUCTS}${WILDCARD}`,
  ORDERS: `${PATHS.ORDERS}${WILDCARD}`,
  SHOPPING_CART: `${PATHS.SHOPPING_CART}${WILDCARD}`,
  PAYMENT: `${PATHS.PAYMENT}${WILDCARD}`,
});

export const NON_AUTHENTICATED_URLS = Object.freeze({
  LOGIN: `${PATHS.AUTH}${PATHS.LOGIN}`,
  REGISTRATION: `${PATHS.AUTH}${PATHS.REGISTRATION}`,
});

export const AUTHENTICATED_URLS = Object.freeze({
  HOME: PATHS.HOME,
  PRODUCTS: PATHS.PRODUCTS,
  ORDERS: PATHS.ORDERS,
  SHOPPING_CART: PATHS.SHOPPING_CART,
  PAYMENT: PATHS.PAYMENT,
});
