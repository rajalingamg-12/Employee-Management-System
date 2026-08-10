// import React, { useEffect, useState } from "react";

// import {
//     FaSearch,
//     FaFilePdf,
//     FaFileExcel,
//     FaUsers,
//     FaCheckCircle,
//     FaTimesCircle,
//     FaClock
// } from "react-icons/fa";

// import { toast } from "react-toastify";

// import {
//     getAllAttendance
// } from "../../../services/attendanceService";

// import "./AdminAttendance.css";


// function AdminAttendance() {

//     // =====================================================
//     // STATES
//     // =====================================================

//     const [attendance, setAttendance] = useState([]);

//     const [loading, setLoading] = useState(true);

//     const [search, setSearch] = useState("");

//     const [statusFilter, setStatusFilter] = useState("All");

//     const [dateFilter, setDateFilter] = useState("");


//     // =====================================================
//     // LOAD ATTENDANCE
//     // =====================================================

//     useEffect(() => {

//         loadAttendance();

//     }, []);


//     const loadAttendance = async () => {

//         try {

//             setLoading(true);

//             const response =
//                 await getAllAttendance();

//             console.log(
//                 "ADMIN ATTENDANCE",
//                 response
//             );


//             if (response?.success) {

//                 setAttendance(
//                     response.data || []
//                 );

//             }
//             else {

//                 toast.error(
//                     response?.message ||
//                     "Unable to load attendance"
//                 );

//             }

//         }
//         catch (error) {

//             console.error(
//                 "Attendance Error:",
//                 error
//             );

//             toast.error(
//                 "Failed to load attendance"
//             );

//         }
//         finally {

//             setLoading(false);

//         }

//     };


//     // =====================================================
//     // FILTER + SORT
//     // =====================================================

//     const filteredAttendance = [...attendance]

//         // =================================================
//         // SEARCH
//         // =================================================

//         .filter((item) => {

//             const searchText =
//                 search.toLowerCase().trim();


//             if (!searchText) {

//                 return true;

//             }


//             return (

//                 String(
//                     item.employeeId || ""
//                 )
//                     .toLowerCase()
//                     .includes(searchText)

//                 ||

//                 String(
//                     item.name || ""
//                 )
//                     .toLowerCase()
//                     .includes(searchText)

//                 ||

//                 String(
//                     item.designation || ""
//                 )
//                     .toLowerCase()
//                     .includes(searchText)

//                 ||

//                 String(
//                     item.department || ""
//                 )
//                     .toLowerCase()
//                     .includes(searchText)

//             );

//         })


//         // =================================================
//         // STATUS FILTER
//         // =================================================

//         .filter((item) => {

//             if (statusFilter === "All") {

//                 return true;

//             }

//             return (
//                 item.status === statusFilter
//             );

//         })


//         // =================================================
//         // DATE FILTER
//         // =================================================

//         .filter((item) => {

//             if (!dateFilter) {

//                 return true;

//             }


//             // dateFilter from input is YYYY-MM-DD

//             const [year, month, day] =
//                 dateFilter.split("-");


//             const formattedDate =
//                 `${day}/${month}/${year}`;


//             return (
//                 String(item.date) ===
//                 formattedDate
//             );

//         })


//         // =================================================
//         // LATEST DATE FIRST
//         // TODAY WILL COME AT THE TOP
//         // =================================================

//         .sort((a, b) => {

//             const [
//                 dayA,
//                 monthA,
//                 yearA
//             ] =
//                 String(a.date || "")
//                     .split("/");


//             const [
//                 dayB,
//                 monthB,
//                 yearB
//             ] =
//                 String(b.date || "")
//                     .split("/");


//             const dateA =
//                 new Date(
//                     Number(yearA),
//                     Number(monthA) - 1,
//                     Number(dayA)
//                 );


//             const dateB =
//                 new Date(
//                     Number(yearB),
//                     Number(monthB) - 1,
//                     Number(dayB)
//                 );


//             return dateB - dateA;

//         });


//     // =====================================================
//     // SUMMARY
//     // =====================================================

//     const totalAttendance =
//         attendance.length;


//     const presentCount =
//         attendance.filter(
//             item =>
//                 String(item.status)
//                     .toLowerCase() ===
//                 "present"
//         ).length;


//     const absentCount =
//         attendance.filter(
//             item =>
//                 String(item.status)
//                     .toLowerCase() ===
//                 "absent"
//         ).length;


