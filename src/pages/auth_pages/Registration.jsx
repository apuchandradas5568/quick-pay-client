// src/pages/RegistrationPage.js
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const RegistrationPage = () => {
  const [role, setRole] = useState("User");
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate  = useNavigate()

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleRegister = async () => {
    setLoading(true);
    const registrationData = {
      role,
      name,
      pin,
      mobileNumber,
      email,
    };

    if (name === "" || mobileNumber === "" || email === "") {
      return toast.error("All fields are required");
    }
    if (pin.length > 5) {
      return toast.error("Pin must be 5 digit");
    }

    try {
      await axiosPublic
        .post("users/register", registrationData)
        .then((res) => {
          toast.success(res.data.message);
          navigate('/login')
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (error) {
      toast.error("Something went wrong");
    }

    // Implement registration logic here
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Registration
        </h1>

        <div className="mb-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="User">User</option>
            <option value="Agent">Agent</option>
          </select>
        </div>

        <div className="mb-4">
          <input
            required
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            required
            type="number"
            placeholder="5-digit PIN"
            value={pin}
            maxLength={5}
            onChange={(e) => setPin(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            required
            type="text"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            maxLength={11}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          disabled={loading}
          onClick={handleRegister}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Register
        </button>

        <div className="justify-center flex flex-row gap-2 w-full mt-4">
          <span>Already have an account?</span>
          <Link className="text-blue-500 font-semibold " to={"/login"}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
