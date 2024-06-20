import { FormikContext, useFormik } from "formik";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiSearch } from "react-icons/bi";

import { categoryList } from "@/constants/category";
import { ratingList } from "@/constants/rating";

import Button from "@/components/Button";
import FormInput from "@/components/Formik/FormInput";
import FormSelect from "@/components/Formik/FormSelect";
import ProductCard from "@/components/ProductCard";
import type { IProduct } from "@/components/ProductCard/types";

import { getProductsBySellerAPI } from "@/services/product";

import ProductFormModal from "./components/ProductFormModal";
import { initialProductForm } from "./fixtures";
import type { ProductForm } from "./types";
import { ProductFormValidationSchema } from "./validations";

const ProductsPage: FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const productFormModalRef = useRef<HTMLDialogElement | null>(null);

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleSubmit = async (values: ProductForm) => {
    const { mode } = values;
    const isAdd = mode === "add";

    toast.success(`Successfully ${isAdd ? "added" : "edited"} a product!`);
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
      const filters: Record<string, string> = {
        name: formikBag.values.filters.name || "",
        price: formikBag.values.filters.price.toString() || "",
        category: formikBag.values.filters.category || "",
        rating: formikBag.values.filters.rating.toString() || "",
      };
      const response = await getProductsBySellerAPI(1, filters);

      const formattedResponse: IProduct[] = response.map((item) => ({
        id: item.id,
        title: item.name,
        category: item.category,
        description: item.description,
        imageUrl: `data:image/jpeg;base64,${item.base64Image}`,
        price: item.price,
        rating: item.rating,
      }));

      setProducts(formattedResponse);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  }, [
    formikBag.values.filters.name,
    formikBag.values.filters.price,
    formikBag.values.filters.category,
    formikBag.values.filters.rating,
  ]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  const handleShowProductFormModal = useCallback(() => {
    productFormModalRef.current?.showModal();
  }, []);

  const handleCloseProductFormModal = useCallback(() => {
    productFormModalRef.current?.close();
    formikBag.resetForm();
  }, [formikBag]);

  const handleEdit = useCallback(() => {
    formikBag.setFieldValue("mode", "edit");
    handleShowProductFormModal();
  }, [formikBag, handleShowProductFormModal]);

  return (
    <FormikContext.Provider value={formikBag}>
      <h2 className="font-bold">Your Products</h2>

      <div className="mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
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

        <Button
          className="mt-4 sm:mt-0 sm:self-end"
          onClick={handleShowProductFormModal}
        >
          Add Product
        </Button>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            showBtnBasket={false}
            onEdit={handleEdit}
            onDelete={() => handleDeleteProduct(product.id)}
          />
        ))}
      </div>

      <ProductFormModal
        ref={productFormModalRef}
        handleClose={handleCloseProductFormModal}
      />
    </FormikContext.Provider>
  );
};

export default ProductsPage;
