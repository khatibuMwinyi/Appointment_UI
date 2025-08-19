import { specialityData } from "../assets/assets";
import SpecialityCard from "./SpecialityCard";

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="flex flex-col items-center gap-4 py-16 text-gray-800 "
    >
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free
      </p>
      <div className="flex gap-4 w-full pt-5 overflow-scroll justify-center">
        {specialityData.map((item, index) => (
          <SpecialityCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default SpecialityMenu;
