import { useState } from "react";
import { useForm } from "react-hook-form";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormStep1 from "../components/FirstForm";
import FormStep2 from "../components/SecondForm";
import FormStep3 from "../components/ThirdForm";

const Home = () => {
  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
    trigger,
  } = useForm();

  const [step, setStep] = useState({
    currentStep: 1,
    totalSteps: 3,
    visited: [1],
  });
  const tabs = [
    {
      component: <FormStep1 errors={errors} control={control} />,
    },
    {
      component: (
        <FormStep2 setError={setError} trigger={trigger} errors={errors} control={control} />
      ),
    },
    {
      component: <FormStep3 errors={errors} control={control} />,
    },
  ];

  const navigate = useNavigate();
  const goToPostPage = () => navigate("/posts");

  const handleTabSelect = (stepCount) => {
    const currentStep = Number(stepCount);
    if (step.visited.includes(currentStep)) {
      setStep({
        ...step,
        currentStep,
      });
    }
  };

  const goBack = () => {
    if (step.currentStep !== 1) {
      setStep({
        ...step,
        currentStep: step.currentStep - 1,
      });
    }
  };

  const handleSaveAndNext = (data, save = false) => {
    if (save) {
      if (step.currentStep === step.totalSteps) {
        const finalData = { ...data };
        delete finalData.acceptTermsAndCondition;
        fetch("https://codebuddy.review/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        })
          .then(() => {
            goToPostPage();
            toast.success("Form submitted successfully!");
            console.log(finalData);
          })
          .catch(() => {
            toast.error("Failed to submit the form! Please try again later.");
          });
      } else {
        toast.success("Form details have been saved!");
      }
    } else {
      setStep({
        ...step,
        currentStep: step.currentStep + 1,
        visited: [...new Set([...step.visited, step.currentStep + 1])],
      });
    }
  };

  return (
    <main className="container mx-auto my-10 max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-8 text-center">
        <h3 className="text-xl font-semibold text-gray-700">
          Step: {step.currentStep} out of {step.totalSteps}
        </h3>
      </div>
      <Form className="flex flex-col items-center rounded-lg bg-gray-100 p-8 shadow-md">
        <Tabs
          activeKey={step.currentStep}
          onSelect={handleTabSelect}
          className="flex w-full max-w-lg justify-between border-b border-gray-300"
        >
          {tabs.map((each, index) => (
            <Tab
              key={index}
              disabled={!step.visited.includes(index + 1)}
              eventKey={index + 1}
              title={`Step ${index + 1}`}
              tabClassName={`px-4 py-2 text-sm font-medium text-center rounded-t-lg transition-colors duration-150 ${
                step.currentStep === index + 1
                  ? "text-blue-600 bg-white border-b-2 border-blue-500"
                  : "text-gray-600 bg-gray-100 hover:text-gray-900 hover:bg-gray-50"
              }`}
              className="focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <div
                className={`transition-opacity duration-300 ease-in-out ${
                  step.currentStep === index + 1 ? "opacity-100" : "hidden opacity-0"
                }`}
              >
                {step.currentStep === index + 1 && each.component}
              </div>
            </Tab>
          ))}
        </Tabs>
      </Form>
      <div className="mt-10 flex justify-between">
        <Button
          disabled={step.currentStep === 1}
          onClick={goBack}
          className="rounded-lg bg-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit((data) => handleSaveAndNext(data, true))}
          className="rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-600"
        >
          Save
        </Button>
        <Button
          disabled={step.currentStep === step.totalSteps}
          onClick={handleSubmit((data) => handleSaveAndNext(data, false))}
          className="rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save and Next
        </Button>
      </div>
    </main>
  );
};

export default Home;
