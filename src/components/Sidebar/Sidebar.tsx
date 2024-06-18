import { FC, Fragment } from "react";
import { Link } from "react-router-dom";

import clsxm from "@/utils/clsxmUtil";

import { PARENT_URL } from "@/constants/pageUrl";

import type { SidebarProps } from "./types";

const Sidebar: FC<SidebarProps> = (props) => {
  const { handleToggleSidebar, isSidebarOpen } = props;

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
              <li>
                <Link to={PARENT_URL.PRODUCTS}>Products</Link>
              </li>
              <li>
                <Link to={PARENT_URL.ORDERS}>Orders</Link>
              </li>
              <li>
                <Link to={PARENT_URL.SHOP_SETTINGS}>Shop Settings</Link>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </Fragment>
  );
};

export default Sidebar;
