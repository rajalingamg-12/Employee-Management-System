import api from "./api";

// ==========================================
// GET ALL TASKS
// ==========================================

export const getAdminTasks = async () => {

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

    }
    catch (error) {

        console.error(
            "Admin Task Error:",
            error
        );

        return {

            success: false,

            message: "Failed to load tasks"

        };

    }

};

// ========================================
// UPDATE APPROVAL
// ========================================

export const updateTaskApproval = async ({
    taskId,
    adminStatus,
    adminRemarks
}) => {

    try {

        const params = new URLSearchParams();

        params.append("action", "updateTaskApproval");
        params.append("taskId", taskId);
        params.append("adminStatus", adminStatus);
        params.append("adminRemarks", adminRemarks);

        const response = await api.post("", params);

        return response.data;

    }
    catch {

        return {

            success:false,
            message:"Update failed"

        };

    }

};