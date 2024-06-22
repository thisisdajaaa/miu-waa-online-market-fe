import clsx from "clsx";
import { FC, useCallback, useRef, useState } from "react";
import { BiMenu, BiSearch } from "react-icons/bi";
import { IoCartSharp } from "react-icons/io5";
import { MdPeople } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
  useOnClickOutsideElement,
} from "@/hooks";

import {
  AUTHENTICATED_URLS,
  NON_AUTHENTICATED_URLS,
} from "@/constants/pageUrl";

import {
  actions as authenticationActions,
  selectors as authSelectors,
} from "@/redux/authentication";
import {
  actions as cartActions,
  selectors as cartSelectors,
} from "@/redux/cart";

import { logoutAPI } from "@/services/authentication";

import type { HeaderProps } from "./types";
import Button from "../Button";
import Input from "../Input";

const Header: FC<HeaderProps> = (props) => {
  const { handleToggleSidebar } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const products = useAppSelector(cartSelectors.products);
  const total = useAppSelector(cartSelectors.total);
  const userDetails = useAppSelector(authSelectors.userDetails);
  const isBuyer = userDetails.role === "BUYER";
  const isAdmin = userDetails.role === "ADMIN";

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClickOutside = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  useOnClickOutsideElement(dropdownRef, handleClickOutside);

  const handleLogout = async () => {
    await logoutAPI();
    dispatch(cartActions.callSetResetBuyerDetails());
    dispatch(cartActions.callSetResetCart());
    dispatch(authenticationActions.callSetResetAuthentication());
    setIsDropdownOpen(false);
    navigate(NON_AUTHENTICATED_URLS.LOGIN);
  };

  const handleOptions = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleCategoryClick = (category: string) => {
    navigate(`${AUTHENTICATED_URLS.HOME}?category=${category}`);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="navbar bg-accent shadow-md px-10 justify-between">
        <div className="flex items-center flex-grow sm:flex-grow-0">
          <Link to={AUTHENTICATED_URLS.HOME} className="block">
            <img
              src="/assets/svgs/ecommerce.svg"
              className="h-[3rem] w-[3rem]"
            />
          </Link>
        </div>

        {isBuyer && (
          <div className="hidden sm:flex items-center flex-grow mx-8">
            <Input rightIcon={<BiSearch />} />
          </div>
        )}

        <div className="flex gap-8">
          <div className="flex gap-2">
            <div
              ref={dropdownRef}
              className={clsx(
                "dropdown-end dropdown",
                isDropdownOpen ? "dropdown-open" : ""
              )}
            >
              <label tabIndex={0}>
                <Button type="button" variant="ghost" onClick={handleOptions}>
                  <MdPeople className="h-4 w-4 md:h-6 md:w-6" />
                  <div className="flex flex-col items-start">
                    <p className="font-normal">Hi, {userDetails.name}!</p>
                    <p className="font-bold">Account</p>
                  </div>
                </Button>
              </label>

              {isDropdownOpen && (
                <ul
                  className="menu dropdown-content z-50 w-52 rounded-box bg-base-100 p-2 shadow"
                  tabIndex={0}
                  role="menu"
                >
                  <li>
                    <a>Profile</a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li onClick={handleLogout}>
                    <a>Logout</a>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {isBuyer && (
            <Button
              className="flex flex-col"
              variant="ghost"
              onClick={() => navigate(AUTHENTICATED_URLS.SHOPPING_CART)}
            >
              <div className="indicator">
                <span className="indicator-item badge badge-primary left-[0.063rem] top-1">
                  {products.length}
                </span>
                <IoCartSharp size={24} />
              </div>

              <p>${total.toFixed(2)}</p>
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3 p-2 pl-6 bg-primary text-white text-sm">
        {!isAdmin && (
          <p
            className="link items-center hidden md:flex"
            onClick={handleToggleSidebar}
          >
            <BiMenu className="h-6 w-6 mr-1" />
          </p>
        )}

        {isBuyer && (
          <>
            <p className="link" onClick={() => handleCategoryClick("all")}>
              All
            </p>
            <p
              className="link"
              onClick={() => handleCategoryClick("electronics")}
            >
              Electronics
            </p>
            <p
              className="link"
              onClick={() => handleCategoryClick("clothings")}
            >
              Clothings
            </p>
            <p
              className="link"
              onClick={() => handleCategoryClick("home-appliances")}
            >
              Home Appliances
            </p>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
