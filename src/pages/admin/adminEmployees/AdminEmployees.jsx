import React, { useEffect, useState } from "react";
import { FaSearch, FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";

import { getAdminEmployees, unlockEmployee } from "../../../services/adminEmployeeService";

import "./AdminEmployees.css";

function AdminEmployees() {


    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // ==================================
    // LOAD EMPLOYEES
    // ==================================


    useEffect(() => {
        loadEmployees();

    }, []);

    const loadEmployees = async () => {
        try {


            setLoading(true);



            const response =
                await getAdminEmployees();



            console.log(
                "ADMIN EMPLOYEES",
                response
            );



            if (response.success) {


                setEmployees(
                    response.data || []
                );


            }
            else {


                toast.error(
                    response.message ||
                    "Unable to load employees"
                );


            }



        }
        catch (error) {


            toast.error(
                "Employee loading failed"
            );


        }
        finally {


            setLoading(false);


        }


    };

    // ==================================
    // UNLOCK EMPLOYEE LOGIN
    // ==================================

    const handleUnlock = async (employeeId) => {

        try {

            const response =
                await unlockEmployee(employeeId);

            if (response.success) {

                toast.success(
                    "Employee login unlocked successfully."
                );

                loadEmployees();

            } else {

                toast.error(
                    response.message ||
                    "Unable to unlock employee."
                );

            }

        } catch (error) {

            console.error(
                "Unlock employee error:",
                error
            );

            toast.error(
                "Something went wrong while unlocking login."
            );

        }

    };


    // ==================================
    // SEARCH FILTER
    // ==================================


    const filteredEmployees = employees.filter((employee) => {


        const value = search.toLowerCase();



        return (

            employee.name
                ?.toLowerCase()
                .includes(value)

            ||

            employee.employeeId
                ?.toLowerCase()
                .includes(value)

            ||

            employee.department
                ?.toLowerCase()
                .includes(value)

        );


    });

    if (loading) {


        return (

            <div className="adm-employee-loading">

                Loading Employees...

            </div>

        );

    }



    return (


        <div className="adm-employees-container">

            {/* HEADER */}

            <div className="adm-employees-header">


                <div>


                    <h1>

                        Employees

                    </h1>


                    <p>

                        Manage all registered employees

                    </p>


                </div>

                <div className="adm-employee-count">


                    <FaUsers />


                    <span>

                        {employees.length}

                    </span>


                </div>



            </div>

            {/* SEARCH */}


            <div className="adm-employee-search">


                <FaSearch />


                <input

                    type="text"

                    placeholder="Search by name, ID or department"

                    value={search}

                    onChange={
                        (e) => setSearch(e.target.value)
                    }

                />


            </div>

            {/* TABLE */}



            <div className="adm-employee-table">


                <table>


                    <thead>


                        <tr>


                            <th>
                                Employee ID
                            </th>


                            <th>
                                Name
                            </th>


                            <th>
                                Department
                            </th>


                            <th>
                                Designation
                            </th>


                            <th>
                                Email
                            </th>


                            <th>
                                Phone
                            </th>

                            <th>
                                Login
                            </th>

                        </tr>


                    </thead>




                    <tbody>



                        {

                            filteredEmployees.length > 0 ?

                                filteredEmployees.map(
                                    (employee, index) => (


                                        <tr key={index}>


                                            <td>

                                                {employee.employeeId}

                                            </td>



                                            <td>

                                                {employee.name}

                                            </td>



                                            <td>

                                                {employee.department}

                                            </td>



                                            <td>

                                                {employee.designation}

                                            </td>



                                            <td>

                                                {employee.email}

                                            </td>



                                            <td>

                                                {employee.phone}

                                            </td>

                                            <td>

                                                {employee.loginBlocked ? (

                                                    <button
                                                        className="unlock-btn"
                                                        onClick={() =>
                                                            handleUnlock(employee.employeeId)
                                                        }
                                                    >
                                                        Unlock Login
                                                    </button>

                                                ) : (

                                                    <span className="login-active">
                                                        Active
                                                    </span>

                                                )}

                                            </td>

                                        </tr>


                                    )

                                )


                                :

                                <tr>

                                   <td colSpan="7">

                                        No Employees Found

                                    </td>

                                </tr>


                        }



                    </tbody>



                </table>


            </div>





        </div>




    );


}


export default AdminEmployees;