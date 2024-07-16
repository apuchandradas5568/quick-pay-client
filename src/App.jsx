import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/Routes";
import "swiper/css";
import "swiper/css/pagination";

import AuthProvider from "./context/AuthContext";
import { ToastContainer, toast } from "react-toast";
// import StripeProvider from "./context/StripeProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        {/* <StripeProvider> */}
            <RouterProvider router={router} />
        {/* </StripeProvider> */}
      </AuthProvider>
    </>
  );
}

export default App;
