// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const DummyPaymentPage = () => {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(null);

//   const handlePayment = () => {
//     setLoading(true);
//     setTimeout(() => {
//       const isSuccess = Math.random() > 0.3; // Simulate success 70% of the time
//       setSuccess(isSuccess);
//       setLoading(false);
//     }, 2000);
//   };

//   return (
//     <div className="realtive">
//     <div className="  flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
//       <motion.div
//         className="relative w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="text-2xl font-semibold text-blue-400 text-center">Payment</h2>
//         <p className="text-gray-400 text-center mt-2">Complete your payment below</p>

//         <div className="mt-6 flex flex-col gap-4">
//           <button
//             className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-4 focus:ring-emerald-300"
//             onClick={handlePayment}
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Pay Now"}
//           </button>
//         </div>

//         {success !== null && (
//           <div
//             className={`mt-4 p-3 rounded-lg text-center ${success ? "bg-blue-600" : "bg-red-600"}`}
//           >
//             {success ? "Payment Successful! 🎉" : "Payment Failed. Try Again."}
//           </div>
//         )}

//         <div className="mt-6 text-center">
//           <Link to="/" className="text-blue-400 underline hover:text-blue-300">Back to Home</Link>
//         </div>
//       </motion.div>
//     </div>
//     </div>
//   );
// };

// export default DummyPaymentPage;

import { useState } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";

const DummyPaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();


 const {cart} = useCartStore();
  // Get data from OrderSummary
  const location = useLocation();
  const { productImage, productName } = location.state || {};
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // Simulate success 70% of the time
      setSuccess(isSuccess);
      setLoading(false);

      if(isSuccess){
        setTimeout(()=>{
            navigate("/thanks",{
                state:{totalAmount},
            })
        },1500
        )
      }

    }, 2000);
  };

  return (
  
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
    <motion.div
      className=" relative w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-blue-400 text-center">Payment</h2>
      <p className="text-gray-400 text-center mt-2">Complete your payment below</p>

      
      <div className="mt-4 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item._id} className="flex items-center gap-4 border-b border-gray-700 pb-3">
                <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-lg" />
                <div>
                  <p className="text-lg font-medium text-white">{item.name}</p>
                  <p className="text-sm text-gray-300 font-bold">
                       Quantity  : {item.quantity}
                   <p className="text-sm text-gray-300 font-bold">
                   Product Price : {"\u20B9"}{item.price}</p>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">Your cart is empty.</p>
          )}
        </div>

      
      <div className="mt-4 text-center">
        <p className="text-lg text-gray-300">Total Amount:</p>
        <p className="text-2xl font-bold text-blue-400">{"\u20B9"}{totalAmount}</p>
      </div>

      
      <div className="mt-6 flex flex-col gap-4">
        <button
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>

      
      {success !== null && (
        <div className={`mt-4 p-3 rounded-lg text-center ${success ? "bg-blue-600" : "bg-red-600"}`}>
          {success ? "Payment Successful! 🎉 Redirecting..." : "Payment Failed. Try Again."}
        </div>
      )}

    </motion.div>
  </div>
    
  );
};

export default DummyPaymentPage;


