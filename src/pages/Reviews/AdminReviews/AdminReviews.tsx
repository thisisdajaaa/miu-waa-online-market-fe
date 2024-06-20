import { FC, useState } from "react";

import Review from "@/components/Review";
import { mockReviews } from "@/pages/Home/fixtures";

const AdminReview: FC = () => {
  const [reviews, setReviews] = useState(mockReviews);

  const onDelete = (id: number) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== id)
    );
  };
  return (
    <div>
      <h2 className=" text-2xl">Flagged Reviews</h2>
      <div className="flex flex-row">
        {reviews.map((review) => (
          <div className="m-4">
            <Review key={review.id} {...review} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReview;
