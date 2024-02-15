import { Link } from "react-router-dom";

import { ImgUser, ImgHamberger, ImgSearch, ImgLogo } from "./images/HeadersImg";
import { useContext, useRef } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, city, setCity } = useContext(UserContext);
  const navigate = useNavigate();


  const input = useRef(null);


  const handleClick = (e) => {
    e.preventDefault();
    setCity(input.current.value);
    console.log("city----->", city);
    navigate(`/`);

  };

  return (
    <header className=" flex justify-between h-14  ">
      <Link to={"/"} className="flex items-center m-0 p-0 gap-1">
        <ImgLogo />
        <span className="font-semibold text-xl">AirClick</span>
      </Link>
      <div className="hidden lg:block m-0">
        <form className="  flex border rounded-full m-0 p-0 px-4 gap-2 hover:shadow-md transition cursor-pointer  ">
          <input
            className=" bg-white border border-slate-300 rounded-md text-md hover:shadow-md placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            ref={input}
            type="text"
            placeholder="search city"
          />
          {/* <div className="px-4"> Anywhere</div> */}
          {/* <div className="border-x-[2px] border-gray-300 px-4 ">Any week</div>
          <div className="px-4">Add guest</div> */}
          <button
            type="submit"
            onClick={handleClick}
            className="bg-primary text-white pl-3 mt-2 w-[40px] h-[40px] rounded-full"
          >
            <ImgSearch />
          </button>
        </form>
      </div>
      <Link
        to={user ? "/account" : "/login"}
        className="flex border border-gray-300 rounded-full mt-0 px-4 gap-2 hover:shadow-md transition cursor-pointer flex-row items-center"
      >
        <ImgHamberger />
        <div className=" bg-gray-500 text-white rounded-full border border-gray-500 ">
          <ImgUser />
        </div>
        {!!user && user.name}
      </Link>
    </header>
  );
};

export default Header;
