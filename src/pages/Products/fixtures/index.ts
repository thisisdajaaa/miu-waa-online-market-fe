import type { IProduct } from "@/components/ProductCard/types";

import type { ProductForm } from "../types";

export const mockProducts: IProduct[] = [
  {
    id: 1,
    title: "Product 1",
    price: 100,
    category: "Electronics",
    rating: 5,
    description: "This is a description for product 1.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
  {
    id: 2,
    title: "Product 2",
    price: 100,
    category: "Electronics",
    rating: 5,
    description: "This is a description for product 2.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
  {
    id: 3,
    title: "Product 1",
    price: 100,
    category: "Electronics",
    rating: 5,
    description: "This is a description for product 1.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
  {
    id: 4,
    title: "Product 2",
    price: 100,
    category: "Electronics",
    rating: 5,
    description: "This is a description for product 2.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
  {
    id: 5,
    title: "Product 1",
    price: 100,
    category: "Electronics",
    rating: 5,
    description: "This is a description for product 1.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
  {
    id: 6,
    title: "Product 2",
    price: 100,
    category: "Electronics",
    rating: 5,
    description: "This is a description for product 2.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
  {
    id: 7,
    title: "Product 1",
    price: 100,
    category: "Electronics",
    rating: 5,
    description: "This is a description for product 1.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
  {
    id: 8,
    title: "Product 2",
    price: 100,
    category: "Electronics",
    rating: 5,
    description: "This is a description for product 2.",
    imageUrl:
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
];

export const initialProductForm: ProductForm = {
  details: {
    name: "",
    description: "",
    quantity: 0,
    category: "",
    price: 0,
    image: null,
  },
  filters: {
    name: "",
    category: "",
    price: 0,
    rating: 0,
  },
  mode: "add",
};
