import { use, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docInfos, setDocInfos] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfos(docInfo);
    console.log(docInfo);
  };

  const getAvailableSlots = () => {
    const allSlots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      // Create current date for the day
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Set end time for the day (21:00)
      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        // Today: round to next 30-minute slot
        const now = new Date();
        let nextHour = now.getHours();
        let nextMinute = now.getMinutes();

        if (nextMinute >= 30) {
          nextHour += 1;
          nextMinute = 0;
        } else {
          nextMinute = 30;
        }

        // Ensure minimum start at 10:00 AM
        if (nextHour < 10) {
          nextHour = 10;
          nextMinute = 0;
        }

        currentDate.setHours(nextHour, nextMinute, 0, 0);

        // If after end time, skip today
        if (currentDate >= endTime) {
          allSlots.push([]);
          continue;
        }
      } else {
        // Future days: start at 10:00 AM
        currentDate.setHours(10, 0, 0, 0);
      }

      // Generate slots for the day
      const timeSlots = [];
      while (currentDate < endTime) {
        const slotDate = new Date(currentDate);
        const formattedTime = slotDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        timeSlots.push({
          datetime: slotDate,
          time: formattedTime,
        });

        // increment by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfos]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);
  return (
    docInfos && (
      <div>
        {/* --------- Doctors Details --------- */}
        <div className="flex flex-col sm:flex-row gap-4 ">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfos.image}
              alt=""
            />
          </div>
          {/* --------- Doctors Info --------- */}
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <h1 className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfos.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </h1>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfos.degree} - {docInfos.speciality}
              </p>
              <button className="border border-blue-50 py-0.5 px-2 text-xs rounded-full">
                {docInfos.experience}
              </button>
            </div>
            <div>
              <h1 className="flex items-center gap-1 text-sm  font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </h1>
              <p className="text-sm text-gray-500 max-w-[700px]">
                {docInfos.about}
              </p>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Appointment fee:{" "}
              <span className="text-gray-800">
                {currencySymbol}
                {docInfos.fees}
              </span>
            </p>
          </div>
        </div>

        {/*--------- Booking Slots ---------- */}
        <div className="sm:ml-72 sm:pl-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full  cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="flex item-center gap-3 w-full overflow-x-scroll mt-3">
            {docSlots.length > 0 &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time == slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer">
            Book an Appointment
          </button>
        </div>

        {/* --------- List of Related Doctors */}

        <RelatedDoctors docId={docId} speciality={docInfos.speciality} />
      </div>
    )
  );
};

export default Appointment;
