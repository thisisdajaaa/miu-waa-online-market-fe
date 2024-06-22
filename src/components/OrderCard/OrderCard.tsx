import React, { ChangeEvent, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { BiSquare } from "react-icons/bi";

import { onParseResponse } from "@/utils/axiosUtil";
import clsxm from "@/utils/clsxmUtil";

import { orderStatusList, statusColors } from "@/constants/order";

import { updateOrderStatusAPI, cancelOrderAPI } from "@/services/order";

import type { OrderStatus } from "@/types/server/order";

import type { OrderCardProps } from "./types";
import Button from "../Button";
import Select from "../Select";

const OrderCard: React.FC<OrderCardProps> = (props) => {
  const {
    id,
    orderNumber,
    deliveryDate,
    onViewDetails,
    productImages,
    showOrderStatusSelect = true,
    orderStatus,
    shippingAddress,
    handleLoad,
  } = props;

  const [status, setStatus] = useState<OrderStatus>(orderStatus as OrderStatus);
  const isOrderCancellable = status === ("PLACED" as OrderStatus);

  const onGenerateReceipt = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await onParseResponse<any>({
      method: "get",
      url: `/orders/receipt/${id}`,
      responseType: "blob",
    });
    if (response.size === 0) {
      toast.error("Failed to generate receipt");
      return;
    }
    window.open(URL.createObjectURL(response));
  };

  const handleChangeStatus = useCallback(
    async (e: ChangeEvent<HTMLSelectElement>) => {
      setStatus(e.target.value as OrderStatus);
      await updateOrderStatusAPI(id, e.target.value as OrderStatus);
    },
    [id]
  );

  const handleCancelOrder = useCallback(async (orderId: number) => {
    setStatus("CANCELED" as OrderStatus);
    try {
      await cancelOrderAPI(orderId);
      handleLoad();
      toast.success("Order cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel order");
    }
  }, []);

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
              onChange={handleChangeStatus}
            />
          )}

          <Button onClick={onGenerateReceipt} variant="info">
            Generate Receipt
          </Button>

          {!showOrderStatusSelect && isOrderCancellable && (
            <Button onClick={() => handleCancelOrder(id)} variant="danger">
              Cancel Order
            </Button>
          )}

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
              <p className="font-semibold">Shipping Address:</p>
              <p>{shippingAddress}</p>
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
