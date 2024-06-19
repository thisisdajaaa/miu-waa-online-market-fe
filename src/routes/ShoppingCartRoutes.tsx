import { FC, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { PATHS } from "@/constants/pageUrl";

import Loading from "@/components/Loading";

const ShoppingCartPage = lazy(() => import("@/pages/ShoppingCart"));

const ProductRoutes: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={PATHS.BASE} element={<ShoppingCartPage />} />
      </Routes>
    </Suspense>
  );
};

export default ProductRoutes;
