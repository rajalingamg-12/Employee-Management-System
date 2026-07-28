import React, { useState, useRef } from "react";

import {
    FaBuilding,
    FaProjectDiagram,
    FaTasks,
    FaClipboardList,
    FaFlag,
    FaPaperPlane,
    FaCommentDots,
    FaClock,
    FaUser,
    FaIdBadge,
    FaBriefcase,
    FaLayerGroup
} from "react-icons/fa";

import { toast } from "react-toastify";

import { submitTask } from "../../../services/taskService";

import "./SubmitTask.css";

function SubmitTask() {

    const user = JSON.parse(localStorage.getItem("user")) || {};

    const clientRef = useRef(null);

    // ==========================================
    // CURRENT DATE
    // ==========================================

    const today = new Date().toLocaleDateString("en-GB");

    // ==========================================
    // FORM STATE
    // ==========================================

    const [form, setForm] = useState({

        employeeId: user.employeeId || "",

        name: user.name || "",

        designation: user.designation || "",

        department: user.department || "",

        client: "",

        project: "",

        task: "",

        status: "Pending",

        priority: "Medium",

        remarks: "",

        date: today

    });

    const [loading, setLoading] = useState(false);

    // ==========================================
    // INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({

            ...prev,

            [name]: value

        }));

    };

    // ==========================================
    // SUBMIT TASK
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !form.client.trim() ||
            !form.project.trim() ||
            !form.task.trim()
        ) {

            toast.error("Please fill all required fields.");

            return;

        }

        setLoading(true);

        try {

            const response = await submitTask(form);

            if (response.success) {

                toast.success("Task Submitted Successfully");

                setForm({

                    employeeId: user.employeeId || "",

                    name: user.name || "",

                    designation: user.designation || "",

                    department: user.department || "",

                    client: "",

                    project: "",

                    task: "",

                    status: "Pending",

                    priority: "Medium",

                    remarks: "",

                    date: today

                });

                if (clientRef.current) {

                    clientRef.current.focus();

                }

            } else {

                toast.error(response.message || "Unable to submit task.");

            }

        } catch (error) {

            console.error(error);

            toast.error("Server Error");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="submit-task-page">

            {/* ==========================================
                PAGE HEADER
            ========================================== */}

            <div className="submit-header">

                <h1>

                    <FaPaperPlane />

                    Daily Task Submission

                </h1>

                <p>

                    Fill in today's work details and submit your task.

                </p>

            </div>

            {/* ==========================================
                TASK FORM
            ========================================== */}

            <form
                className="task-form"
                onSubmit={handleSubmit}
            >

                {/* ==========================================
                    EMPLOYEE DETAILS
                ========================================== */}

                <div className="form-grid">

                    <div className="form-group">

                        <label>

                            <FaIdBadge />

                            Employee ID

                        </label>

                        <input
                            type="text"
                            value={form.employeeId}
                            readOnly
                        />

                    </div>

                    <div className="form-group">

                        <label>

                            <FaUser />

                            Employee Name

                        </label>

                        <input
                            type="text"
                            value={form.name}
                            readOnly
                        />

                    </div>

                    <div className="form-group">

                        <label>

                            <FaBriefcase />

                            Designation

                        </label>

                        <input
                            type="text"
                            value={form.designation}
                            readOnly
                        />

                    </div>

                    <div className="form-group">

                        <label>

                            <FaLayerGroup />

                            Department

                        </label>

                        <input
                            type="text"
                            value={form.department}
                            readOnly
                        />

                    </div>

                </div>

                {/* ==========================================
                    CLIENT NAME
                ========================================== */}

                <div className="form-group">

                    <label>

                        <FaBuilding />

                        Client Name

                    </label>

                    <input
                        ref={clientRef}
                        type="text"
                        name="client"
                        value={form.client}
                        onChange={handleChange}
                        placeholder="Enter Client Name"
                        required
                    />

                </div>

                {/* ==========================================
                    PROJECT NAME
                ========================================== */}

                <div className="form-group">

                    <label>

                        <FaProjectDiagram />

                        Project Name

                    </label>

                    <input
                        type="text"
                        name="project"
                        value={form.project}
                        onChange={handleChange}
                        placeholder="Enter Project Name"
                        required
                    />

                </div>

                {/* ==========================================
                    TASK DESCRIPTION
                ========================================== */}

                <div className="form-group">

                    <label>

                        <FaTasks />

                        Task Description

                    </label>

                    <textarea
                        rows="6"
                        name="task"
                        value={form.task}
                        onChange={handleChange}
                        placeholder="Describe today's work..."
                        required
                    />

                    <small className="char-count">

                        {form.task.length} Characters

                    </small>

                </div>

                                {/* ==========================================
                    STATUS & PRIORITY
                ========================================== */}

                <div className="form-grid">

                    <div className="form-group">

                        <label>

                            <FaClipboardList />

                            Task Status

                        </label>

                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                        >

                            <option value="Pending">

                                Pending

                            </option>

                            <option value="In Progress">

                                In Progress

                            </option>

                            <option value="Completed">

                                Completed

                            </option>

                            <option value="On Hold">

                                On Hold

                            </option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            <FaFlag />

                            Priority

                        </label>

                        <select
                            name="priority"
                            value={form.priority}
                            onChange={handleChange}
                        >

                            <option value="High">

                                High

                            </option>

                            <option value="Medium">

                                Medium

                            </option>

                            <option value="Low">

                                Low

                            </option>

                        </select>

                    </div>

                </div>

                {/* ==========================================
                    REMARKS
                ========================================== */}

                <div className="form-group">

                    <label>

                        <FaCommentDots />

                        Remarks

                    </label>

                    <textarea
                        rows="4"
                        name="remarks"
                        value={form.remarks}
                        onChange={handleChange}
                        placeholder="Enter additional remarks (Optional)"
                    />

                </div>

                {/* ==========================================
                    DATE
                ========================================== */}

                <div className="form-grid">

                    <div className="form-group">

                        <label>

                            <FaClock />

                            Date

                        </label>

                        <input
                            type="text"
                            value={form.date}
                            readOnly
                        />

                    </div>

                </div>

                {/* ==========================================
                    SUBMIT BUTTON
                ========================================== */}

                <div className="submit-btn-area">

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading}
                    >

                        <FaPaperPlane />

                        {

                            loading

                                ? "Submitting..."

                                : "Submit Task"

                        }

                    </button>

                </div>

            </form>

        </div>

    );

}

export default SubmitTask;