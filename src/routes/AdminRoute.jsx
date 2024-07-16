import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    
    const isAdmin = user?.isAdmin;

    if (loading || loading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default AdminRoute;