import { FormikContext, useFormik } from "formik";
import { debounce } from "lodash";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiSearch } from "react-icons/bi";
import { useLocation } from "react-router-dom";

import { getImageUrl } from "@/utils/imageUtil";
import { useAppSelector, useUpdateEffect } from "@/hooks";

import { categoryList } from "@/constants/category";
import { ratingList } from "@/constants/rating";

import Button from "@/components/Button";
import FormInput from "@/components/Formik/FormInput";
import FormSelect from "@/components/Formik/FormSelect";
import ProductCard from "@/components/ProductCard";
import type { IProduct } from "@/components/ProductCard/types";

import { selectors } from "@/redux/authentication";

import { deleteProductAPI, getProductsBySellerAPI } from "@/services/product";
import { addProductAPI, updateProductAPI } from "@/services/product";
import { getSellerDetailsAPI } from "@/services/user";

import { SellerDetailResponse } from "@/types/server/user";

import ProductFormModal from "./components/ProductFormModal";
import { initialFilters, initialProductForm } from "./fixtures";
import type { ProductForm } from "./types";
import { ProductFormValidationSchema } from "./validations";

const ProductsPage: FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [sellerDetails, setSellerDetails] =
    useState<SellerDetailResponse | null>(null);

  const location = useLocation();

  const sellerId: number = location?.state?.sellerId;

  console.log("sellerId: ", sellerId);

  const productFormModalRef = useRef<HTMLDialogElement | null>(null);

  const userDetails = useAppSelector(selectors.userDetails);
  const isBuyer = userDetails.role === "BUYER";

  const handleSubmit = async (values: ProductForm) => {
    const { mode } = values;
    const isAdd = mode === "add";

    try {
      if (isAdd) {
        await addProductAPI(userDetails.id, values);
        toast.success("Successfully added a product!");
      } else {
        await updateProductAPI(values.details.id, values);
        toast.success("Successfully edited a product!");
      }

      await handleLoad();
    } catch (error) {
      toast.error(`Failed to ${isAdd ? "add" : "edit"} the product`);
    }

    handleCloseProductFormModal();
  };

  const formikBag = useFormik<ProductForm>({
    initialValues: initialProductForm,
    validationSchema: ProductFormValidationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  const handleLoad = useCallback(async () => {
    try {
      const response = await getProductsBySellerAPI(
        sellerId || userDetails.id,
        {}
      );
      const sellerResponse = await getSellerDetailsAPI(
        sellerId || userDetails.id
      );

      const formattedResponse: IProduct[] = response.map((item) => ({
        id: item.id,
        title: item.name,
        category: item.category,
        description: item.description,
        imageUrl: getImageUrl(item.base64Image),
        price: item.price,
        rating: item.rating,
        quantity: item.stockQuantity,
        isOutOfStock: !item.inStock,
        isDeletable: item.isDeletable,
      }));

      setProducts(formattedResponse);
      setSellerDetails(sellerResponse);
    } catch (error) {
      toast.error("Failed to fetch products!");
    }
  }, [sellerId, userDetails.id]);

  const debouncedLoadRef = useRef(
    debounce(async (sellerId: number, filters: Record<string, string>) => {
      try {
        const response = await getProductsBySellerAPI(sellerId, filters);

        const formattedResponse: IProduct[] = response.map((item) => ({
          id: item.id,
          title: item.name,
          category: item.category,
          description: item.description,
          imageUrl: getImageUrl(item.base64Image),
          price: item.price,
          rating: item.rating,
          quantity: item.stockQuantity,
        }));

        setProducts(formattedResponse);
      } catch (error) {
        toast.error("Failed to fetch products!");
      }
    }, 500)
  );

  const handleLoadFilter = useCallback(() => {
    const filters = {
      name: formikBag.values.filters.name || "",
      price: !formikBag.values.filters.price
        ? ""
        : formikBag.values.filters.price.toString(),
      category: formikBag.values.filters.category || "",
      rating: !formikBag.values.filters.rating
        ? ""
        : formikBag.values.filters.rating.toString(),
    };

    debouncedLoadRef.current(sellerId || userDetails.id, filters);
  }, [
    formikBag.values.filters.name,
    formikBag.values.filters.price,
    formikBag.values.filters.category,
    formikBag.values.filters.rating,
    sellerId,
    userDetails.id,
  ]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  useUpdateEffect(() => {
    handleLoadFilter();
  }, [handleLoadFilter]);

  const handleShowProductFormModal = useCallback(() => {
    productFormModalRef.current?.showModal();
  }, []);

  const handleCloseProductFormModal = useCallback(() => {
    productFormModalRef.current?.close();
    formikBag.resetForm();
  }, [formikBag]);

  const handleEdit = useCallback(
    (product: IProduct) => {
      console.log("product: ", product);
      formikBag.setFieldValue("mode", "edit");
      formikBag.setFieldValue("details.id", product.id);
      formikBag.setFieldValue("details.name", product.title);
      formikBag.setFieldValue("details.description", product.description);
      formikBag.setFieldValue("details.price", product.price);
      formikBag.setFieldValue("details.quantity", product.quantity);
      formikBag.setFieldValue("details.category", product.category);
      formikBag.setFieldValue("details.image", { preview: product.imageUrl });
      handleShowProductFormModal();
    },
    [formikBag, handleShowProductFormModal]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await deleteProductAPI(id);
        toast.success("Successfully deleted a product!");
        await handleLoad();
      } catch (error) {
        toast.error("Failed to delete products");
      }
    },
    [handleLoad]
  );

  return (
    <FormikContext.Provider value={formikBag}>
      <h2 className="font-bold">
        {isBuyer ? sellerDetails?.name : "Your"} Products
      </h2>

      <div className="mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <div className="flex flex-wrap gap-4 items-center">
          <FormInput
            name="filters.name"
            label="Product Name"
            placeholder="Search Product Name"
            containerClassname="w-64"
            rightIcon={<BiSearch />}
          />

          <FormInput
            name="filters.price"
            type="number"
            label="Price"
            placeholder="Search Price"
            containerClassname="w-64"
            rightIcon={<BiSearch />}
          />

          <FormSelect
            name="filters.category"
            options={categoryList}
            label="Category"
            selectClassname="w-64"
          />

          <FormSelect
            name="filters.rating"
            options={ratingList}
            label="Rating"
            selectClassname="w-64"
          />
        </div>

        <div className="sm:self-end flex gap-4">
          <Button
            variant="active"
            onClick={() => formikBag.setFieldValue("filters", initialFilters)}
          >
            Clear Filter
          </Button>

          {!isBuyer && (
            <Button
              className="mt-4 sm:mt-0 "
              onClick={handleShowProductFormModal}
              disabled={!sellerDetails?.approved}
            >
              Add Product
            </Button>
          )}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!products.length ? (
          <h2 className="font-bold">No products found.</h2>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              showBtnBasket={isBuyer}
              isOutOfStock={product.quantity === 0}
              onEdit={isBuyer ? undefined : handleEdit}
              onDelete={isBuyer ? undefined : () => handleDelete(product.id)}
              isDeletable={product.isDeletable}
            />
          ))
        )}
      </div>

      <ProductFormModal
        ref={productFormModalRef}
        handleClose={handleCloseProductFormModal}
      />
    </FormikContext.Provider>
  );
};

export default ProductsPage;
