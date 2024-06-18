import { FC, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { PATHS } from "@/constants/pageUrl";

import Loading from "@/components/Loading";

const Home = lazy(() => import("@/pages/Home"));

const HomeRoutes: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={PATHS.BASE} element={<Home />} />
      </Routes>
    </Suspense>
  );
};

export default HomeRoutes;
