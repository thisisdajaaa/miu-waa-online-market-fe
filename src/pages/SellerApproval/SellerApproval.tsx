import Table from "@/components/Table";
import React, { ReactNode, useEffect, useState } from "react";

import { mockTableHeader } from "../Products/fixtures";
import Button from "@/components/Button";
import { TableHeader, TableBody } from "@/components/Table/types";

const SellerApproval = () => {
  //   const [tableData, setTableData] = useState(mockTableData);
  const tableHeader = mockTableHeader;
  const [tableBody, setTableBody] = useState<TableBody>([
    {
      items: [
        { value: "1" },
        { value: "marccolina@gmail.com" },
        { value: "Marc Lennard Colina" },
      ],
    },
    {
      items: [
        { value: "2" },
        { value: "marycolina@gmail.com" },
        { value: "Mary Therese Colina" },
      ],
    },
    {
      items: [
        { value: "3" },
        { value: "rosemabelle@gmail.com" },
        { value: "Rose Mabelle Seares" },
      ],
    },
  ]);

  function approveSeller(sellerID: string | ReactNode) {
    //Insert endpoint to approveSeller here
    console.log("Approved Seller! " + sellerID);
    setTableBody((prevBody) =>
      prevBody.filter((tableRow) => tableRow.items[0].value !== sellerID)
    );
  }

  function rejectSeller(sellerID: string | ReactNode) {
    //Insert endpoint to rejectSeller here
    setTableBody((prevBody) =>
      prevBody.filter((tableRow) => tableRow.items[0].value !== sellerID)
    );
  }

  function updatedTableBody() {
    const updatedTableBody = tableBody.map((tableRow) => {
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
                  onClick={() => approveSeller(tableRow.items[0].value)}
                >
                  Approve
                </Button>
                <Button
                  className="mt-auto mr-2"
                  variant="danger"
                  onClick={() => rejectSeller(tableRow.items[0].value)}
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

  useEffect(() => {
    updatedTableBody();
  }, []);

  return (
    <div>
      <h2 className="font-bold">Sellers To Approve</h2>
      <Table header={tableHeader} body={tableBody}></Table>
    </div>
  );
};

export default SellerApproval;
