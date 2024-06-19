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
