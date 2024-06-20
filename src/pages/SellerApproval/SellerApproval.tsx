import Table from "@/components/Table";
import React, { ReactNode, useEffect, useState } from "react";
import axios from 'axios';

import { mockTableHeader } from "../Products/fixtures";
import Button from "@/components/Button";
import { TableBody } from "@/components/Table/types";

import toast from "react-hot-toast";

const SellerApproval = () => {
  const tableHeader = mockTableHeader;
  const [sellers, setSellers] = useState<TableBody>([]);
  const [tableBody, setTableBody] = useState<TableBody>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/sellers/pending')
      .then((res) => {
        const sellers = res.data.map((seller: any) => {
          return {
            items: [
              { value: seller.id },
              { value: seller.email },
              { value: seller.username },
            ],
          };
        });
        setSellers(sellers);
      })
      .catch((err) => {
        if (err.response.data.message)
          toast.error(err.response.data.message as string);
        else
          toast.error(err.message as string);
      });
  }, []);

  useEffect(() => {
    updatedTableBody();
  }, [sellers]);

  const handleReprove = (sellerID: string | ReactNode) => {
    axios.put(`http://localhost:8080/api/sellers/${sellerID}/disapprove`)
      .then(() => {
        setSellers(sellers.filter((seller) => seller.items[0].value !== sellerID));
        toast.success(`Seller ${sellerID} has been rejected.`);
      })
      .catch((err) => {
        if (err.response.data.message)
          toast.error(err.response.data.message as string);
        else
          toast.error(err.message as string);
      });
  }

  const handleApprove = (sellerID: string | ReactNode) => {
    axios.put(`http://localhost:8080/api/sellers/${sellerID}/approve`)
      .then(() => {
        setSellers(sellers.filter((seller) => seller.items[0].value !== sellerID));
        toast.success(`Seller ${sellerID} has been approved.`);
      })
      .catch((err) => {
        if (err.response.data.message)
          toast.error(err.response.data.message as string);
        else
          toast.error(err.message as string);
      });
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
