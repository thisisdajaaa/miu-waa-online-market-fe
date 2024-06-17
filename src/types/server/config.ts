export type PageItem = {
  page: number;
  limit: number;
};

export type Pagination = {
  next?: PageItem;
  prev?: PageItem;
};

export type ApiResponse<T> = {
  data?: T;
  success: boolean;
  count?: number;
  pagination?: Pagination;
  message?: string;
  errors?: { [key: string]: string };
  stack?: string;
  status?: number;
};
