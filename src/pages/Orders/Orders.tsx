import { FC, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { orderStatusList } from "@/constants/order";
import { AUTHENTICATED_URLS } from "@/constants/pageUrl";

import Input from "@/components/Input";
import OrderCard from "@/components/OrderCard";
import Select from "@/components/Select";
import { mockOrders } from "../Home/fixtures";

const OrdersPage: FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(mockOrders);

  useEffect(() => {
    //fetch orders here
    //setOrders(orders);
  });

  //Fetch if user is buyer or seller
  const isBuyer = true;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        <Input
          label="Order Number"
          rightIcon={<BiSearch />}
          placeholder="Search Order Number"
        />
        <Select options={orderStatusList} label="Order Status" />
      </div>

      <div className="mt-12">
        {orders.map((order) => (
          <OrderCard
            id={order.id}
            orderNumber={order.orderNumber}
            deliveryDate={order.deliveryDate}
            soldBy={order.soldBy}
            productImages={order.productImages}
            showOrderStatusSelect={!isBuyer}
            orderStatus={order.orderStatus}
            onViewDetails={() =>
              navigate(`${AUTHENTICATED_URLS.ORDERS}/${order.orderNumber}`, {
                state: { orderItems: order.orderItems },
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
