import { FC, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { orderStatusList } from "@/constants/order";
import { AUTHENTICATED_URLS } from "@/constants/pageUrl";

import Input from "@/components/Input";
import OrderCard from "@/components/OrderCard";
import Select from "@/components/Select";
import { getBuyerOrdersAPI, getSellerOrdersAPI } from "@/services/order";
import toast from "react-hot-toast";
import type { OrderRequest } from "@/types/server/order";
import { useAppSelector } from "@/hooks";
import { selectors } from "@/redux/authentication";

const OrdersPage: FC = () => {
  console.log("I AM AT ORDERS");
  const userDetails = useAppSelector(selectors.userDetails);
  let isBuyer = false;

  if (userDetails.role == "BUYER") {
    isBuyer = true;
  }
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderRequest[]>([]);

  const handleLoadBuyerOrders = async () => {
    try {
      const response = await getBuyerOrdersAPI(userDetails.id);
      console.log("I AM AT BUYER RESPONSE " + response);
      setOrders(response);
    } catch (error) {
      toast.error("Failed to fetch Orders!");
    }
  };

  const handleLoadSellerOrders = async () => {
    try {
      const response = await getSellerOrdersAPI(userDetails.id);
      console.log("I AM AT SELLER RESPONSE " + response);
      setOrders(response);
    } catch (error) {
      toast.error("Failed to fetch Orders!");
    }
  };

  useEffect(() => {
    if (isBuyer) {
      handleLoadBuyerOrders();
    } else {
      handleLoadSellerOrders();
    }
  }, []);

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
            id={order.id}
            orderNumber={order.id.toString()}
            deliveryDate={order.orderDate.toString()}
            showOrderStatusSelect={!isBuyer}
            orderStatus={order.status}
            productImages={order.orderItems.map(
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
