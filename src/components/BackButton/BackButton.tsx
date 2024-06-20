import clsx from "clsx";
import { FC } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { BackButtonProps } from "./types";
import Button from "../Button";

const BackButton: FC<BackButtonProps> = (props) => {
  const { className } = props;

  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  return (
    <Button
      onClick={handleBackClick}
      variant="ghost"
      className={clsx("flex items-center justify-center ", className)}
    >
      <FaArrowLeftLong className="mr-1" />
      Back
    </Button>
  );
};

export default BackButton;
