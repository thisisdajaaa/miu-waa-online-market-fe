import { FC, useEffect, useState } from "react";
import axios from "axios";
import Review from "@/components/Review";
import { IReview } from "@/components/Review/types";
import { onParseResponse } from "@/utils/axiosUtil";

import ProductCard from "@/components/ProductCard";

import { mockProducts } from "../../fixtures";
import SellerApproval from "../SellerApproval";

const AdminView: FC = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    getInappropriateReviews();
  }, []);

  async function getInappropriateReviews() {
    const response = await onParseResponse<any>({
      method: "get",
      url: "/reviews/inappropriates",
      data: null,
    });

    if (!response) return;
    response.data.forEach((review: IReview) => {
      review.comment = review.content;
    });
    setReviews(response.data);
  }

  const handleDelete = async (id: number) => {
    const response = await onParseResponse<any>({
      method: "delete",
      url: `/reviews/${id}`,
      data: null,
    });

    if (!response) return;
    setReviews(reviews.filter((review) => review.id !== id));
  };

  return (
    <div>
      {reviews.length === 0 ? (
        <div className="mt-8">
          <h2 className="font-bold mt-12">Inappropriate Reviews</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <p>No inappropriate reviews found.</p>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <h2 className="font-bold mt-12">Inappropriate Reviews</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review) => {
              return (
                <Review key={review.id} {...review} onDelete={handleDelete} />
              );
            })}
          </div>
        </div>
      )}
      <SellerApproval />
    </div>
  );
};

export default AdminView;
