import React from "react";

import {
    FaBell,
    FaUserCircle
} from "react-icons/fa";

import "./AdminNavbar.css";


function AdminNavbar(){


    const adminUser =
        JSON.parse(
            localStorage.getItem("user")
        ) || {};



    return(


        <header className="adm-navbar">



            <div className="adm-navbar-title">


                Admin Dashboard


            </div>





            <div className="adm-navbar-right">



                <div className="adm-navbar-notification">


                    <FaBell />


                    <span>

                        0

                    </span>


                </div>






                <div className="adm-navbar-user">


                    <FaUserCircle />


                    <div>


                        <h4>

                            {
                                adminUser.name ||
                                "Admin"
                            }

                        </h4>


                        <p>

                            Administrator

                        </p>


                    </div>


                </div>




            </div>



        </header>


    );

}


export default AdminNavbar;