import { onParseResponse } from "@/utils/axiosUtil";

import { SellerDetailResponse } from "@/types/server/user";

export const getPendingSellersAPI = async (): Promise<
  SellerDetailResponse[]
> => {
  const response = await onParseResponse<SellerDetailResponse[]>({
    method: "get",
    url: `/sellers/pending`,
  });

  return response;
};

export const approveSellerAPI = async (id: number): Promise<unknown> => {
  const response = await onParseResponse<unknown>({
    method: "put",
    url: `/sellers/${id}/approve`,
    data: null,
  });

  return response;
};

export const rejectSellerAPI = async (id: number): Promise<unknown> => {
  const response = await onParseResponse<unknown>({
    method: "put",
    url: `/sellers/${id}/disapprove`,
    data: null,
  });

  return response;
};
