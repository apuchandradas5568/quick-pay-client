import { createBrowserRouter } from "react-router-dom";


import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dasboard";
import Login from "../pages/auth_pages/Login";
import RegistrationPage from "../pages/auth_pages/Registration";



export const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <Dashboard />
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <RegistrationPage/>
  }
]);


{/* <PrivateRoute>
</PrivateRoute> */}
