import React, { useEffect, useState } from "react";
import "../Task/Task.css";
import Profile1 from "../../assets/profile1.jpg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const [task, setTask] = useState([]);
  const navigate = useNavigate();

  const fectTask = async () => {
    const resource = await fetch("http://127.0.0.1:8000/api/task/index");
    const data = await resource.json();
    setTask(data);
  };
  const handleAddTaskButton = ()=>{
      navigate("/task/add");
  }

  useEffect(()=>{
    fectTask();
  },[])
  const taskAnimation = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const animationDescription = {
    hidden: { opacity: 0, x: 150 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="task-container">
      <div className="task-content">
        <div className="task-content-header">
          <div className="task-content-header-item">
            <div className="task-content-header-search">
              <input type="text" placeholder="Search here.." />
            </div>
            <div className="task-content-header-button">
              <button onClick={handleAddTaskButton}>
                <i className="fa-solid fa-plus"></i> &nbsp;Add Task
              </button>
            </div>
          </div>
        </div>
        <div className="list-task-card">
          <div className="table-container">
            <h3>Today</h3>
            <table className="task-table">
              <thead>
                <motion.tr
                  variants={taskAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <th></th>
                  <th>Task</th>
                  <th>Description</th>
                  <th>For Date</th>
                  <th>Priority</th>
                  <th>Assigned</th>
                </motion.tr>
              </thead>
              <tbody>
                {task.map((task, index) => (
                  <motion.tr
                    variants={taskAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                  >
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{task.title}</td>
                    <td className="highlight">{task.description}</td>
                    <td>
                      <span className="">{task.date}</span>
                    </td>
                    <td>
                      <span className="badge high-priority">High</span>
                    </td>
                    <td>
                      <img src={task.staff_id} alt="Assignee" className="avatar" />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
