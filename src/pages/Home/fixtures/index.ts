import faker from "faker";

import type { IProduct } from "@/components/ProductCard/types";
import type { IReview } from "@/components/Review/types";
import type { OrderCard, OrderItem } from "@/components/OrderCard/types";

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

export const mockProducts: IProduct[] = [
  {
    id: 1,
    title: "Product 1",
    price: 100,
    category: "electronics",
    description:
      "This is a description for product 1. This is a description for product 1. This is a description for product 1. This is a description for product 1.",
    rating: 5,
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    quantity: 4,
  },
  {
    id: 2,
    title: "Product 2",
    price: 100,
    category: "electronics",
    rating: 5,
    description: "This is a description for product 2.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    quantity: 4,
  },
  {
    id: 3,
    title: "Product 3",
    price: 100,
    category: "electronics",
    description: "This is a description for product 3.",
    rating: 5,
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    quantity: 4,
  },
  {
    id: 4,
    title: "Product 4",
    price: 100,
    category: "electronics",
    description: "This is a description for product 4.",
    rating: 5,
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    quantity: 4,
  },
  {
    id: 5,
    title: "Product 5",
    price: 100,
    category: "electronics",
    description: "This is a description for product 5.",
    rating: 5,
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    quantity: 4,
  },
  {
    id: 6,
    title: "Product 6",
    price: 100,
    category: "electronics",
    description: "This is a description for product 6.",
    rating: 5,
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    quantity: 4,
  },
  {
    id: 7,
    title: "Product 7",
    price: 100,
    category: "electronics",
    description: "This is a description for product 7.",
    rating: 5,
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    quantity: 4,
  },
  {
    id: 8,
    title: "Product 8",
    price: 100,
    category: "electronics",
    description: "This is a description for product 8.",
    rating: 5,
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    quantity: 4,
  },
];

export const mockReviews: IReview[] = [
  {
    id: 1,
    product: "Product 1",
    content: "This is a great product. I love it!",
    rating: 4,
    date: "2021-09-01",
    buyer: "John Doe",
    isFlagged: false,
    comment: "Lala",
  },
  {
    id: 2,
    product: "Product 2",
    content: "Fabulous product!",
    comment: "This is a fabulous product. I love it!",
    rating: 3,
    date: "2022-08-01",
    buyer: "Jane Doe",
    isFlagged: false,
  },

  {
    id: 3,
    product: "Product 3",
    content: "Amazing product!",
    comment: "This is an amazing product. I love it!",
    rating: 3,
    date: "2022-08-01",
    buyer: "Jane Doe",
    isFlagged: false,
  },
];

export const mockOrders: OrderCard[] = [
  {
    orderNumber: "123456",
    deliveryDate: "2023-04-01",
    soldBy: "Company A",
    productImages: ["https://picsum.photos/id/237/200/300"],
    showOrderStatusSelect: true,
    orderStatus: "Delivered",
    orderItems: [
      {
        quantity: 1,
        name: "Product 1",
        price: 100,
        image: "https://picsum.photos/id/237/200/300",
      },
      {
        quantity: 3,
        name: "Product 2",
        price: 100,
        image: "https://picsum.photos/id/237/200/300",
      },
    ],
  },
  {
    orderNumber: "789012",
    deliveryDate: "2023-05-15",
    soldBy: "Company B",
    productImages: ["https://picsum.photos/id/237/200/300"],
    showOrderStatusSelect: false,
    orderStatus: "Placed",
    orderItems: [
      {
        quantity: 1,
        name: "Product 1",
        price: 100,
        image: "https://picsum.photos/id/237/200/300",
      },
      {
        quantity: 3,
        name: "Product 2",
        price: 100,
        image: "https://picsum.photos/id/237/200/300",
      },
    ],
  },
  {
    orderNumber: "345678",
    deliveryDate: "2023-06-20",
    soldBy: "Company C",
    productImages: ["https://picsum.photos/id/237/200/300"],
    orderStatus: "Shipped",
    orderItems: [
      {
        quantity: 1,
        name: "Product 1",
        price: 100,
        image: "https://picsum.photos/id/237/200/300",
      },
      {
        quantity: 3,
        name: "Product 2",
        price: 100,
        image: "https://picsum.photos/id/237/200/300",
      },
    ],
  },
];
