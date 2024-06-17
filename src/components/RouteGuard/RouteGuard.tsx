import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useIsLoggedIn } from "@/hooks";

const RouteGuard: FC = () => {
  const isLoggedIn = useIsLoggedIn();
  const location = useLocation();

  if (isLoggedIn) return <Outlet />;

  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default RouteGuard;
