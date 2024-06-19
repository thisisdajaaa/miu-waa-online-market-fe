import { FC, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import {
  AUTHENTICATED_URLS,
  PATHS,
  WILDCARD,
  WILDCARD_PATHS,
} from "@/constants/pageUrl";

import Loading from "@/components/Loading";
import RouteGuard from "@/components/RouteGuard";

const AuthenticationRoutes = lazy(() => import("./AuthenticationRoutes"));
const HomeRoutes = lazy(() => import("./HomeRoutes"));
const ProductRoutes = lazy(() => import("./ProductRoutes"));
const OrderRoutes = lazy(() => import("./OrderRoutes"));
const ShoppingCartRoutes = lazy(() => import("./ShoppingCartRoutes"));
const NotFoundPage = lazy(() => import("../pages/NotFound"));

const PageRoutes: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={WILDCARD_PATHS.AUTH} element={<AuthenticationRoutes />} />

        <Route element={<RouteGuard />}>
          <Route
            path={PATHS.BASE}
            element={<Navigate to={AUTHENTICATED_URLS.HOME} />}
          />
          <Route path={WILDCARD_PATHS.HOME} element={<HomeRoutes />} />
          <Route path={WILDCARD_PATHS.PRODUCTS} element={<ProductRoutes />} />
          <Route path={WILDCARD_PATHS.ORDERS} element={<OrderRoutes />} />
          <Route
            path={WILDCARD_PATHS.SHOPPING_CART}
            element={<ShoppingCartRoutes />}
          />
        </Route>

        <Route path={WILDCARD} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default PageRoutes;
