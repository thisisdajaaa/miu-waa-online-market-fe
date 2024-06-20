import Table from "@/components/Table";
import React, { ReactNode, useEffect, useState } from "react";

import { mockTableHeader } from "../Products/fixtures";
import Button from "@/components/Button";
import { TableBody } from "@/components/Table/types";

import toast from "react-hot-toast";
import { onParseResponse } from "@/utils/axiosUtil";

const SellerApproval = () => {
  const tableHeader = mockTableHeader;
  const [sellers, setSellers] = useState<TableBody>([]);
  const [tableBody, setTableBody] = useState<TableBody>([]);

  useEffect(() => {
    getPendingSellers();
  }, []);

  useEffect(() => {
    updatedTableBody();
  }, [sellers]);

  async function getPendingSellers() {
    const response = await onParseResponse<any>({
      method: "get",
      url: "/sellers/pending",
      data: null,
    });
    
    if (!response) return;
    const sellers = response.data.map((seller: any) => {
      return {
        items: [
          { value: seller.id },
          { value: seller.email },
          { value: seller.username },
        ],
      };
    });
    setSellers(sellers);
  }

  const handleReprove = async (sellerID: string | ReactNode) => {
      const response = await onParseResponse<any>({
        method: "put",
        url: `/sellers/${sellerID}/disapprove`,
        data: null,
      });
      
      if (!response) return;
      setSellers(sellers.filter((seller) => seller.items[0].value !== sellerID));
      toast.success(`Seller ${sellerID} has been rejected.`);
  }

  const handleApprove = async (sellerID: string | ReactNode) => {
      const response = await onParseResponse<any>({
        method: "put",
        url: `/sellers/${sellerID}/approve`,
        data: null,
      });
      
      if (!response) return;
      setSellers(sellers.filter((seller) => seller.items[0].value !== sellerID));
      toast.success(`Seller ${sellerID} has been approved.`);
  }

  function updatedTableBody() {
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
  }

  return (
    <div className="mt-8">
      <h2 className="font-bold">Sellers To Approve</h2>
      <Table header={tableHeader} body={tableBody}></Table>
    </div>
  );
};

export default SellerApproval;
