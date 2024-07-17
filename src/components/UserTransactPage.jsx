import React, { useState } from "react";
import TransactInputBox from "./TransactInputBox";
import useAxiosPublic from "../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const UserTransactPage = () => {
  const [sendMoneyAmount, setSendMoneyAmount] = useState("");
  const [cashOutAmount, setCashOutAmount] = useState("");
  const [receiverNumber, setReceiverNumber] = useState("");
  const [agentNumber, setAgentNumber] = useState("");
  const [pin, setPin] = useState("");
  const [agentPin, setAgentPin] = useState("");
  const axiosPublic = useAxiosPublic();

  const handleSendMoney = async () => {
    console.log(sendMoneyAmount, receiverNumber);

    await axiosPublic
      .post(
        "/users/transact",
        { amount: sendMoneyAmount, receiverNumber, type: "sendMoney", pin },
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

  const handleCashOutUser = async () => {
    console.log(`Cash Out User: ${cashOutAmount}`);
    // Implement cash out logic here
    await axiosPublic
      .post(
        "/users/transact",
        {
          amount: cashOutAmount,
          receiverNumber,
          type: "cashOut",
          pin: agentPin,
        },
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
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Send Money</h2>
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

      {/* User Cash Out Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Cash Out</h2>

        <TransactInputBox
          title={"Amount"}
          value={cashOutAmount}
          setValue={setCashOutAmount}
        />
        <TransactInputBox
          title={"Receiver Number"}
          value={agentNumber}
          setValue={setAgentNumber}
        />
        <TransactInputBox
          title={"Pin"}
          value={agentPin}
          setValue={setAgentPin}
        />
        <button
          onClick={handleCashOutUser}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Cash Out
        </button>
      </div>
    </>
  );
};

export default UserTransactPage;