//     const lateCount =
//         attendance.filter(
//             item =>
//                 String(item.status)
//                     .toLowerCase() ===
//                 "late"
//         ).length;


//     // =====================================================
//     // RESET FILTER
//     // =====================================================

//     const resetFilters = () => {

//         setSearch("");

//         setStatusFilter("All");

//         setDateFilter("");

//     };


//     // =====================================================
//     // EXPORT PDF
//     // =====================================================

//     const exportPDF = () => {

//         toast.info(
//             "PDF export functionality can be connected here."
//         );

//     };


//     // =====================================================
//     // EXPORT EXCEL
//     // =====================================================

//     const exportExcel = () => {

//         toast.info(
//             "Excel export functionality can be connected here."
//         );

//     };


//     // =====================================================
//     // LOADING
//     // =====================================================

//     if (loading) {

//         return (

//             <div className="admin-attendance">

//                 <div className="loading">

//                     Loading Attendance...

//                 </div>

//             </div>

//         );

//     }


//     // =====================================================
//     // RETURN
//     // =====================================================

//     return (

//         <div className="admin-attendance">


//             {/* =================================================
//                 HEADER
//             ================================================= */}

//             <div className="attendance-header">

//                 <div>

//                     <h2>

//                         Attendance Management

//                     </h2>

//                     <p>

//                         View and manage employee attendance

//                     </p>

//                 </div>


//                 <div className="attendance-actions">

//                     <button
//                         className="pdf-btn"
//                         onClick={exportPDF}
//                     >

//                         <FaFilePdf />

//                         Export PDF

//                     </button>


//                     <button
//                         className="excel-btn"
//                         onClick={exportExcel}
//                     >

//                         <FaFileExcel />

//                         Export Excel

//                     </button>

//                 </div>

//             </div>



//             {/* =================================================
//                 SUMMARY CARDS
//             ================================================= */}

//             <div className="attendance-summary">


//                 {/* TOTAL */}

//                 <div className="summary-card total">

//                     <div className="summary-icon">

//                         <FaUsers />

//                     </div>


//                     <div>

//                         <h3>

//                             {totalAttendance}

//                         </h3>

//                         <p>

//                             Total Attendance

//                         </p>

//                     </div>

//                 </div>



//                 {/* PRESENT */}

//                 <div className="summary-card present">

//                     <div className="summary-icon">

//                         <FaCheckCircle />

//                     </div>


//                     <div>

//                         <h3>

//                             {presentCount}

//                         </h3>

//                         <p>

//                             Present

//                         </p>

//                     </div>

//                 </div>



//                 {/* ABSENT */}

//                 <div className="summary-card absent">

//                     <div className="summary-icon">

//                         <FaTimesCircle />

//                     </div>


//                     <div>

//                         <h3>

//                             {absentCount}

//                         </h3>

//                         <p>

//                             Absent

//                         </p>

//                     </div>

//                 </div>



//                 {/* LATE */}

//                 <div className="summary-card late">

//                     <div className="summary-icon">

//                         <FaClock />

//                     </div>


//                     <div>

//                         <h3>

//                             {lateCount}

//                         </h3>

//                         <p>

//                             Late

//                         </p>

//                     </div>

//                 </div>

//             </div>



//             {/* =================================================
//                 FILTER TOOLBAR
//             ================================================= */}

//             <div className="attendance-toolbar">


//                 {/* SEARCH */}

//                 <div className="search-box">

//                     <FaSearch className="search-icon" />


//                     <input

//                         type="text"

//                         placeholder="Search Employee, ID or Department..."

//                         value={search}

//                         onChange={(e) =>
//                             setSearch(
//                                 e.target.value
//                             )
//                         }

//                     />

//                 </div>



//                 {/* STATUS */}

//                 <select

//                     value={statusFilter}

//                     onChange={(e) =>
//                         setStatusFilter(
//                             e.target.value
//                         )
//                     }

//                 >

//                     <option value="All">

//                         All Status

//                     </option>

//                     <option value="Present">

//                         Present

//                     </option>

//                     <option value="Absent">

//                         Absent

//                     </option>

//                     <option value="Late">

//                         Late

//                     </option>

//                 </select>



//                 {/* DATE */}

//                 <input

//                     type="date"

//                     value={dateFilter}

//                     onChange={(e) =>
//                         setDateFilter(
//                             e.target.value
//                         )
//                     }

//                 />



//                 {/* RESET */}

//                 <button

//                     className="reset-btn"

