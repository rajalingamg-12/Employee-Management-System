import React, { useEffect, useState, useCallback } from "react";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaSpinner,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { getMyTasks } from "../../../services/taskService";
import "./TaskHistory.css";

function TaskHistory() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const employeeId = user.employeeId;

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getMyTasks(employeeId);

      if (response.success) {
        setTasks(response.data || []);
        setFilteredTasks(response.data || []);
      } else {
        toast.error(response.message || "Unable to load tasks");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch task history");
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    let result = [...tasks];

    result.sort((a, b) => {

    const [d1, m1, y1] = a.date.split("/");
    const [d2, m2, y2] = b.date.split("/");

    const date1 = new Date(`${y1}-${m1}-${d1}`);
    const date2 = new Date(`${y2}-${m2}-${d2}`);

    return date2 - date1;

});

    if (search) {
      result = result.filter(
        (item) =>
          item.client?.toLowerCase().includes(search.toLowerCase()) ||
          item.project?.toLowerCase().includes(search.toLowerCase()) ||
          item.task?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "All") {
      result = result.filter((item) => item.status === status);
    }

    setFilteredTasks(result);
  }, [search, status, tasks]);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (item) => item.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (item) => item.status === "Pending"
  ).length;

  const progressTasks = tasks.filter(
    (item) => item.status === "In Progress"
  ).length;

  const statusClass = (value) => {
    switch (value) {
      case "Completed":
        return "completed";

      case "In Progress":
        return "progress";

      case "On Hold":
        return "hold";

      default:
        return "pending";
    }
  };

  const priorityClass = (value) => {
    switch (value) {
      case "High":
        return "high";

      case "Low":
        return "low";

      default:
        return "medium";
    }
  };

  return (
    <div className="emp-task-history-page">
      {/* Header */}

      <div className="emp-task-history-header">
        <h1 className="emp-task-history-title">
          <FaTasks />
          <span>Task History</span>
        </h1>

        <p className="emp-task-history-subtitle">
          View your submitted daily tasks
        </p>
      </div>

      {/* Summary */}

      <div className="emp-task-summary-grid">
        <div className="emp-task-summary-card">
          <div className="emp-task-summary-icon">
            <FaTasks />
          </div>

          <div>
            <h3>{totalTasks}</h3>
            <span>Total Tasks</span>
          </div>
        </div>

        <div className="emp-task-summary-card">
          <div className="emp-task-summary-icon">
            <FaCheckCircle />
          </div>

          <div>
            <h3>{completedTasks}</h3>
            <span>Completed</span>
          </div>
        </div>

        <div className="emp-task-summary-card">
          <div className="emp-task-summary-icon">
            <FaClock />
          </div>

          <div>
            <h3>{pendingTasks}</h3>
            <span>Pending</span>
          </div>
        </div>

        <div className="emp-task-summary-card">
          <div className="emp-task-summary-icon">
            <FaSpinner />
          </div>

          <div>
            <h3>{progressTasks}</h3>
            <span>In Progress</span>
          </div>
        </div>
      </div>

      {/* Filter */}

      <div className="emp-task-filter-wrapper">
        <div className="emp-task-search-box">
          <FaSearch />

          <input
            type="text"
            placeholder="Search Client, Project or Task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="emp-task-status-filter">
          <FaFilter />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>On Hold</option>
          </select>
        </div>
      </div>

      {/* Table */}

      <div className="emp-task-table-wrapper">
        {loading ? (
          <div className="emp-task-loading">
            Loading Tasks...
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="emp-task-empty">
            No Tasks Found
          </div>
        ) : (
          <table className="emp-task-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Client</th>
                <th>Project</th>
                <th>Task</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Your Remarks</th>
                <th>Admin Status</th>
                <th>Admin Remarks</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>

                  <td>{item.client}</td>

                  <td>{item.project}</td>

                  <td className="emp-task-description">
                    {item.task}
                  </td>

                  <td>
                    <span
                      className={`emp-task-status-badge ${statusClass(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`emp-task-priority-badge ${priorityClass(
                        item.priority
                      )}`}
                    >
                      {item.priority}
                    </span>
                  </td>

                  <td className="emp-task-user-remarks">
                    {item.remarks || "-"}
                  </td>

                  <td>
                    <span
                      className={`emp-admin-status-badge ${String(
                        item.adminStatus
                      )
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                    >
                      {item.adminStatus}
                    </span>
                  </td>

                  <td className="emp-admin-remarks">
                    {item.adminRemarks || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TaskHistory;