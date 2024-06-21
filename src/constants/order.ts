import type { Option } from "@/types/client";

export const orderStatusList: Option[] = [
  { label: "Canceled", value: "CANCELED" },
  { label: "Placed", value: "PLACED" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "On The Way", value: "ON_THE_WAY" },
  { label: "Delivered", value: "DELIVERED" },
];

export const statusColors = {
  CANCELED: "bg-red-500 text-white",
  PLACED: "bg-gray-500 text-white",
  SHIPPED: "bg-blue-500 text-white",
  ON_THE_WAY: "bg-yellow-500 text-black",
  DELIVERED: "bg-green-500 text-white",
};
