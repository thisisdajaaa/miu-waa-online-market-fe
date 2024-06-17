import { FC, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Loading from "@/components/Loading";
import RouteGuard from "@/components/RouteGuard";

const AuthenticationRoutes = lazy(() => import("./AuthenticationRoutes"));
const HomeRoutes = lazy(() => import("./Home"));
const NotFoundPage = lazy(() => import("../pages/NotFound"));

const PageRoutes: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/auth/*" element={<AuthenticationRoutes />} />

        <Route element={<RouteGuard />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home/*" element={<HomeRoutes />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default PageRoutes;
