import { FC } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Button from "@/components/Button";

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => navigate("/");

  return (
    <div className="flex flex-col items-center justify-center">
      <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />

      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>

      <p className="text-lg text-gray-700 mb-6">
        The page you are looking for does not exist.
      </p>

      <Button onClick={handleGoBack}>Go Back Home</Button>
    </div>
  );
};

export default NotFoundPage;
