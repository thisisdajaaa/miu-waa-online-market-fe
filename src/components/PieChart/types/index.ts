import { ChartData } from "chart.js";

export type PieChartProps = {
  data: ChartData<"pie">;
  containerClassname?: string;
};
