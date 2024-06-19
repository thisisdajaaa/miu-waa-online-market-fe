import { Option } from "@/types/client";

export const MIN_RATING = 1;
export const MAX_RATING = 5;

export const ratingList: Option[] = Array.from(
  { length: 5 },
  (_, i) => i + 1
).map((item) => ({ label: String(item), value: String(item) }));
