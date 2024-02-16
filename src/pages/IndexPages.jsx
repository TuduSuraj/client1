import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, } from "react-router-dom";
import Carousel from "../Carousel";
import { UserContext } from "../UserContext";


//----------------------------------Main Front Page------------------------------------//

const IndexPage = () => {
  const { city } = useContext(UserContext);

  const [places, setPlaces] = useState([]);

  const [isLInk, setIsLink] = useState(true);
  const [onHover, seIsHOver] = useState(false);
  const [placeId, setPlaceId] = useState("");
  const navigate = useNavigate();
  console.log(onHover, "at loading");
  useEffect(() => {
    if (!city) {
      axios.get("/places").then((response) => {
        setPlaces(response.data);
        console.log("All places are loaded");
      });
    }

    if (city) {
      axios.post("/citywise", { city: city }).then((res) => {
        console.log(res);
        setPlaces(res.data);
      });
      console.log("indexpage/// city", { city: city });


    }
  }, [city]);

  const handleClick = (place) => {

    if (isLInk) {
      navigate(`/place/${place._id}`);
    }
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="basis-[20%] container pt-10 mt-8 w-full ml-10  ">
        <div className="m-auto text-white pt-4 pb-8 rounded-2xl bg-gradient-to-r from-[#2f4662] f6rom-20% via-[#233245] via-0% to-[#305582] to-90">
          <div className="text-lg mt-[2rem] ml-[2rem] pt-1 bg-gradient-to-r from-[#2f4662] f6rom-20% via-[#233245] via-0% to-[#305582] to-90%">Price per night</div>
          <div className="text-lg mt-4 ml-[3rem] font-sans">
            <input type="checkbox" />   ₹1000 - ₹2000
            <br />
            <input type="checkbox" />   ₹2000- ₹5000
            <br />
            <input type="checkbox" />   ₹5000- ₹8000
            <br />
            <input type="checkbox" />   ₹8000- ₹12000
            <br />
            <input type="checkbox" />   ₹12000- ₹20000
          </div>

          <div className="mt-4 pl-8 text-lg font-normal "> Budget Range:</div>
          <div className="mt-2  flex flex-auto  ">
            <input className="box-content text-gray-500 h-8 w-3 ml-7 mr-2" type="number" placeholder="Min" />
            <div className="mt-4 mr-2">to</div>
            <input className="box-content h-8 w-3 mr-10" type="number" placeholder="Max" />
          </div>
        </div>
        <div className=" mt-[2rem] pl-[2rem] pt-[3rem] pb-[3rem] rounded-xl text-md text-[#ffffff] bg-gradient-to-r from-[#2f4662] f6rom-20% via-[#233245] via-0% to-[#305582] to-90% ">
          <div className="ml-4">Star Category</div>
          <div className=" mt-4 ml-[2rem] font-sans">
            <input type="checkbox" />  5 Star
            <br />
            <input type="checkbox" />  4 Star
            <br />

            <input type="checkbox" />  3 Star
            <br />
          </div>
        </div>
      </div>
      <div className="basis-[80%]  mt-8  grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3  lg:grid-cols-4 lg:p-10 ">
        {places.length > 0 &&
          places.map((place) => (
            <div
              onClick={() => handleClick(place)}
              key={place._id}
              className=" cursor-pointer  rounded-2xl "
            >
              <div className=" bg-gray-500 mb-2  rounded-2xl flex">
                {place.photos?.[0] && (
                  <div
                    onMouseEnter={() => {
                      console.log(onHover, "onEnter");
                      console.log(place._id, " placeId");
                      seIsHOver(true);
                      setPlaceId(place._id);
                    }}
                    onMouseLeave={() => {
                      console.log(onHover, "OnExit");
                      seIsHOver(false);
                    }}
                    className=" rounded-2xl "
                  >
                    <Carousel
                      onHover={onHover}
                      isLInk={isLInk}
                      setIsLink={setIsLink}
                      buttonVisible={place._id == placeId ? true : false}
                    >
                      {place.photos.map((s) => (
                        <img
                          className="rounded-2xl object-cover aspect-square"
                          key={s}
                          src={"http://localhost:4000/uploads/" + s}
                        />
                      ))}
                    </Carousel>
                    {/* <img
             className="rounded-2xl object-cover aspect-square"
             src={"http://localhost:4000/uploads/" + place.photos?.[0]}
           />
            */}
                  </div>
                )}
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="checkbox
  -sm  ">{place.title}</h3>
              <div>
                <span className="font-bold"> ₹{place.price}</span> per night
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default IndexPage;

