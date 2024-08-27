import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-around items-center">
      <div className="navbar flex justify-between w-full border-b-2 border-gray-800 px-5 py-4 sm:px-12 text-lg bg-gray-900 text-white">
        <p className="font-bold">Admin Panel</p>
        <Link to="/">
          <p className="cursor-pointer text-2xl pr-16 hover:text-gray-400">Homepage</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
