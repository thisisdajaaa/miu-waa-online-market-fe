import type { Option } from "@/types/client";

export const orderStatusList: Option[] = [
  { label: "Cancelled", value: "CANCELED" },
  { label: "Placed", value: "PLACED" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "On The Way", value: "ON_THE_WAY" },
  { label: "Delivered", value: "DELIVERED" },
];

export const statusColors = {
  Cancelled: "bg-red-500 text-white",
  Placed: "bg-gray-500 text-white",
  Shipped: "bg-blue-500 text-white",
  "On The Way": "bg-yellow-500 text-black",
  Delivered: "bg-green-500 text-white",
};
