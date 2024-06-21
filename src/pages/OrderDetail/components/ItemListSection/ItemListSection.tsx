import { FC } from "react";
import { BiSquare } from "react-icons/bi";

import clsxm from "@/utils/clsxmUtil";
import { getImageUrl } from "@/utils/imageUtil";
import { useAppSelector } from "@/hooks";

import { statusColors } from "@/constants/order";

import Button from "@/components/Button";

import { selectors } from "@/redux/authentication";

import type { ItemListSectionProps } from "./types";

const ItemListSection: FC<ItemListSectionProps> = (props) => {
  const { orderDetails, status, seller, showReviewModal } = props;

  const userDetails = useAppSelector(selectors.userDetails);
  const isBuyer = userDetails.role === "BUYER";

  return (
    <div className="col-span-2 border rounded-lg shadow-md bg-white p-6">
      <div className="flex items-center mb-6">
        <div className={clsxm("rounded-full p-2", statusColors[status])}>
          <BiSquare />
        </div>
        <div className="ml-4">
          <div className="text-lg font-semibold">{status} on Feb 23</div>
          <div className="text-sm text-gray-500">
            Sold and shipped by <span className="text-blue-500">{seller}</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5 className="text-lg font-bold">{orderDetails?.length} items</h5>
      </div>

      <div className="flex flex-col">
        {orderDetails &&
          orderDetails?.map((details) => (
            <div className="flex flex-col gap-4" key={details.id}>
              <div className="flex items-center pt-4">
                <img
                  src={getImageUrl(details.product.base64Image)}
                  alt="Product Image"
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <div className="flex-grow">
                  <h6 className="font-semibold">{details.product.name}</h6>
                  <p className="text-gray-500">Qty {details.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">
                    ${(details.quantity * details.product.price).toFixed(2)}
                  </p>
                </div>
              </div>

              {isBuyer && (
                <div className="mt-2 self-end flex gap-2">
                  <Button
                    variant="primary"
                    onClick={() =>
                      showReviewModal(details.product.id, details.product.name)
                    }
                  >
                    Write a review
                  </Button>
                </div>
              )}
            </div>
          ))}
      </div>

      <div className="divider" />
    </div>
  );
};

export default ItemListSection;
