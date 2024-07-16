import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toast";

const LoginPage = () => {
  const { signIn, user, googleSignIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  if (user) {
    return navigate("/");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    signIn(email, password)
      .then((res) => {
        navigate(location.state?.from ? location.state.from : "/");
        toast.success("Login successful");
      })
      .catch(() => {
        toast.error("Login failed");
      });
    setEmail("");
    setPassword("");
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then(() => {
        toast.success("Login successful");
      })
      .catch(() => {
        toast.error("Login failed");
      });

    // Implement Google login logic here

    // Send email and password to your server for authentication
    // Handle successful login or error messages
  };

  return (
    <div className="login-container max-w-md mx-auto p-4 mt-10 ">
      <h1 className="text-3xl font-bold text-center mb-4">Welcome to Destin</h1>
      <p className="text-center mb-12 ">Find your everlasting bond.</p>

      <form id="login-form" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block  font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="youremail@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block  font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-orange-500 hover:bg-orange-700 text-white font-bold rounded-md shadow-sm"
        >
          Login
        </button>
      </form>

      <hr className="border h-1 border-t-0 border-l-0 border-r-0 border-orange-500 border-dashed mt-8" />

      <div className="social-login mt-8 text-center">
        <p className="">Or login with</p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleGoogleLogin}
            className="border-orange-600 hover:bg-orange-600 hover:text-white text-orange-600 border rounded-md py-2 px-4"
          >
            Google
          </button>
        </div>
      </div>

      <p className="text-center  mt-8">
        Don't have an account?{" "}
        <Link to="/signup" className="text-orange-600">
          Register Now
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
