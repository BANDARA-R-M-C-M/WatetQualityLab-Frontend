import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Service/AuthServices";
import { toast } from "react-toastify";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (email, username, password) => {
    try {
      const res = await registerAPI(email, username, password);
      if (res) {
        localStorage.setItem("token", res?.data.token);

        const userObj = {
          userName: res?.data.userName,
          email: res?.data.email,
        };
        
        localStorage.setItem("user", JSON.stringify(userObj));

        setToken(res?.data.token);
        setUser(userObj);
        toast.success("Login Success!");

        console.log("Register Success!");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.warning("Server error occurred");
    console.log("Server error occurred" + error);
    }
  };

  const loginUser = async (username, password) => {
    try {
      const res = await loginAPI(username, password);
      if (res) {

        const userObj = {
          userName: res?.data.username,
          userRole: res?.data.role,
        };

        localStorage.setItem("token", res?.data.token);
        localStorage.setItem("user", JSON.stringify(userObj));

        setToken(res?.data.token);
        setUser(userObj);
        
        toast.success("Login Success!");

        console.log("Login Success!")
        if(userObj.userRole === "Admin"){
          navigate("/admin/dashboard");
        } else if(userObj.userRole === "Phi"){
          navigate("/phi/dashboard");
        } else if(userObj.userRole === "Mlt"){
          navigate("/mlt/dashboard");
        } else if(userObj.userRole === "MohSupervisor"){
          navigate("/moh-supervisor/dashboard");
        }
      }
      
    } catch (error) {

      toast.warning("Server error occurred");
      
    console.log("Server error occurred" + error);
    }
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext); 