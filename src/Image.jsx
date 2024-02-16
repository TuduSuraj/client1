const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) return "";

  if (!className) {
    className = "object-cover";
  }

  return (
    <img
      className={className}
      src={"https://api1-woad.vercel.app/uploads/" + place.photos[index]}
      alt=""
    />
  );
};

export default PlaceImg;
