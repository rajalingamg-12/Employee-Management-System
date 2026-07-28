import React from "react";
import { Outlet } from "react-router-dom";

import AdminNavbar from "../../../components/navbar/AdminNavbar";
import AdminSidebar from "../../../components/sidebar/AdminSidebar";

import "./AdminLayout.css";


function AdminLayout() {


    return (

        <div className="adm-layout-container">


            {/* =====================
                ADMIN SIDEBAR
            ====================== */}

            <AdminSidebar />



            {/* =====================
                RIGHT SECTION
            ====================== */}

            <div className="adm-layout-main">


                <AdminNavbar />



                <main className="adm-layout-content">

                    <Outlet />

                </main>


            </div>



        </div>

    );

}


export default AdminLayout;