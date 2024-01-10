import FirstForm from "../components/firstform";
import MultiStep from "react-multistep";
import SecondForm from "../components/SecondForm";
import ThirdForm from "../components/ThirdForm";

const Home = () => {
  return (
    <>
      <MultiStep
        activeStep={0}
        prevButton={{ title: "Back" }}
        nextButton={{ title: "Save and Next" }}
      >
        <FirstForm title="1" />
        <SecondForm title="2" />
        <ThirdForm title="3" />
      </MultiStep>
    </>
  );
};

export default Home;
