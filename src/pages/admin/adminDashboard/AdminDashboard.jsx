import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaUsers,
    FaTasks,
    FaClipboardCheck,
    FaClock,
    FaCalendarCheck,
    FaUserClock
} from "react-icons/fa";

import { toast } from "react-toastify";

import { getDashboardAnalytics } from "../../../services/dashboardService";

import "./AdminDashboard.css";


function AdminDashboard() {


    const navigate = useNavigate();


    // ============================
    // ADMIN USER
    // ============================

    const adminUser = JSON.parse(localStorage.getItem("user")) || {};

    // ============================
    // STATES
    // ============================


    const [admDashboardLoading, setAdmDashboardLoading] = useState(true);

    const [admDashboardClock, setAdmDashboardClock] = useState(new Date());

    const [admDashboardData, setAdmDashboardData] = useState({

        employeeCount: 0,

        totalTasks: 0,

        completedTasks: 0,

        pendingTasks: 0,

        todayAttendance: 0,

        pendingLeaves: 0,

        departmentSummary: [],

        recentActivities: []

    });

    // ============================
    // LIVE CLOCK
    // ============================

    useEffect(() => {
        const timer = setInterval(() => {

            setAdmDashboardClock(new Date());

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    // ============================
    // LOAD DASHBOARD
    // ============================


    useEffect(() => {
        loadAdminDashboard();

    }, []);

    const loadAdminDashboard = async () => {

        try {

            setAdmDashboardLoading(true);

            const response = await getDashboardAnalytics();

            console.log("Dashboard Response", response);
            console.log("Dashboard Data", response.data);

            console.log("ADMIN DASHBOARD RESPONSE", response);

            if (response?.success) {

                const dashboard = response.data || {};

                setAdmDashboardData({
                    employeeCount:
                        dashboard.employees?.total || 0,

                    totalTasks:
                        dashboard.tasks?.total || 0,

                    completedTasks:
                        dashboard.tasks?.completed || 0,

                    pendingTasks:
                        dashboard.tasks?.pending || 0,

                    todayAttendance:
                        dashboard.attendance?.present || 0,

                    pendingLeaves:
                        dashboard.leaves?.pending || 0,

                    departmentSummary:
                        dashboard.departmentSummary || [],

                    recentActivities:
                        dashboard.recentActivities || []

                });


            }
            else {


                toast.error(

                    response?.message ||
                    "Dashboard loading failed"

                );


            }


        }
        catch (error) {


            console.error(
                "Dashboard Error",
                error
            );


            toast.error(
                "Failed to load dashboard"
            );


        }
        finally {


            setAdmDashboardLoading(false);


        }


    };




    // ============================
    // LOADING SCREEN
    // ============================


    if (admDashboardLoading) {


        return (

            <div className="adm-dashboard-loading">

                Loading Dashboard...

            </div>

        );

    }





    return (

        <div className="adm-dashboard-container">



            {/* ===========================
WELCOME
=========================== */}


            <section className="adm-dashboard-banner">


                <div>


                    <h1 className="adm-dashboard-banner-title">

                        Welcome,
                        {" "}
                        {adminUser.name || "Administrator"}

                    </h1>



                    <p className="adm-dashboard-banner-subtitle">

                        Manage employees, attendance,
                        leave requests and tasks.

                    </p>


                </div>




                <div className="adm-dashboard-clock">


                    <h2>

                        {admDashboardClock.toLocaleTimeString()}

                    </h2>


                    <p>

                        {admDashboardClock.toLocaleDateString()}

                    </p>


                </div>



            </section>





{/* ===========================
SUMMARY CARDS
=========================== */}



            <section className="adm-dashboard-summary">



                <DashboardCard
                    icon={<FaUsers />}
                    title="Total Employees"
                    value={admDashboardData.employeeCount}
                    click={() => navigate("/admin/employees")}
                />



                <DashboardCard
                    icon={<FaTasks />}
                    title="Total Tasks"
                    value={admDashboardData.totalTasks}
                    click={() => navigate("/admin/tasks")}
                />



                <DashboardCard
                    icon={<FaClipboardCheck />}
                    title="Completed Tasks"
                    value={admDashboardData.completedTasks}
                    click={() => navigate("/admin/tasks")}
                />



                <DashboardCard
                    icon={<FaClock />}
                    title="Pending Tasks"
                    value={admDashboardData.pendingTasks}
                    click={() => navigate("/admin/tasks")}
                />



                <DashboardCard
                    icon={<FaCalendarCheck />}
                    title="Attendances"
                    value={admDashboardData.todayAttendance}
                    click={() => navigate("/admin/attendance")}
                />



                <DashboardCard
                    icon={<FaUserClock />}
                    title="Pending Leaves"
                    value={admDashboardData.pendingLeaves}
                   click={() => navigate("/admin/leave")}
                />



            </section>

            {/* ===========================
CONTENT
=========================== */}



            <div className="adm-dashboard-content">
                {/* <section className="adm-dashboard-section">
                 <h2>
                        Department Summary
                    </h2>
                    <div className="adm-dashboard-department-grid">
                        {

                            admDashboardData.departmentSummary.length > 0 ?

                                admDashboardData.departmentSummary.map(
                                    (item, index) => (

                                        <div
                                            key={index}
                                            className="adm-dashboard-department-card"
                                        >


                                            <h3>

                                                {item.department}

                                            </h3>


                                            <p>

                                                {item.count} Employees

                                            </p>


                                        </div>

                                    )

                                )

                                :

                                <div className="adm-dashboard-empty">

                                    No Department Data Available

                                </div>

                        }


                    </div>


                </section> */}

                {/* <section className="adm-dashboard-section">


                    <h2>

                        Recent Activities

                    </h2>



                    <div className="adm-dashboard-activity-list">


                        {

                            admDashboardData.recentActivities.length > 0 ?

                                admDashboardData.recentActivities.map(
                                    (activity, index) => (


                                        <div
                                            key={index}
                                            className="adm-dashboard-activity-item"
                                        >


                                            <FaClipboardCheck />


                                            <div>


                                                <h4>

                                                    {activity.title}

                                                </h4>


                                                <p>

                                                    {activity.time}

                                                </p>


                                            </div>


                                        </div>


                                    )

                                )

                                :

                                <div className="adm-dashboard-empty">

                                    No Recent Activities

                                </div>


                        }



                    </div>



                </section> */}

                <section className="adm-dashboard-section">


                    <h2>

                        Quick Actions

                    </h2>



                    <div className="adm-dashboard-action-grid">


                        <ActionCard
                            icon={<FaUsers />}
                            text="Employees"
                            click={() => navigate("/admin/employees")}
                        />


                        <ActionCard
                            icon={<FaTasks />}
                            text="Tasks"
                            click={() => navigate("/admin/tasks")}
                        />


                        <ActionCard
                            icon={<FaCalendarCheck />}
                            text="Attendance"
                            click={() => navigate("/admin/attendance")}
                        />


                        <ActionCard
                            icon={<FaUserClock />}
                            text="Leaves"
                           click={() => navigate("/admin/leave")} />



                    </div>



                </section>



            </div>



        </div>


    );

}




// ============================
// CARD COMPONENT
// ============================


function DashboardCard({
    icon,
    title,
    value,
    click
}) {


    return (

        <div
            className="adm-dashboard-card"
            onClick={click}
        >


            <div className="adm-dashboard-card-icon">

                {icon}

            </div>


            <div>

                <h3>

                    {title}

                </h3>


                <h2>

                    {value || 0}

                </h2>


            </div>


        </div>

    );

}




function ActionCard({
    icon,
    text,
    click
}) {


    return (

        <div
            className="adm-dashboard-action-card"
            onClick={click}
        >


            {icon}


            <span>

                {text}

            </span>


        </div>

    );

}



export default AdminDashboard;