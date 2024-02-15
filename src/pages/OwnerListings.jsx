import { Link } from "react-router-dom";
import { Plus } from "../images/OwnerListingImg";
import { useState, useEffect } from "react";

import axios from "axios";

import AccountNav from "../AccountNav";
import PlaceImg from "../Image";

/////////////////////////////////////////////////////  page-////////////////---------------------------
const OwnerListings = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("/owner-places")
      .then(({ data }) => {
        setPlaces(data);
        // console.log(data);
        console.log("hello");
      })
      .catch((err) => {
        if (err.response.status === 403 || err.response.status === 401) {
          alert("  Login as a owner to list your places");
        }
      });
  }, []);

  return (
    <div>
      <AccountNav />

      <div className="text-center text-sm">
        <br />
        <Link
          className="inline-flex gap-1  bg-primary text-white py-2 px-4 rounded-full"
          to={"/account/places/new"}
        >
          <Plus />
          Add new place
        </Link>
        <br />
        <div className="mt-4 text-lg">
          list of all added places
        </div>
      </div>
      <div className="grid gap-2 mt-4 mx-10">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              key={place._id}
              className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
            >
              <div className=" flex w-32 h-32 bg-gray-300 grow shrink-0">
                <PlaceImg place={place} />
                {/* {console.log(place.photos[0])} */}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl"> {place.title}</h2>
                <p className="text-sm mt-2 "> {place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default OwnerListings;
