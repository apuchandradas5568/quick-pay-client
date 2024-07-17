// src/pages/TransactionMakingPage.js
import React, { useContext, useState } from "react";
import UserTransactPage from "../components/UserTransactPage";
import AgentTransact from "../components/AgentTransact";
import { AuthContext } from "../context/AuthContext";

const TransactMoney = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Transact Wisely
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Send Money Section */}
          {user.role === "User" && <UserTransactPage />}

          {/* Agent Cash In Section */}
          {user.role === "Agent" && <AgentTransact />}
          {/* <AgentTransact/> */}

          {user.role === "Admin" && (
            <>
              <UserTransactPage />
              <AgentTransact />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactMoney;
