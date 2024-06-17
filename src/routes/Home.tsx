import { FC, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loading from "@/components/Loading";

const Home = lazy(() => import("@/pages/Home"));

const HomeRoutes: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
};

export default HomeRoutes;
