import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Context/useAuth";

const ProtetedRoute = ({ children }) => {
    const location = useLocation();
    const { isLoggedIn, userRole } = useAuth();
    return isLoggedIn() ? <>{children}</> : <Navigate to="/" state={{ from: location }} replace/>;
};

export default ProtetedRoute;