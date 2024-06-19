import faker from "faker";

import type { ProductCardProps } from "@/components/ProductCard/types";
import { IReview, ReviewProps } from "@/components/Review/types";

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

export const mockProducts: ProductCardProps[] = [
  {
    title: "Product 1",
    price: "$100.00",
    category: "electronics",
    description: "This is a description for product 1.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
  {
    title: "Product 2",
    price: "$200.00",
    category: "electronics",
    description: "This is a description for product 2.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
  {
    title: "Product 3",
    price: "$300.00",
    category: "electronics",
    description: "This is a description for product 3.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
  {
    title: "Product 4",
    price: "$400.00",
    category: "electronics",
    description: "This is a description for product 4.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
  {
    title: "Product 5",
    price: "$500.00",
    category: "electronics",
    description: "This is a description for product 5.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
  {
    title: "Product 6",
    price: "$600.00",
    category: "electronics",
    description: "This is a description for product 6.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
  {
    title: "Product 7",
    price: "$700.00",
    category: "electronics",
    description: "This is a description for product 7.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
  {
    title: "Product 8",
    price: "$800.00",
    category: "electronics",
    description: "This is a description for product 8.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
];

export const mockReviews: IReview[] = [
  {
    id: 1,
    product: "Product 1",
    title: "Great product!",
    comment: "This is a great product. I love it!",
    rating: 4,
    date: "2021-09-01",
    buyer:"John Doe",
  },
  {
    id: 2,
    product: "Product 2",
    title: "Fabulous product!",
    comment: "This is a fabulous product. I love it!",
    rating: 3,
    date: "2022-08-01",
    buyer:"Jane Doe",
  },

  {
    id:3,
    product: "Product 3",
    title: "Amazing product!",
    comment: "This is an amazing product. I love it!",
    rating: 3,
    date: "2022-08-01",
    buyer:"Jane Doe",
  },
];