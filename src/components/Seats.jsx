import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Charges from "./Charges";

const Seats = ({ numRows }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatData, setSeatData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSeatData = async () => {
    try {
      const response = await fetch(`https://codebuddy.review/seats?count=${numRows}`);
      const data = await response.json();
      setSeatData(data.data);
      console.log(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching seat data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeatData();
    return () => setSelectedSeats([]);
  }, []);

  const toggleSeat = (row, rowId, seatId) => {
    const selectedSeat = `${rowId}&${seatId}`;
    if (selectedSeats.includes(selectedSeat)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== selectedSeat));
    } else {
      setSelectedSeats([...selectedSeats, selectedSeat]);
    }
  };

  console.log(selectedSeats);
  return (
    <Container>
      <div className="my-12 flex flex-col items-center gap-2.5">
        {!loading &&
          seatData?.map((rowData) => (
            <div key={rowData.id} className="flex gap-2.5">
              {rowData.seats.map((seat) => (
                <div
                  key={seat.id}
                  className={`flex h-10 w-10 transform cursor-pointer items-center justify-center rounded-lg transition-colors duration-300 ease-in-out hover:scale-110 ${
                    seat.isReserved ? " cursor-not-allowed bg-black text-gray-500 " : "bg-gray-300"
                  } ${
                    selectedSeats.includes(`${rowData.id}&${seat.id}`)
                      ? "bg-green-500 hover:bg-green-600"
                      : ""
                  }`}
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    !seat.isReserved ? toggleSeat(rowData.seats.length, rowData.id, seat.id) : ""
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      toggleSeat(rowData.id, seat.id);
                    }
                  }}
                >
                  {seat.seatNumber}
                </div>
              ))}
            </div>
          ))}
      </div>
      <Charges selectedSeats={selectedSeats} seatData={seatData} />
    </Container>
  );
};

export default Seats;
