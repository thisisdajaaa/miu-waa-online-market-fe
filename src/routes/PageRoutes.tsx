import { FC, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import {
  AUTHENTICATED_PAGE_URL,
  PARENT_URL,
  WILDCARD,
  WILDCARD_URL,
} from "@/constants/pageUrl";

import Loading from "@/components/Loading";
import RouteGuard from "@/components/RouteGuard";

const AuthenticationRoutes = lazy(() => import("./AuthenticationRoutes"));
const HomeRoutes = lazy(() => import("./Home"));
const NotFoundPage = lazy(() => import("../pages/NotFound"));

const PageRoutes: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={WILDCARD_URL.AUTH} element={<AuthenticationRoutes />} />

        <Route element={<RouteGuard />}>
          <Route
            path={AUTHENTICATED_PAGE_URL.HOME}
            element={<Navigate to={PARENT_URL.HOME} />}
          />
          <Route path={WILDCARD_URL.HOME} element={<HomeRoutes />} />
        </Route>

        <Route path={WILDCARD} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default PageRoutes;
