import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { FC } from "react";
import { Pie } from "react-chartjs-2";

import clsxm from "@/utils/clsxmUtil";

import type { PieChartProps } from "./types";

ChartJS.register(ArcElement, CategoryScale, Legend, Tooltip, Title);

const PieChart: FC<PieChartProps> = (props) => {
  const { data, containerClassname } = props;

  return (
    <div className={clsxm("w-full h-full", containerClassname)}>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
