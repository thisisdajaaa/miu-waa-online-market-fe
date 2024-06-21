import { FormikContext, useFormik } from "formik";
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { useAppSelector } from "@/hooks";

import { orderStatusList } from "@/constants/order";

import Select from "@/components/Select";

import { selectors as authenticationSelectors } from "@/redux/authentication";
import { selectors as cartSelectors } from "@/redux/cart";

import { getOrderDetailsAPI, updateOrderStatusAPI } from "@/services/order";
import { addReviewAPI } from "@/services/review";

import { LineItemDetailResponse } from "@/types/server/lineItem";
import type { OrderDetailResponse, OrderStatus } from "@/types/server/order";
import { ReviewRequest } from "@/types/server/review";

import BuyerReviewModal from "./components/BuyerReviewModal";
import ItemListSection from "./components/ItemListSection";
import OverviewSection from "./components/OverviewSection";
import { initialBuyerReviewForm } from "./fixtures";
import { BuyerReviewForm } from "./types";
import { BuyerReviewFormValidationSchema } from "./validations";

const OrderDetailPage: FC = () => {
  const { id } = useParams();

  const userDetails = useAppSelector(authenticationSelectors.userDetails);
  const buyerDetails = useAppSelector(cartSelectors.buyerDetails);
  const isBuyer = userDetails.role === "BUYER";

  const [status, setStatus] = useState<OrderStatus | null>(null);
  const buyerReviewModalRef = useRef<HTMLDialogElement | null>(null);
  const [details, setDetails] = useState<OrderDetailResponse | null>(null);

  const handleLoad = useCallback(async () => {
    try {
      const response = await getOrderDetailsAPI(Number(id));
      setDetails(response);
      setStatus(response.status);
    } catch (error) {
      toast.error("Failed to fetch order!");
    }
  }, [id]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  const handleSubmitReview = async (values: BuyerReviewForm) => {
    const payload: ReviewRequest = {
      content: values.content,
      rating: values.rating,
      isFlagged: false,
    };

    await addReviewAPI(buyerDetails.id, values.selectedProduct, payload);
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

  const handleShowReviewModal = useCallback(
    (id: number, name: string) => {
      formikBag.setFieldValue("selectedProduct", id);
      formikBag.setFieldValue("productName", name);
      buyerReviewModalRef.current?.showModal();
    },
    [formikBag]
  );

  const handleCloseBuyerReviewModal = useCallback(() => {
    buyerReviewModalRef.current?.close();
    formikBag.resetForm();
  }, [formikBag]);

  const handleChangeStatus = useCallback(
    async (e: ChangeEvent<HTMLSelectElement>) => {
      setStatus(e.target.value as OrderStatus);
      await updateOrderStatusAPI(Number(id), e.target.value as OrderStatus);
    },
    [id]
  );

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
              value={status as OrderStatus}
              onChange={handleChangeStatus}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ItemListSection
            status={status as OrderStatus}
            orderDetails={details?.lineItems as LineItemDetailResponse[]}
            seller={details?.seller || ""}
            showReviewModal={handleShowReviewModal}
          />

          <OverviewSection
            status={status as OrderStatus}
            details={details as OrderDetailResponse}
          />
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
