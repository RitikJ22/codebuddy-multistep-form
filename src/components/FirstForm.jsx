import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const FirstForm = () => {
  const validationSchema = Yup.object().shape({
    emailId: Yup.string().required("Email is required").email("Must be a valid email ID"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*].*[!@#$&*])(?=.*\d.*\d)(?=.*[a-z].*[a-z]).{8,}$/,
        "Must contain minimum 2 capital letters, 2 small letters, 2 numbers and 2 special characters",
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    //setSaveFormData(data);
    console.log(data);
    localStorage.setItem("data", JSON.stringify(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mb-4 mt-10 max-w-md rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-center text-2xl font-semibold">Form</h2>
      <div className="mb-4">
        <label htmlFor="emailId" className="mb-2 block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="emailId"
          name="emailId"
          type="email"
          {...register("emailId")}
          className={`w-full rounded-lg border p-2 text-sm ${
            errors.emailId ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.emailId && (
          <p className="mt-1 text-xs italic text-red-500">{errors.emailId.message}</p>
        )}
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          {...register("password")}
          className={`w-full rounded-lg border p-2 text-sm ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-xs italic text-red-500">{errors.password.message}</p>
        )}
      </div>
      <button type="submit" className="mb-4 w-full rounded-lg bg-blue-500 py-2 text-sm text-white">
        Save
      </button>
    </form>
  );
};

export default FirstForm;
