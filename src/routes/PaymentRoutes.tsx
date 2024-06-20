import { FC, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { PATHS } from "@/constants/pageUrl";

import Loading from "@/components/Loading";

const PaymentPage = lazy(() => import("@/pages/Payment"));

const PaymentRoutes: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={PATHS.BASE} element={<PaymentPage />} />
      </Routes>
    </Suspense>
  );
};

export default PaymentRoutes;
