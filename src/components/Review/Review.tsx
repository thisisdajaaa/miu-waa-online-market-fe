import { FC } from "react";
import type { ReviewProps } from "./types";
import Button from "../Button";

const Review: FC<ReviewProps> = (props) => {
  const { id, product, title, comment, rating, date, buyer, onDelete } = props;

  return (
    <div className="card w-full bg-base-100 shadow-xl m-3">
      <figure>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <input
              key={value}
              disabled
              className={`mask mask-star-2 ${
                value <= rating ? "bg-orange-400" : "bg-gray-400"
              }`}
            ></input>
          ))}
        </div>
      </figure>
      <div>
        <h2 className="text-center text-xl">{product}</h2>
      </div>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{comment}</p>
      </div>
      <div className="card-body flex items-center flex-row justify-between">
        <div>
          <p>{buyer}</p>
          <p>{date}</p>
        </div>
        <div>
          <Button variant="danger" onClick={() => onDelete(id)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Review;
