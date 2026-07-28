import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../../components/sidebar/Sidebar";
import api from "../../../services/api";

import {
    FaSignInAlt,
    FaSignOutAlt,
    FaClock,
    FaCheckCircle,
    FaCalendarAlt,
    FaPaperPlane,
    FaCalendarPlus,
    FaArrowRight,
    FaUserCircle,
    FaClipboardList,
    FaHistory

} from "react-icons/fa";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./EmployeeDashboard.css";

function EmployeeDashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user")) || {};

    const [activities, setActivities] = useState([]);

    // ==========================
    // STATE
    // ==========================

    const [attendance, setAttendance] = useState({

        checkIn: "--:--",

        checkOut: "--:--",

        workingHours: "0h 0m",

        status: "Not Marked"

    });

    const [currentTime, setCurrentTime] = useState("");

    const today = new Date().toLocaleDateString("en-US", {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric"

    });


    // ==========================
    // LOAD RECENT ACTIVITY
    // ==========================

    const loadRecentActivity = async () => {

        try {

            const response = await api.post("", {

                action: "getRecentActivity",

                employeeId: user.employeeId

            });

            if (response.data.success) {

                setActivities(response.data.data || []);

            }

        }

        catch (error) {

            console.log(error);

        }

    };

    // ==========================
    // LOAD ATTENDANCE
    // ==========================

    useEffect(() => {

        loadTodayAttendance();

        loadRecentActivity();

    }, []);

    // ==========================
    // LIVE CLOCK
    // ==========================

    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentTime(

                new Date().toLocaleTimeString("en-US", {

                    hour: "2-digit",

                    minute: "2-digit",

                    second: "2-digit",

                    hour12: true

                })

            );

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    // ==========================
    // LOAD TODAY ATTENDANCE
    // ==========================

    const loadTodayAttendance = async () => {

        try {

            const response = await api.post("", {

                action: "getTodayAttendance",

                employeeId: user.employeeId

            });

            if (response.data.success) {

                const data = response.data.data || {};

                setAttendance({

                    checkIn: data.checkIn || "--:--",

                    checkOut: data.checkOut || "--:--",

                    workingHours: data.totalHours || "0h 0m",

                    status: data.status || "Not Marked"

                });

            }

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load today's attendance.");

        }

    };

    // ==========================
    // CHECK IN
    // ==========================

    const handleCheckIn = async () => {

        if (attendance.checkIn !== "--:--") {

            toast.warning("⚠️ You have already checked in today.");

            return;

        }

        const checkInTime = new Date().toLocaleTimeString("en-US", {

            hour: "2-digit",

            minute: "2-digit",

            second: "2-digit",

            hour12: true

        });

        try {

            const response = await api.post("", {

                action: "checkIn",

                employeeId: user.employeeId,

                name: user.name,

                designation: user.designation,

                date: new Date().toLocaleDateString("en-GB"),

                checkIn: checkInTime,

                status: "Present"

            });

            if (response.data.success) {

                setAttendance(prev => ({

                    ...prev,

                    checkIn: checkInTime,

                    status: "Present"

                }));

                toast.success(

                    `✅ Check In Successful\nTime : ${checkInTime}`,

                    {

                        autoClose: 3000

                    }

                );

                loadTodayAttendance();

            }

            else {

                toast.warning(

                    response.data.message ||

                    "Check In failed."

                );

            }

        }

        catch (error) {

            console.log(error);

            toast.error(

                "Something went wrong during Check In."

            );

        }

    };

    // ==========================
    // PART 2 STARTS HERE
    // ==========================

    // ==========================
    // CHECK OUT
    // ==========================

    const handleCheckOut = async () => {

        if (attendance.checkIn === "--:--") {

            toast.warning("⚠️ Please Check In before Check Out.");

            return;

        }

        if (attendance.checkOut !== "--:--") {

            toast.warning("⚠️ You have already checked out today.");

            return;

        }

        const checkOutTime = new Date().toLocaleTimeString("en-US", {

            hour: "2-digit",

            minute: "2-digit",

            second: "2-digit",

            hour12: true

        });

        try {

            const response = await api.post("", {

                action: "checkOut",

                employeeId: user.employeeId,

                checkOut: checkOutTime

            });

            if (response.data.success) {

                const totalHours =
                    response.data.data?.totalHours ||
                    response.data.totalHours ||
                    "0h 0m";

                setAttendance(prev => ({

                    ...prev,

                    checkOut: checkOutTime,

                    workingHours: totalHours

                }));

                toast.success(

                    `🎉 Check Out Successful\nWorked : ${totalHours}`,

                    {

                        autoClose: 3000

                    }

                );

                loadTodayAttendance();

            }

            else {

                toast.warning(

                    response.data.message ||

                    "Check Out failed."

                );

            }

        }

        catch (error) {

            console.log(error);

            toast.error(

                "Something went wrong during Check Out."

            );

        }

    };

    // ==========================
    // QUICK ACTIONS
    // ==========================

    const quickActions = [

        {

            title: "Check In",

            icon: <FaSignInAlt />,

            color: "orange"

        },

        {

            title: "Check Out",

            icon: <FaSignOutAlt />,

            color: "red"

        },

        {

            title: "Apply Leave",

            icon: <FaCalendarPlus />,

            color: "green"

        },

        {

            title: "Submit Task",

            icon: <FaPaperPlane />,

            color: "blue"

        }

    ];

    return (

        <div className="employee-dashboard-layouts">

            <Sidebar role="employee" />

            <main className="employee-dashboards">

                {/* ==========================
                    BANNER
                ========================== */}

                <section className="dashboard-banners">

                    <div className="banner-left">

                        <h1>

                            Welcome Back,

                            <span> {user.name}</span> 👋

                        </h1>

                        <p>

                            Manage your attendance,
                            leave requests and
                            daily tasks.

                        </p>

                    </div>

                    <div className="banner-right">

                        <div className="date-card">

                            <FaCalendarAlt />

                            <span>{today}</span>

                        </div>

                    </div>

                </section>

                {/* ==========================
                    PROFILE
                ========================== */}

                <section className="profile-cards">

                    <div className="profile-lefts">

                        <div className="profile-avatars">

                            <FaUserCircle />

                        </div>

                        <div>

                            <h2>{user.name}</h2>

                            <p>{user.designation}</p>

                            <small>

                                {user.employeeId}

                            </small>

                        </div>

                    </div>

                    <div className="profile-status">

                        <div className="status-pill">

                            🟢 Active Employee

                        </div>

                        <div className="live-time">

                            <FaClock />

                            <span>

                                {currentTime}

                            </span>

                        </div>

                    </div>

                </section>

                {/* ==========================
                    SUMMARY
                ========================== */}

                <section className="summary-grids">

                    <div className="summary-cards">

                        <div className="summary-icon orange">

                            <FaSignInAlt />

                        </div>

                        <h4>

                            Today's Check In

                        </h4>

                        <h2>

                            {attendance.checkIn}

                        </h2>

                        <p>

                            Check In Time

                        </p>

                    </div>

                    <div className="summary-cards">

                        <div className="summary-icon red">

                            <FaSignOutAlt />

                        </div>

                        <h4>

                            Today's Check Out

                        </h4>

                        <h2>

                            {attendance.checkOut}

                        </h2>

                        <p>

                            Check Out Time

                        </p>

                    </div>

                    <div className="summary-cards">

                        <div className="summary-icon blue">

                            <FaClock />

                        </div>

                        <h4>

                            Working Hours

                        </h4>

                        <h2>

                            {attendance.workingHours}

                        </h2>

                        <p>

                            Total Working Hours

                        </p>

                    </div>

                    <div className="summary-cards">

                        <div className="summary-icon green">

                            <FaCheckCircle />

                        </div>

                        <h4>

                            Attendance Status

                        </h4>

                        <h2>

                            {attendance.status}

                        </h2>

                        <p>

                            Today's Status

                        </p>

                    </div>

                </section>

                {/* PART 3 STARTS HERE */}
                {/* ==========================
                    QUICK ACTIONS
                ========================== */}

                <section className="dashboard-section">

                    <div className="section-title">

                        <div>

                            <h2>
                                Quick Actions
                            </h2>

                            <p>
                                Frequently used employee actions
                            </p>

                        </div>

                    </div>


                    <div className="action-grid">


                        {
                            quickActions.map((item, index) => (


                                <div

                                    key={index}

                                    className={`action-card ${item.color}`}

                                    onClick={() => {


                                        switch (item.title) {


                                            case "Check In":

                                                handleCheckIn();

                                                break;



                                            case "Check Out":

                                                handleCheckOut();

                                                break;



                                            case "Apply Leave":

                                                navigate(
                                                    "/employee/leave"
                                                );

                                                break;



                                            case "Submit Task":

                                                navigate(
                                                    "/employee/submit-task"
                                                );

                                                break;



                                            default:

                                                break;

                                        }


                                    }}

                                >



                                    <div className="action-icon">

                                        {item.icon}

                                    </div>



                                    <h3>

                                        {item.title}

                                    </h3>



                                    <span>

                                        Open

                                        <FaArrowRight
                                            style={{
                                                marginLeft: "8px"
                                            }}
                                        />

                                    </span>



                                </div>


                            ))
                        }


                    </div>


                </section>

                {/* ==========================
                    RECENT ACTIVITY
                ========================== */}

                <section className="dashboard-section">

                    <div className="section-title">

                        <div>

                            <h2>Recent Activity</h2>

                            <p>Your latest employee activities</p>

                        </div>

                    </div>

                    <div className="activity-card">

                        {

                            activities.length === 0 ?

                                (

                                    <div className="activity-empty">

                                        <FaClock size={55} />

                                        <h3>No Recent Activity</h3>

                                        <p>

                                            Your check in,

                                            check out,

                                            leave requests and

                                            submitted tasks will appear here.

                                        </p>

                                    </div>

                                )

                                :

                                (

                                    activities.map((item, index) => (

                                        <div

                                            className="activity-item"

                                            key={index}

                                        >

                                            <div className="activity-icon">

                                                {

                                                    item.type === "Check In"

                                                        ?

                                                        <FaSignInAlt />

                                                        :

                                                        item.type === "Check Out"

                                                            ?

                                                            <FaSignOutAlt />

                                                            :

                                                            item.type === "Task"

                                                                ?

                                                                <FaClipboardList />

                                                                :

                                                                <FaCalendarPlus />

                                                }

                                            </div>

                                            <div className="activity-content">

                                                <h4>{item.title}</h4>

                                                <p>{item.description}</p>

                                            </div>

                                            <div className="activity-time">

                                                <span>{item.date}</span>

                                                <small>{item.time}</small>

                                            </div>

                                        </div>

                                    ))

                                )

                        }

                    </div>

                </section>
            </main>


        </div>


    );


}


export default EmployeeDashboard;
