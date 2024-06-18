import { FC, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { BASE_URL } from "@/constants/pageUrl";

import Loading from "@/components/Loading";
import Registration from "@/pages/Authentication/Registration";

const Login = lazy(() => import("@/pages/Authentication/Login"));

const AuthenticationRoutes: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={BASE_URL.LOGIN} element={<Login />} />
        <Route path={BASE_URL.REGISTRATION} element={<Registration />} />
      </Routes>
    </Suspense>
  );
};

export default AuthenticationRoutes;
