import React, { useEffect, useState, useCallback } from "react";

import {
    FaCalendarCheck,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaSearch,
    FaFilter
} from "react-icons/fa";

import { toast } from "react-toastify";

import { getMyLeaves } from "../../../services/leaveService";

import "./LeaveHistory.css";



function LeaveHistory() {


    const user =
        JSON.parse(localStorage.getItem("user")) || {};
    const employeeId = user.employeeId;



    const [leaves, setLeaves] = useState([]);

    const [filteredLeaves, setFilteredLeaves] = useState([]);

    const [loading, setLoading] = useState(true);


    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("All");



    const loadLeaves = useCallback(async () => {

        try {

            setLoading(true);

            const response = await getMyLeaves(employeeId);

            if (response.success) {

                setLeaves(response.data || []);
                setFilteredLeaves(response.data || []);

            } else {

                toast.error(
                    response.message ||
                    "Unable to load leave history"
                );

            }

        } catch (error) {

            console.error(error);

            toast.error("Failed to fetch leave history");

        } finally {

            setLoading(false);

        }

    }, [employeeId]);

    // ======================================
    // LOAD LEAVES
    // ======================================


    useEffect(() => {
        loadLeaves();
    }, [loadLeaves]);

    // ======================================
    // SEARCH FILTER
    // ======================================


    useEffect(() => {


        let result = [...leaves];



        if (search) {


            result =
                result.filter(item =>

                    item.leaveType
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )

                    ||

                    item.reason
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )

                );


        }






        if (status !== "All") {


            result =
                result.filter(item =>

                    item.status === status

                );


        }




        setFilteredLeaves(result);



    }, [
        search,
        status,
        leaves
    ]);







    // ======================================
    // COUNTS
    // ======================================


    const total =
        leaves.length;



    const pending =
        leaves.filter(
            item => item.status === "Pending"
        ).length;



    const approved =
        leaves.filter(
            item => item.status === "Approved"
        ).length;



    const rejected =
        leaves.filter(
            item => item.status === "Rejected"
        ).length;








    // ======================================
    // STATUS CLASS
    // ======================================


    const statusClass = (value) => {


        switch (value) {


            case "Approved":

                return "approved";


            case "Rejected":

                return "rejected";


            default:

                return "pending";


        }


    };







    return (


        <div className="leave-history-page">





            {/* HEADER */}


            <div className="leave-history-header">


                <h1>

                    <FaCalendarCheck />

                    Leave History

                </h1>


                <p>

                    Track your leave requests

                </p>


            </div>








            {/* SUMMARY */}


            <div className="leave-summary">



                <div className="leave-summary-card">


                    <FaCalendarCheck />


                    <div>

                        <h3>
                            {total}
                        </h3>

                        <span>
                            Total
                        </span>

                    </div>


                </div>







                <div className="leave-summary-card">


                    <FaClock />


                    <div>

                        <h3>
                            {pending}
                        </h3>

                        <span>
                            Pending
                        </span>

                    </div>


                </div>








                <div className="leave-summary-card">


                    <FaCheckCircle />


                    <div>

                        <h3>
                            {approved}
                        </h3>

                        <span>
                            Approved
                        </span>

                    </div>


                </div>








                <div className="leave-summary-card">


                    <FaTimesCircle />


                    <div>

                        <h3>
                            {rejected}
                        </h3>

                        <span>
                            Rejected
                        </span>

                    </div>


                </div>



            </div>










            {/* FILTER */}


            <div className="leave-filter">


                <div className="search-box">


                    <FaSearch />


                    <input

                        type="text"

                        placeholder="Search leave type or reason"

                        value={search}

                        onChange={
                            e => setSearch(
                                e.target.value
                            )
                        }

                    />


                </div>






                <div className="status-box">


                    <FaFilter />


                    <select

                        value={status}

                        onChange={
                            e => setStatus(
                                e.target.value
                            )
                        }

                    >


                        <option>
                            All
                        </option>


                        <option>
                            Pending
                        </option>


                        <option>
                            Approved
                        </option>


                        <option>
                            Rejected
                        </option>


                    </select>


                </div>



            </div>









            {/* TABLE */}



            <div className="leave-table-container">



                {

                    loading ?


                        <div className="loading">

                            Loading Leave History...

                        </div>


                        :


                        filteredLeaves.length === 0 ?


                            <div className="empty">

                                No Leave Records Found

                            </div>


                            :


                            <table>


                                <thead>

                                    <tr>

                                        <th>
                                            Leave Type
                                        </th>


                                        <th>
                                            From Date
                                        </th>


                                        <th>
                                            To Date
                                        </th>


                                        <th>
                                            Reason
                                        </th>


                                        <th>
                                            Status
                                        </th>


                                        <th>
                                            Applied Date
                                        </th>


                                    </tr>

                                </thead>



                                <tbody>


                                    {

                                        filteredLeaves.map(
                                            (item, index) => (


                                                <tr key={index}>


                                                    <td>
                                                        {item.leaveType}
                                                    </td>


                                                    <td>
                                                        {item.fromDate}
                                                    </td>


                                                    <td>
                                                        {item.toDate}
                                                    </td>


                                                    <td>
                                                        {item.reason}
                                                    </td>


                                                    <td>


                                                        <span

                                                            className={
                                                                `leave-status ${statusClass(
                                                                    item.status
                                                                )
                                                                }`
                                                            }

                                                        >

                                                            {item.status}

                                                        </span>


                                                    </td>


                                                    <td>
                                                        {item.requestedDate}
                                                    </td>


                                                </tr>


                                            )

                                        )

                                    }


                                </tbody>


                            </table>


                }


            </div>





        </div>


    );


}


export default LeaveHistory;