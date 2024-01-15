import { Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";

const FormStep3 = ({ control, errors }) => (
  <Form className="my-6 sm:min-w-[400px]">
    <Form.Group className="mb-3 flex flex-col" controlId="formCountryCode">
      <Form.Label>Country code *</Form.Label>
      <Controller
        name="countryCode"
        control={control}
        defaultValue="+91"
        render={({ field: { name, onChange, value } }) => (
          <>
            <Form.Select
              className="custom-select rounded-md border px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              name={name}
              onChange={(e) => onChange(e.target.value)}
              value={value}
              aria-label="Choose country code"
            >
              <option value="+91">(+91) India</option>
              <option value="+1">(+1) America</option>
            </Form.Select>
            {errors.countryCode && (
              <div style={{ color: "red", fontSize: "0.8em" }}>{errors.countryCode.message}</div>
            )}
          </>
        )}
        rules={{
          required: {
            value: true,
            message: "This field is required!",
          },
        }}
      />
    </Form.Group>
    <Form.Group className="mb-3 flex flex-col" controlId="formPhoneNumber">
      <Form.Label>Phone number *</Form.Label>
      <Controller
        name="phoneNumber"
        control={control}
        defaultValue=""
        render={({ field: { name, onChange, value } }) => (
          <>
            <Form.Control
              className="form-input rounded-md border px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={value}
              onChange={onChange}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              name={name}
              placeholder="Enter 10-digit phone number"
            />
            {errors.phoneNumber && (
              <div className="error-message" style={{ color: "red", fontSize: "0.8em" }}>
                {errors.phoneNumber.message}
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
            value: /^\d{10}$/,
            message: "Only 10 digits are allowed!",
          },
        }}
      />
    </Form.Group>
    <Form.Group className="mb-3 flex flex-col" controlId="formAcceptTerms">
      <Controller
        name="acceptTermsAndCondition"
        control={control}
        defaultValue=""
        render={({ field: { name, onChange, checked } }) => (
          <>
            <Form.Check
              className="form-checkbox rounded-md border px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="checkbox"
              name={name}
              onChange={onChange}
              checked={checked}
              label="I accept all terms and conditions"
            />
            {errors.acceptTermsAndCondition && (
              <div className="error-message" style={{ color: "red", fontSize: "0.8em" }}>
                {errors.acceptTermsAndCondition.message}
              </div>
            )}
          </>
        )}
        rules={{
          required: {
            value: true,
            message: "You must accept the terms and conditions!",
          },
        }}
      />
    </Form.Group>
  </Form>
);

export default FormStep3;
