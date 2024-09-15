import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Appbar } from "../components/Appbar";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const balance = searchParams.get("balance");

  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSendMoney = async () => {
    setMessage("");
    setError("");

    try {

        if (amount > balance) {  
            setError("Insufficient balance. Please enter a valid amount.");  
            return; // Prevent the transaction  
          }  
      
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        setMessage("Transfer successful!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (err) {
      setError("Transfer failed. Please try again later.");
      console.error(err);
    }
  };

  return (
    <>
      <Appbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Send Money</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {message && <div className="text-green-500 mb-4">{message}</div>}
          <h3 className="text-lg font-semibold text-center mb-4">{name}</h3>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 mb-2">
              Amount (in Rs)
            </label>
            <input
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              type="number"
              id="amount"
              placeholder="Enter amount"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            onClick={onSendMoney}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </>
  );
};
