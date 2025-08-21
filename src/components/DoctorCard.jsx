import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/appointment/${doctor._id}`);
        scrollTo(0, 0);
      }}
      className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
    >
      <img className="bg-blue-50 " src={doctor.image} alt="" />
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-green-500">
          <p className="w-2 h-2 bg-green-500 rounded-full"></p>
          <p>Available</p>
        </div>
        <p className="text-lg text-gray-900 font-medium">{doctor.name}</p>
        <p className="text-small text-gray-600">{doctor.speciality}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
