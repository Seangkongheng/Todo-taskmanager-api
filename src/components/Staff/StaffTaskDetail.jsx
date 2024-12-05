import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Staff/Staff.css"; // CSS for styling

const StaffTaskDetail = () => {
  const { id } = useParams(); // Get the ID from the route
  const [taskData, setTaskData] = useState(null); // State for task data
  const [staffData, setStaffData] = useState(null); // State for staff data

  // Function to fetch task details
  const staffTaskDetail = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/task/staff/${id}`
      );
      const data = await response.json();
      setTaskData(data); // Set the task data (object)

      // Fetch staff details using staff_id from task data
      const staffResponse = await fetch(
        `http://127.0.0.1:8000/api/staff/show/${data.staff_id}`
      );
      const staff = await staffResponse.json();
      setStaffData(staff);
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      staffTaskDetail(id); // Fetch task details when ID is available
    }
  }, [id]);

  return (
    <div className="task-detail-container">
      {taskData ? (
        <div className="task-detail-card">
          <div className="staff-info">
            <img src={staffData?.profile} alt="No image" />
          </div>
          <div className="staff-info-desc">
            <h3 className="staff-name">
              {staffData?.first_name} {staffData?.last_name}
            </h3>
            <h2 className="task-title">{taskData.title}</h2>
            <div className="task-info">
              <p>
                <strong>Status:</strong> {taskData.status}
              </p>
              <p>
                <strong>Date:</strong> {taskData.date}
              </p>
            </div>
            <div className="task-description">
              <h3>Description:</h3>
              <p>{taskData.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>No task available for this staff member.</p>
      )}
    </div>
  );
};

export default StaffTaskDetail;
