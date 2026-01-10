import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
const MyAppointrments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showUssdModal, setShowUssdModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
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
      
      // Find the appointment data
      const appointment = appointments.find(apt => apt._id === appointmentId);
      if (!appointment) {
        toast.error("Appointment not found");
        return;
      }

      const { data } = await axios.post(
        backendUrl + "/api/payment/initiate",
        { 
          docId: appointment.docData._id,
          slotDate: appointment.slotDate,
          slotTime: appointment.slotTime,
          amount: appointment.docData.fees 
        },
        { headers: { token } }
      );

      console.log("Payment response:", data);
      console.log("Order ID from response:", data.order_id);
      console.log("Full response structure:", JSON.stringify(data, null, 2));

      if (data.success) {
        toast.success("Payment initiated! Please follow USSD instructions.");
        setShowPaymentModal(false);
        
        // Show USSD payment instructions
        showUssdInstructions(data.order_id, appointment.docData.fees);
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

  const showUssdInstructions = (orderId, amount) => {
    setUssdOrderId(orderId);
    setUssdAmount(amount);
    setShowUssdModal(true);
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

      {/* USSD Instructions Modal */}
      {showUssdModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Payment Instructions</h2>
            <div className="mb-6">
              <div className="bg-green-50 border border-green-200 p-4 rounded mb-4">
                <p className="text-sm font-medium text-green-800 mb-2"> Payment Initiated Successfully!</p>
                <p className="text-sm"><strong>Order ID:</strong> {ussdOrderId}</p>
                <p className="text-sm"><strong>Amount:</strong> ${ussdAmount}</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-4">
                <p className="font-medium mb-3"> What happens next:</p>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-blue-600">Automatic USSD Prompt:</p>
                  <p className="text-gray-700">You will receive a USSD prompt on your phone shortly to confirm payment of ${ussdAmount} TZS for Order ID: {ussdOrderId}</p>
                  <p className="text-xs text-gray-600">Simply follow the on-screen instructions to complete payment</p>
                  
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-xs text-yellow-800 font-medium">
                      <strong> Quick Tip:</strong> Keep your phone handy and ensure you have sufficient mobile money balance. The appointment will be confirmed automatically after successful payment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setShowUssdModal(false)}
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
