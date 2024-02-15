import {
  Parking,
  SwimingPool,
  Wifi,
  TV,
  Pets,
  PivateEnterence,
} from "../images/Imageperks";
const Perks = ({ selected, onChange }) => {
  //

  function handleCbClick(ev) {
    // console.log(ev.target.name);
    const { checked, name } = ev.target;
    if (checked) {
      // const {wifi}=[...selected];
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  }

  return (
    <>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("wifi")}
          name="wifi"
          onChange={handleCbClick}
        />
        <Wifi />
        <span>Wifi</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("Parking")}
          name="Parking"
          onChange={handleCbClick}
        />
        <Parking />
        <span>Free parking spot</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("TV")}
          name="TV"
          onChange={handleCbClick}
        />
        <TV />
        <span>Tv</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("Pets")}
          name="Pets"
          onChange={handleCbClick}
        />
        <Pets />
        <span>Pets</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("PrivateEnterence")}
          name="PrivateEnterence"
          onChange={handleCbClick}
        />
        <PivateEnterence />
        <span>Pivate enterance</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("SwimingPool")}
          name="SwimingPool"
          onChange={handleCbClick}
        />
        <SwimingPool />
        <span>Swiming pool</span>
      </label>
    </>
  );
};

export default Perks;
