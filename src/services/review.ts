import { onParseResponse } from "@/utils/axiosUtil";

import { ReviewDetailResponse, ReviewRequest } from "@/types/server/review";

export const addReviewAPI = async (
  buyerId: number,
  productId: number,
  review: ReviewRequest
): Promise<ReviewDetailResponse> => {
  const response = await onParseResponse<ReviewDetailResponse>({
    method: "post",
    url: `/reviews/buyers/${buyerId}/products/${productId}`,
    data: review,
  });

  return response;
};
