import { forwardRef, PropsWithChildren } from "react";
import { FaX } from "react-icons/fa6";

import clsxm from "@/utils/clsxmUtil";

import type { ModalProps } from "./types";
import Button from "../Button";

const Modal = forwardRef<HTMLDialogElement, PropsWithChildren<ModalProps>>(
  (props, ref) => {
    const {
      open,
      responsive,
      bodyClassname,
      containerClassname,
      handleClose,
      children,
    } = props;

    return (
      <dialog
        ref={ref}
        aria-label="Modal"
        aria-hidden={!open}
        open={open}
        aria-modal={open}
        className={clsxm(
          "modal scrollbar-hide",
          open && "modal-open",
          responsive && "modal-bottom sm:modal-middle",
          containerClassname
        )}
      >
        <div className={clsxm("modal-box no-scrollbar", bodyClassname)}>
          <div className="modal-action">
            <form method="dialog">
              <Button
                variant="ghost"
                className="absolute right-2 top-2"
                onClick={handleClose}
              >
                <FaX />
              </Button>
            </form>
          </div>

          <div>{children}</div>
        </div>

        <div className="modal-backdrop" />
      </dialog>
    );
  }
);

export default Modal;
