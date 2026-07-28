import React from "react";
import "./Navbar.css";
import logo from "../../assets/t-bglogo.png";

function Navbar() {
    return (
        <nav className="navbar">

            <div className="navbar-left">
                <img
                    src={logo}
                    alt="Techie Crew Logo"
                    className="navbar-logo"
                />

                <div className="navbar-title">
                    <h2>Employee Management System</h2>
                    <span>Techie Crew Solutions</span>
                </div>
            </div>

        </nav>
    );
}

export default Navbar;