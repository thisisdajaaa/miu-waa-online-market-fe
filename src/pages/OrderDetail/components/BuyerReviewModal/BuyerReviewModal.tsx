import { Field, useFormikContext } from "formik";
import { forwardRef } from "react";

import clsxm from "@/utils/clsxmUtil";

import Button from "@/components/Button";
import FormTextArea from "@/components/Formik/FormTextArea";
import Modal from "@/components/Modal";

import type { BuyerReviewModalProps } from "./types";
import { BuyerReviewForm } from "../../types";

const BuyerReviewModal = forwardRef<HTMLDialogElement, BuyerReviewModalProps>(
  (props, ref) => {
    const { handleClose } = props;

    const { isSubmitting, submitForm, values, setFieldValue } =
      useFormikContext<BuyerReviewForm>();

    return (
      <Modal
        ref={ref}
        handleClose={handleClose}
        bodyClassname="w-5/12 max-w-7xl"
      >
        <h2 className="mb-6 text-lg font-bold uppercase">
          {values.productName}
        </h2>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((ratingValue) => (
            <label key={ratingValue}>
              <Field
                type="radio"
                name="rating"
                value={ratingValue.toString()}
                className={clsxm(
                  "mask mask-star-2",
                  ratingValue <= values.rating ? "bg-orange-400" : "bg-gray-400"
                )}
                checked={values.rating === ratingValue}
                onChange={() => setFieldValue("rating", ratingValue)}
              />
            </label>
          ))}
        </div>
        <FormTextArea
          name="content"
          label="Review"
          isRequired
          placeholder="Write A Review"
        />
        <div className="mt-14 flex justify-end gap-6">
          <Button
            type="button"
            variant="danger"
            onClick={handleClose}
            className="w-3/12"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={submitForm}
            className="w-3/12"
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </Modal>
    );
  }
);

export default BuyerReviewModal;
