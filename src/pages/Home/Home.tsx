import { FC, useMemo } from "react";

import { useAppSelector } from "@/hooks";

import { selectors } from "@/redux/authentication";

import AdminView from "./components/AdminView";
import BuyerView from "./components/BuyerView";
import SellerView from "./components/SellerView";

const HomePage: FC = () => {
  const userDetails = useAppSelector(selectors.userDetails);
  const role = userDetails.role;

  const renderView = useMemo(() => {
    if (role === "BUYER")
      return (
        <div>
          <BuyerView />
        </div>
      );

    if (role === "ADMIN")
      return (
        <div>
          <AdminView />
        </div>
      );

    return (
      <div>
        <SellerView />
      </div>
    );
  }, [role]);

  return <>{renderView}</>;
};

export default HomePage;
