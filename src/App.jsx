import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/Routes";

import Dashboard from "./Layout/Dasboard";
import { Toaster } from "react-hot-toast";

// import StripeProvider from "./context/StripeProvider";

function App() {
  return (
    <>
      <RouterProvider router={router}>
        <Dashboard />
     
      </RouterProvider>
    </>
  );
}

export default App;
