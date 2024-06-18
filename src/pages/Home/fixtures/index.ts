import faker from "faker";

export const mockLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

export const mockDatasets = [
  {
    label: "",
    data: mockLabels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
];

export const orderStatusData = {
  labels: ["Pending", "Processing", "Shipped", "Delivered", "Canceled"],
  datasets: [
    {
      data: [10, 15, 5, 50, 5],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#F7464A"],
      hoverBackgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#F7464A",
      ],
    },
  ],
};
