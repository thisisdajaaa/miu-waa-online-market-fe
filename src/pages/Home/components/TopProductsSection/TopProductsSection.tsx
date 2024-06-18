import { FC } from "react";

import ProductCard from "@/components/ProductCard";

const TopProductsSection: FC = () => {
  return (
    <section>
      <h2 className="font-bold">Top 5 Products</h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          title="Testing"
          price="$400.00"
          category="electronics"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae quae perferendis odit neque? Modi dolorem numquam pariatur at autem hic!"
          imageUrl="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
        />
        <ProductCard
          title="Testing"
          price="$400.00"
          category="electronics"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae quae perferendis odit neque? Modi dolorem numquam pariatur at autem hic!"
          imageUrl="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
        />
        <ProductCard
          title="Testing"
          price="$400.00"
          category="electronics"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae quae perferendis odit neque? Modi dolorem numquam pariatur at autem hic!"
          imageUrl="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
        />
        <ProductCard
          title="Testing"
          price="$400.00"
          category="electronics"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae quae perferendis odit neque? Modi dolorem numquam pariatur at autem hic!"
          imageUrl="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
        />
        <ProductCard
          title="Testing"
          price="$400.00"
          category="electronics"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae quae perferendis odit neque? Modi dolorem numquam pariatur at autem hic!"
          imageUrl="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
        />
      </div>
    </section>
  );
};

export default TopProductsSection;
