import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../Image";
import { differenceInCalendarDays, format } from "date-fns";
import Calander from "../images/BookingPageImg";
import { useNavigate } from "react-router-dom";

////////////////////////////////////////////////----My Bookings Page-------------/////////////////////////////
const UserBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [payButtonActive, setPayButton] = useState(false);


  useEffect(() => {
    axios
      .get("/bookings")
      .then((response) => {
        setBookings(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);

      });
  }, []);

  function handleMouseEnter() {
    setPayButton(true);
  }
  function handleMouseLeave() {
    setPayButton(false);
  }

  function handleButtonClick(booking) {
    if (!payButtonActive) {
      navigate(`/place/${booking.place._id}`);
    }
  }

  const handleOpenRazorpay = (bookingData) => {
    const data = bookingData.data;

    console.log(data.id, "------41");
    console.log(bookingData.bookingId, "-----bookingId");


    const options = {
      key: "rzp_test_Vg2BUBiHC0s56u",
      amount: Number(data.amount),
      currency: data.currency,
      order_id: data.id,
      name: "Shopping AMCC",

      handler: function (response) {
        console.log(response, "------23");
        const resData = {
          razorpay_order_id: data.id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          order_id: data.id,
          bookingId: bookingData.bookingId,
        };
        console.log(resData, "------- 24");
        axios
          .post("/verify", resData)
          .then((res) => {
            console.log(res.data, "---------25");
          })
          .catch((err) => {
            console.log(err, "Error->26");
          });
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  const handlePayment = (booking) => {


    const _data = { amount: booking.price };
    axios
      .post("/orders", _data)
      .then((res) => {
        console.log(res.data, "21");
        console.log(booking, "22");
        const bookingData = {
          data: res.data.data,
          bookingId: booking._id
        }
        handleOpenRazorpay(bookingData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <AccountNav />
      <div className="grid gap-2 lg:px-[12rem] lg:py-10 ">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <div
              onClick={() => {
                handleButtonClick(booking);
              }}
              to={"/place/" + booking.place._id}
              className=" cursor-pointer relative flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
              key={booking._id}
            >
              <div className=" w-52">
                <PlaceImg place={booking.place} />
              </div>
              <div className=" py-3 pr-3 grow ">
                <h2 className=" text-sm sm:text-base  md:text-lg">
                  {" "}
                  {booking.place.title}
                </h2>
                <div className=" text-sm sm:text-base  flex gap-1 items-center border-t border-gray-300 mt-1 py-1 ">
                  <Calander />
                  {format(new Date(booking.checkIn), "yyyy-MM-dd")} &rarr;
                  <Calander />
                  {format(new Date(booking.checkOut), "yyyy-MM-dd")}
                </div>
                <div className=" text-sm sm:text-base  font-mono">
                  Number of nights:{" "}
                  {differenceInCalendarDays(
                    new Date(booking.checkOut),
                    new Date(booking.checkIn)
                  )}
                  <br />
                  Total Price: ₹{booking.price}
                </div>
              </div>
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="  absolute bottom-10 right-12 "
              >
                {booking.payment !== "paid" ? (<button
                  onClick={() => {
                    handlePayment(booking);
                  }}
                  className=" bg-purple-500 hover:bg-purple-700 text-white text-md rounded-xl p-1"
                >
                  Pay Now
                </button>) : (<div className=" bg-pink-500  text-white text-md rounded-xl px-4 py-1">paid</div>)}

              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserBookings;
