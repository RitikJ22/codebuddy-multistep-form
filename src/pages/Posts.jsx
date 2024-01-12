import { Link } from "react-router-dom";

const Posts = () => (
  <div className="container mx-auto p-4">
    <h1 className="mb-6 text-center text-3xl font-bold">Thanks for Booking with us</h1>
    <Link
      to="/"
      className="rounded-full bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700"
    >
      Book Again
    </Link>
  </div>
);

export default Posts;
