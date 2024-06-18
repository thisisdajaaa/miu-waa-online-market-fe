import clsx from "clsx";
import { FC, useCallback, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoCartSharp } from "react-icons/io5";
import { MdPeople } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useOnClickOutsideElement } from "@/hooks";

import {
  AUTHENTICATED_PAGE_URL,
  NON_AUTHENTICATED_PAGE_URL,
} from "@/constants/pageUrl";

import { actions } from "@/redux/authentication";

import { logoutAPI } from "@/services/authentication";

import Button from "../Button";
import Input from "../Input";

const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClickOutside = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  useOnClickOutsideElement(dropdownRef, handleClickOutside);

  const handleLogout = async () => {
    await logoutAPI();
    dispatch(actions.callSetResetAuthentication());
    setIsDropdownOpen(false);
    navigate(NON_AUTHENTICATED_PAGE_URL.LOGIN);
  };

  const handleOptions = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="navbar z-30 bg-accent shadow-md px-10 justify-between">
      <div className="flex items-center flex-grow sm:flex-grow-0">
        <Link to={AUTHENTICATED_PAGE_URL.HOME} className="block">
          <img src="/assets/svgs/ecommerce.svg" className="h-[48px] w-[48px]" />
        </Link>
      </div>

      <div className="hidden sm:flex items-center flex-grow mx-8">
        <Input rightIcon={<BiSearch />} />
      </div>

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
                  <p className="font-normal">Hi, Test User!</p>
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

        <Button className="flex flex-col" variant="ghost">
          <IoCartSharp className="h-6 w-6" />
          <p>$0.00</p>
        </Button>
      </div>
    </div>
  );
};

export default Header;
