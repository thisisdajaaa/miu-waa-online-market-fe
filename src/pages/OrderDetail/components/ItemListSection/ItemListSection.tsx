import { FC } from "react";
import { BiSquare } from "react-icons/bi";

import clsxm from "@/utils/clsxmUtil";

import { statusColors } from "@/constants/order";

import Button from "@/components/Button";

import type { ItemListSectionProps } from "./types";

const ItemListSection: FC<ItemListSectionProps> = (props) => {
  const { status } = props;

  const isBuyer = true;

  return (
    <div className="col-span-2 border rounded-lg shadow-md bg-white p-6">
      <div className="flex items-center mb-6">
        <div className={clsxm("rounded-full p-2", statusColors[status])}>
          <BiSquare />
        </div>
        <div className="ml-4">
          <div className="text-lg font-semibold">{status} on Feb 23</div>
          <div className="text-sm text-gray-500">
            Sold and shipped by <span className="text-blue-500">TEST USER</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5 className="text-lg font-bold">2 items</h5>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center pt-4">
          <img
            src="https://via.placeholder.com/60"
            alt="Product Image"
            className="w-16 h-16 object-cover rounded-lg mr-4"
          />
          <div className="flex-grow">
            <h6 className="font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
              ut?
            </h6>
            <p className="text-gray-500">Qty 1</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">$17.52</p>
          </div>
        </div>

        {isBuyer && (
          <div className="mt-2 self-end flex gap-2">
            <Button variant="primary">Write a review</Button>
            <Button variant="secondary">Add to cart</Button>
          </div>
        )}
      </div>

      <div className="divider" />

      <div className="flex flex-col">
        <div className="flex items-center pt-4">
          <img
            src="https://via.placeholder.com/60"
            alt="Product Image"
            className="w-16 h-16 object-cover rounded-lg mr-4"
          />
          <div className="flex-grow">
            <h6 className="font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
              ut?
            </h6>
            <p className="text-gray-500">Qty 1</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">$17.52</p>
          </div>
        </div>

        {isBuyer && (
          <div className="mt-2 self-end flex gap-2">
            <Button variant="primary">Write a review</Button>
            <Button variant="secondary">Add to cart</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemListSection;
