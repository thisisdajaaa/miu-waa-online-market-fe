import React, { ReactNode, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "@/components/Button";
import Table from "@/components/Table";
import { TableBody } from "@/components/Table/types";

import {
  approveSellerAPI,
  getPendingSellersAPI,
  rejectSellerAPI,
} from "@/services/admin";

import { SellerDetailResponse } from "@/types/server/user";

import { pendingSellerHeaders } from "../../../Products/fixtures";

const SellerApproval = () => {
  const tableHeader = pendingSellerHeaders;
  const [sellers, setSellers] = useState<TableBody>([]);
  const [tableBody, setTableBody] = useState<TableBody>([]);

  const getPendingSellers = useCallback(async () => {
    const response = await getPendingSellersAPI();

    if (!response) return;
    const sellers = response.map((seller: SellerDetailResponse) => {
      return {
        items: [
          { value: seller.id },
          { value: seller.email },
          { value: seller.name },
        ],
      };
    });
    setSellers(sellers);
  }, []);

  const handleReprove = useCallback(async (sellerID: string | ReactNode) => {
    try {
      if (sellerID) {
        await rejectSellerAPI(+sellerID);

        setSellers((prev) =>
          prev.filter((seller) => Number(seller.items[0].value) !== +sellerID)
        );

        toast.success(`Seller ${sellerID} has been rejected.`);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }, []);

  const handleApprove = useCallback(async (sellerID: string | ReactNode) => {
    try {
      if (sellerID) {
        await approveSellerAPI(+sellerID);

        setSellers((prev) =>
          prev.filter((seller) => Number(seller.items[0].value) !== +sellerID)
        );

        toast.success(`Seller ${sellerID} has been approved.`);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }, []);

  const updatedTableBody = useCallback(() => {
    const updatedTableBody = sellers.map((tableRow) => {
      // Check if buttons are already added to avoid adding them multiple times
      const hasButtons = tableRow.items.some(
        (item) => React.isValidElement(item.value) && item.value.type === "div"
      );

      if (hasButtons) {
        return tableRow;
      }

      return {
        ...tableRow,
        items: [
          ...tableRow.items,
          {
            value: (
              <div>
                <Button
                  className="mt-auto mr-2"
                  variant="primary"
                  onClick={() => handleApprove(tableRow.items[0].value)}
                >
                  Approve
                </Button>
                <Button
                  className="mt-auto mr-2"
                  variant="danger"
                  onClick={() => handleReprove(tableRow.items[0].value)}
                >
                  Reject
                </Button>
              </div>
            ),
          },
        ],
      };
    });

    setTableBody(updatedTableBody);
  }, [handleApprove, handleReprove, sellers]);

  useEffect(() => {
    getPendingSellers();
  }, [getPendingSellers]);

  useEffect(() => {
    updatedTableBody();
  }, [updatedTableBody]);

  return (
    <div className="mt-8">
      <h2 className="font-bold">Sellers To Approve</h2>
      <Table header={tableHeader} body={tableBody}></Table>
    </div>
  );
};

export default SellerApproval;
