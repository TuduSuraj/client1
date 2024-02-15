import { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

/* eslint-disable react/prop-types */
export default function Carousel({
  children: slides,
  setIsLink,
  onHover,
  buttonVisible,
}) {
  const [curr, setCurr] = useState(0);

  const handleMouseEnter = () => {
    setIsLink(false);

    //console.log(isLInk, "-------->isLInk Enter");
  };

  const handleMouseLeave = () => {
    setIsLink(true);
    // console.log(isLInk, "-------->isLInk exit");
  };

  function prev() {
    console.log("prev");

    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    console.log(curr);
  }

  const next = () => {
    console.log("next");
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
    console.log(curr);
  };

  return (
    <div className="overflow-hidden relative ">
      <div
        className=" flex transition-transform ease-out duration-500 "
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-between p-2 ${buttonVisible && onHover ? "" : "invisible"
          }`}
      >
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/40 text-gray-800 hover:bg-white "
        >
          <ChevronLeft size={30} />
        </button>
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            next();
          }}
          className={`p-1 rounded-full shadow bg-white/40 text-gray-800 hover:bg-white  `}
        >
          <ChevronRight size={30} />
        </button>
      </div>
      <div className=" absolute  bottom-4 left-0 right-0  ">
        <div
          className={`flex items-center justify-center gap-2 ${buttonVisible && onHover ? "" : "invisible"
            }`}
        >
          {slides.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-2 h-2 bg-white rounded-full ${curr === i ? " p-2" : "bg-opacity-50 "
                }`}
            >
              {" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

