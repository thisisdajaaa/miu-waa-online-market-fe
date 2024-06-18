import { FC } from "react";

import Banner from "@/components/Banner";
import ProductFeed from "@/components/ProductFeed";

import { mockProducts } from "../../fixtures";

const BuyerView: FC = () => {
  return (
    <div>
      <Banner />

      <ProductFeed products={mockProducts} />
    </div>
  );
};

export default BuyerView;
