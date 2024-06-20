import { FC, PropsWithChildren, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";

import clsxm from "@/utils/clsxmUtil";
import { useIsLoggedIn } from "@/hooks";

import { AUTHENTICATED_URLS } from "@/constants/pageUrl";

import BackButton from "../BackButton";
import Header from "../Header";
import Sidebar from "../Sidebar";

const Layout: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const isLoggedIn = useIsLoggedIn();
  const location = useLocation();

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  if (!isLoggedIn)
    return (
      <div
        className="relative flex min-h-screen items-center justify-center py-12 px-4"
        data-testid="layout-unauthenticated"
      >
        {children}
      </div>
    );

  return (
    <div aria-expanded={isSidebarOpen} className="flex min-h-screen flex-col">
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div
        className={clsxm("drawer", {
          "drawer-open": isSidebarOpen,
        })}
      >
        <input
          type="checkbox"
          className="drawer-toggle"
          checked={isSidebarOpen}
          readOnly
        />
        <div
          className={clsxm("drawer-content flex flex-1 flex-col", {
            "lg:ml-20": isSidebarOpen,
          })}
        >
          <main
            className={clsxm("flex-1 overflow-x-auto")}
            data-testid="content"
          >
            <div className="m-auto flex max-w-screen-2xl flex-col py-[3rem] px-9">
              {location.pathname !== AUTHENTICATED_URLS.HOME && (
                <BackButton className="mb-4 self-start" />
              )}
              {children}
            </div>
          </main>
        </div>
        <Sidebar
          handleToggleSidebar={handleToggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </div>
  );
};

export default Layout;
