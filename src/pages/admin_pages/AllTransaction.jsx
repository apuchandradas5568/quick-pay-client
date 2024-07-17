// src/pages/TransactionsPage.js
import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const AllTransaction = () => {
    const [searchTerm, setSearchTerm] = useState('');


    const [transaction, setTransaction] = useState([]);
    console.log(transaction);
    const axiosPublic = useAxiosPublic();

    const fetchTransaction = async () => {
      await axiosPublic("/users/transaction", { withCredentials: true })
        .then((res) => {
          setTransaction(res.data.transactions);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    };
  
    useEffect(() => {
      fetchTransaction();
    }, []);


    const filteredTransactions = transaction?.filter((transaction) =>
        transaction.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className=" p-6 flex items-center justify-center">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">All Transactions</h1>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search Transactions"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">ID</th>
                                <th className="px-4 py-2 border">Type</th>
                                <th className="px-4 py-2 border">Recipient</th>
                                <th className="px-4 py-2 border">Amount (Taka)</th>
                                <th className="px-4 py-2 border">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions?.length > 0 ? (
                                filteredTransactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td className="px-4 py-2 border">{transaction._id}</td>
                                        <td className="px-4 py-2 border">{transaction.type}</td>
                                        <td className="px-4 py-2 border">{transaction.recipient.mobileNumber}</td>
                                        <td className="px-4 py-2 border">{transaction.amount}</td>
                                        <td className="px-4 py-2 border">{transaction.createdAt.toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-500">No transactions found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllTransaction;
