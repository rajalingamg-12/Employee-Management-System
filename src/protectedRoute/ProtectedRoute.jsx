import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {

    const { user, loading } = useAuth();

    // Wait until localStorage is checked
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

    // User not logged in
    if (!user) {

        return <Navigate to="/" replace />;

    }

    // User logged in
    return children;

}

export default ProtectedRoute;