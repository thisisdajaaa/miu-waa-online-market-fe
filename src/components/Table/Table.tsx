import React from "react";
import type { TableProps } from "./types";
import { FC, useState } from "react";
import clsxm from "@/utils/clsxmUtil";

export const Table: FC<TableProps> = (props) => {
  const { header, body } = props;

  const renderHeader = header.map(({ value, width }, index) => {
    return (
      <th key={index} className={clsxm("text-lg", width && `min-w-[${width}]`)}>
        {value}
      </th>
    );
  });

  const renderBody = body.map((bodyItem, index) => {
    return (
      <tr key={index} className="hover">
        {bodyItem.items.map(({ value, width }, index) => {
          return (
            <td
              key={index}
              className={clsxm("text-base", width && `min-w-[${width}]`)}
            >
              {value}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>{renderHeader}</tr>
        </thead>
        {/* body */}
        <tbody>{renderBody}</tbody>
      </table>
    </div>
  );
};

export default Table;
