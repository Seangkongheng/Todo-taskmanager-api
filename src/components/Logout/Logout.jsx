import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      
      try {
        const respon = await axios.post(
          "http://127.0.0.1:8000/api/user/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
            },
          }
        );
        localStorage.removeItem("token");
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    };
    logout();
  }, [navigate]);

  return null;
};

export default Logout;
