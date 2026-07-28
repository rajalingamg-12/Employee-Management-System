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