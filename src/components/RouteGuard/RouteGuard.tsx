import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useIsLoggedIn } from "@/hooks";

import { NON_AUTHENTICATED_PAGE_URL } from "@/constants/pageUrl";

const RouteGuard: FC = () => {
  const isLoggedIn = useIsLoggedIn();
  const location = useLocation();

  if (isLoggedIn) return <Outlet />;

  return (
    <Navigate
      to={NON_AUTHENTICATED_PAGE_URL.LOGIN}
      state={{ from: location }}
      replace
    />
  );
};

export default RouteGuard;
