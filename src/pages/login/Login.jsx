import React, { useState } from "react";
import "./Login.css";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaUserTie } from "react-icons/fa";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

import loginImage from "../../assets/illustration-bg.png";
import companyLogo from "../../assets/atech-logo.png";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.email || !formData.password) {

            toast.error("Please enter Email and Password");

            return;

        }

        try {

            setLoading(true);

            const response = await loginUser(
                formData.email,
                formData.password
            );

            console.log("Login Response:", response);
            // alert(JSON.stringify(response));

            if (response.success) {

                console.log("Success Response:", response);

                login(response.data);

                console.log("User saved to localStorage:", localStorage.getItem("user"));

                toast.success("Login Successful");

                navigate("/dashboard-selection", { replace: true });

            } else {

                toast.error(response.message || "Invalid Email or Password");

            }

        } catch (error) {

            console.error(error);

            toast.error("Unable to connect to server.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-container">

            {/* Left Panel */}

            <div className="left-panel">

                {/* Company Branding */}
                <div className="company-brand">

                    <img
                        src={companyLogo}
                        alt="Techie Crew Logo"
                        className="company-logo"
                    />

                    <div className="company-info">
                        <h2>Techie Crew</h2>
                        <p>Business Management Company & IT Desk</p>
                    </div>

                </div>

                <img
                    src={loginImage}
                    alt="Employee Management"
                    className="login-illustration"
                />

                <h1>Employee Management System</h1>

                <p>
                    Attendance • Leave • Tasks • Reports
                </p>

            </div>

            {/* Right Panel */}

            <div className="right-panel">

                <div className="login-card">

                    <div className="login-icon">

                        <FaUserTie />

                    </div>

                    <h2>Welcome Back</h2>

                    <p>Please login to continue</p>

                    <form onSubmit={handleSubmit}>

                        <div className="input-groups">

                            <FaEnvelope />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="input-groups">

                            <FaLock />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Logging In..." : "Login"}
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default Login;