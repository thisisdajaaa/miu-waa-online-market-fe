import { onParseResponse } from "@/utils/axiosUtil";

import { BuyerDetailResponse } from "@/types/server/user";

export const getBuyerDetailsAPI = async (
  id: number
): Promise<BuyerDetailResponse> => {
  const response = await onParseResponse<BuyerDetailResponse>({
    method: "get",
    url: `/buyers/getBuyerDetails/${id}`,
  });

  return response;
};
