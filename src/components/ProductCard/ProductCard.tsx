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
    quantity,
    showBtnBasket = true,
    onEdit,
    onDelete,
    onApprove,
    onReject,
    isDeletable = false,
    isOutOfStock = false,
  } = props;

  const dispatch = useAppDispatch();
  const products = useAppSelector(selectors.products);
  const buyerDetails = useAppSelector(selectors.buyerDetails);

  const payload: IProduct = {
    id,
    title,
    price,
    category,
    description,
    imageUrl,
    rating,
    quantity,
  };

  const productInCart = products.find((item) => item.id === id);
  const quantityInCart = productInCart ? productInCart.quantity : 0;

  const handleAddToCart = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(
      actions.callAddToBasket(
        buyerDetails.id,
        buyerDetails.shoppingCart.id,
        payload as IProduct
      )
    );
  };

  const handleRemoveFromCart = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(
      actions.callRemoveFromBasket(
        buyerDetails.id,
        productInCart?.lineItem as number
      )
    );
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
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-96 object-cover"
          />
        </figure>
        <div className="card-body h-72">
          <h4 className="text-xl font-bold">{title}</h4>
          <div className="flex">
            {Array(rating)
              .fill(rating)
              .map((_, i) => (
                <BsStarFill key={i} className="h-5 text-yellow-500" />
              ))}
          </div>
          <p className="text-xs my-2 line-clamp-1">{description}</p>
          <p className="font-semibold">${price.toFixed(2)}</p>
          <p className="text-xs mb-5">
            <span className="font-semibold">Stock:</span> {quantity || 0}
          </p>

          {isOutOfStock && (
            <p className="text-red-600 font-semibold">Out of Stock</p>
          )}

          {showBtnBasket && (
            <>
              {quantityInCart > 0 ? (
                <div className="flex justify-between items-center gap-6">
                  <Button onClick={handleRemoveFromCart}>-</Button>
                  <span>{quantityInCart}</span>
                  <Button
                    onClick={handleAddToCart}
                    disabled={quantityInCart >= quantity}
                  >
                    +
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  className="mt-auto button"
                  disabled={quantity === 0}
                >
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
                  disabled={!isDeletable}
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
