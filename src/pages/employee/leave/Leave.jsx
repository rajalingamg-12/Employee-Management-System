import React, { useState } from "react";
import {
    FaCalendarAlt,
    FaPaperPlane,
    FaClipboardList,
    FaUser,
    FaCommentDots,
    FaBriefcase,
    FaBuilding
} from "react-icons/fa";

import { toast } from "react-toastify";
import { submitLeave } from "../../../services/leaveService";
import "./Leave.css";

function Leave() {

    // ==========================
    // USER DETAILS
    // ==========================

    const user = JSON.parse(localStorage.getItem("user")) || {};
    console.log(user);

    // ==========================
    // FORM STATE
    // ==========================

    const [form, setForm] = useState({
        employeeId: user.employeeId || "",
        employeeName: user.name || "",
        designation: user.designation || "",
        department: user.department || "",
        email: user.email || "",
        leaveType: "",
        fromDate: "",
        toDate: "",
        days: "",
        reason: ""
    });

    const [loading, setLoading] = useState(false);

    

    // ==========================
    // INPUT CHANGE
    // ==========================

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    // ==========================
    // SUBMIT
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !form.leaveType ||
            !form.fromDate ||
            !form.toDate ||
            !form.reason
        ) {

            toast.error("Please fill all fields");
            return;

        }

        if (new Date(form.toDate) < new Date(form.fromDate)) {

            toast.error(
                "To Date cannot be earlier than From Date"
            );

            return;

        }

        try {

            setLoading(true);

            const days =
                Math.floor(
                    (new Date(form.toDate) - new Date(form.fromDate)) /
                    (1000 * 60 * 60 * 24)
                ) + 1;

            const payload = {

                employeeId: form.employeeId,

                employeeName: form.employeeName,

                designation: form.designation,

                department: form.department,

                email: form.email,

                leaveType: form.leaveType,

                fromDate: form.fromDate,

                toDate: form.toDate,

                days: days,

                reason: form.reason

            };
            const response = await submitLeave(payload);

            if (response.success) {

                toast.success(
                    "Leave request submitted successfully"
                );

                setForm({

                    employeeId: user.employeeId || "",

                    employeeName: user.name || "",

                    designation: user.designation || "",

                    department: user.department || "",

                    email: user.email || "",

                    leaveType: "",

                    fromDate: "",

                    toDate: "",

                    days: "",

                    reason: ""

                });

            } else {

                toast.error(
                    response.message ||
                    "Leave submission failed"
                );

            }

        } catch (error) {

            console.error(error);

            toast.error(
                "Server error while submitting leave"
            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // UI
    // ==========================

    return (

        <div className="leave-page">

            {/* HEADER */}

            <div className="leave-header">

                <h1>
                    <FaClipboardList />
                    Leave Request
                </h1>

                <p>
                    Apply your leave request
                </p>

            </div>

            {/* CARD */}

            <div className="leave-card">

                <form onSubmit={handleSubmit}>

                    {/* Employee */}

                    <div className="input-group">

                        <label>
                            <FaUser />
                            Employee Name
                        </label>

                        <input
                            type="text"
                            value={form.employeeName}
                            disabled
                        />

                    </div>

                    {/* Employee ID */}

                    <div className="input-group">

                        <label>
                            Employee ID
                        </label>

                        <input
                            type="text"
                            value={form.employeeId}
                            disabled
                        />

                    </div>

                    {/* Designation */}

                    <div className="input-group">

                        <label>
                            <FaBriefcase />
                            Designation
                        </label>

                        <input
                            type="text"
                            value={form.designation}
                            disabled
                        />

                    </div>

                    {/* Department */}

                    <div className="input-group">

                        <label>
                            <FaBuilding />
                            Department
                        </label>

                        <input
                            type="text"
                            value={form.department}
                            disabled
                        />

                    </div>

                    {/* Leave Type */}

                    <div className="input-group">

                        <label>
                            Leave Type
                        </label>

                        <select
                            name="leaveType"
                            value={form.leaveType}
                            onChange={handleChange}
                        >

                            <option value="">
                                Select Leave Type
                            </option>

                            <option value="Casual Leave">
                                Casual Leave
                            </option>

                            <option value="Sick Leave">
                                Sick Leave
                            </option>

                            <option value="Emergency Leave">
                                Emergency Leave
                            </option>

                            <option value="Permission">
                                Permission
                            </option>

                        </select>

                    </div>

                    {/* Dates */}

                    <div className="date-row">

                        <div className="input-group">

                            <label>
                                <FaCalendarAlt />
                                From Date
                            </label>

                            <input
                                type="date"
                                name="fromDate"
                                value={form.fromDate}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="input-group">

                            <label>
                                <FaCalendarAlt />
                                To Date
                            </label>

                            <input
                                type="date"
                                name="toDate"
                                value={form.toDate}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    {/* Reason */}

                    <div className="input-group">

                        <label>
                            <FaCommentDots />
                            Reason
                        </label>

                        <textarea
                            name="reason"
                            rows="5"
                            placeholder="Enter leave reason..."
                            value={form.reason}
                            onChange={handleChange}
                        />

                    </div>

                    {/* Submit */}

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        <FaPaperPlane />

                        {loading
                            ? "Submitting..."
                            : "Submit Leave"}

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Leave;