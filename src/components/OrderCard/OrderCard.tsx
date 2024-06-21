import React, { useState } from "react";
import { BiSquare } from "react-icons/bi";

import clsxm from "@/utils/clsxmUtil";

import { orderStatusList, statusColors } from "@/constants/order";

import type { OrderStatus } from "@/types/server/order";

import type { OrderCardProps } from "./types";
import Button from "../Button";
import Select from "../Select";

import { onParseResponse } from "@/utils/axiosUtil";
import toast from "react-hot-toast";

const OrderCard: React.FC<OrderCardProps> = (props) => {
  const {
    id,
    orderNumber,
    deliveryDate,
    soldBy,
    onViewDetails,
    productImages,
    showOrderStatusSelect = true,
    orderStatus,
  } = props;

  const [status, setStatus] = useState<OrderStatus>(orderStatus as OrderStatus);

  const onGenerateReceipt = async () => {

    const response = await onParseResponse<any>({
      method: "get",
      url: `/orders/receipt/${id}`,
      responseType: 'blob'
    });
    if (response.size === 0) {
      toast.error("Failed to generate receipt");
      return;
    }
    window.open(URL.createObjectURL(response));
  };

  return (
    <div className="border rounded-lg shadow-md bg-white mb-4">
      <div
        className={clsxm(
          "p-4 flex justify-between items-center rounded-t-lg",
          statusColors[status]
        )}
      >
        <div className="text-sm">Order# {orderNumber}</div>
        <div className="flex gap-5 items-center">
          {showOrderStatusSelect && (
            <Select
              options={orderStatusList}
              value={status}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
            />
          )}

          <Button onClick={onGenerateReceipt} variant="info">
            Generate Receipt
          </Button>

          <Button onClick={onViewDetails} variant="ghost">
            View Details
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center">
          <div className={clsxm("rounded-full p-2", statusColors[status])}>
            <BiSquare />
          </div>
          <div className="ml-4">
            <div className="text-lg font-semibold">
              {status} on {deliveryDate}
            </div>
            <div className="text-sm text-gray-500">
              Shipping Address: <span className="text-blue-500">{soldBy}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          {productImages?.map((image, index) => (
            <img
              src={image}
              alt={`${image}-${index}`}
              className="w-16 h-16 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
