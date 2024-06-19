import { FC, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { PATHS } from "@/constants/pageUrl";

import Loading from "@/components/Loading";
import Registration from "@/pages/Authentication/Registration";

const Login = lazy(() => import("@/pages/Authentication/Login"));

const AuthenticationRoutes: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={PATHS.LOGIN} element={<Login />} />
        <Route path={PATHS.REGISTRATION} element={<Registration />} />
      </Routes>
    </Suspense>
  );
};

export default AuthenticationRoutes;
