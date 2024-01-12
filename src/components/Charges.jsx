import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

const Charges = ({ selectedSeats, seatData }) => {
  const API_URL = "https://codebuddy.review";
  const [min, setMin] = useState(true);
  const [buttonMessage, setButtonMessage] = useState("Book the Ticket");
  const navigate = useNavigate();

  useEffect(() => {
    setMin(selectedSeats.length === 0);
    if (selectedSeats.length > 5) {
      alert("You can Select only 5 seats");
    }
  }, [selectedSeats]);

  function calculateSeatCharge(rowNumber) {
    if (rowNumber === 0) {
      return rowNumber + 1 * 10;
    }

    return rowNumber * 10;
  }

  async function handleSubmit() {
    const requestBody = {
      selectedSeats,
    };

    try {
      const response = await fetch(`${API_URL}/submit`, {
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const responseData = await response.json();
        setButtonMessage("Ticket Booked");
        console.log("Ticket booked successfully!", responseData);
        navigate("/posts");
      } else {
        setButtonMessage("Booking Failed Try again");
        console.error("Failed to book ticket");
      }
    } catch (error) {
      console.error("Error booking ticket:", error);
    }
  }

  return (
    <>
      <style jsx>{`
        .seat {
          @apply relative top-0.5 inline-block h-3 w-4 rounded-tl-lg rounded-tr-lg transition-transform duration-300;
        }
        .seat.blocked {
          @apply bg-black;
        }
        .seat.selected {
          @apply bg-green-500 shadow-md;
        }
        .seat.available {
          @apply cursor-pointer bg-gray-300 hover:bg-gray-400;
        }
        .ShowCase {
          @apply mb-12 flex items-center justify-center rounded-lg bg-gray-100 px-3 py-3 text-gray-500 shadow;
        }
        .ShowCase li {
          @apply mx-3;
        }
        .seat-item {
          @apply my-2 flex items-center justify-between rounded-lg bg-white px-4 py-2 shadow-sm;
        }
        .total-charge {
          @apply mt-4 rounded-lg bg-indigo-500 p-4 text-lg font-semibold text-white shadow-md;
        }
        button {
          @apply rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50;
        }
      `}</style>
      <div className="rounded-lg border border-gray-300 bg-white p-5 shadow-md">
        <h2 className="py-5 text-center text-3xl font-bold text-black decoration-indigo-300">
          Charges
        </h2>
        <ul className="divide-y divide-gray-200">
          {selectedSeats.map((selectedSeat) => {
            const splitted = selectedSeat.split("&");
            const rowId = splitted[0];
            const seatId = splitted[1];

            const row = seatData.find((rowData) => rowData.id === rowId);
            if (!row) return null;

            const seats = row.seats.find((seat) => seat.id === seatId);
            if (!seats) return null;

            const rowNumber = seats.row;
            const seatCharge = calculateSeatCharge(rowNumber);

            return (
              <li key={selectedSeat} className="seat-item flex justify-between p-3">
                <span className="font-medium">
                  Seat {seats.seatNumber} (Row {rowNumber}):
                </span>
                <span className="font-semibold">${seatCharge}</span>
              </li>
            );
          })}
        </ul>
        <p className="total-charge m-auto mt-4 w-full max-w-lg rounded-md  bg-blue-600 p-3 text-center text-lg font-bold text-white shadow">
          Total Charge: $
          {selectedSeats.reduce((total, selectedSeat) => {
            const splitted = selectedSeat.split("&");
            const rowId = splitted[0];
            const seatId = splitted[1];

            const row = seatData.find((rowData) => rowData.id === rowId);
            if (!row) return total;

            const seatss = row.seats.find((seat) => seat.id === seatId);
            if (!seatss) return total;

            const rowNumber = seatss.row;
            const seatCharge = calculateSeatCharge(rowNumber);

            return total + seatCharge;
          }, 20)}
        </p>
      </div>
      <Button
        onClick={() => handleSubmit()}
        className="mx-auto mt-2.5 block rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={min}
      >
        {buttonMessage}
      </Button>
    </>
  );
};

export default Charges;
