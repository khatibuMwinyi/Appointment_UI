import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointrments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [showUssdModal, setShowUssdModal] = useState(false);
  const [ussdOrderId, setUssdOrderId] = useState(null);
  const [ussdAmount, setUssdAmount] = useState(null);

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

  // --- Fetch user appointments ---
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message || "Failed to load appointments");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to load appointments");
    }
  };

  // --- Cancel appointment ---
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        {
          headers: { token },
        },
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message || "Failed to cancel appointment");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to cancel appointment");
    }
  };

  // --- Show USSD modal ---
  const showUssdInstructions = (orderId, amount) => {
    setUssdOrderId(orderId);
    setUssdAmount(amount);
    setShowUssdModal(true);
  };

  // --- Initiate payment via ZenoPay ---
  const handlePay = async (appointmentId) => {
    try {
      const appointment = appointments.find((apt) => apt._id === appointmentId);
      if (!appointment) {
        toast.error("Appointment not found");
        return;
      }

      if (appointment.cancelled) {
        toast.error("Cannot pay for a cancelled appointment");
        return;
      }

      if (appointment.payment?.status === "PAID") {
        toast.error("This appointment is already paid");
        return;
      }

      const { data } = await axios.post(
        backendUrl + "/api/payment/initiate",
        { appointmentId },
        { headers: { token } },
      );

      console.log("Payment response:", data);

      if (data.success) {
        toast.success(
          "Payment initiated! Please follow the USSD instructions on your phone.",
        );

        // Use normalized orderId from backend and amount from appointment
        showUssdInstructions(data.orderId, appointment.amount);

        // Optional: you could also schedule a refresh if you want
        // setTimeout(getUserAppointments, 15000);
      } else {
        toast.error(data.message || "Payment initiation failed");
        console.error("Payment error:", data);
      }
    } catch (err) {
      console.error("Payment initiation error:", err);
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Payment initiation error",
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
        {appointments.map((item) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300"
            key={item._id}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData.image}
                alt={item.docData.name}
              />
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
                  Date &amp; Time:
                </span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>

              {/* Payment status label - THIS is what you asked about */}
              {item.payment?.status === "PAID" && !item.cancelled && (
                <p className="text-xs text-green-600 mt-1">Payment completed</p>
              )}
            </div>

            <div></div>

            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && item.payment?.status !== "PAID" && (
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

      {/* USSD Instructions Modal */}
      {showUssdModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Payment Instructions</h2>

            <div className="mb-6">
              <div className="bg-green-50 border border-green-200 p-4 rounded mb-4">
                <p className="text-sm font-medium text-green-800 mb-2">
                  Payment Initiated Successfully!
                </p>
                <p className="text-sm">
                  <strong>Order ID:</strong> {ussdOrderId}
                </p>
                <p className="text-sm">
                  <strong>Amount:</strong> ${ussdAmount}
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-4">
                <p className="font-medium mb-3">What happens next:</p>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-blue-600">
                    Automatic USSD Prompt:
                  </p>
                  <p className="text-gray-700">
                    You will receive a USSD prompt on your phone shortly to
                    confirm payment of ${ussdAmount} TZS for Order ID:{" "}
                    {ussdOrderId}
                  </p>
                  <p className="text-xs text-gray-600">
                    Simply follow the on-screen instructions to complete
                    payment.
                  </p>

                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-xs text-yellow-800 font-medium">
                      <strong>Quick Tip:</strong> Keep your phone handy and
                      ensure you have sufficient mobile money balance. The
                      appointment will be confirmed automatically after
                      successful payment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  // KEY CHANGE: refresh appointments after closing modal
                  setShowUssdModal(false);
                  getUserAppointments(); 
                }}
                className="flex-1 bg-primary text-white py-3 rounded-lg hover:brightness-90 transition"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointrments;