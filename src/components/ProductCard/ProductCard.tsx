import { FC, MouseEvent } from "react";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/hooks";

import Button from "@/components/Button";

import { actions, selectors } from "@/redux/cart";

import type { IProduct, ProductCardProps } from "./types";

const ProductCard: FC<ProductCardProps> = (props) => {
  const {
    id,
    title,
    price,
    category,
    description,
    imageUrl,
    rating,
    showBtnBasket = true,
    onEdit,
    onDelete,
    onApprove,
    onReject,
  } = props;

  const dispatch = useAppDispatch();
  const products = useAppSelector(selectors.products);

  const payload: IProduct = {
    id,
    title,
    price,
    category,
    description,
    imageUrl,
    rating,
  };

  const productInCart = products.find((item) => item.id === id);
  const quantityInCart = productInCart ? productInCart.quantity : 0;

  const handleAddToCart = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(actions.callAddToBasket(payload));
  };

  const handleRemoveFromCart = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(actions.callRemoveToBasket(id));
  };

  const handleEdit = (event: MouseEvent) => {
    event.preventDefault();
    if (onEdit) onEdit(payload);
  };

  const handleApprove = (event: MouseEvent) => {
    event.preventDefault();
    if (onApprove) onApprove(id);
  };

  const handleReject = (event: MouseEvent) => {
    event.preventDefault();
    if (onReject) onReject(id);
  };

  const handleDelete = (event: MouseEvent) => {
    event.preventDefault();
    if (onDelete) onDelete(id);
  };

  return (
    <Link to={`/products/${id}`} state={{ product: payload }}>
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
          <div className="mb-5">${price.toFixed(2)}</div>

          {showBtnBasket && (
            <>
              {quantityInCart > 0 ? (
                <div className="flex justify-between items-center gap-6">
                  <Button onClick={handleRemoveFromCart}>-</Button>
                  <span>{quantityInCart}</span>
                  <Button onClick={handleAddToCart}>+</Button>
                </div>
              ) : (
                <Button onClick={handleAddToCart} className="mt-auto button">
                  Add to basket
                </Button>
              )}
            </>
          )}

          {!showBtnBasket && (
            <div className="flex justify-between">
              {onEdit && (
                <Button className="mt-auto" variant="info" onClick={handleEdit}>
                  Edit
                </Button>
              )}

              {onApprove && (
                <Button
                  className="mt-auto"
                  variant="primary"
                  onClick={handleApprove}
                >
                  Approve
                </Button>
              )}

              {onReject && (
                <Button
                  className="mt-auto"
                  variant="danger"
                  onClick={handleReject}
                >
                  Reject
                </Button>
              )}

              {onDelete && (
                <Button
                  className="mt-auto"
                  variant="danger"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
