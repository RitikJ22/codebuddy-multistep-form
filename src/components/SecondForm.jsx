import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const SecondForm = () => {
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold">Form</h2>
      <div className="flex flex-col space-y-2">
        <label htmlFor="firstName" className="font-medium">
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          {...register("firstName")}
          className={`form-input rounded-md border p-2 ${
            errors.firstName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.firstName && (
          <p className="text-xs italic text-red-500">{errors.firstName.message}</p>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="lastName" className="font-medium">
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          {...register("lastName")}
          className={`form-input rounded-md border p-2 ${
            errors.lastName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.lastName && (
          <p className="text-xs italic text-red-500">{errors.lastName.message}</p>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="address" className="font-medium">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          {...register("address")}
          className={`form-input rounded-md border p-2 ${
            errors.address ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.address && <p className="text-xs italic text-red-500">{errors.address.message}</p>}
      </div>
      <button type="submit" className="rounded-md bg-blue-500 p-2 text-white">
        Save
      </button>
    </form>
  );
};

export default SecondForm;
