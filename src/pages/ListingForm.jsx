import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Perks from "./perksChild";
import axios from "axios";
import AccountNav from "../AccountNav";
import { useNavigate, useParams } from "react-router-dom";
//

const ListingForm = () => {
  const { id } = useParams();
  console.log("here is the id--->", { id });

  console.log("from listing page!!");


  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(500);
  const [city, setCity] = useState("");
  // const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((res) => {
      const { data } = res;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
      setCity(data.city);
    });
  }, [id]);

  const placeData = {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    city,
    price,
  };

  async function savePlace(ev) {
    ev.preventDefault();
    if (id) {
      await axios
        .put("/places", {
          id,
          ...placeData,
        })
        .then(() => {
          // setRedirect(true);
          console.log("updating the form: done");
          navigate("/account/places");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await axios
        .post("/places", placeData)
        .then(() => {
          // setRedirect(true);
          console.log("posting the form: done");
          navigate("/account/places");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function preInput(header, description) {
    return (
      <>
        <h2 className="text-2xl mt-4">{header}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </>
    );
  }

  // if (redirect) {
  //   return <Navigate to={"/account/places"} />;
  // }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          "Title",
          "Title for your place. should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: My lovely apt"
        />
        {preInput("City Name")}
        <input
          type="text"
          value={city}
          onChange={(ev) => setCity(ev.target.value)}
          placeholder="City"
        />
        {preInput("Address", "Address to this place")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="address"
        />
        {preInput("Photos", "more = better")}
        <PhotosUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />
        {preInput("Description", "description of the place")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Perks", "select all the perks of your place")}
        <div className="mt-2 gap-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Extra info", "house rules, etc")}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />

        {preInput("Check in&out times", "Add check in and out times")}
        <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-2">
          <div>
            <h3 className="mt-2 -mb-1 ">Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 ">Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="11"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 ">Max number of guests</h3>
            <input
              type="text"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              placeholder="8"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 ">Price per night</h3>
            <input
              type="text"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              placeholder="8"
            />
          </div>
        </div>
        <div>
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
};

export default ListingForm;
