import React from "react";
import "../Navbar/Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <nav className="navbar-container">
      <div className="container-item">
        {/* Brand */}
        <div className="navbar-brand">
          <h3>TASK TODO</h3>
        </div>

        {/* Navigation Menu */}
        <div className="navbar-menu-item">
          <ul>
            <li>
              <Link to="/home">DASHBOARD</Link>
            </li>
            <li>
              <Link to="/user">USERS</Link>
            </li>
            <li>
              <Link to="/staff/list">STAFFS</Link>
            </li>
            <li>
              <Link to="/task">ALL TASK</Link>
            </li>
          </ul>
        </div>

        {/* Button */}
        <div className="navbar-button">
          <button>ADD NEW EVENT</button>
        </div>

        {/* Icons */}
        <div className="navbar-icon">
          <ul>
            <li>
              <i class="fas fa-search"></i>
            </li>
            <li>
              <i class="fa-solid fa-bell"></i>
            </li>
            <li>
              <i class="fa-solid fa-user"></i>
            </li>
            <li>
              <i class="fa-solid fa-envelope"></i>
            </li>
          </ul>
        </div>

        {/* Profile */}
        <div className="navbar-profile">
          <div className="profile-image"></div>
          <div className="navbar-profile-name">
            <p>Seang Kong Heng</p>
          </div>
        </div>

        <div className="navbar-profile">
          <Link to="/logout">
            Logout &nbsp; <i class="fa fa-sign-out" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
