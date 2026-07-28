import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleRoute({ allowedRole, children }) {

    const { user, loading } = useAuth();

    // Wait until authentication finishes
    if (loading) {

        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    fontSize: "20px",
                    fontWeight: "600"
                }}
            >
                Loading...
            </div>
        );

    }

    // Not logged in
    if (!user) {

        return <Navigate to="/" replace />;

    }

    // Role not allowed
    if (user.role !== allowedRole) {

        return <Navigate to="/dashboard-selection" replace />;

    }

    // Authorized
    return children;

}

export default RoleRoute;