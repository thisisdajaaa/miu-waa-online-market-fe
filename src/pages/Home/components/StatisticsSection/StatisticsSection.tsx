import { FC } from "react";

import Card from "@/components/Card";
import LineChart from "@/components/LineChart";
import PieChart from "@/components/PieChart";

import { mockDatasets, mockLabels, orderStatusData } from "../../fixtures";

const StatisticsSection: FC = () => {
  return (
    <section>
      <h2 className="font-bold">Statistics</h2>
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4 xl:grid-rows-2">
        <Card
          title="Today's Sales"
          containerClassname="lg:col-span-2 xl:row-span-2"
        >
          <div className="w-full h-full">
            <p className="text-primary font-semibold text-xl">$400.00</p>
            <div className="h-[25rem]">
              <LineChart labels={mockLabels} datasets={mockDatasets} />
            </div>
          </div>
        </Card>
        <Card
          title="Order Status Breakdown"
          containerClassname="lg:col-span-2 xl:row-span-2"
        >
          <div className="w-full h-full ">
            <div className="h-[25rem]">
              <PieChart
                data={orderStatusData}
                containerClassname="flex justify-center items-center"
              />
            </div>
          </div>
        </Card>

        <Card title="Open Orders">
          <p className="text-primary font-semibold text-xl">3</p>
        </Card>
        <Card title="Closed Orders">
          <p className="text-primary font-semibold text-xl">12</p>
        </Card>
        <Card title="Cancelled Orders">
          <p className="text-primary font-semibold text-xl">3</p>
        </Card>
        <Card title="Total Balance">
          <p className="text-primary font-semibold text-xl">$3,000.00</p>
        </Card>
      </div>
    </section>
  );
};

export default StatisticsSection;