//                     onClick={resetFilters}

//                 >

//                     Reset

//                 </button>

//             </div>



//             {/* =================================================
//                 TABLE
//             ================================================= */}

//             <div className="attendance-table-wrapper">


//                 {
//                     filteredAttendance.length === 0 ?

//                         (

//                             <div className="no-data">

//                                 No Attendance Found

//                             </div>

//                         )

//                         :

//                         (

//                             <table className="attendance-table">

//                                 <thead>

//                                     <tr>

//                                         <th>
//                                             Date
//                                         </th>

//                                         <th>
//                                             Employee ID
//                                         </th>

//                                         <th>
//                                             Employee Name
//                                         </th>

//                                         <th>
//                                             Designation
//                                         </th>

//                                         <th>
//                                             Check In
//                                         </th>

//                                         <th>
//                                             Check Out
//                                         </th>

//                                         <th>
//                                             Total Hours
//                                         </th>

//                                         <th>
//                                             Status
//                                         </th>

//                                     </tr>

//                                 </thead>


//                                 <tbody>

//                                     {

//                                         filteredAttendance.map(
//                                             (item, index) => (

//                                                 <tr
//                                                     key={
//                                                         item.attendanceId ||
//                                                         index
//                                                     }
//                                                 >

//                                                     <td>

//                                                         <strong>

//                                                             {item.date}

//                                                         </strong>

//                                                     </td>


//                                                     <td>

//                                                         {item.employeeId}

//                                                     </td>


//                                                     <td>

//                                                         {item.name}

//                                                     </td>


//                                                     <td>

//                                                         {item.designation}

//                                                     </td>


//                                                     <td>

//                                                         {item.checkIn || "-"}

//                                                     </td>


//                                                     <td>

//                                                         {item.checkOut || "-"}

//                                                     </td>


//                                                     <td>

//                                                         {item.totalHours || "-"}

//                                                     </td>


//                                                     <td>

//                                                         <span

//                                                             className={
//                                                                 `status-badge ${
//                                                                     String(
//                                                                         item.status || ""
//                                                                     )
//                                                                         .toLowerCase()
//                                                                 }`
//                                                             }

//                                                         >

//                                                             {item.status}

//                                                         </span>

//                                                     </td>

//                                                 </tr>

//                                             )
//                                         )

//                                     }

//                                 </tbody>

//                             </table>

//                         )

//                 }

//             </div>

//         </div>

//     );

// }


// export default AdminAttendance;

import React, { useEffect, useState } from "react";

import {
    FaSearch,
    FaFilePdf,
    FaFileExcel,
    FaUsers,
    FaCheckCircle,
    FaTimesCircle,
    FaClock
} from "react-icons/fa";

import { toast } from "react-toastify";

import {
    getAllAttendance
} from "../../../services/attendanceService";

import "./AdminAttendance.css";


