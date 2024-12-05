import React, { useState } from "react";
import "../Login/Login.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

  const [email,setEmail]=useState('');
  const [password, setPassword]=useState('');

  const taskAnimation = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const animationDescription = {
    hidden: { opacity: 0, x: 150 },
    visible: { opacity: 1, x: 0 },
  };

  const navigate = useNavigate();

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/user/login', {
            email, password
        });
        localStorage.setItem('token', response.data.token);
        navigate('/home');
    } catch (error) {
      console.error("Login error:", error);
    }
  }
  return (
    <div className="login-container">
      <div className="login-content">
        <motion.div
          variants={taskAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="login-content-form"
        >
          <form className="login" onSubmit={handleSubmit}>
            <div className="login-content-form-input">
              {/* Email Field */}
              <div className="login-content-form-input-icon-text">
                <div className="login-content-input-icon">
                  <i className="fa-solid fa-user" aria-hidden="true"></i>
                </div>
                <div className="login-content-input-text">
                  <input
                    type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Enter your email.."
                    aria-label="Email"
                  />
                </div>
              </div>
              {/* Password Field */}
              <div className="login-content-form-input-icon-text">
                <div className="login-content-input-icon">
                  <i className="fa-solid fa-lock" aria-hidden="true"></i>
                </div>
                <div className="login-content-input-text">
                  <input
                    type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Enter your password.."
                    aria-label="Password"
                  />
                </div>
              </div>
              {/* Remember Me and Forgot Password */}
              <div className="login-remember-forgot-password">
                <div className="login-remember">
                  <input type="checkbox" id="rememberMe" />
                  <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <div className="login-forgot-password">
                  <p tabIndex="0">Forgot password?</p>
                </div>
              </div>
              <button className="btn-login">Login</button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
