import api from "./api";


const getTime = () => {

    return new Date().toLocaleTimeString(
        "en-US",
        {
            hour:"2-digit",
            minute:"2-digit",
            second:"2-digit",
            hour12:true
        }
    );

};



// =========================
// GET TODAY ATTENDANCE
// =========================

export const getTodayAttendance = async(employeeId)=>{


    const response = await api.post("",{

        action:"getTodayAttendance",

        employeeId

    });


    return response.data;


};





// =========================
// CHECK IN
// =========================

export const checkInEmployee = async(user)=>{


    const time=getTime();



    const response = await api.post("",{


        action:"checkIn",

        employeeId:user.employeeId,

        name:user.name,

        designation:user.designation,

        date:new Date()
        .toLocaleDateString("en-GB"),

        checkIn:time,

        status:"Present"


    });



    return response.data;


};







// =========================
// CHECK OUT
// =========================


export const checkOutEmployee = async(employeeId)=>{


    const time=getTime();



    const response = await api.post("",{


        action:"checkOut",

        employeeId,

        checkOut:time


    });



    return response.data;


};

export const getDashboardAnalytics = async () => {

    try {

        const params = new URLSearchParams();

        params.append("action", "dashboardAnalytics");

        const response = await api.post("", params);

        console.log("Dashboard API Response:", response.data);

        return response.data;

    } catch (error) {

        console.error(error);

        return {
            success: false,
            message: error.message
        };

    }

};
// =========================
// GET ALL ATTENDANCE (ADMIN)
// =========================

export const getAllAttendance = async () => {

    try {

        const params = new URLSearchParams();

        params.append("action", "getAllAttendance");

        const response = await api.post("", params);

        return response.data;

    } catch (error) {

        console.error(error);

        return {
            success: false,
            data: []
        };
    }

};



// =========================
// ATTENDANCE SUMMARY
// =========================

export const getAttendanceSummary = async () => {

    try {

        const params = new URLSearchParams();

        params.append("action", "getAttendanceSummary");

        const response = await api.post("", params);

        return response.data;

    } catch (error) {

        console.error(error);

        return {
            success: false,
            data: {}
        };
    }

};

// =========================
// UNLOCK EMPLOYEE LOGIN
// =========================

export const unlockEmployee = async (employeeId) => {

    try {

        const response = await api.post("", {

            action: "unlockEmployee",

            employeeId

        });

        return response.data;

    } catch (error) {

        console.error("Unlock Employee Error:", error);

        return {
            success: false,
            message: error.message
        };

    }

};