import { Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";

const FormStep2 = ({ control, errors, trigger }) => (
  <Form className="my-6 sm:min-w-[400px]">
    <Form.Group className="mb-3 flex flex-col">
      <Form.Label className="form-label">First Name *</Form.Label>
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        render={({ field: { name, onChange, value } }) => (
          <>
            <Form.Control
              className="form-input rounded-md border px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={value}
              onChange={onChange}
              type="text"
              name={name}
            />
            {errors.firstName && (
              <div className="error-message" style={{ color: "red", fontSize: "0.8em" }}>
                {errors.firstName.message}
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
            value: /^[a-zA-Z]+$/,
            message: "Only alphabets are allowed!",
          },
          minLength: {
            value: 2,
            message: "Minimum 2 characters are required!",
          },
          maxLength: {
            value: 50,
            message: "Maximum 50 characters are allowed!",
          },
        }}
      />
    </Form.Group>
    <Form.Group className="mb-3 flex flex-col">
      <Form.Label className="form-label">Last Name</Form.Label>
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        render={({ field: { name, onChange, value } }) => (
          <>
            <Form.Control
              className="form-input rounded-md border px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onBlur={() => trigger(name)}
              value={value}
              onChange={(e) => {
                trigger(name);
                onChange(e);
              }}
              type="text"
              name={name}
            />
            {errors.lastName && (
              <div className="error-message" style={{ color: "red", fontSize: "0.8em" }}>
                {errors.lastName.message}
              </div>
            )}
          </>
        )}
        rules={{
          pattern: {
            value: /^[a-zA-Z]+$/,
            message: "Only alphabets are allowed!",
          },
        }}
      />
    </Form.Group>
    <Form.Group className="mb-3 flex flex-col">
      <Form.Label className="form-label">Address *</Form.Label>
      <Controller
        name="address"
        control={control}
        defaultValue=""
        render={({ field: { name, onChange, value } }) => (
          <>
            <Form.Control
              className="form-input rounded-md border px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={value}
              onChange={onChange}
              type="text"
              name={name}
            />
            {errors.address && (
              <div className="error-message" style={{ color: "red", fontSize: "0.8em" }}>
                {errors.address.message}
              </div>
            )}
          </>
        )}
        rules={{
          required: {
            value: true,
            message: "This field is required!",
          },
          minLength: {
            value: 10,
            message: "Minimum 10 characters are required!",
          },
        }}
      />
    </Form.Group>
  </Form>
);

export default FormStep2;
