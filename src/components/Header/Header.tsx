import clsx from "clsx";
import { FC, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useOnClickOutsideElement } from "@/hooks";

import { actions } from "@/redux/authentication";

import { logoutAPI } from "@/services/authentication";

import mockAvatar from "@/assets/images/mock-avatar.jpg";

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
    navigate("/auth/login");
  };

  const handleHome = () => navigate("/");

  const handleOptions = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="navbar z-30 bg-base-100 shadow-md">
      <div className="flex-1 items-center">
        <button className="btn btn-ghost text-xl" onClick={handleHome}>
          <h1 className="text-[1.2rem] sm:text-[1.25rem]">CS545</h1>
        </button>
      </div>
      <div className="flex gap-2">
        <div
          ref={dropdownRef}
          className={clsx(
            "dropdown-end dropdown",
            isDropdownOpen ? "dropdown-open" : ""
          )}
        >
          <label tabIndex={0}>
            <button
              type="button"
              className="avatar btn btn-circle btn-ghost m-1"
              onClick={handleOptions}
            >
              <div className="w-10 rounded-full">
                <img
                  src={mockAvatar}
                  alt="User Avatar"
                  height={40}
                  width={40}
                />
              </div>
            </button>
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
    </div>
  );
};

export default Header;
