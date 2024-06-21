import { FC } from "react";

import { useAppSelector } from "@/hooks";

import { selectors } from "@/redux/authentication";

import AdminView from "./components/AdminView";
import BuyerView from "./components/BuyerView";
import SellerView from "./components/SellerView";

const HomePage: FC = () => {
  const userDetails = useAppSelector(selectors.userDetails);
  const role = userDetails.role;

  if (role === "BUYER")
    return (
      <div>
        <BuyerView />
      </div>
    );

  if (role === "SELLER")
    <div>
      <SellerView />
    </div>;

  return (
    <div>
      <AdminView />
    </div>
  );
};

export default HomePage;
