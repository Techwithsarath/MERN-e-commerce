import { Link, useLocation,useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Confetti from 'react-confetti'

const ThanksPage = () => {

  
    


  const location = useLocation();
  const navigate = useNavigate();
  const totalAmount = location.state?.totalAmount?? 0;
  


  return (
    <div className="h-screen flex items-center justify-center px-4">
    <Confetti 
        widhth={
            window.innerWidth
        }
        height={
            window.innerHeight
        }
        gravity={0.3}
        style={{zIntex:99}}
        numerOfPieces={1500}
        recycle={false}
        />
    <div className=" flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6">
      <motion.div
        className=" relative w-full max-w-12xl p-20 bg-gray-800 rounded-lg shadow-lg border border-gray-700 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h2 className="text-3xl font-semibold text-blue-400">🎉 Thank You!</h2>
        <p className="text-gray-400 mt-2">Your payment was successful.</p>

        
        

        
        <div className="mt-4 text-center">
          <p className="text-lg text-gray-300">Total Paid:</p>
          <p className="text-2xl font-bold text-blue-400">{"\u20B9"}{totalAmount.toFixed(2)}</p>
        </div>

        
        <div className="mt-6">
          <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
    </div>
  );
};

export default ThanksPage;