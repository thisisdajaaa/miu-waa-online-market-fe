import { FC } from "react";

import type { ProductFeedProps } from "./types";
import ProductCard from "../ProductCard";

const ProductFeed: FC<ProductFeedProps> = (props) => {
  const { products } = props;

  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto">
      {products.slice(0, 4).map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}

      <img
        className="md:col-span-full"
        src="https://links.papareact.com/dyz"
        alt="advertisement-banner"
      />

      <div className="md:col-span-2">
        {products.slice(4, 5).map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>

      {products.slice(5, products.length).map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductFeed;
