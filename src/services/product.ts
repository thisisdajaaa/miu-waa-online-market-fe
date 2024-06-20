import { onParseResponse } from "@/utils/axiosUtil";

import { ProductDetailResponse } from "@/types/server/product";

export const getProductsBySellerAPI = async (
  sellerId: number,
  filters?: Record<string, string>
): Promise<ProductDetailResponse[]> => {
  const queryParams = new URLSearchParams(filters);

  const response = await onParseResponse<ProductDetailResponse[]>({
    method: "get",
    url: `/products/seller/${sellerId}`,
    params: queryParams,
  });

  return response;
};
