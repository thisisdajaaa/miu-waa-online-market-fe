import { FC, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/hooks";

import { AUTHENTICATED_URLS } from "@/constants/pageUrl";

import Input from "@/components/Input";
import OrderCard from "@/components/OrderCard";
import Select from "@/components/Select";

import { selectors } from "@/redux/authentication";

import { getBuyerOrdersAPI, getSellerOrdersAPI } from "@/services/order";

import type {
  OrderDetailResponse,
  OrderRequest,
  OrdersResponse,
} from "@/types/server/order";

const OrdersPage: FC = () => {
  const userDetails = useAppSelector(selectors.userDetails);
  const isBuyer = userDetails.role == "BUYER";

  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrdersResponse>([]);

  const handleLoadBuyerOrders = useCallback(async () => {
    try {
      const response = await getBuyerOrdersAPI(userDetails.id);
      console.log("I AM AT BUYER RESPONSE " + response);
      setOrders(response);
    } catch (error) {
      toast.error("Failed to fetch Orders!");
    }
  }, [userDetails.id]);

  const handleLoadSellerOrders = useCallback(async () => {
    try {
      const response = await getSellerOrdersAPI(userDetails.id);
      console.log("I AM AT SELLER RESPONSE " + response);
      setOrders(response);
    } catch (error) {
      toast.error("Failed to fetch Orders!");
    }
  }, [userDetails.id]);

  useEffect(() => {
    if (isBuyer) {
      handleLoadBuyerOrders();
    } else {
      handleLoadSellerOrders();
    }
  }, [handleLoadBuyerOrders, handleLoadSellerOrders, isBuyer]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        {/* <Input
          label="Order Number"
          rightIcon={<BiSearch />}
          placeholder="Search Order Number"
        /> */}
        {/* <Select options={orderStatusList} label="Order Status" defaultValue={}/> */}
      </div>

      <div className="mt-12">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            id={order.id}
            orderNumber={order.id.toString()}
            deliveryDate={order?.orderDate?.toString()}
            showOrderStatusSelect={!isBuyer}
            orderStatus={order.status}
            productImages={order?.orderItems?.map(
              (item) => item.product.base64Image
            )}
            onViewDetails={() =>
              navigate(`${AUTHENTICATED_URLS.ORDERS}/${order.id}`)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
