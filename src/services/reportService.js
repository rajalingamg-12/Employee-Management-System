import api from "./api";

// ==========================================
// EMPLOYEE REPORT
// ==========================================

export const getEmployeeReport = async () => {

    try {

        const params = new URLSearchParams();

        params.append(
            "action",
            "employeeReport"
        );

        const response = await api.post(
            "",
            params
        );

        return response.data;

    }
    catch (error) {

        console.error(
            "Employee Report Error:",
            error
        );

        return {
            success: false,
            message: "Failed to load employee report"
        };

    }

};

// ==========================================
// ATTENDANCE REPORT
// ==========================================

export const getAttendanceReport = async () => {

    try {

        const params = new URLSearchParams();

        params.append(
            "action",
            "attendanceReport"
        );

        const response = await api.post(
            "",
            params
        );

        return response.data;

    }
    catch (error) {

        console.error(
            "Attendance Report Error:",
            error
        );

        return {
            success: false,
            message: "Failed to load attendance report"
        };

    }

};

// ==========================================
// TASK REPORT
// ==========================================

export const getTaskReport = async () => {

    try {

        const params = new URLSearchParams();

        params.append(
            "action",
            "taskReport"
        );

        const response = await api.post(
            "",
            params
        );

        return response.data;

    }
    catch (error) {

        console.error(
            "Task Report Error:",
            error
        );

        return {
            success: false,
            message: "Failed to load task report"
        };

    }

};

// ==========================================
// LEAVE REPORT
// ==========================================

export const getLeaveReport = async () => {

    try {

        const params = new URLSearchParams();

        params.append(
            "action",
            "leaveReport"
        );

        const response = await api.post(
            "",
            params
        );

        return response.data;

    }
    catch (error) {

        console.error(
            "Leave Report Error:",
            error
        );

        return {
            success: false,
            message: "Failed to load leave report"
        };

    }

};

// ==========================================
// PERFORMANCE REPORT
// ==========================================

export const getPerformanceReport = async () => {

    try {

        const params = new URLSearchParams();

        params.append(
            "action",
            "employeePerformanceReport"
        );

        const response = await api.post(
            "",
            params
        );

        return response.data;

    }
    catch (error) {

        console.error(
            "Performance Report Error:",
            error
        );

        return {
            success: false,
            message: "Failed to load performance report"
        };

    }

};