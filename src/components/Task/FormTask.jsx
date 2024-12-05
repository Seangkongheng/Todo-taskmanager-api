import React, { useEffect, useState } from "react";

const FormTask = () => {
  const [staff, setStaff] = useState([]);
  const [staff_id, setStaff_id] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [selectStaffID, setSelectStaffID] = useState("");

  const fecchStaff = async () => {
    const resource = await fetch("http://127.0.0.1:8000/api/staff/index");
    const data = await resource.json();
    setStaff(data);
  };

  const addTask = async (e) => {
    e.preventDefault(); // Prevent the form from submitting and reloading the page.
    
    try {
      const item = {
        staff_id: selectStaffID,
        title: title,
        description: description,
        status: status,
        date: date,
      };
  
      console.log(item);
  
      const response = await fetch("http://127.0.0.1:8000/api/task/store", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
  
      const result = await response.json();
      console.log(result);
  
      if (response.ok) {
        window.location.href = "/task";
      
      } else {
        alert("Failed to add task. Please check your inputs.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while adding the task.");
    }
  };
  

  useEffect(() => {
    fecchStaff();
  }, []);

  return (
    <div className="task-container">
      <div className="task-content">
        <div className="task-content-header">
          <div className="task-content-header-item">
            <div className="task-content-header-search">
              <input type="text" placeholder="Search here.." />
            </div>
            <div className="task-content-header-button">
              <button>
                <i className="fa-solid fa-plus"></i> &nbsp;Add Task
              </button>
            </div>
          </div>
        </div>
        <div className="list-task-card">
          <div className="table-container">
            <form class="custom-form">
              <label for="staff">Please Select Staff</label>
              <select
                value={selectStaffID}
                onChange={(e) => setSelectStaffID(e.target.value)}
                name="staff"
                id="staff"
              >
                <option value="">Please Select</option>
                {staff.map((staff) => (
                  <option key={staff.id} value={staff.id}>
                    {staff.first_name}
                    {staff.last_name}
                  </option>
                ))}
              </select>

              <label for="title">Title</label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title..."
                type="text"
              />

              <label for="status">Status</label>
              <input
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Enter Status"
                type="text"
              />

              <label for="date">For Date</label>
              <input
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Enter Date"
                type="text"
              />

              <label for="description">Description</label>
              <textarea
                name=""
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id=""
              ></textarea>
              <button onClick={(e) => addTask(e)}>Add Task</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormTask;
