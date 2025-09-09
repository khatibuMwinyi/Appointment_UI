import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, getDoctorsData, token, backendUrl } =
    useContext(AppContext);
  const navigate = useNavigate();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docInfos, setDocInfos] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  //  getAvailableSlots Function
  const getAvailableSlots = () => {
    // Get today's date
    const today = new Date();

    // Array to hold all 7 days of slots
    const allSlots = [];

    for (let i = 0; i < 7; i++) {
      // Create a new date for the current day (today + i days)
      const day = new Date(today);
      day.setDate(today.getDate() + i);

      // Set start and end time for this day
      const start = new Date(day);
      const end = new Date(day);
      end.setHours(21, 0, 0, 0);

      if (i === 0) {
        // Today → round to the next half-hour slot
        let hr = today.getHours(); // current hour
        let min = today.getMinutes() >= 30 ? 0 : 30; // next 30-min increment
        if (today.getMinutes() >= 30) hr++; // move to next hour if past 30
        if (hr < 10) (hr = 10), (min = 0); // minimum start at 10:00 AM

        start.setHours(hr, min, 0, 0); // set start time for today

        // If rounded time is after end time, skip today
        if (start >= end) {
          allSlots.push([]);
          continue; // skip to next day
        }
      } else {
        // Future days → always start at 10:00 AM
        start.setHours(10, 0, 0, 0);
      }

      // Generate 30-minute slots for this day
      const slots = [];
      while (start < end) {
        let time = start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        let day = start.getDate();
        let month = start.getMonth() + 1;
        let year = start.getFullYear();

        const slotDate = day + "-" + month + "-" + year;
        const slotTime = time;

        const isSlotAvailable =
          docInfos.slots_booked[slotDate] &&
          docInfos.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;
        if (isSlotAvailable) {
          // Add slot to array
          slots.push({
            datetime: new Date(start),
            time: time,
          });
        }

        start.setMinutes(start.getMinutes() + 30); // move to next 30-min slot
      }

      allSlots.push(slots);
    }

    // Update React state with all 7 days of slots
    setDocSlots(allSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.error("Login to book an appointment!");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "-" + month + "-" + year;
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointment");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Fetch doctor info
  useEffect(() => {
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfos(info);
  }, [doctors, docId]);

  // Generate slots whenever doctor info is available
  useEffect(() => {
    if (docInfos) getAvailableSlots();
  }, [docInfos]);

  return (
    docInfos && (
      <div>
        {/* --------- Doctor Details --------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={docInfos.image}
            alt={docInfos.name}
          />
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <h1 className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfos.name}
              <img className="w-5" src={assets.verified_icon} alt="verified" />
            </h1>
            <p className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              {docInfos.degree} - {docInfos.speciality}
              <span className="border border-blue-50 py-0.5 px-2 text-xs rounded-full">
                {docInfos.experience}
              </span>
            </p>
            <div className="mt-3 text-sm text-gray-500 max-w-[700px]">
              <strong className="text-gray-900 flex items-center gap-1 font-medium mb-1">
                About <img src={assets.info_icon} alt="info" />
              </strong>
              {docInfos.about}
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

        {/* --------- Booking Slots --------- */}
        <div className="sm:ml-72 sm:pl-4 font-medium text-gray-700 mt-6">
          <p>Booking Slots</p>

          {/* Days */}
          <div className="flex gap-3 overflow-x-scroll mt-4">
            {docSlots.map((slots, i) => (
              <div
                key={i}
                onClick={() => setSlotIndex(i)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === i
                    ? "bg-primary text-white"
                    : "border border-gray-200"
                }`}
              >
                <p>{slots[0] && daysOfWeek[slots[0].datetime.getDay()]}</p>
                <p>{slots[0]?.datetime.getDate()}</p>
              </div>
            ))}
          </div>

          {/* Times */}
          <div className="flex gap-3 overflow-x-scroll mt-3">
            {docSlots[slotIndex]?.map((slot, i) => (
              <p
                key={i}
                onClick={() => setSlotTime(slot.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  slot.time === slotTime
                    ? "bg-primary text-white"
                    : "text-gray-400 border border-gray-300"
                }`}
              >
                {slot.time.toLowerCase()}
              </p>
            ))}
          </div>

          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer hover:brightness-90 transition"
          >
            Book an Appointment
          </button>
        </div>

        {/* --------- Related Doctors --------- */}
        <RelatedDoctors docId={docId} speciality={docInfos.speciality} />
      </div>
    )
  );
};

export default Appointment;
