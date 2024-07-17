// src/pages/LoginPage.js
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [pin, setPin] = useState("");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { setUser, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    const loginData = {
      identifier,
      pin,
    };

    try {
      await axiosPublic
        .post("users/login", loginData, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          localStorage.setItem("quickPayUser", JSON.stringify(res.data.user));
          setUser(res.data.user);
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (error) {
      toast.error("Something went wrong");
    }
    // Implement login logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Mobile Number or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="5-digit PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Login
        </button>
        <div className="justify-center flex flex-row gap-2 w-full mt-4">
          <span>Don't have an account?</span>
          <Link className="text-blue-500 font-semibold " to={"/register"}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
