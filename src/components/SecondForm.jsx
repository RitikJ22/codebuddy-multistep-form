import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState, useEffect } from "react";

const SecondForm = (props) => {
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .matches(/^[a-zA-Z\s]*$/, "Only alphabets are allowed for this field")
      .min(2, "Minimum 2 characters")
      .max(50, "Maximum 50 characters"),
    lastName: Yup.string()
      .matches(/^[a-zA-Z\s]*$/, "Only alphabets are allowed for this field")
      .nullable(),
    address: Yup.string().required("Address is required").min(10, "Minimum 10 characters required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    sessionStorage.setItem("secondFormData", JSON.stringify(data));
    signalParent(true);
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mb-4 flex max-w-md flex-col space-y-4  rounded-lg bg-white  p-8 shadow-md"
    >
      <h2 className="text-center text-2xl font-semibold text-gray-800">Form</h2>
      <div className="flex flex-col space-y-1">
        <label htmlFor="firstName" className="mb-2 block  text-sm  font-medium  text-gray-700">
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          {...register("firstName")}
          className={`form-input w-full rounded-lg border-2 p-2 text-sm ${
            errors.firstName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="John"
        />
        {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          {...register("lastName")}
          className={`form-input w-full rounded-lg border-2 p-2 text-sm ${
            errors.lastName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Doe"
        />
        {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="address" className="text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          {...register("address")}
          className={`form-input w-full rounded-lg border-2 p-2 text-sm ${
            errors.address ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="123 Main St"
        />
        {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
      </div>
      <button type="submit" className="mb-4 w-full rounded-lg bg-blue-500 py-2 text-sm text-white">
        Save
      </button>
    </form>
  );
};

export default SecondForm;
