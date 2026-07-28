// import React from "react";
// import "./DashboardSelection.css";

// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FaUserTie, FaUsersCog } from "react-icons/fa";

// import { useAuth } from "../../context/AuthContext";

// import loginImage from "../../assets/main-dash.png";

// function DashboardSelection() {

//     const navigate = useNavigate();

//     const { user } = useAuth();

//     const openEmployeeDashboard = () => {

//         if (!user) {

//             toast.error("Please login first.");

//             navigate("/");

//             return;

//         }

//         if (user.role === "Employee") {

//             navigate("/employee");

//         } else {

//             toast.error("Only Employees can access Employee Dashboard.");

//         }

//     };

//     const openAdminDashboard = () => {

//         if (!user) {

//             toast.error("Please login first.");

//             navigate("/");

//             return;

//         }

//         if (user.role === "Admin") {

//             navigate("/admin");

//         } else {

//             toast.error("Only Admin can access Admin Dashboard.");

//         }

//     };

//     return (

//         <div className="selection-container">

//             {/* Left Side */}

//             <div className="left-side">

//                 <h1>Employee Management System</h1>

//                 <p>
//                     Manage employees, attendance,
//                     leave requests, reports and
//                     daily tasks from one place.
//                 </p>

//                 <img
//                     src={loginImage}
//                     alt="Dashboard"
//                 />

//             </div>

//             {/* Right Side */}

//             <div className="right-side">

//                 <div className="dashboard-header">

//                     <h2>
//                         Welcome, {user?.name}
//                     </h2>

//                     <p>
//                         Select Your Dashboard
//                     </p>

//                 </div>

//                 <div className="dashboard-options">

//                     {/* Employee Dashboard */}

//                     <div
//                         className="dashboard-box"
//                         onClick={openEmployeeDashboard}
//                     >

//                         <div className="left">

//                             <FaUserTie className="dashboard-icon" />

//                             <div>

//                                 <h3>Employee Workspace</h3>

//                                 <p>
//                                     Attendance, Leave,
//                                     Daily Tasks,
//                                     History & Profile
//                                 </p>

//                             </div>

//                         </div>

//                         <span className="arrow">→</span>

//                     </div>

//                     {/* Admin Dashboard */}

//                     <div
//                         className="dashboard-box"
//                         onClick={openAdminDashboard}
//                     >

//                         <div className="left">

//                             <FaUsersCog className="dashboard-icon" />

//                             <div>

//                                 <h3>Admin Workspace</h3>

//                                 <p>
//                                     Employees, Reports,
//                                     Attendance &
//                                     Analytics
//                                 </p>

//                             </div>

//                         </div>

//                         <span className="arrow">→</span>

//                     </div>

//                 </div>

//             </div>

//         </div>

//     );

// }

// export default DashboardSelection;

import React from "react";
import "./DashboardSelection.css";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserTie, FaUsersCog } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import loginImage from "../../assets/main-dash.png";

function DashboardSelection() {

    const navigate = useNavigate();

    const { user } = useAuth();

    // ==========================
    // Employee Dashboard
    // ==========================

    const openEmployeeDashboard = () => {

        if (!user) {

            toast.error("Please login first.");

            navigate("/");

            return;

        }

        if (user.role === "Employee") {

            navigate("/employee");

        } else {

            toast.error("Only Employees can access Employee Dashboard.");

        }

    };

    // ==========================
    // Admin Dashboard
    // ==========================

    const openAdminDashboard = () => {

        if (!user) {

            toast.error("Please login first.");

            navigate("/");

            return;

        }

        if (user.role === "Admin") {

            // Opens Admin Dashboard
            navigate("/admin/dashboard");

        } else {

            toast.error("Only Admin can access Admin Dashboard.");

        }

    };

    return (

        <div className="selection-container">

            {/* Left Side */}

            <div className="left-side">

                <h1>Employee Management System</h1>

                <p>
                    Manage employees, attendance,
                    leave requests, reports and
                    daily tasks from one place.
                </p>

                <img
                    src={loginImage}
                    alt="Dashboard"
                />

            </div>

            {/* Right Side */}

            <div className="right-side">

                <div className="dashboard-header">

                    <h2>

                        Welcome, {user?.name || "User"}

                    </h2>

                    <p>

                        Select Your Dashboard

                    </p>

                </div>

                <div className="dashboard-options">

                    {/* Employee */}

                    <div
                        className="dashboard-box"
                        onClick={openEmployeeDashboard}
                    >

                        <div className="left">

                            <FaUserTie className="dashboard-icon" />

                            <div>

                                <h3>

                                    Employee Workspace

                                </h3>

                                <p>

                                    Attendance, Leave,
                                    Daily Tasks,
                                    History & Profile

                                </p>

                            </div>

                        </div>

                        <span className="arrow">

                            →

                        </span>

                    </div>

                    {/* Admin */}

                    <div
                        className="dashboard-box"
                        onClick={openAdminDashboard}
                    >

                        <div className="left">

                            <FaUsersCog className="dashboard-icon" />

                            <div>

                                <h3>

                                    Admin Workspace

                                </h3>

                                <p>

                                    Employees,
                                    Attendance,
                                    Leave,
                                    Reports &
                                    Analytics

                                </p>

                            </div>

                        </div>

                        <span className="arrow">

                            →

                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardSelection;