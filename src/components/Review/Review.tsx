import { FC } from "react";

import type { ReviewProps } from "./types";
import Button from "../Button";

const Review: FC<ReviewProps> = (props) => {
  const { id, product, comment, rating, date, buyer, onDelete } = props;

  return (
    <div className="bg-white rounded-lg border shadow-md p-6 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{buyer}</h2>
          <div className="flex items-center my-2">
            {[...Array(5)].map((_star, i) => {
              const ratingValue = i + 1;
              return (
                <span
                  key={i}
                  className={`text-xl ${
                    ratingValue <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              );
            })}
          </div>
        </div>

        {onDelete && (
          <Button variant="danger" onClick={() => onDelete(id)}>
            Delete
          </Button>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-md font-semibold text-gray-800">{product}</h3>
        <p className="text-gray-600 mt-2">{comment}</p>
      </div>
      <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
        <p>{date}</p>
      </div>
    </div>
  );
};

export default Review;
