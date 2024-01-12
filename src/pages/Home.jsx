import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Seats from "../components/Seats";

const Home = () => {
  const [row, setRow] = useState(3);
  const [map, setMap] = useState();

  function ShowCase() {
    return (
      <ul className="mb-12 flex w-full justify-center rounded border bg-white p-3 text-gray-500 shadow-lg">
        <li className="mx-3 flex items-center">
          <span className="mr-2 inline-block h-3 w-4 rounded bg-black" />
          <small>Theatre Blocked</small>
        </li>
        <li className="mx-3 flex items-center">
          <span className="mr-2 inline-block h-3 w-4 rounded bg-green-500" />
          <small>Selected</small>
        </li>
        <li className="mx-3 flex items-center">
          <span className="mr-2 inline-block h-3 w-4 rounded bg-gray-400" />
          <small>Available</small>
        </li>
      </ul>
    );
  }

  const handleButtonClick = () => {
    if (row >= 3 && row <= 10) {
      setMap(<Seats numRows={row} />);
    } else {
      alert("Number of rows must be between 3 and 10.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <header className="mb-5 text-center text-2xl font-bold text-gray-700">
        Enter the number of Rows
      </header>
      <Form className="w-full max-w-md rounded-lg border bg-white p-6 shadow-xl">
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label className="font-semibold text-gray-700">Number of Rows</Form.Label>
          <Form.Control
            className="mt-2 block w-full rounded-md border-gray-300 p-3 text-gray-700 transition-colors ease-in-out focus:border-blue-500 focus:ring-blue-200"
            onChange={(e) => setRow(Number(e.target.value))}
            type="number"
            placeholder="Enter Number of Rows"
            min={3}
            max={10}
          />
        </Form.Group>
        <Button
          className="mb-4 w-full rounded-md border-0 bg-blue-600 py-2.5 text-white shadow-sm hover:bg-blue-700
          "
          onClick={handleButtonClick}
        >
          Get Seats
        </Button>
        <ShowCase />
      </Form>
      {map}
    </main>
  );
};

export default Home;
