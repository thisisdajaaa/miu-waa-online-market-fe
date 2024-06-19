import { FC } from "react";

const Review: FC<any> = (props) => {

  const {
    buyerName,
    rating,
    content
  } : any = props;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">{buyerName}</h2>
      <div className="flex items-center my-2">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label key={i}>
              <div className="text-orange-400">
                {ratingValue <= rating ? '★' : '☆'}
              </div>
            </label>
          );
        })}
      </div>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default Review;
