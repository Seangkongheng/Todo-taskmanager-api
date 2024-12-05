import React, { useEffect, useState } from "react";
import Cover from "../../assets/sea 4.jpg";
import "../Staff/Staff.css";
import Profile from "../../assets/profile.jpg";
import { motion } from "framer-motion";
import { p } from "framer-motion/client";
import { useNavigate } from "react-router-dom";

const Staff = () => {
  const [staffData, setStaffData] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const navigate = useNavigate();
  const taskAnimation = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const animationDescription = {
    hidden: { opacity: 0, x: 150 },
    visible: { opacity: 1, x: 0 },
  };

  const fechStaff = async () => {
    try {
      const apiResource = await fetch("http://127.0.0.1:8000/api/staff/index");
      const data = await apiResource.json();
      setStaffData(data)
     
    } catch (error) {
      console.error(error);
    }
  };
 
  const handleViewTasks = (id)=>{
    navigate(`/task/staff/${id}`);
  }
  

  useEffect(() => {
    fechStaff();
  }, []);

  return (
    <div className="staff-container">
      <div className="staff-content">
        <div className="list-card-staff">
          {staffData.length > 0 ? (
            staffData.map((staff) => (
              <motion.div
                variants={taskAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="card-staff"
              >
                <div className="list-card-staff-cover">
                  <div className="list-card-staff-cover-image">
                    <img src={Cover} alt="" />
                  </div>
                </div>
                <div className="list-card-staff-profile">
                  <div className="list-card-staff-profile-image">
                    <img src={staff.profile} alt="no image" />
                  </div>
                </div>
                <div className="list-card-staff-name">
                  <p>{staff.first_name}{staff.last_name}</p>
                </div>
                <div className="list-cad-staff-position">
                  <small>{staff.position_id}</small>
                </div>
                <div className="list-card-staff-view-task">
                <button onClick={() => handleViewTasks(staff.id)}>VIEW TASK</button>

                </div>
              </motion.div>
            ))
          ) : (
            <p>No data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Staff;
