import { useNavigate } from "react-router-dom";
import { convertDate, indexBestRatioUrl } from "./Services";
import AddToCart from "./AddToCart";
import { IoArrowBackCircleSharp } from "react-icons/io5";

export default function Third({ onScreen, cart, setCart }) {
  const navigate = useNavigate();
  if(onScreen.id){
    localStorage.setItem("onScreen", JSON.stringify(onScreen))
  }
  let data = JSON.parse(localStorage.getItem("onScreen"))
  

  function EventInfo() {
    return (
      <>
        <div className=" flex flex-col items-center text-4xl text-center font-extrabold p-3 m-1 basis-1/3">
          {data.name}
          <br />
          <div className="text-lg">
            {convertDate(data.dates.start.localDate)}{" "}
            {data.dates.start.localTime}
          </div>
        </div>
      </>
    );
  }

  function VenueAddress() {
    return (
      <div className=" flex flex-col justify-center align-center text-left basis-1/3 m-2   p-1">
        Venue address: {data._embedded.venues[0].name}
        {", "}
        {data._embedded.venues[0].address.line1}
        {" - "}
        {data._embedded.venues[0].city.name}
        {" ("}
        {data._embedded.venues[0].country.countryCode}
        {")"}
        <div className="flex border-t-2 border-white md:h-60 h-auto pt-2 overflow-auto text-xs text-justify overflow-ellipsis">
          {data.info ? data.info : "no info to display for this event"}
        </div>
      </div>
    );
  }

  function SeatMap() {
    return (
      <>
        <div className="flex flex-col justify-center items-center p-1 basis-1/3">
          <img
            className="p-2 md:w-full object-contain"
            src={data.seatmap ? data.seatmap.staticUrl : ""}
            alt="#"
            style={{
              display: data.seatmap ? "flex" : "none",
            }}
          ></img>
          <div>
            {data.seatmap ? "site map" : "no site map available for this venue"}
          </div>
        </div>
      </>
    );
  }

  return (
    <div >
      <div >
      <IoArrowBackCircleSharp className="absolute right-0 top-30 md:top-20 cursor-pointer h-12 w-12"
        onClick={() => {
          navigate(-1);
        }}
      />
      </div>
      <div
        className="flex flex-col md:flex-row md:mt-10 h-1/3 md:h-2/4 justify-center "
        style={{
          background: `linear-gradient(to right, black, rgba(0, 0, 0, 0.6), black),
                          url(${
                            localStorage.getItem("image")
                          }) no-repeat 50% 30%`,
        }}
      >
        <EventInfo />
        <VenueAddress />
        <SeatMap /> 
      </div>
      <AddToCart  data={onScreen} cart={cart} setCart={setCart} />
    </div>
  );
}