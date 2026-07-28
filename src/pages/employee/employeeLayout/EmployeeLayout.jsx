import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";

import "./EmployeeLayout.css";

function EmployeeLayout() {

    return (

        <div className="employee-layout">

            {/* Top Navbar */}
            <Navbar />

            <div className="employee-body">

                {/* Sidebar */}
                <Sidebar role="Employee" />

                {/* Main Content */}
                <main className="employee-content">

                    <div className="page-container">

                        {/* Dynamic Pages */}
                        <Outlet />

                    </div>

                </main>

            </div>

        </div>

    );

}

export default EmployeeLayout;