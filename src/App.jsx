import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Staff from "./components/Staff/Staff";
import User from "./components/Users/User";
import ListStaff from "./components/ListStaff/ListStaff";
import Task from "./components/Task/Task";
import Login from "./components/Login/Logins";
import FormTask from "./components/Task/formTask";
import StaffTaskDetail from "./components/Staff/staffTaskDetail";
import Logout from "./components/Logout/Logout";

function App() {
  const location = useLocation();

  // Check if the current path is "/login"
  const showNavbar = location.pathname !== "/login";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/staff/list" element={<ListStaff />} />
        <Route path="/task" element={<Task />} />
        <Route path="/task/add" element={<FormTask />} />
        <Route path="/task/staff/:id" element={<StaffTaskDetail />} />
        <Route path="/logout" element={<Logout />} />
       
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
