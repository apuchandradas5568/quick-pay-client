import { createBrowserRouter } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Main from "../Layout/Main";
import Home from "../pages/Home";
import LoginPage from "../pages/auth_pages/Login";
import RegistrationPage from "../pages/auth_pages/Registration";
import UserProfile from "../pages/user_pages/UserProfile";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dasboard";

const axiosPublic = useAxiosPublic();

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <RegistrationPage />,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
