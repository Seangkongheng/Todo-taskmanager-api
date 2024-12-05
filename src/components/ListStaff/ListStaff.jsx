import React, { useEffect, useState } from "react";
import "../ListStaff/ListStaff.css";
import { motion } from "framer-motion";
import axios from "axios";

const ListStaff = () => {
  const [stafflist, setStaffList] = useState([]);
  const [position, setPosition] = useState([]);
  const [gender, setGender] = useState([]);

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastNam] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [selectPosition, setSelectPositon] = useState("");
  const [profile, setProfile] = useState(null);

  const userListAnimation = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const userFormAnimation = {
    hidden: { opacity: 0, x: 150 },
    visible: { opacity: 1, x: 0 },
  };

  const fectListStaff = async () => {
    const resource = await fetch("http://127.0.0.1:8000/api/staff/index");
    const data = await resource.json();
    setStaffList(data);
  };

  const addStaff = async () => {
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("gender_id", selectGender);
    formData.append("position_id", selectPosition);
  
    if (profile) {
      formData.append("profile", profile);
    }
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/staff/store",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Staff added successfully:", response.data);
      fectListStaff();
    } catch (error) {
      console.error("Error adding staff:", error.response?.data || error.message);
    }
  };
  

  const fectPosition = async () => {
    const resource = await fetch("http://127.0.0.1:8000/api/position/index");
    const data = await resource.json(resource);
    setPosition(data);
  };
  const fetctGender = async () => {
    const resource = await fetch("http://127.0.0.1:8000/api/gender/index");
    const data = await resource.json(resource);
    setGender(data);
  };

  useEffect(() => {
    fectListStaff();
    fectPosition();
    fetctGender();
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
                <th>Postion</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stafflist.map((staff, index) => (
                <tr key={staff.id}>
                  <td>{index + 1}</td>
                  <td>
                    {staff.first_name} {staff.last_name}
                  </td>
                  <td>{staff.position_id}</td>
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
          transition={{ duration: 0.5, delay: 0.5 }}
          className="user-content-form"
        >
          <div className="form">
            <div className="group-input">
              <input
                type="text"
                placeholder="First name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last name"
                value={last_name}
                onChange={(e) => setLastNam(e.target.value)}
              />
              <select
                value={selectGender}
                onChange={(e) => setSelectGender(e.target.value)}
              >
                <option value="">Please Select Gender</option>
                {gender.map((g, index) => (
                  <option key={index} value={g.id}>
                    {g.title}
                  </option>
                ))}
              </select>
              <select
                value={selectPosition}
                onChange={(e) => setSelectPositon(e.target.value)}
              >
                <option value="">Please Select Position</option>
                {position.map((p, index) => (
                  <option key={index} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
              <label htmlFor="profile">Profile</label>
              <input
                type="file"
                id="profile"
                onChange={(e) => setProfile(e.target.files[0])}
              />
              <button onClick={addStaff} type="button">
                Add
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ListStaff;
