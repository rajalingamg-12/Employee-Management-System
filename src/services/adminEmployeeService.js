import api from "./api";


// ==========================================
// GET ALL EMPLOYEES FOR ADMIN
// ==========================================

export const getAdminEmployees = async () => {

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


    }
    catch(error){


        console.error(
            "Admin Employee Error:",
            error
        );


        return {

            success:false,

            message:
            "Failed to load employees"

        };


    }

};