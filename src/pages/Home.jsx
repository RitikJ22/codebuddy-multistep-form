import { useState } from "react";
import FirstForm from "../components/FirstForm";
import MultiStep from "react-multistep";
import SecondForm from "../components/SecondForm";
import ThirdForm from "../components/ThirdForm";

const Home = () => {
  const [formData, setFormData] = useState({
    firstForm: {},
    secondForm: {},
    thirdForm: {},
  });

  const handleFormSave = (step, data) => {
    setFormData((prev) => ({ ...prev, [step]: data }));
  };

  const commonButtonStyle = {
    borderRadius: "0.5rem",
    backgroundColor: "#3B82F6",
    padding: "0.5rem",
    fontSize: "0.875rem",
    color: "white",
    margin: "auto",
    maxWidth: "28rem",
    width: "100%",
  };

  return (
    <>
      <MultiStep
        activeStep={0}
        prevButton={{
          title: "Back",
          style: {
            ...commonButtonStyle,
            marginBottom: "10px",
          },
        }}
        nextButton={{
          title: "Save and Next",
          style: {
            ...commonButtonStyle,
            marginTop: "10px",
          },
        }}
      >
        <FirstForm
          title="1"
          saveFormData={(data) => handleFormSave("firstForm", data)}
          initialFormData={formData.firstForm}
        />
        <SecondForm
          title="2"
          saveFormData={(data) => handleFormSave("secondForm", data)}
          initialFormData={formData.secondForm}
        />
        <ThirdForm
          title="3"
          saveFormData={(data) => handleFormSave("thirdForm", data)}
          initialFormData={formData.thirdForm}
        />
      </MultiStep>
    </>
  );
};

export default Home;
