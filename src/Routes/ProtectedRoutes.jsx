import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Context/useAuth";

const ProtetedRoute = ({ children }) => {
    const location = useLocation();
    const { isLoggedIn, logout, user } = useAuth();
    if (!isLoggedIn()) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    switch (location.pathname.split("/")[1]) {
        case "admin":
            if (user.userRole !== "Admin") {
                logout();
            }
            break;
        case "phi":
            if (user.userRole !== "Phi") {
                logout();
            }
            break;
        case "mlt":
            if (user.userRole !== "Mlt") {
                logout();
            }
            break;
        case "moh-supervisor":
            if (user.userRole !== "MohSupervisor") {
                logout();
            }
            break;
        default:
            break;
    }

    return <>{children}</>;

};

export default ProtetedRoute;