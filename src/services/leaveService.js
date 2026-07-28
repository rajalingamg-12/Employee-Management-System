import api from "./api";

// ======================================================
// SUBMIT LEAVE REQUEST
// ======================================================

export const submitLeave = async (leaveData) => {
    try {

        const params = new URLSearchParams();

        params.append("action", "submitLeave");

        Object.keys(leaveData).forEach((key) => {
            params.append(key, leaveData[key]);
        });

        const response = await api.post("", params);

        return response.data;

    } catch (error) {

        console.error("Submit Leave Error:", error);

        return {
            success: false,
            message: "Unable to submit leave request"
        };

    }
};

// ======================================================
// GET MY LEAVES
// ======================================================

export const getMyLeaves = async (employeeId) => {

    try {

        const params = new URLSearchParams();

        params.append("action", "getMyLeaves");
        params.append("employeeId", employeeId);

        const response = await api.post("", params);

        return response.data;

    } catch (error) {

        console.error("Get My Leaves Error:", error);

        return {
            success: false,
            data: []
        };

    }

};

// ======================================================
// GET ALL LEAVES (ADMIN)
// ======================================================

export const getAllLeaves = async () => {

    try {

        const params = new URLSearchParams();

        params.append("action", "getAllLeaves");

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

// ======================================================
// LEAVE SUMMARY
// ======================================================

export const getLeaveSummary = async () => {

    try {

        const params = new URLSearchParams();

        params.append("action", "getLeaveSummary");

        const response = await api.post("", params);

        return response.data;

    } catch (error) {

        console.error(error);

        return {
            success: false,
            data: {
                totalLeaves: 0,
                pending: 0,
                approved: 0,
                rejected: 0
            }
        };

    }

};

// ======================================================
// APPROVE LEAVE
// ======================================================

export const approveLeaveRequest = async (leaveId) => {

    try {

        const params = new URLSearchParams();

        params.append("action", "approveLeave");
        params.append("leaveId", leaveId);

        const response = await api.post("", params);

        return response.data;

    } catch (error) {

        console.error(error);

        return {
            success: false,
            message: "Unable to approve leave."
        };

    }

};

// ======================================================
// REJECT LEAVE
// ======================================================

export const rejectLeaveRequest = async (leaveId) => {

    try {

        const params = new URLSearchParams();

        params.append("action", "rejectLeave");
        params.append("leaveId", leaveId);

        const response = await api.post("", params);

        return response.data;

    } catch (error) {

        console.error(error);

        return {
            success: false,
            message: "Unable to reject leave."
        };

    }

};