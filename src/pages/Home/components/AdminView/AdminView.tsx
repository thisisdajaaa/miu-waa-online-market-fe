import { FC, useState } from "react";

import ProductCard from "@/components/ProductCard";

import { mockProducts } from "../../fixtures";

const AdminView: FC = () => {
  const [productsToApprove, setProductsToApprove] = useState(mockProducts);

  function approveProduct(productId: number) {
    //Insert endpoint call to approve product
    setProductsToApprove(
      productsToApprove.filter((product) => product.id !== productId)
    );
  }

  function rejectProduct(productId: number) {
    //Insert endpoint call to reject product
    setProductsToApprove(
      productsToApprove.filter((product) => product.id !== productId)
    );
  }

  return (
    <div>
      {productsToApprove.length === 0 ? (
        <h2 className="font-bold">No Products to Approve</h2>
      ) : (
        <div>
          <h2 className="font-bold">Products To Approve</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productsToApprove.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  {...product}
                  showBtnBasket={false}
                  onApprove={approveProduct}
                  onReject={rejectProduct}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
