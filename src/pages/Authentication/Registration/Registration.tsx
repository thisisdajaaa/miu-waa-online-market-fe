import { FormikContext, useFormik } from "formik";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdEmail, MdKey, MdPeople } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import {
  AUTHENTICATED_URLS,
  NON_AUTHENTICATED_URLS,
} from "@/constants/pageUrl";

import Button from "@/components/Button";
import FormInput from "@/components/Formik/FormInput";
import FormSelect from "@/components/Formik/FormSelect";

import { initialRegistrationForm, roleList } from "./fixtures";
import { RegistrationForm } from "./types";
import { RegistrationFormValidationSchema } from "./validations";

const RegistrationPage: FC = () => {
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const handleSubmit = async (values: RegistrationForm) => {
    console.log(values);
    navigate(AUTHENTICATED_URLS.HOME);
    toast.success("Successfully registered and logged in user!");
  };

  const formikBag = useFormik<RegistrationForm>({
    initialValues: initialRegistrationForm,
    validationSchema: RegistrationFormValidationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  const handleTogglePasswordVisibility = (action: string) => {
    if (action == "password") setIsPasswordVisible((prev) => !prev);
    if (action == "confirm") setIsConfirmPasswordVisible((prev) => !prev);
  };

  return (
    <FormikContext.Provider value={formikBag}>
      <div className="flex w-full max-w-xl flex-col border rounded-md items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8">
          <div className="flex flex-row justify-center">
            <img
              src="/assets/svgs/ecommerce.svg"
              alt="app-icon"
              className="text-center h-[4.25rem] w-[4.25rem]"
            />
          </div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            New Registration
          </h2>
          <div className="flex flex-col gap-4 rounded-md">
            <FormInput
              name="firstName"
              label="First Name"
              isRequired
              placeholder="Enter your First Name"
              leftIcon={<MdPeople />}
            />

            <FormInput
              name="middleName"
              label="Middle Name"
              placeholder="Enter your Middle Name"
              leftIcon={<MdPeople />}
            />

            <FormInput
              name="lastName"
              label="Last Name"
              isRequired
              placeholder="Enter your Last Name"
              leftIcon={<MdPeople />}
            />

            <FormInput
              name="email"
              label="Email"
              isRequired
              placeholder="Enter your email"
              leftIcon={<MdEmail />}
            />

            <FormSelect
              name="role"
              label="Role"
              isRequired
              options={roleList}
            />

            <FormInput
              name="password"
              label="Password"
              isRequired
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter your Password"
              leftIcon={<MdKey />}
              rightIcon={
                isPasswordVisible ? (
                  <FaRegEye
                    onClick={() => handleTogglePasswordVisibility("password")}
                    className="hover:cursor-pointer"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => handleTogglePasswordVisibility("password")}
                    className="hover:cursor-pointer"
                  />
                )
              }
            />

            <FormInput
              name="confirmPassword"
              label="Confirm Password"
              isRequired
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm your Password"
              leftIcon={<MdKey />}
              rightIcon={
                isConfirmPasswordVisible ? (
                  <FaRegEye
                    onClick={() => handleTogglePasswordVisibility("confirm")}
                    className="hover:cursor-pointer"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => handleTogglePasswordVisibility("confirm")}
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
            Register
          </Button>
        </div>

        <div className="mt-6 w-full">
          <Link to={NON_AUTHENTICATED_URLS.LOGIN}>
            <span className="flex items-center justify-center">
              <FaArrowLeftLong className="mr-1" />
              Back to Login
            </span>
          </Link>
        </div>
      </div>
    </FormikContext.Provider>
  );
};

export default RegistrationPage;
