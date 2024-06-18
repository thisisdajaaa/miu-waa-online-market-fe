import { FC, PropsWithChildren } from "react";

import clsxm from "@/utils/clsxmUtil";

import type { CardProps } from "./types";

const Card: FC<PropsWithChildren<CardProps>> = (props) => {
  const { title, children, containerClassname } = props;

  return (
    <div
      className={clsxm(
        "card bg-base-100 shadow-md border w-full flex flex-col",
        containerClassname
      )}
    >
      <div className="card-body flex-grow flex flex-col">
        <h3 className="card-title uppercase text-sm text-left">{title}</h3>
        <div className="flex-grow flex items-center justify-center w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
