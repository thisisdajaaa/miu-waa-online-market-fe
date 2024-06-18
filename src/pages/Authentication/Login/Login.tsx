import { FormikContext, useFormik } from "formik";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineLock, MdOutlinePermIdentity } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/hooks";

import {
  AUTHENTICATED_PAGE_URL,
  NON_AUTHENTICATED_PAGE_URL,
} from "@/constants/pageUrl";

import Button from "@/components/Button";
import FormInput from "@/components/Formik/FormInput";

import { actions } from "@/redux/authentication";

import { loginAPI } from "@/services/authentication";

import { AuthenticationDetailResponse } from "@/types/server/authentication";

import { initialLoginForm } from "./fixtures";
import type { LoginForm } from "./types";
import { LoginFormValidationSchema } from "./validations";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const storeStateValues = (data: AuthenticationDetailResponse) => {
    dispatch(actions.callSetAccessToken(data?.accessToken || ""));
    dispatch(actions.callSetRefreshToken(data?.refreshToken || ""));
  };

  const handleSubmit = async (values: LoginForm) => {
    const { success, data, message } = await loginAPI(values);

    if (!success) {
      toast.error(message as string);
      return;
    }

    storeStateValues(data as AuthenticationDetailResponse);

    toast.success(message as string);

    navigate(AUTHENTICATED_PAGE_URL.HOME);
  };

  const formikBag = useFormik<LoginForm>({
    initialValues: initialLoginForm,
    validationSchema: LoginFormValidationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  const handleTogglePasswordVisibility = () =>
    setIsPasswordVisible((prev) => !prev);

  return (
    <FormikContext.Provider value={formikBag}>
      <div className="flex w-full max-w-xl flex-col border rounded-md items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8">
          <div className="flex flex-row justify-center">
            <img
              src="/assets/svgs/ecommerce.svg"
              alt="app-icon"
              className="text-center h-[68px] w-[68px]"
            />
          </div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in
          </h2>
          <div className="flex flex-col gap-4 rounded-md">
            <FormInput
              name="email"
              label="Email"
              isRequired
              placeholder="Enter your Email"
              leftIcon={<MdOutlinePermIdentity />}
            />

            <FormInput
              name="password"
              label="Password"
              isRequired
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter your Password"
              leftIcon={<MdOutlineLock />}
              rightIcon={
                isPasswordVisible ? (
                  <FaRegEye
                    onClick={handleTogglePasswordVisibility}
                    className="hover:cursor-pointer"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={handleTogglePasswordVisibility}
                    className="hover:cursor-pointer"
                  />
                )
              }
            />
          </div>
        </div>

        <div className="mt-14 w-full">
          <Button
            className="btn-primary w-full justify-center"
            onClick={formikBag.submitForm}
            isLoading={formikBag.isSubmitting}
          >
            Sign in
          </Button>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row">
          <p>If you do not have an account yet? </p>

          <div className="flex gap-1 sm:ml-1">
            <Link to={NON_AUTHENTICATED_PAGE_URL.REGISTRATION}>
              <p className="text-blue-600 hover:cursor-pointer">Register</p>
            </Link>
            <p> now.</p>
          </div>
        </div>
      </div>
    </FormikContext.Provider>
  );
};

export default LoginPage;