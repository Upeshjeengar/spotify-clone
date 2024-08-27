import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="bg-[#003A10] min-h-screen pl-[4vw]">
      <Link to="/">
        <img
          src={assets.logo}
          style={{ width: "250px" }}
          className="mt-5 mr-2 w-[max(10vw, 100px)] hidden sm:block"
          alt=""
        />
      </Link>
      <img
        src={assets.logo_small}
        style={{ width: "60px" }}
        className="mt-5 mr-3 w-[max(5vw, 40px)] block sm:hidden"
        alt=""
      />
      <div className="flex flex-col gap-5 mt-10">
        <NavLink
          to="/admin/add-song"
          className="flex items-center gap-2.5 text-gray-800 bg-white border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.add_song} className="w-5" alt="" />
          <p className="hidden sm:block">Add Song</p>
        </NavLink>

        <NavLink
          to="/admin/list-song"
          className="flex items-center gap-2.5 text-gray-800 bg-white border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.song_icon} className="w-5" alt="" />
          <p className="hidden sm:block">List Song</p>
        </NavLink>

        <NavLink
          to="/admin/add-album"
          className="flex items-center gap-2.5 text-gray-800 bg-white border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.add_album} className="w-5" alt="" />
          <p className="hidden sm:block">Add Album</p>
        </NavLink>

        <NavLink
          to="/admin/list-album"
          className="flex items-center gap-2.5 text-gray-800 bg-white border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium"
        >
          <img src={assets.album_icon} className="w-5" alt="" />
          <p className="hidden sm:block">List Album</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
