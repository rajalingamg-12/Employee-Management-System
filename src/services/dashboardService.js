import api from "./api";


// ======================================================
// GET ADMIN DASHBOARD ANALYTICS
// ======================================================

export const getDashboardAnalytics = async () => {

    try {

        const params = new URLSearchParams();

        params.append(
            "action",
            "dashboardAnalytics"
        );


        const response = await api.post(
            "",
            params
        );


        return response.data;


    } catch (error) {

        console.error(
            "Dashboard Analytics Error:",
            error
        );

        return {

            success: false,

            message:
                error.message ||
                "Failed to load dashboard data"

        };

    }

};



// ======================================================
// GET ALL EMPLOYEES
// ======================================================

export const getEmployees = async () => {

    try {

        const params = new URLSearchParams();

        params.append(
            "action",
            "getEmployees"
        );


        const response = await api.post(
            "",
            params
        );


        return response.data;


    } catch (error) {

        console.error(
            "Get Employees Error:",
            error
        );


        return {

            success:false,

            message:
                error.message

        };

    }

};



// ======================================================
// GET ALL TASKS
// ======================================================

export const getAllTasks = async () => {

    try {

        const params = new URLSearchParams();

        params.append(
            "action",
            "getAllTasks"
        );


        const response = await api.post(
            "",
            params
        );


        return response.data;


    } catch(error){

        console.error(
            "Get Tasks Error:",
            error
        );


        return {

            success:false,

            message:error.message

        };

    }

};



// ======================================================
// GET ALL ATTENDANCE
// ======================================================

export const getAllAttendance = async () => {

    try {

        const params = new URLSearchParams();

        params.append(
            "action",
            "getAllAttendance"
        );


        const response = await api.post(
            "",
            params
        );


        return response.data;


    } catch(error){

        console.error(
            "Attendance Error:",
            error
        );


        return {

            success:false,

            message:error.message

        };

    }

};



// ======================================================
// GET LEAVE DETAILS
// ======================================================

export const getAllLeaves = async () => {

    try {

        const params = new URLSearchParams();

        params.append(
            "action",
            "leaveHistory"
        );


        const response = await api.post(
            "",
            params
        );


      console.log(
    "RAW DASHBOARD RESPONSE",
    response.data
);


return response.data;


    } catch(error){

        console.error(
            "Leave Error:",
            error
        );


        return {

            success:false,

            message:error.message

        };

    }

};