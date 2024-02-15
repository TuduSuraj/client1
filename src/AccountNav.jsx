import { MyBookings, MyProfile, Building } from "./images/AccountNavImg";

import { Link, useLocation } from "react-router-dom";

const AccountNav = () => {
  const { pathname } = useLocation();
  // console.log(pathname);
  let subpage = pathname.split("/")?.[2];
  // console.log(subpage);
  if (subpage === undefined) {
    subpage = "profile";
  }

  function linkClasses(type = null) {
    let classes = " inline-flex gap-1 py-2 px-6  rounded-full  ";
    if (type === subpage) {
      classes += "  bg-primary text-white";
    } else {
      classes += "bg-slate-200";
    }
    return classes;
  }

  return (
    <nav className="w-full pl-3 flex justify-center flex-col sm:flex-row pr-8 mt-8 mb-8 gap-4 ">
      <Link className={linkClasses("profile")} to={"/account"}>
        <MyProfile />
        My profile
      </Link>
      <Link className={linkClasses("bookings")} to={"/account/bookings"}>
        <MyBookings />
        Mybooking
      </Link>
      <Link className={linkClasses("places")} to={"/account/places"}>
        <Building />
        My accommodations
      </Link>
    </nav>
  );
};

export default AccountNav;
