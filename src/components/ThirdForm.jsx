import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const ThirdForm = ({ setSaveFormData }) => {
  const navigate = useNavigate();
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
    navigate("/confirmationPage"); // Assuming the next page is called 'confirmationPage'
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 shadow-md">
        <h2 className="my-4 text-center text-2xl">Form</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700">
              Country Code
            </label>
            <select
              id="countryCode"
              name="countryCode"
              {...register("countryCode")}
              className={`mt-1 block w-full rounded-md border-gray-300 ${
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
              className={`mt-1 block w-full rounded-md border-gray-300 ${
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
              className={`ml-2 block text-sm ${
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
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default ThirdForm;
