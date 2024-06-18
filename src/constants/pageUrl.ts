export const BASE_URL = Object.freeze({
  LOGIN: "/login",
  REGISTRATION: "/registration",
});

export const WILDCARD = "*";

export const PARENT_URL = Object.freeze({
  AUTH: "/auth",
  HOME: "/home",
});

export const WILDCARD_URL = Object.freeze({
  AUTH: `${PARENT_URL.AUTH}${WILDCARD}`,
  HOME: `${PARENT_URL.HOME}${WILDCARD}`,
});

export const NON_AUTHENTICATED_PAGE_URL = Object.freeze({
  LOGIN: `${PARENT_URL.AUTH}${BASE_URL.LOGIN}`,
  REGISTRATION: `${PARENT_URL.AUTH}${BASE_URL.REGISTRATION}`,
});

export const AUTHENTICATED_PAGE_URL = Object.freeze({
  HOME: "/",
});
