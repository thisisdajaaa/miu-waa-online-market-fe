import { FC, useState } from "react";

import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/components/ProductCard/types";

import { mockProducts } from "./fixtures";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { BiSearch } from "react-icons/bi";
import Select from "@/components/Select";
import { categoryList } from "@/constants/category";

const ProductsPage: FC = () => {
  const [products, setProducts] = useState(mockProducts); // Replace mockProducts with your data fetching logic
  const [filter, setFilter] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<IProduct | null>(null);

  const handleAddProduct = (newProduct: IProduct) => {
    setProducts([...products, newProduct]);
    setAddModalOpen(false);
  };

  const handleEditProduct = (updatedProduct: IProduct) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditModalOpen(false);
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div>
      <h2 className="font-bold">Your Products</h2>

      <div className="mt-8 flex justify-between items-center mb-4">
        <div className="flex gap-4 items-center">
          <Input
            type="text"
            label="Product Name"
            placeholder="Search products..."
            value={filter}
            inputClassname="w-64"
            onChange={(e) => setFilter(e.target.value)}
            rightIcon={<BiSearch />}
          />

          <Select
            options={categoryList.map((category) => ({
              label: category,
              value: category,
            }))}
            label="Category"
            selectClassname="w-64"
          />
        </div>

        <Button className="self-end" onClick={() => setAddModalOpen(true)}>
          Add Product
        </Button>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products
          .filter((product) => product.title.includes(filter))
          .map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              showBtnBasket={false}
              onEdit={(item) => {
                setEditProduct(item as IProduct);
                setEditModalOpen(true);
              }}
              onDelete={() => handleDeleteProduct(product.id)}
            />
          ))}
      </div>
      {/* {isAddModalOpen && (
        <AddProductModal
          onClose={() => setAddModalOpen(false)}
          onSave={handleAddProduct}
        />
      )}
      {isEditModalOpen && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditModalOpen(false)}
          onSave={handleEditProduct}
        />
      )} */}
    </div>
  );
};

export default ProductsPage;
