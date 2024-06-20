import { onParseResponse } from "@/utils/axiosUtil";

import { ProductDetailResponse } from "@/types/server/product";

export const getProductsBySellerAPI = async (
  sellerId: number,
  filters: Record<string, string>
): Promise<ProductDetailResponse[]> => {
  const queryParams = new URLSearchParams(filters).toString();
  const response = await onParseResponse<ProductDetailResponse[]>({
    method: "get",
    url: `/products/seller/${sellerId}?${queryParams}`,
  });

  return response;
};
