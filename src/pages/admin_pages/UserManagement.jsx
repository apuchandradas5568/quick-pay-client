// src/pages/UserManagementPage.js
import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const axiosPublic = useAxiosPublic();

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    await axiosPublic("/users/all", { withCredentials: true })
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleActivate = async (userId, role) => {


    await axiosPublic
      .patch(
        "/users/active",
        {
          userId,
          role,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setUsers(res.data.users);
        fetchUsers();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleBlock = async (userId, role) => {

    await axiosPublic
      .patch(
        "/users/block",
        {
          userId,
          role,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setUsers(res.data.users);
        fetchUsers();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className=" p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          User Management
        </h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Users"
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
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.length > 0 ? (
                filteredUsers.map((user, idx) => (
                  <tr key={idx}>
                    <td className="px-4  py-2 border">{user._id}</td>
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">{user.mobileNumber}</td>
                    <td className="px-4 py-2 border">{user.status}</td>
                    <td className="px-4 py-2 flex flex-col gap-2 items-center justify-center border">
                      {user.status === "active" ? (
                        <button
                          onClick={() => handleBlock(user._id, user.role)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                        >
                          Block
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivate(user._id, user.role)}
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
