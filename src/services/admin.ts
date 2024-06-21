import { onParseResponse } from "@/utils/axiosUtil";

import { ReviewDetailResponse } from "@/types/server/review";
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

export const getFlaggedReviewsAPI = async (): Promise<
  ReviewDetailResponse[]
> => {
  const response = await onParseResponse<ReviewDetailResponse[]>({
    method: "get",
    url: `/reviews/inappropriates`,
  });

  return response;
};

export const deleteFlaggedReviewsAPI = async (id: number): Promise<unknown> => {
  const response = await onParseResponse<unknown>({
    method: "delete",
    url: `/reviews/${id}`,
    data: null,
  });

  return response;
};
