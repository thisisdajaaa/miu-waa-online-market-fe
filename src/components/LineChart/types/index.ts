import { ChartDataset } from "chart.js";

export type LineChartProps = {
  labels: string[];
  datasets: ChartDataset<"line", number[]>[];
};
