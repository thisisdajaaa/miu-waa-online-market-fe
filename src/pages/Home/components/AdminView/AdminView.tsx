import { FC, useEffect, useState } from "react";
import axios from 'axios';
import Review from "@/components/Review";
import { IReview } from "@/components/Review/types";
import SellerApproval from "@/pages/SellerApproval";

const AdminView: FC = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/reviews/inappropriates')
      .then((res) => {
        res.data.forEach((review: IReview) => {
          review.comment = review.content;
        });
        setReviews(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:8080/api/reviews/${id}`)
      .then(() => {
        setReviews(reviews.filter((review) => review.id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  }

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
