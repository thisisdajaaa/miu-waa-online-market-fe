import { FC, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { PATHS } from "@/constants/pageUrl";

import Loading from "@/components/Loading";

const OrderList = lazy(() => import("@/pages/Orders"));

const OrderRoutes: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={PATHS.BASE} element={<OrderList />} />
      </Routes>
    </Suspense>
  );
};

export default OrderRoutes;
