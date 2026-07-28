import React from "react";
import { NavLink } from "react-router-dom";

import {
    FaTachometerAlt,
    FaUsers,
    FaTasks,
    FaCalendarCheck,
    FaFileAlt,
    FaSignOutAlt,
    FaUserShield,
    FaChartBar
} from "react-icons/fa";

import "./AdminSidebar.css";


function AdminSidebar() {


    const adminUser =
        JSON.parse(
            localStorage.getItem("user")
        ) || {};



    const logout = () => {

        localStorage.removeItem("user");

        window.location.href = "/";

    };



    return (


        <aside className="adm-sidebar">


            {/* =====================
                LOGO
            ====================== */}


            <div className="adm-sidebar-logo">


                <FaUserShield />


                <h2>

                    Admin Panel

                </h2>


            </div>





            {/* =====================
                ADMIN PROFILE
            ====================== */}



            <div className="adm-sidebar-profile">


                <div className="adm-sidebar-avatar">

                    {
                        adminUser.name
                            ?
                            adminUser.name.charAt(0)
                            :
                            "A"
                    }

                </div>



                <div>


                    <h4>

                        {
                            adminUser.name ||
                            "Administrator"
                        }

                    </h4>


                    <p>

                        Admin

                    </p>


                </div>


            </div>







            {/* =====================
                MENU
            ====================== */}



            <nav className="adm-sidebar-menu">



                <NavLink
                    to="/admin"
                    end
                    className="adm-sidebar-link"
                >

                    <FaTachometerAlt />

                    <span>
                        Dashboard
                    </span>


                </NavLink>






                <NavLink
                    to="/admin/employees"
                    className="adm-sidebar-link"
                >

                    <FaUsers />

                    <span>
                        Employees
                    </span>


                </NavLink>






                <NavLink
                    to="/admin/tasks"
                    className="adm-sidebar-link"
                >

                    <FaTasks />

                    <span>
                        Tasks
                    </span>


                </NavLink>






                <NavLink
                    to="/admin/attendance"
                    className="adm-sidebar-link"
                >

                    <FaCalendarCheck />

                    <span>
                        Attendance
                    </span>


                </NavLink>
                <NavLink
                    to="/admin/leave"
                    className="adm-sidebar-link"
                >

                    <FaFileAlt />

                    <span>
                        Leave Requests
                    </span>

                </NavLink>

                <NavLink
                    to="/admin/reports"
                    className="adm-sidebar-link"
                >

                    <FaChartBar />

                    <span>
                        Reports
                    </span>

                </NavLink>
            </nav>

            {/* =====================
                LOGOUT
            ====================== */}



            <button
                className="adm-sidebar-logout"
                onClick={logout}
            >


                <FaSignOutAlt />


                Logout


            </button>




        </aside>


    );

}


export default AdminSidebar;