import { FC, Fragment } from "react";
import { Link } from "react-router-dom";

import clsxm from "@/utils/clsxmUtil";
import { useAppSelector } from "@/hooks";

import { AUTHENTICATED_URLS } from "@/constants/pageUrl";

import { selectors } from "@/redux/authentication";

import type { SidebarProps } from "./types";

const Sidebar: FC<SidebarProps> = (props) => {
  const { handleToggleSidebar, isSidebarOpen } = props;
  const userDetails = useAppSelector(selectors.userDetails);
  const isSeller = userDetails.role === "SELLER";
  const isAdmin = userDetails.role === "ADMIN";

  if (isAdmin) return null;

  return (
    <Fragment>
      <label className="drawer-overlay" onClick={handleToggleSidebar} />

      <div
        className={clsxm(
          "drawer-side",
          "transition-transform duration-300",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <ul className="menu min-h-full w-80 bg-base-200 p-4">
          {isSidebarOpen && (
            <Fragment>
              {isSeller && (
                <li>
                  <Link to={AUTHENTICATED_URLS.PRODUCTS}>Products</Link>
                </li>
              )}

              <li>
                <Link to={AUTHENTICATED_URLS.ORDERS}>Orders</Link>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </Fragment>
  );
};

export default Sidebar;
