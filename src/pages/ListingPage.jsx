import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Photo, Close, MapIcon } from "../images/ListingPage";
import BookingWidget from "../BookingWidget";
///
////////////////////////////// this is the page where we are showing the details like Images and location of the Properties or hotels////////////
////                        Also we are Making the booking in this page                //////////

const ListingPage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  console.log({ id });
  console.log(showAllPhotos);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  if (!place) return "";
  if (showAllPhotos) {
    return (
      <div className=" absolute inset-0  bg-black text-white  min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-2xl mr-36">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
            >
              <Close /> Close photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div key={photo}>
                <img src={"https://api1-woad.vercel.app/uploads/" + photo} alt="" />
              </div>
            ))}{" "}
        </div>
      </div>
    );
  }

  return (
    <div className=" lg:px-10 lg:py-10 lg:ml-20">
      <div className=" container mt-4 mx-auto bg-gray-100  px-8 pt-8 rounded-2xl   ">
        <h1 className="text-3xl">{place.title}</h1>
        <a
          className=" flex gap-1 my-3  font-semibold underline"
          target="_blank"
          rel="noreferrer"
          href={"https://maps.google.com/?q=" + place.address}
        >
          <MapIcon /> {place.address}
        </a>
        <div className="relative">
          <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
            <div>
              {place.photos?.[0] && (
                <div>
                  <img
                    onClick={() => setShowAllPhotos(true)}
                    className="cursor-pointer aspect-square object-cover"
                    src={"https://api1-woad.vercel.app/uploads/" + place.photos[0]}
                  />
                </div>
              )}
            </div>

            <div className=" grid">
              {place.photos?.[1] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="cursor-pointer aspect-square object-cover"
                  src={"https://api1-woad.vercel.app/uploads/" + place.photos[1]}
                />
              )}

              <div className=" overflow-hidden ">
                {place.photos?.[2] && (
                  <img
                    onClick={() => setShowAllPhotos(true)}
                    className="cursor-pointer aspect-square object-cover relative top-2"
                    src={"https://api1-woad.vercel.app/uploads/" + place.photos[2]}
                  />
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className="flex gap-1 absolute bottom-2 text-sm right-2 py-2 px-4 bg-white rounded-2xl  shadow-md shadow-gray-500 "
          >
            <Photo />
            Show more photos
          </button>
        </div>

        <div className="  mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Desription</h2>
              {place.description}
            </div>
            Check-in: {place.checkIn} <br />
            Check-out: {place.checkout} <br />
            Max number of guests: {place.maxGuests}
          </div>
          <div>
            <BookingWidget place={place} />
          </div>
        </div>
        <div className=" bg-gray-100  px-8 py-8 border-t">
          <div>
            <h2 className="font-semibold text-2xl"> Extra Info</h2>
          </div>
          <div className=" mb-4 mt-1 my-4 text-sm text-gray-700 leading-5">
            {place.extraInfo}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
