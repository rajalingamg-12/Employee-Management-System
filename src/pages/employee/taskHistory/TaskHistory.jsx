import React, { useEffect, useState } from "react";

import {
    FaTasks,
    FaCheckCircle,
    FaClock,
    FaSpinner,
    FaSearch,
    FaFilter
} from "react-icons/fa";

import { toast } from "react-toastify";

import { getMyTasks } from "../../../services/taskService";

import "./TaskHistory.css";


function TaskHistory() {


    const user = JSON.parse(localStorage.getItem("user")) || {};


    const [tasks, setTasks] = useState([]);

    const [filteredTasks, setFilteredTasks] = useState([]);

    const [loading, setLoading] = useState(true);


    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("All");



    // ==========================================
    // LOAD TASKS
    // ==========================================

    useEffect(() => {

        loadTasks();

    }, []);



    const loadTasks = async () => {


        try {


            setLoading(true);


            const response = await getMyTasks(
                user.employeeId
            );


            if(response.success){

                setTasks(response.data);

                setFilteredTasks(response.data);

            }
            else{

                toast.error(
                    response.message || "Unable to load tasks"
                );

            }


        }
        catch(error){

            console.error(error);

            toast.error(
                "Failed to fetch task history"
            );

        }
        finally{

            setLoading(false);

        }

    };





    // ==========================================
    // SEARCH & FILTER
    // ==========================================


    useEffect(()=>{


        let result = [...tasks];



        if(search){

            result = result.filter((item)=>


                item.client
                ?.toLowerCase()
                .includes(search.toLowerCase())

                ||

                item.project
                ?.toLowerCase()
                .includes(search.toLowerCase())

                ||

                item.task
                ?.toLowerCase()
                .includes(search.toLowerCase())


            );

        }




        if(status !== "All"){


            result = result.filter(
                item =>
                item.status === status
            );


        }



        setFilteredTasks(result);



    },[
        search,
        status,
        tasks
    ]);






    // ==========================================
    // SUMMARY COUNTS
    // ==========================================


    const totalTasks = tasks.length;


    const completedTasks =
        tasks.filter(
            item =>
            item.status === "Completed"
        ).length;


    const pendingTasks =
        tasks.filter(
            item =>
            item.status === "Pending"
        ).length;



    const progressTasks =
        tasks.filter(
            item =>
            item.status === "In Progress"
        ).length;







    // ==========================================
    // STATUS BADGE
    // ==========================================


    const statusClass = (value)=>{


        switch(value){


            case "Completed":
                return "completed";


            case "In Progress":
                return "progress";


            case "On Hold":
                return "hold";


            default:
                return "pending";


        }

    };




    const priorityClass=(value)=>{


        switch(value){


            case "High":
                return "high";


            case "Low":
                return "low";


            default:
                return "medium";


        }

    };







    return (

        <div className="task-history-page">


            {/* HEADER */}

            <div className="task-history-header">


                <h1>

                    <FaTasks/>

                    Task History

                </h1>


                <p>

                    View your submitted daily tasks

                </p>


            </div>





            {/* SUMMARY CARDS */}


            <div className="task-summary">


                <div className="summary-card">

                    <FaTasks/>

                    <div>

                        <h3>
                            {totalTasks}
                        </h3>

                        <span>
                            Total Tasks
                        </span>

                    </div>

                </div>





                <div className="summary-card">

                    <FaCheckCircle/>

                    <div>

                        <h3>
                            {completedTasks}
                        </h3>

                        <span>
                            Completed
                        </span>

                    </div>

                </div>





                <div className="summary-card">

                    <FaClock/>

                    <div>

                        <h3>
                            {pendingTasks}
                        </h3>

                        <span>
                            Pending
                        </span>

                    </div>

                </div>





                <div className="summary-card">

                    <FaSpinner/>

                    <div>

                        <h3>
                            {progressTasks}
                        </h3>

                        <span>
                            In Progress
                        </span>

                    </div>

                </div>



            </div>







            {/* FILTER */}


            <div className="task-filter">


                <div className="search-box">

                    <FaSearch/>

                    <input

                        type="text"

                        placeholder="Search client, project, task..."

                        value={search}

                        onChange={
                            e=>setSearch(e.target.value)
                        }

                    />

                </div>





                <div className="status-filter">


                    <FaFilter/>


                    <select

                        value={status}

                        onChange={
                            e=>setStatus(e.target.value)
                        }

                    >

                        <option>
                            All
                        </option>


                        <option>
                            Pending
                        </option>


                        <option>
                            In Progress
                        </option>


                        <option>
                            Completed
                        </option>


                        <option>
                            On Hold
                        </option>


                    </select>


                </div>



            </div>









            {/* TABLE */}


            <div className="task-table-container">


            {
                loading ?


                <div className="loading">

                    Loading Tasks...

                </div>


                :


                filteredTasks.length === 0 ?


                <div className="empty">

                    No Tasks Found

                </div>


                :


                <table>


                    <thead>

                        <tr>

                            <th>
                                Date
                            </th>


                            <th>
                                Client
                            </th>


                            <th>
                                Project
                            </th>


                            <th>
                                Task
                            </th>


                            <th>
                                Status
                            </th>


                            <th>
                                Priority
                            </th>


                            <th>
                                Remarks
                            </th>


                        </tr>

                    </thead>



                    <tbody>


                    {

                    filteredTasks.map(
                        (item,index)=>(


                        <tr key={index}>


                            <td>
                                {item.date}
                            </td>


                            <td>
                                {item.client}
                            </td>


                            <td>
                                {item.project}
                            </td>


                            <td className="task-text">
                                {item.task}
                            </td>


                            <td>

                                <span
                                className={
                                    `status ${statusClass(item.status)}`
                                }
                                >

                                    {item.status}

                                </span>

                            </td>


                            <td>

                                <span
                                className={
                                    `priority ${priorityClass(item.priority)}`
                                }
                                >

                                    {item.priority}

                                </span>

                            </td>



                            <td>

                                {
                                    item.remarks || "-"
                                }

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


export default TaskHistory;