import Header from "./Header";
import { Outlet } from "react-router-dom";



const Layout = () => {
  return (
    <div className=" pt-3 border min-h-screen ">
      <div className="container mx-auto px-5">
        <Header />
      </div>
      <div className=" mt-2 border-b-2 border-gray-300"></div>
      <div className=" container w-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

//"py-4 px-8 flex flex-col min-h-screen"
