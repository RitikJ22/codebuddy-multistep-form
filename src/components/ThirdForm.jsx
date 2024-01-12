import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const handleSubmitForm = async (data) => {
  try {
    const firstFormData = JSON.parse(sessionStorage.getItem("firstFormData")) || {};
    const secondFormData = JSON.parse(sessionStorage.getItem("secondFormData")) || {};
    const { acceptTermsAndCondition, ...formDataWithoutAccept } = data;
    const finalData = {
      ...firstFormData,
      ...secondFormData,
      ...formDataWithoutAccept,
    };

    const response = await fetch("https://codebuddy.review/submit", {
      method: "POST",
      body: JSON.stringify(finalData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Submission successful", result);
    // Handle success, show message to user, navigate to next page, etc.
  } catch (error) {
    console.error("Submission failed", error);
    // Handle errors, show error message to user, etc.
  }
};

const ThirdForm = (props) => {
  const validationSchema = Yup.object().shape({
    countryCode: Yup.string()
      .required("Country code is required")
      .oneOf(["+91", "+1"], "Country code must be +91 for India or +1 for America"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be 10 digits"),
    acceptTermsAndCondition: Yup.bool()
      .oneOf([true], "You must accept the terms and conditions")
      .required("You must accept the terms and conditions"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
  const onSubmit = (data) => {
    sessionStorage.setItem("thirdFormData", JSON.stringify(data));
    signalParent(true);
    handleSubmitForm(data);
    navigate("/posts");
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem("secondFormData");
    if (storedData) {
      const formData = JSON.parse(storedData);
      for (const key in formData) {
        setValue(key, formData[key], { shouldValidate: true });
      }
    }
  }, [setValue]);

  const [isValidSate, setIsValidState] = useState(false);
  const signalParent = (isValid) => {
    setIsValidState(isValid);
    props.signalIfValid(isValid);
  };

  useEffect(() => {
    signalParent(isValidSate);
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto my-10 flex max-w-md flex-col space-y-4 rounded-lg bg-white  p-6  shadow-md"
      >
        <h2 className="text-center text-2xl font-semibold text-gray-800">Form</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="countryCode" className="mb-2 block text-sm font-medium text-gray-700">
              Country Code
            </label>
            <select
              id="countryCode"
              name="countryCode"
              {...register("countryCode")}
              className={`mt-1 block w-full rounded-md border-gray-300 text-sm ${
                errors.countryCode ? "border-red-500" : ""
              }`}
              required
            >
              <option value="">Select Country Code</option>
              <option value="+91">India (+91)</option>
              <option value="+1">America (+1)</option>
            </select>
            {errors.countryCode && (
              <p className="text-xs text-red-500">{errors.countryCode.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              {...register("phoneNumber")}
              className={`mt-1 block w-full rounded-md border-2 border-gray-300 p-2 ${
                errors.phoneNumber ? "border-red-500" : ""
              }`}
              required
            />
            {errors.phoneNumber && (
              <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>
          <div className="flex items-center">
            <input
              id="acceptTermsAndCondition"
              type="checkbox"
              {...register("acceptTermsAndCondition")}
              className={`h-4 w-4 rounded border-gray-300 text-blue-600 ${
                errors.acceptTermsAndCondition ? "border-red-500" : ""
              }`}
              required
            />
            <label
              htmlFor="acceptTermsAndCondition"
              className={`ml-2 block text-sm font-medium text-gray-700 ${
                errors.acceptTermsAndCondition ? "text-red-500" : "text-gray-600"
              }`}
            >
              I accept the Terms and Conditions *
            </label>
          </div>
          {errors.acceptTermsAndCondition && (
            <p className="text-xs text-red-500">{errors.acceptTermsAndCondition.message}</p>
          )}
        </div>
        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="mb-4 w-full rounded-lg bg-blue-500 py-2 text-sm text-white"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default ThirdForm;
