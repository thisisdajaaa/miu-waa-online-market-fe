import { FC, useState } from "react";
import { BiSquare } from "react-icons/bi";
import { IoCard } from "react-icons/io5";
import { useParams } from "react-router-dom";

import clsxm from "@/utils/clsxmUtil";

import { orderStatusList, statusColors } from "@/constants/order";

import Select from "@/components/Select";

import type { OrderStatus } from "@/types/server/order";

const OrderDetailPage: FC = () => {
  const { id } = useParams();

  const [status, setStatus] = useState<OrderStatus>("Delivered");

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex text-2xl gap-3 ">
          <h3 className="font-bold">Feb 17, 2024 order</h3>
          <span>|</span>
          <h4>Order# {id}</h4>
        </div>

        <Select
          options={orderStatusList}
          value={status}
          onChange={(e) => setStatus(e.target.value as OrderStatus)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2 border rounded-lg shadow-md bg-white p-6">
          <div className="flex items-center mb-6">
            <div className={clsxm("rounded-full p-2", statusColors[status])}>
              <BiSquare />
            </div>
            <div className="ml-4">
              <div className="text-lg font-semibold">{status} on Feb 23</div>
              <div className="text-sm text-gray-500">
                Sold and shipped by{" "}
                <span className="text-blue-500">TEST USER</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h5 className="text-lg font-bold">1 item</h5>
          </div>

          <div className="flex items-center border-t pt-4">
            <img
              src="https://via.placeholder.com/60"
              alt="Product Image"
              className="w-16 h-16 object-cover rounded-lg mr-4"
            />
            <div className="flex-grow">
              <h6 className="font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorem, ut?
              </h6>
              <p className="text-gray-500">Qty 1</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">$17.52</p>
            </div>
          </div>

          <div className="divider" />

          <div className="flex items-center pt-4">
            <img
              src="https://via.placeholder.com/60"
              alt="Product Image"
              className="w-16 h-16 object-cover rounded-lg mr-4"
            />
            <div className="flex-grow">
              <h6 className="font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorem, ut?
              </h6>
              <p className="text-gray-500">Qty 1</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">$17.52</p>
            </div>
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default OrderDetailPage;
