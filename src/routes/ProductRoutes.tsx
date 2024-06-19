import { FC, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { PATHS } from "@/constants/pageUrl";

import Loading from "@/components/Loading";

const ProductList = lazy(() => import("@/pages/Products"));

const ProductDetails = lazy(() => import("@/pages/ProductDetails"));

const ProductRoutes: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={PATHS.BASE} element={<ProductList />} />
        <Route path={PATHS.PRODUCT_DETAILS} element={<ProductDetails />} />
      </Routes>
    </Suspense>
  );
};

export default ProductRoutes;
