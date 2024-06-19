import type { Option } from "@/types/client";

export const statuses = [
  "Cancelled",
  "Placed",
  "Shipped",
  "On The Way",
  "Delivered",
];

export const orderStatusList: Option[] = statuses.map((item) => ({
  label: item,
  value: item,
}));

export const statusColors = {
  Cancelled: "bg-red-500 text-white",
  Placed: "bg-gray-500 text-white",
  Shipped: "bg-blue-500 text-white",
  "On The Way": "bg-yellow-500 text-black",
  Delivered: "bg-green-500 text-white",
};
