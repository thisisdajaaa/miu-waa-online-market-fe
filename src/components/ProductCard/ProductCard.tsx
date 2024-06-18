import { FC, useState } from "react";
import { BsStarFill } from "react-icons/bs";

import { MAX_RATING, MIN_RATING } from "@/constants/rating";

import Button from "@/components/Button";

import type { ProductCardProps } from "./types";

const ProductCard: FC<ProductCardProps> = (props) => {
  const {
    title,
    price,
    category,
    description,
    imageUrl,
    showBtnBasket = true,
  } = props;
  const [rating] = useState<number>(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  return (
    <div className="card w-full bg-base-100 shadow-xl hover:-translate-y-1 cursor-pointer transition duration-200">
      <figure>
        <p className="absolute top-2 right-2 text-xs italic text-white bg-primary px-4 py-1 rounded-lg uppercase">
          {category}
        </p>
        <img src={imageUrl} alt={title} className="w-full" />
      </figure>
      <div className="card-body p">
        <h4 className="text-xl">{title}</h4>
        <div className="flex">
          {Array(rating)
            .fill(rating)
            .map((_, i) => (
              <BsStarFill key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-2">{description}</p>
        <div className="mb-5">{price}</div>

        {showBtnBasket && (
          <Button className="mt-auto button">Add to basket</Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
