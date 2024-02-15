import { differenceInCalendarDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const BookingWidget = ({ place }) => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile_no, setMobile_no] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    const data = {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone: mobile_no,
      place: place._id,
      price: numberOfDays * place.price,
    };

    await axios
      .post("/bookings", data)
      .then((res) => {
        console.log(res);
        navigate("/account/bookings");
      })
      .catch((err) => {
        console.log(err.response.status);
        console.log(err);
        if (err.response.status === 403 || err.response.status === 401) {
          alert("Please login to make a booking");
        }
        if (err.response.status === 422) {
          alert("form fields can't be empty");
        }
      });
  }
  // console.log(checkIn, checkOut, numberOfGuests, "here----7");

  return (
    <div className="bg-white shadow p-4 rounded-2xl ">
      <div className="text-lg text-center ">
        Price: ₹{place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="  py-3 px-4 ">
            <label>Check in:</label>
            <input
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              className=" cursor-text"
              type="date"
            />
          </div>
          <div className=" py-3 px-4 border-l">
            <label>Check out:</label>
            <input
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              className=" cursor-text"
              type="date"
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
            type="number"
          />
        </div>
        {numberOfDays > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              type="text"
            />
            <label>Phone number:</label>
            <input
              value={mobile_no}
              onChange={(ev) => setMobile_no(ev.target.value)}
              type="tel"
            />
          </div>
        )}
      </div>

      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfDays > 0 && <span> ₹{numberOfDays * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
