import { FC } from "react";

import ProductCard from "@/components/ProductCard";

import { mockProducts } from "../../fixtures";

const TopProductsSection: FC = () => {
  return (
    <section>
      <h2 className="font-bold">Top 5 Products</h2>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockProducts.slice(0, 5).map((product, index) => (
          <ProductCard key={index} {...product} showBtnBasket={false} />
        ))}
      </div>
    </section>
  );
};

export default TopProductsSection;
