import { FC, useState } from "react";
import { useParams } from "react-router-dom";

import { orderStatusList } from "@/constants/order";

import Select from "@/components/Select";

import type { OrderStatus } from "@/types/server/order";

import ItemListSection from "./components/ItemListSection";
import OverviewSection from "./components/OverviewSection";

const OrderDetailPage: FC = () => {
  const { id } = useParams();

  const [status, setStatus] = useState<OrderStatus>("Delivered");

  const isBuyer = true;

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex text-2xl gap-3 ">
          <h3 className="font-bold">Feb 17, 2024 order</h3>
          <span>|</span>
          <h4>Order# {id}</h4>
        </div>

        {!isBuyer && (
          <Select
            options={orderStatusList}
            value={status}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ItemListSection status={status} />

        <OverviewSection status={status} />
      </div>
    </div>
  );
};

export default OrderDetailPage;
