import { onParseResponse } from "@/utils/axiosUtil";

import type { ProductForm } from "@/pages/Products/types";

import { ProductDetailResponse } from "@/types/server/product";

export const getProductsAPI = async (
  filters?: Record<string, string>
): Promise<ProductDetailResponse[]> => {
  const queryParams: URLSearchParams = new URLSearchParams(filters);

  const response = await onParseResponse<ProductDetailResponse[]>({
    method: "get",
    url: "/products",
    params: queryParams,
  });

  return response;
};

export const getProductsBySellerAPI = async (
  sellerId: number,
  filters?: Record<string, string>
): Promise<ProductDetailResponse[]> => {
  const queryParams: URLSearchParams = new URLSearchParams(filters);

  const response = await onParseResponse<ProductDetailResponse[]>({
    method: "get",
    url: `/products/seller/${sellerId}`,
    params: queryParams,
  });

  return response;
};

export const addProductAPI = async (
  sellerId: number,
  product: ProductForm
): Promise<ProductDetailResponse> => {
  const formData = new FormData();

  formData.append(
    "product",
    new Blob(
      [
        JSON.stringify({
          name: product.details.name,
          description: product.details.description,
          price: product.details.price,
          category: product.details.category,
          stockQuantity: product.details.quantity,
          isInStock: true,
        }),
      ],
      {
        type: "application/json",
      }
    )
  );

  if (product.details.image) {
    formData.append("file", product.details.image as Blob);
  }

  const response = await onParseResponse<ProductDetailResponse>({
    method: "post",
    url: `/products/sellers/${sellerId}`,
    data: formData,
  });

  return response;
};

export const updateProductAPI = async (id: number, product: ProductForm) => {
  const formData = new FormData();

  formData.append(
    "product",
    new Blob(
      [
        JSON.stringify({
          name: product.details.name,
          description: product.details.description,
          price: product.details.price,
          category: product.details.category,
          stockQuantity: product.details.quantity,
          isInStock: true,
        }),
      ],
      {
        type: "application/json",
      }
    )
  );

  if (product.details.image && product.details.image instanceof File) {
    formData.append("file", product.details.image as Blob);
  }

  const response = await onParseResponse({
    method: "put",
    url: `/products/${id}`,
    data: formData,
  });

  return response;
};

export const getProductByIdAPI = async (
  id: number
): Promise<ProductDetailResponse> => {
  const response = await onParseResponse<ProductDetailResponse>({
    method: "get",
    url: `/products/getSingleProduct/${id}`,
  });

  return response;
};

export const deleteProductAPI = async (id: number): Promise<unknown> => {
  const response = await onParseResponse<unknown>({
    method: "delete",
    url: `/products/${id}`,
  });

  return response;
};
