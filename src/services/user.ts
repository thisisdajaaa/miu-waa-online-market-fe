import { onParseResponse } from "@/utils/axiosUtil";

import { BuyerDetailResponse, SellerDetailResponse } from "@/types/server/user";

export const getBuyerDetailsAPI = async (
  id: number
): Promise<BuyerDetailResponse> => {
  const response = await onParseResponse<BuyerDetailResponse>({
    method: "get",
    url: `/buyers/getBuyerDetails/${id}`,
  });

  return response;
};

export const getSellerDetailsAPI = async (
  id: number
): Promise<SellerDetailResponse> => {
  const response = await onParseResponse<SellerDetailResponse>({
    method: "get",
    url: `/sellers/${id}`,
  });

  return response;
};
