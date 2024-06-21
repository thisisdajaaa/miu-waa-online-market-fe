import moment from "moment";
import { FC, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import Review from "@/components/Review";
import { IReview } from "@/components/Review/types";

import {
  deleteFlaggedReviewsAPI,
  getFlaggedReviewsAPI,
} from "@/services/admin";

import SellerApproval from "../SellerApproval";

const AdminView: FC = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);

  const handleLoad = useCallback(async () => {
    try {
      const response = await getFlaggedReviewsAPI();

      const formattedResponse: IReview[] = response.map((item) => ({
        id: item.id,
        buyer: item.buyer,
        comment: item.content,
        date: moment(item.createdDate).format("MMM DD, YYYY, h:mm a"),
        product: item.product,
        rating: item.rating,
      }));

      setReviews(formattedResponse);
    } catch (error) {
      toast.error("Failed to fetch reviews!");
    }
  }, []);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  const handleDelete = async (id: number) => {
    try {
      await deleteFlaggedReviewsAPI(id);
      setReviews(reviews.filter((review) => review.id !== id));
      toast.success("Successfully deleted the review!");
    } catch (error) {
      toast.error("Failed to delete the review!");
    }
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
