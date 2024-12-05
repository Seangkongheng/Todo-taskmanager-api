import React, { useEffect, useState } from "react";
import "../Users/User.css";
import { motion } from "framer-motion";

const User = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastNam] = useState("");
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const userListAnimation = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const userFormAnimation = {
    hidden: { opacity: 0, x: 150 },
    visible: { opacity: 1, x: 0 },
  };

  const fectUser = async () => {
    const resource = await fetch("http://127.0.0.1:8000/api/user/index");
    const data = await resource.json();
    setUser(data);
  };

  const register = async () => {
    const item = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    };

    try {
      setLoading(true);
      const resource = await fetch("http://127.0.0.1:8000/api/user/register", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!resource.ok) {
        const error = await resource.json();
        console.error("Error:", error);
        alert(`Error: ${error.message || "Invalid form data"}`);
        setLoading(false);
        return;
      }

      const result = await resource.json();
      console.log("User registered successfully:", result);
      setFirstName("");
      setLastNam("");
      setEmail("");
      SetPassword("");
      setConfirmPassword("");
      fectUser(); // Refresh user list
    } catch (error) {
      console.error("An error occurred:", error.message);
      alert("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fectUser();
  }, []);

  return (
    <div className="user-container">
      <div className="user-content">
        <motion.div
          variants={userListAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="user-content-list"
        >
          <table className="styled-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          variants={userFormAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="user-content-form"
        >
          <div className="form">
            <div className="group-input">
              <label htmlFor="firstName">First Name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                id="firstName"
                placeholder="First name"
              />

              <label htmlFor="lastName">Last Name</label>
              <input
                value={lastName}
                onChange={(e) => setLastNam(e.target.value)}
                type="text"
                id="lastName"
                placeholder="Last name"
              />

              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="Email"
              />

              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => SetPassword(e.target.value)}
                type="password"
                id="password"
                placeholder="Password"
              />

              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
              />
              <button onClick={register} type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default User;
