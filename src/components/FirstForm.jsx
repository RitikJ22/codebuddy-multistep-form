import { Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";

const FormStep1 = ({ control, errors }) => (
  <Form className="sm:min-w-[400px]">
    <Form.Group className="my-6 flex flex-col">
      <Form.Label className="form-label">Email *</Form.Label>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { name, onChange, value } }) => (
          <>
            <Form.Control
              className="form-input rounded-md border px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={value}
              onChange={onChange}
              type="email"
              name={name}
            />
            {errors.email && (
              <div className="error-message" style={{ color: "red", fontSize: "0.8em" }}>
                {errors.email.message}
              </div>
            )}
          </>
        )}
        rules={{
          required: {
            value: true,
            message: "This field is required!",
          },
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Must be a valid email ID",
          },
        }}
      />
    </Form.Group>
    <Form.Group className="mb-3 flex flex-col">
      <Form.Label className="form-label">Password *</Form.Label>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field: { name, onChange, value } }) => (
          <>
            <Form.Control
              className="form-input rounded-md border px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={value}
              onChange={onChange}
              type="password"
              name={name}
            />
            {errors.password && (
              <div className="error-message" style={{ color: "red", fontSize: "0.8em" }}>
                {errors.password.message}
              </div>
            )}
          </>
        )}
        rules={{
          required: {
            value: true,
            message: "This field is required!",
          },
          pattern: {
            value: /^(?=(.*[A-Z]){2})(?=(.*[a-z]){2})(?=(.*\d){2})(?=(.*[\W_]){2}).{8,}$/,
            message:
              "Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters.",
          },
        }}
      />
    </Form.Group>
  </Form>
);

export default FormStep1;
