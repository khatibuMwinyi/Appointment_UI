import { Link } from "react-router-dom";

const SpecialityCard = ({ index, item }) => {
  return (
    <div>
      <Link
        onClick={() => scrollTo(0, 0)}
        key={index}
        to={`/doctors/${item.speciality}`}
        className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
      >
        <img className="w-16 sm:w-24 mb-2" src={item.image} alt="" />
        <p>{item.speciality}</p>
      </Link>
    </div>
  );
};

export default SpecialityCard;
