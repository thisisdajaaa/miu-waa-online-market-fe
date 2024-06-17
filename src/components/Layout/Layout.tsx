import { FC, PropsWithChildren } from "react";

import { useIsLoggedIn } from "@/hooks";

import Header from "../Header";

const Layout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const isLoggedIn = useIsLoggedIn();

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
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1 flex-col md:flex-row">
        <main className="flex-1 overflow-x-auto transition-all duration-200 ease-in-out">
          <div className="m-auto flex max-w-screen-2xl flex-col py-[6rem] px-9">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
