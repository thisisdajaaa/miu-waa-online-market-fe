import { FC } from "react";
import { IoCard } from "react-icons/io5";

import clsxm from "@/utils/clsxmUtil";

import { statusColors } from "@/constants/order";

import type { OverviewSectionProps } from "./types";

const OverviewSection: FC<OverviewSectionProps> = (props) => {
  const { status } = props;

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
        <p>Test User</p>
        <p>N Fourth Street, Mr #26, Fairfield, IA 52557</p>
      </div>

      <div className="divider" />

      <div className="mb-4">
        <h6 className="font-bold">Billing Address</h6>
        <p>Test User</p>
        <p>N Fourth Street, Mr #26, Fairfield, IA 52557</p>
      </div>

      <div className="divider" />

      <div className="mb-4">
        <h6 className="font-bold">Payment method</h6>

        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <IoCard />
            <p>Ending in 7996</p>
          </div>

          <span>$40.20</span>
        </div>
      </div>

      <div className="divider" />

      <div className="mb-4 flex justify-between items-center">
        <h6 className="font-bold">Subtotal</h6>
        <p>$39.45</p>
      </div>

      <div className="divider" />

      <div className="mb-4 flex justify-between items-center">
        <h6 className="font-bold">Tax</h6>
        <p>$2.75</p>
      </div>

      <div className="divider" />

      <div className="mb-4 flex justify-between items-center">
        <h6 className="font-bold">Total</h6>
        <p className="text-lg font-bold">$42.20</p>
      </div>
    </div>
  );
};

export default OverviewSection;
