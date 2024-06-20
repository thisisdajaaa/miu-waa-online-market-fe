import { FC, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getImageUrl } from "@/utils/imageUtil";

import Banner from "@/components/Banner";
import type { IProduct } from "@/components/ProductCard/types";
import ProductFeed from "@/components/ProductFeed";

import { getProductsAPI } from "@/services/product";

const BuyerView: FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const handleLoad = useCallback(async () => {
    try {
      const response = await getProductsAPI();

      const formattedResponse: IProduct[] = response.map((item) => ({
        id: item.id,
        title: item.name,
        category: item.category,
        description: item.description,
        imageUrl: getImageUrl(item.base64Image),
        price: item.price,
        rating: item.rating,
        quantity: item.stockQuantity,
      }));

      setProducts(formattedResponse);
    } catch (error) {
      toast.error("Failed to fetch products!");
    }
  }, []);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return (
    <div>
      <Banner />

      <ProductFeed products={products} />
    </div>
  );
};

export default BuyerView;
