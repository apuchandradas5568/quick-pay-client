// src/pages/OverviewPage.js
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useAxiosPublic from "../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const Overview = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    if (!user && !loading) {
      window.location.href = "/login";
    }
  }, [user, loading]);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const userInfo = users;

  const fetchUsers = async () => {
    await axiosPublic("/users/data-transaction", { withCredentials: true })
      .then((res) => {
        setUsers(res.data.user);
        setTransactions(res.data.transactions);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className=" p-6 flex items-center justify-center">
      <div className=" w-full bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Account Information
          </h2>
          <div className="p-6 md:flex md:gap-8 ">
            <div className="mb-4 p-4 md:min-w-60 bg-blue-100 rounded-lg shadow-md">
              <p className="flex flex-col gap-4 justify-start ">
                <span className="font-semibold text-blue-600">Name:</span>
                <span className="text-black">{userInfo?.name}</span>
              </p>
            </div>
            <div className="mb-4 p-4 md:min-w-60 bg-green-100 rounded-lg shadow-md">
              <p className="flex flex-col gap-4 justify-start ">
                <span className="font-semibold text-green-600">Email:</span>
                <span className="text-black">{userInfo?.email}</span>
              </p>
            </div>
            <div className="mb-4 p-4 md:min-w-60 bg-yellow-100 rounded-lg shadow-md">
              <p className="flex flex-col gap-4 justify-start ">
                <span className="font-semibold text-yellow-600">
                  Phone Number:
                </span>
                <span className="text-black">{userInfo?.mobileNumber}</span>
              </p>
            </div>
            <div className="mb-4 p-4 md:min-w-60 bg-red-100 rounded-lg shadow-md">
              <p className="flex flex-col gap-4 justify-start ">
                <span className="font-semibold text-red-600">
                  Account Balance:
                </span>
                <span className="text-black">{userInfo?.balance} Taka</span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Recent Transactions
          </h2>
          <ul className="text-gray-600 md:max-h-[500px] overflow-y-scroll">
            {transactions?.map((transaction, idx) => (
              <li
                key={idx}
                className={`mb-4 p-4 rounded-lg flex justify-between shadow-md ${
                  idx % 2 === 0 ? "bg-blue-100" : "bg-green-100"
                } hover:bg-opacity-75 transition duration-300`}
              >
                <div className="flex gap-8 justify-between items-center mb-2">
                  <span className="font-semibold text-lg">
                    {transaction.type}
                  </span>
                  <span className="text-xl font-bold text-gray-800">
                    {transaction.amount} Taka
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(transaction.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;
