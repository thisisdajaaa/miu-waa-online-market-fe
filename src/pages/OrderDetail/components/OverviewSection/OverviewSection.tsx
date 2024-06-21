import { FC } from "react";
import { IoCard } from "react-icons/io5";

import clsxm from "@/utils/clsxmUtil";

import { statusColors } from "@/constants/order";

import type { OverviewSectionProps } from "./types";

const OverviewSection: FC<OverviewSectionProps> = (props) => {
  const { status, details } = props;

  return (
    <div className="border rounded-lg shadow-md bg-white p-6">
      <div
        className={clsxm(
          "p-2 rounded-md w-fit flex items-center mb-4",
          statusColors[status]
        )}
      >
        <h5 className="text-xs font-bold">{status}</h5>
      </div>
      <div className="mb-4">
        <h6 className="font-bold">Shipping Address</h6>
        <p>{details?.buyer}</p>
        <p>{String(details?.shippingAddress)}</p>
      </div>

      <div className="divider" />

      <div className="mb-4">
        <h6 className="font-bold">Billing Address</h6>
        <p>{details?.buyer}</p>
        <p>{String(details?.billingAddress)}</p>
      </div>

      <div className="divider" />

      <div className="mb-4">
        <h6 className="font-bold">Payment method</h6>

        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <IoCard />
            <p>Ending in {details?.last4Digits}</p>
          </div>

          <span>${details?.totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="divider" />

      <div className="mb-4 flex justify-between items-center">
        <h6 className="font-bold">Total</h6>
        <p className="text-lg font-bold">${details?.totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OverviewSection;
