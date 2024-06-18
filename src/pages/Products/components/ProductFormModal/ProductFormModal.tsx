import { useFormikContext } from "formik";
import { forwardRef } from "react";

import Button from "@/components/Button";
import FormImageUpload from "@/components/Formik/FormImageUpload";
import FormInput from "@/components/Formik/FormInput";
import FormTextArea from "@/components/Formik/FormTextArea";
import Modal from "@/components/Modal";

import type { ProductFormModalProps } from "./types";
import type { ProductForm } from "../../types";

const ProductFormModal = forwardRef<HTMLDialogElement, ProductFormModalProps>(
  (props, ref) => {
    const { handleClose } = props;

    const { isSubmitting, submitForm, values } =
      useFormikContext<ProductForm>();

    const isAdd = values.mode === "add";

    return (
      <Modal
        ref={ref}
        handleClose={handleClose}
        bodyClassname="w-5/12 max-w-7xl"
      >
        <h2 className="mb-6 text-lg font-bold uppercase">
          {isAdd ? "Add" : "Edit"} Product
        </h2>

        <div className="grid gap-7">
          <FormInput
            name="details.name"
            type="text"
            label="Name"
            placeholder="Enter Name"
            isRequired
          />
          <FormTextArea
            name="details.description"
            label="Description"
            isRequired
            placeholder="Enter Description"
          />
          <FormInput
            name="details.price"
            type="Number"
            label="Price"
            placeholder="Enter price"
            isRequired
          />
          <FormImageUpload
            name="details.image"
            label="Image"
            isRequired
            containerClassname="max-w-lg flex flex-col items-start"
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
              Save
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
);

export default ProductFormModal;
