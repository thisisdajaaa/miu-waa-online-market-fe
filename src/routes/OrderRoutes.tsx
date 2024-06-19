import { FC, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { PATHS } from "@/constants/pageUrl";

import Loading from "@/components/Loading";

const OrdersPage = lazy(() => import("@/pages/Orders"));
const OrderDetail = lazy(() => import("@/pages/OrderDetail"));

const OrderRoutes: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={PATHS.BASE} element={<OrdersPage />} />
        <Route path={PATHS.RECORD} element={<OrderDetail />} />
      </Routes>
    </Suspense>
  );
};

export default OrderRoutes;
