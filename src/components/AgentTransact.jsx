import React, { useState } from "react";
import TransactInputBox from "./TransactInputBox";
import useAxiosPublic from "../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const UserTransactPage = () => {
  const [sendMoneyAmount, setSendMoneyAmount] = useState("");
  const [receiverNumber, setReceiverNumber] = useState("");
  const [pin, setPin] = useState("");
  const axiosPublic = useAxiosPublic();

  const handleSendMoney = async () => {
    console.log(sendMoneyAmount, receiverNumber);

    await axiosPublic
      .post(
        "/users/transact",
        { amount: sendMoneyAmount, receiverNumber, type: "cashIn", pin },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((res) => {
        console.log(res);
        toast.error(res.response.data.message);
      });

    // Implement send money logic here
  };


  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Cash In</h2>
        <TransactInputBox
          title={"Amount"}
          value={sendMoneyAmount}
          setValue={setSendMoneyAmount}
        />
        <TransactInputBox
          title={"Receiver Number"}
          value={receiverNumber}
          setValue={setReceiverNumber}
        />
        <TransactInputBox title={"Pin"} value={pin} setValue={setPin} />
        <button
          onClick={handleSendMoney}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Send
        </button>
      </div>

      
    </>
  );
};

export default UserTransactPage;
