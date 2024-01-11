import FirstForm from "../components/FirstForm";
import MultiStep from "react-multistep";
import SecondForm from "../components/SecondForm";
import ThirdForm from "../components/ThirdForm";

const Home = () => {
  const commonButtonStyle = {
    borderRadius: "0.5rem",
    backgroundColor: "#3B82F6",
    padding: "0.5rem",
    fontSize: "0.875rem",
    color: "white",
    margin: "auto",
    maxWidth: "16rem",
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
        <FirstForm title="1" />
        <SecondForm title="2" />
        <ThirdForm title="3" />
      </MultiStep>
    </>
  );
};

export default Home;
