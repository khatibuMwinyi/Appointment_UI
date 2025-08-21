import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import DoctorCard from "./DoctorCard";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [relDocs, setRelDocs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);
  return (
    <div>
      <section className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
        <h1 className="text-3xl font-medium">Related Doctors</h1>
        <p className="sm:w-1/3 text-sm text-center">
          Simply browse through our extensive list of trusted doctors.
        </p>
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {relDocs.slice(0, 5).map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))}
        </div>
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="bg-blue-50 px-12 py-3 rounded-full mt-10 text-gray-600 cursor-pointer"
        >
          More
        </button>
      </section>
    </div>
  );
};

export default RelatedDoctors;
