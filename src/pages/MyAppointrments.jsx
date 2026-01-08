import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
const MyAppointrments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("-");
    return `${dateArray[2]} ${months[Number(dateArray[1])]} ${dateArray[0]}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {}
  };

  const handlePay = async (appointmentId) => {
    try {
      console.log("Initiating payment for appointment:", appointmentId);
      const { data } = await axios.post(
        backendUrl + "/api/payment/initiate",
        { appointmentId },
        { headers: { token } }
      );

      console.log("Payment response:", data);

      if (data.success && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        toast.error(data.message || "Payment initiation failed");
        console.error("Payment error:", data);
      }
    } catch (err) {
      console.error("Full error object:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error message:", err.message);
      toast.error(
        err.response?.data?.message || err.message || "Payment initiation error"
      );
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);
  return (
    <div>
      <p className="font-medium text-zinc-700 border-b border-gray-400 pb-3 mt-12">
        My appointments
      </p>
      <div>
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300 "
            key={index}
          >
            <div>
              <img className="w-32 bg-indigo-50" src={item.docData.image} />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end ">
              {!item.cancelled && (
                <button
                  onClick={() => handlePay(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel appointment
                </button>
              )}
              {item.cancelled && (
                <button className="text-red-500 border-red-300 text-center sm:min-w-48 py-2 border rounded cursor-not-allowed">
                  Appointment cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointrments;
