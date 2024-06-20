import { FC, useCallback, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { orderStatusList } from "@/constants/order";
import toast from "react-hot-toast";

import Select from "@/components/Select";

import type { OrderStatus } from "@/types/server/order";

import ItemListSection from "./components/ItemListSection";
import OverviewSection from "./components/OverviewSection";
import { initialBuyerReviewForm } from "../Products/fixtures";
import { BuyerReviewForm } from "./types";
import { FormikContext, useFormik } from "formik";
import { BuyerReviewFormValidationSchema } from "./validations";
import BuyerReviewModal from "./components/BuyerReviewModal";

const OrderDetailPage: FC = () => {
  const { id } = useParams();

  const [status, setStatus] = useState<OrderStatus>("Delivered");
  const buyerReviewModalRef = useRef<HTMLDialogElement | null>(null);

  const handleSubmitReview = (values: BuyerReviewForm) => {
    //insert endpoint to submit review here.
    console.log("I SUBMITTED!" + values);
    handleCloseBuyerReviewModal();
    toast.success(
      "Thank you for your review. We are always striving to make our services better only for you!",
      {
        duration: 5000,
      }
    );
  };

  const formikBag = useFormik<BuyerReviewForm>({
    initialValues: initialBuyerReviewForm,
    validationSchema: BuyerReviewFormValidationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmitReview,
  });

  const handleShowReviewModal = useCallback(() => {
    buyerReviewModalRef.current?.showModal();
  }, []);

  const handleCloseBuyerReviewModal = useCallback(() => {
    buyerReviewModalRef.current?.close();
    formikBag.resetForm();
  }, [formikBag]);

  const isBuyer = false;

  return (
    <FormikContext.Provider value={formikBag}>
      <div className="container mx-auto mt-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex text-2xl gap-3 ">
            <h3 className="font-bold">Feb 17, 2024 order</h3>
            <span>|</span>
            <h4>Order# {id}</h4>
          </div>

          {!isBuyer && (
            <Select
              options={orderStatusList}
              value={status}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ItemListSection
            status={status}
            showReviewModal={handleShowReviewModal}
          />

          <OverviewSection status={status} />
        </div>

        <BuyerReviewModal
          ref={buyerReviewModalRef}
          handleClose={handleCloseBuyerReviewModal}
        />
      </div>
    </FormikContext.Provider>
  );
};

export default OrderDetailPage;
