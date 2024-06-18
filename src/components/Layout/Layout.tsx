import { FC, PropsWithChildren, useCallback, useState } from "react";

import clsxm from "@/utils/clsxmUtil";
import { useIsLoggedIn } from "@/hooks";

import Header from "../Header";
import Sidebar from "../Sidebar";

const Layout: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const isLoggedIn = useIsLoggedIn();

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
