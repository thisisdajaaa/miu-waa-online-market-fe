import { FC } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { orderStatusList } from "@/constants/order";
import { AUTHENTICATED_URLS } from "@/constants/pageUrl";

import Input from "@/components/Input";
import OrderCard from "@/components/OrderCard";
import Select from "@/components/Select";

const OrdersPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        <Input label="Order ID" rightIcon={<BiSearch />} />
        <Select options={orderStatusList} label="Order Status" />
      </div>

      <div className="mt-12">
        <OrderCard
          orderNumber="20001766502901"
          deliveryDate="Feb 23"
          soldBy="TEST USER"
          productImages={["https://picsum.photos/id/237/200/300"]}
          onViewDetails={() =>
            navigate(`${AUTHENTICATED_URLS.ORDERS}/20001766502901`)
          }
        />
        <OrderCard
          orderNumber="20001766502901"
          deliveryDate="Feb 23"
          soldBy="TEST USER"
          productImages={["https://picsum.photos/id/237/200/300"]}
          onViewDetails={() =>
            navigate(`${AUTHENTICATED_URLS.ORDERS}/20001766502901`)
          }
        />
        <OrderCard
          orderNumber="20001766502901"
          deliveryDate="Feb 23"
          soldBy="TEST USER"
          productImages={["https://picsum.photos/id/237/200/300"]}
          onViewDetails={() =>
            navigate(`${AUTHENTICATED_URLS.ORDERS}/20001766502901`)
          }
        />
      </div>
    </div>
  );
};

export default OrdersPage;
