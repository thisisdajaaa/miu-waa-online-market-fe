import { FC } from "react";

import StatisticsSection from "../StatisticsSection";
import TopProductsSection from "../TopProductsSection";

const SellerView: FC = () => {
  return (
    <div className="flex flex-col gap-24">
      <StatisticsSection />
      <TopProductsSection />
    </div>
  );
};

export default SellerView;