function AdminAttendance() {


    // =====================================================
    // STATES
    // =====================================================

    const [attendance, setAttendance] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [dateFilter, setDateFilter] = useState("");



    // =====================================================
    // LOAD ATTENDANCE
    // =====================================================

    useEffect(() => {

        loadAttendance();

    }, []);



    const loadAttendance = async () => {

        try {

            setLoading(true);

            const response =
                await getAllAttendance();


            console.log(
                "ADMIN ATTENDANCE",
                response
            );


            if (response?.success) {

                setAttendance(
                    response.data || []
                );

            }

            else {

                toast.error(
                    response?.message ||
                    "Unable to load attendance"
                );

            }

        }

        catch (error) {

            console.error(
                "Attendance Error:",
                error
            );

            toast.error(
                "Failed to load attendance"
            );

        }

        finally {

            setLoading(false);

        }

    };



    // =====================================================
    // TODAY DATE
    // =====================================================

    const getTodayDate = () => {

        const today = new Date();

        const day =
            String(
                today.getDate()
            ).padStart(2, "0");

        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");

        const year =
            today.getFullYear();

        return `${day}/${month}/${year}`;

    };


    const todayDate = getTodayDate();



    // =====================================================
    // FILTER + SORT
    // =====================================================

    const filteredAttendance = [...attendance]

        // =================================================
        // SEARCH
        // =================================================

        .filter((item) => {

            const searchText =
                search
                    .toLowerCase()
                    .trim();


            if (!searchText) {

                return true;

            }


            return (

                String(
                    item.employeeId || ""
                )
                    .toLowerCase()
                    .includes(searchText)

                ||

                String(
                    item.name || ""
                )
                    .toLowerCase()
                    .includes(searchText)

                ||

                String(
                    item.designation || ""
                )
                    .toLowerCase()
                    .includes(searchText)

                ||

                String(
                    item.department || ""
                )
                    .toLowerCase()
                    .includes(searchText)

            );

        })


        // =================================================
        // STATUS FILTER
        // =================================================

        .filter((item) => {

            if (
                statusFilter === "All"
            ) {

                return true;

            }


            return (
                item.status ===
                statusFilter
            );

        })


        // =================================================
        // DATE FILTER
        // =================================================

        .filter((item) => {

            if (!dateFilter) {

                return true;

            }


            // Date input gives:
            // YYYY-MM-DD

            const [
                year,
                month,
                day
            ] =
                dateFilter.split("-");


            // Attendance date:
            // DD/MM/YYYY

            const formattedDate =
                `${day}/${month}/${year}`;


            return (
                String(item.date) ===
                formattedDate
            );

        })


        // =================================================
        // LATEST DATE FIRST
        // =================================================

        .sort((a, b) => {

            const [
                dayA,
                monthA,
                yearA
            ] =
                String(
                    a.date || ""
                ).split("/");


            const [
                dayB,
                monthB,
                yearB
            ] =
                String(
                    b.date || ""
                ).split("/");


            const dateA =
                new Date(
                    Number(yearA),
                    Number(monthA) - 1,
                    Number(dayA)
                );


            const dateB =
                new Date(
                    Number(yearB),
                    Number(monthB) - 1,
                    Number(dayB)
                );


            return dateB - dateA;

        });



    // =====================================================
    // SUMMARY
    // =====================================================

    const totalAttendance =
        attendance.length;


    const presentCount =
        attendance.filter(
            item =>
                String(
                    item.status
                ).toLowerCase() ===
                "present"
        ).length;


    const absentCount =
        attendance.filter(
            item =>
                String(
                    item.status
                ).toLowerCase() ===
                "absent"
        ).length;


    const lateCount =
        attendance.filter(
            item =>
                String(
                    item.status
                ).toLowerCase() ===
                "late"
        ).length;



    // =====================================================
    // RESET FILTERS
    // =====================================================

    const resetFilters = () => {

        setSearch("");

        setStatusFilter("All");

        setDateFilter("");

    };



    // =====================================================
    // EXPORT PDF
    // =====================================================

    const exportPDF = () => {

        toast.info(
            "PDF export functionality can be connected here."
        );

    };



    // =====================================================
    // EXPORT EXCEL
    // =====================================================

    const exportExcel = () => {

        toast.info(
            "Excel export functionality can be connected here."
        );

    };



    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="admin-attendance">

                <div className="loading">

                    Loading Attendance...

                </div>

            </div>

        );

    }



    // =====================================================
    // RETURN
    // =====================================================

    return (

        <div className="admin-attendance">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="attendance-header">

                <div>

                    <h2>

                        Attendance Management

                    </h2>


                    <p>

                        View and manage employee attendance

                    </p>

                </div>


                <div className="attendance-actions">


                    <button
                        className="pdf-btn"
                        onClick={exportPDF}
                    >

                        <FaFilePdf />

                        Export PDF

                    </button>


                    <button
                        className="excel-btn"
                        onClick={exportExcel}
                    >

                        <FaFileExcel />

                        Export Excel

                    </button>


                </div>

            </div>



            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            <div className="attendance-summary">


                {/* TOTAL */}

                <div className="summary-card total">

                    <div className="summary-icon">

                        <FaUsers />

                    </div>


                    <div>

                        <h3>

                            {totalAttendance}

                        </h3>


                        <p>

                            Total Attendance

                        </p>

                    </div>

                </div>



                {/* PRESENT */}

                <div className="summary-card present">

                    <div className="summary-icon">

                        <FaCheckCircle />

                    </div>


                    <div>

                        <h3>

                            {presentCount}

                        </h3>


                        <p>

                            Present

                        </p>

                    </div>

                </div>



                {/* ABSENT */}

                <div className="summary-card absent">

                    <div className="summary-icon">

                        <FaTimesCircle />

                    </div>


                    <div>

                        <h3>

                            {absentCount}

                        </h3>


                        <p>

                            Absent

                        </p>

                    </div>

                </div>



                {/* LATE */}

                <div className="summary-card late">

                    <div className="summary-icon">

                        <FaClock />

                    </div>


                    <div>

                        <h3>

                            {lateCount}

                        </h3>


                        <p>

                            Late

                        </p>

                    </div>

                </div>


            </div>



            {/* =================================================
                FILTER TOOLBAR
            ================================================= */}

            <div className="attendance-toolbar">


                {/* SEARCH */}

                <div className="search-box">

                    <FaSearch
                        className="search-icon"
                    />


                    <input

                        type="text"

                        placeholder="Search Employee, ID or Department..."

                        value={search}

                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }

                    />

                </div>



                {/* STATUS FILTER */}

                <select

                    value={statusFilter}

                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value
                        )
                    }

                >

                    <option value="All">

                        All Status

                    </option>


                    <option value="Present">

                        Present

                    </option>


                    <option value="Absent">

                        Absent

                    </option>


                    <option value="Late">

                        Late

                    </option>

                </select>



                {/* DATE FILTER */}

                <input

                    type="date"

                    value={dateFilter}

                    onChange={(e) =>
                        setDateFilter(
                            e.target.value
                        )
                    }

                />



                {/* RESET */}

                <button

                    className="reset-btn"

                    onClick={
                        resetFilters
                    }

                >

                    Reset

                </button>


            </div>



            {/* =================================================
                ATTENDANCE TABLE
            ================================================= */}

            <div className="attendance-table-wrapper">


                {

                    filteredAttendance.length === 0

                        ?

                        (

                            <div className="no-data">

                                No Attendance Found

                            </div>

                        )

                        :

                        (

                            <table className="attendance-table">


                                <thead>

                                    <tr>

                                        <th>

                                            Date

                                        </th>


                                        <th>

                                            Employee ID

                                        </th>


                                        <th>

                                            Employee Name

                                        </th>


                                        <th>

                                            Designation

                                        </th>


                                        <th>

                                            Check In

                                        </th>


                                        <th>

                                            Check Out

                                        </th>


                                        <th>

                                            Total Hours

                                        </th>


                                        <th>

                                            Status

                                        </th>

                                    </tr>

                                </thead>



                                <tbody>


                                    {

                                        filteredAttendance.map(
                                            (
                                                item,
                                                index
                                            ) => (

                                                <tr

                                                    key={
                                                        item.attendanceId ||
                                                        index
                                                    }

                                                >


                                                    {/* DATE */}

                                                    <td>


                                                        {

                                                            String(
                                                                item.date
                                                            ) ===
                                                            todayDate

                                                                ?

                                                                (

                                                                    <>

                                                                        <div className="today-label">

                                                                            TODAY

                                                                        </div>


                                                                        <strong className="today-date">

                                                                            {
                                                                                item.date
                                                                            }

                                                                        </strong>

                                                                    </>

                                                                )

                                                                :

                                                                (

                                                                    <strong>

                                                                        {
                                                                            item.date
                                                                        }

                                                                    </strong>

                                                                )

                                                        }


                                                    </td>



                                                    {/* EMPLOYEE ID */}

                                                    <td>

                                                        {
                                                            item.employeeId
                                                        }

                                                    </td>



                                                    {/* EMPLOYEE NAME */}

                                                    <td>

                                                        {
                                                            item.name
                                                        }

                                                    </td>



                                                    {/* DESIGNATION */}

                                                    <td>

                                                        {
                                                            item.designation
                                                        }

                                                    </td>



                                                    {/* CHECK IN */}

                                                    <td>

                                                        {
                                                            item.checkIn ||
                                                            "-"
                                                        }

                                                    </td>



                                                    {/* CHECK OUT */}

                                                    <td>

                                                        {
                                                            item.checkOut ||
                                                            "-"
                                                        }

                                                    </td>



                                                    {/* TOTAL HOURS */}

                                                    <td>

                                                        {
                                                            item.totalHours ||
                                                            "-"
                                                        }

                                                    </td>



                                                    {/* STATUS */}

                                                    <td>

                                                        <span

                                                            className={
                                                                `status-badge ${
                                                                    String(
                                                                        item.status ||
                                                                        ""
                                                                    )
                                                                        .toLowerCase()
                                                                }`
                                                            }

                                                        >

                                                            {
                                                                item.status
                                                            }

                                                        </span>

                                                    </td>


                                                </tr>

                                            )
                                        )

                                    }


                                </tbody>


                            </table>

                        )

                }


            </div>


        </div>

    );

}


export default AdminAttendance;