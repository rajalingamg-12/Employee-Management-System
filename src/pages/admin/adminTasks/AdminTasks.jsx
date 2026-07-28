import React, { useEffect, useState } from "react";

import {
    FaTasks,
    FaSearch,
    FaFilter,
    FaClipboardCheck,
    FaClock,
    FaSpinner
} from "react-icons/fa";

import { toast } from "react-toastify";

import { getAdminTasks } from "../../../services/adminTaskService";

import "./AdminTasks.css";

function AdminTasks() {

    // ==================================
    // STATES
    // ==================================

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    // ==================================
    // LOAD TASKS
    // ==================================

    useEffect(() => {

        loadTasks();

    }, []);

    const loadTasks = async () => {

        try {

            setLoading(true);

            const response =
                await getAdminTasks();

            console.log(
                "ADMIN TASKS",
                response
            );

            if (response.success) {

                setTasks(
                    response.data || []
                );

            }
            else {

                toast.error(
                    response.message ||
                    "Unable to load tasks"
                );

            }

        }
        catch (error) {

            console.error(error);

            toast.error(
                "Failed to load tasks"
            );

        }
        finally {

            setLoading(false);

        }

    };

    // ==================================
    // SEARCH + FILTER
    // ==================================

    const filteredTasks = tasks.filter((task) => {

        const keyword =
            search.toLowerCase();

        const matchesSearch =

            task.employeeId
                ?.toLowerCase()
                .includes(keyword)

            ||

            task.employeeName
                ?.toLowerCase()
                .includes(keyword)

            ||

            task.project
                ?.toLowerCase()
                .includes(keyword)

            ||

            task.task
                ?.toLowerCase()
                .includes(keyword);

        const matchesStatus =

            statusFilter === "All"

            ||

            task.status === statusFilter;

        return (
            matchesSearch &&
            matchesStatus
        );

    });

    // ==================================
    // SUMMARY
    // ==================================

    const totalTasks =
        tasks.length;

    const completedTasks =
        tasks.filter(
            t => t.status === "Completed"
        ).length;

    const pendingTasks =
        tasks.filter(
            t => t.status === "Pending"
        ).length;

    const inProgressTasks =
        tasks.filter(
            t => t.status === "In Progress"
        ).length;

    // ==================================
    // LOADING
    // ==================================

    if (loading) {

        return (

            <div className="adm-task-loading">

                <FaSpinner
                    className="spin"
                />

                <p>

                    Loading Tasks...

                </p>

            </div>

        );

    }
        return (

        <div className="adm-task-container">

            {/* ===========================
                HEADER
            =========================== */}

            <div className="adm-task-header">

                <div>

                    <h1>

                        Task Management

                    </h1>

                    <p>

                        View and manage all employee tasks

                    </p>

                </div>

                <div className="adm-task-header-icon">

                    <FaTasks />

                </div>

            </div>



            {/* ===========================
                SUMMARY CARDS
            =========================== */}

            <div className="adm-task-summary">

                <div className="adm-task-card">

                    <FaTasks />

                    <div>

                        <h4>Total Tasks</h4>

                        <h2>{totalTasks}</h2>

                    </div>

                </div>

                <div className="adm-task-card">

                    <FaClipboardCheck />

                    <div>

                        <h4>Completed</h4>

                        <h2>{completedTasks}</h2>

                    </div>

                </div>

                <div className="adm-task-card">

                    <FaClock />

                    <div>

                        <h4>Pending</h4>

                        <h2>{pendingTasks}</h2>

                    </div>

                </div>

                <div className="adm-task-card">

                    <FaSpinner />

                    <div>

                        <h4>In Progress</h4>

                        <h2>{inProgressTasks}</h2>

                    </div>

                </div>

            </div>



            {/* ===========================
                SEARCH + FILTER
            =========================== */}

            <div className="adm-task-toolbar">

                <div className="adm-task-search">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search Employee, Project or Task..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                    />

                </div>



                <div className="adm-task-filter">

                    <FaFilter />

                    <select

                        value={statusFilter}

                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }

                    >

                        <option>All</option>

                        <option>Pending</option>

                        <option>In Progress</option>

                        <option>Completed</option>

                        <option>On Hold</option>

                    </select>

                </div>

            </div>



            {/* ===========================
                TASK TABLE
            =========================== */}

            <div className="adm-task-table">

                <table>

                    <thead>

                        <tr>

                            <th>Task ID</th>

                            <th>Employee</th>

                            <th>Project</th>

                            <th>Task</th>

                            <th>Priority</th>

                            <th>Status</th>

                            <th>Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredTasks.length > 0 ?

                                filteredTasks.map((task, index) => (

                                    <tr key={index}>

                                        <td>

                                            {task.taskId}

                                        </td>

                                        <td>

                                            {task.employeeName}

                                        </td>

                                        <td>

                                            {task.project}

                                        </td>

                                        <td>

                                            {task.task}

                                        </td>

                                        <td>

                                            {task.priority}

                                        </td>

                                        <td>

                                            <span
                                                className={`task-status ${String(task.status).replace(/\s+/g, "-").toLowerCase()}`}
                                            >

                                                {task.status}

                                            </span>

                                        </td>

                                        <td>

                                            {task.date}

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td colSpan="7">

                                        No Tasks Found

                                    </td>

                                </tr>

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AdminTasks;