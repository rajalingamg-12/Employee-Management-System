import React from "react";
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// ============================
// AUTH PAGES
// ============================

import Login from "../pages/login/Login";
import DashboardSelection from "../pages/dashboardSelection/DashboardSelection";


// ============================
// PROTECTION
// ============================

import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import RoleRoute from "../protectedRoute/RoleRoute";



// ============================
// EMPLOYEE MODULE
// ============================

import EmployeeLayout
    from "../pages/employee/employeeLayout/EmployeeLayout";

import EmployeeDashboard
    from "../pages/employee/employeeDashboard/EmployeeDashboard";

import Profile
    from "../pages/employee/profile/Profile";

import AttendanceHistory
    from "../pages/employee/attendanceHistory/AttendanceHistory";

import SubmitTask
    from "../pages/employee/submitTask/SubmitTask";

import TaskHistory
    from "../pages/employee/taskHistory/TaskHistory";

import Leave
    from "../pages/employee/leave/Leave";

import LeaveHistory
    from "../pages/employee/leaveHistory/LeaveHistory";



// ============================
// ADMIN MODULE
// ============================

import AdminLayout
    from "../pages/admin/adminLayout/AdminLayout";

import AdminDashboard
    from "../pages/admin/adminDashboard/AdminDashboard";

import AdminEmployees
    from "../pages/admin/adminEmployees/AdminEmployees";

import AdminTasks
    from "../pages/admin/adminTasks/AdminTasks";

import AdminReports
    from "../pages/admin/adminReports/AdminReports";

import AdminAttendance from "../pages/admin/adminAttendance/AdminAttendance";

import AdminLeave from "../pages/admin/adminLeaves/AdminLeaves";





function AppRoutes() {



    return (


        <>


            <Routes>


                {/* ==================================================
    LOGIN
================================================== */}


                <Route

                    path="/"

                    element={<Login />}

                />





                {/* ==================================================
    DASHBOARD SELECTION
================================================== */}


                <Route

                    path="/dashboard-selection"

                    element={

                        <ProtectedRoute>

                            <DashboardSelection />

                        </ProtectedRoute>

                    }

                />





                {/* ==================================================
    EMPLOYEE MODULE
================================================== */}



                <Route

                    path="/employee"

                    element={


                        <ProtectedRoute>


                            <RoleRoute allowedRole="Employee">


                                <EmployeeLayout />


                            </RoleRoute>


                        </ProtectedRoute>


                    }


                >



                    {/* DEFAULT EMPLOYEE DASHBOARD */}

                    <Route

                        index

                        element={<EmployeeDashboard />}

                    />





                    <Route

                        path="profile"

                        element={<Profile />}

                    />





                    <Route

                        path="attendance-history"

                        element={<AttendanceHistory />}

                    />





                    <Route

                        path="submit-task"

                        element={<SubmitTask />}

                    />





                    <Route

                        path="task-history"

                        element={<TaskHistory />}

                    />





                    <Route

                        path="leave"

                        element={<Leave />}

                    />





                    <Route

                        path="leave-history"

                        element={<LeaveHistory />}

                    />





                </Route>









                {/* ==================================================
    ADMIN MODULE
================================================== */}



                <Route

                    path="/admin"

                    element={


                        <ProtectedRoute>


                            <RoleRoute allowedRole="Admin">


                                <AdminLayout />


                            </RoleRoute>


                        </ProtectedRoute>


                    }


                >



                    {/* ADMIN HOME */}


                    <Route

                        index

                        element={<AdminDashboard />}

                    />





                    <Route

                        path="dashboard"

                        element={<AdminDashboard />}

                    />

                    <Route
                        path="employees"
                        element={<AdminEmployees />}
                    />


                    <Route
                        path="tasks"
                        element={<AdminTasks />}
                    />

                    <Route
                        path="reports"
                        element={<AdminReports />}
                    />


                    <Route
                        path="attendance"
                        element={<AdminAttendance />}
                    />
                    <Route
                        path="leave"
                        element={<AdminLeave />}
                    />
                </Route>
                {/* ==================================================
    INVALID URL
================================================== */}


                <Route

                    path="*"

                    element={<Login />}

                />





            </Routes>







            {/* ==================================================
    TOAST
================================================== */}



            <ToastContainer

                position="top-right"

                autoClose={3000}

                hideProgressBar={false}

                newestOnTop

                closeOnClick

                pauseOnHover

                draggable

                theme="colored"

            />





        </>


    );



}



export default AppRoutes;