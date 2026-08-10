// import React, { useEffect, useState } from "react";

// import {
//     FaUserCheck,
//     FaUserTimes,
//     FaClock,
//     FaUsers,
//     FaSearch,
//     FaFilePdf,
//     FaFileExcel
// } from "react-icons/fa";

// import { toast } from "react-toastify";

// import {
//     getAllAttendance,
//     getAttendanceSummary
// } from "../../../services/attendanceService";

// import "./AdminAttendance.css";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// function AdminAttendance() {

//     const [attendance, setAttendance] = useState([]);

//     const [filteredAttendance, setFilteredAttendance] = useState([]);

//     const [summary, setSummary] = useState({
//         totalEmployees: 0,
//         presentToday: 0,
//         absentToday: 0,
//         lateToday: 0,
//         averageHours: 0
//     });

//     const [loading, setLoading] = useState(true);

//     const [search, setSearch] = useState("");

//     const [departmentFilter, setDepartmentFilter] = useState("");

//     const [statusFilter, setStatusFilter] = useState("");

//     const [dateFilter, setDateFilter] = useState("");



//     useEffect(() => {

//         loadAttendance();

//     }, []);




//     const loadAttendance = async () => {

//         try {

//             setLoading(true);
            

//             const [attendanceData, summaryData] = await Promise.all([

//                 getAllAttendance(),

//                 getAttendanceSummary()

//             ]);

//             const attendanceList =
//                 attendanceData.data ||
//                 attendanceData.attendance ||
//                 attendanceData.records ||
//                 [];

//             const summaryInfo =
//                 summaryData.data ||
//                 summaryData.summary ||
//                 {};

//             setAttendance(attendanceList);

//             setFilteredAttendance(attendanceList);
//             setSummary({
//                 totalEmployees: Number(summaryInfo.totalEmployees) || 0,
//                 presentToday: Number(summaryInfo.presentToday) || 0,
//                 absentToday: Number(summaryInfo.absentToday) || 0,
//                 lateToday: Number(summaryInfo.lateToday) || 0,
//                 averageHours: summaryInfo.averageHours || "0h"
//             });

//         }

//         catch (error) {

//             console.error(error);

//             toast.error("Failed to load attendance.");

//         }

//         finally {

//             setLoading(false);

//         }

//     };

//     const filterAttendance = (
//         searchValue,
//         department,
//         status,
//         date
//     ) => {

//         let filtered = [...attendance];

//         if (searchValue) {

//             const value = searchValue.toLowerCase();

//             filtered = filtered.filter(item =>

//                 String(item.employeeId || "")
//                     .toLowerCase()
//                     .includes(value)

//                 ||

//                 String(item.name || "")
//                     .toLowerCase()
//                     .includes(value)

//             );

//         }

//         if (department) {

//             filtered = filtered.filter(

//                 item => item.department === department

//             );

//         }

//         if (status) {

//             filtered = filtered.filter(

//                 item => item.status === status

//             );

//         }

//         if (date) {

//             filtered = filtered.filter(

//                 item => item.date === date

//             );

//         }

//         setFilteredAttendance(filtered);

//     };

//     const exportPDF = () => {

//         const doc = new jsPDF();

//         doc.setFontSize(18);

//         doc.text("Attendance Report", 14, 18);

//         autoTable(doc, {

//             startY: 28,

//             head: [[
//                 "#",
//                 "Employee ID",
//                 "Name",
//                 "Department",
//                 "Date",
//                 "Check In",
//                 "Check Out",
//                 "Hours",
//                 "Status"
//             ]],

//             body: filteredAttendance.map((item, index) => [

//                 index + 1,

//                 item.employeeId,

//                 item.name,

//                 item.department,

//                 item.date,

//                 item.checkIn || "--",

//                 item.checkOut || "--",

//                 item.totalHours || "--",

//                 item.status

//             ])

//         });

//         doc.save("Attendance_Report.pdf");

//     };



//     const exportExcel = () => {

//         const excelData = filteredAttendance.map((item, index) => ({

//             "S.No": index + 1,

//             "Employee ID": item.employeeId,

//             Name: item.name,

//             Department: item.department,

//             Date: item.date,

//             "Check In": item.checkIn,

//             "Check Out": item.checkOut,

//             "Total Hours": item.totalHours,

//             Status: item.status

//         }));


//         const worksheet = XLSX.utils.json_to_sheet(excelData);

//         const workbook = XLSX.utils.book_new();

//         XLSX.utils.book_append_sheet(

//             workbook,

//             worksheet,

//             "Attendance"

//         );

//         const excelBuffer = XLSX.write(

//             workbook,

//             {

//                 bookType: "xlsx",

//                 type: "array"

//             }

//         );

//         const file = new Blob(

//             [excelBuffer],

//             {

//                 type:
//                     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

//             }

//         );

//         saveAs(

//             file,

//             "Attendance_Report.xlsx"

//         );

//     };

//     return (

//         <div className="admin-attendance">

//             <div className="attendance-header">

//                 <h2>Attendance Management</h2>

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



//             <div className="attendance-summary">



//                 <div className="summary-card total">

//                     <div className="summary-icon">

//                         <FaUsers />

//                     </div>

//                     <div>

//                         <h3>{summary.totalEmployees}</h3>

//                         <p>Total Employees</p>

//                     </div>

//                 </div>



//                 <div className="summary-card present">

//                     <div className="summary-icon">

//                         <FaUserCheck />

//                     </div>

//                     <div>

//                         <h3>{summary.presentToday}</h3>

//                         <p>Present Today</p>

//                     </div>

//                 </div>



//                 <div className="summary-card absent">

//                     <div className="summary-icon">

//                         <FaUserTimes />

//                     </div>

//                     <div>

//                         <h3>{summary.absentToday}</h3>

//                         <p>Absent Today</p>

//                     </div>

//                 </div>



//                 <div className="summary-card late">

//                     <div className="summary-icon">

//                         <FaClock />

//                     </div>

//                     <div>

//                         <h3>{summary.lateToday}</h3>

//                         <p>Late Arrivals</p>

//                     </div>

//                 </div>



//                 <div className="summary-card hours">

//                     <div className="summary-icon">

//                         <FaClock />

//                     </div>

//                     <div>

//                         <h3>{summary.averageHours}</h3>

//                         <p>Average Hours</p>

//                     </div>

//                 </div>

//             </div>

//             {/* ===========================
//                 Search & Filters
//             =========================== */}

//             <div className="attendance-toolbar">

//                 <div className="search-box">

//                     <FaSearch className="search-icon" />

//                     <input
//                         type="text"
//                         placeholder="Search by Employee ID or Name..."
//                         value={search}
//                         onChange={(e) => {
//                             setSearch(e.target.value);
//                             filterAttendance(
//                                 e.target.value,
//                                 departmentFilter,
//                                 statusFilter,
//                                 dateFilter
//                             );
//                         }}
//                     />

//                 </div>
// {/* 
//                 <select
//                     value={departmentFilter}
//                     onChange={(e) => {
//                         setDepartmentFilter(e.target.value);
//                         filterAttendance(
//                             search,
//                             e.target.value,
//                             statusFilter,
//                             dateFilter
//                         );
//                     }}
//                 >

//                     <option value="">All Departments</option>

//                     {[...new Set(attendance.map(item => item.department))]
//                         .filter(Boolean)
//                         .map((dept, index) => (

//                             <option
//                                 key={index}
//                                 value={dept}
//                             >
//                                 {dept}
//                             </option>

//                         ))}

//                 </select> */}

//                 <select
//                     value={statusFilter}
//                     onChange={(e) => {
//                         setStatusFilter(e.target.value);
//                         filterAttendance(
//                             search,
//                             departmentFilter,
//                             e.target.value,
//                             dateFilter
//                         );
//                     }}
//                 >

//                     <option value="">All Status</option>
//                     <option value="Present">Present</option>
//                     <option value="Absent">Absent</option>
//                     <option value="Late">Late</option>

//                 </select>

//                 <input
//                     type="date"
//                     value={dateFilter}
//                     onChange={(e) => {
//                         setDateFilter(e.target.value);
//                         filterAttendance(
//                             search,
//                             departmentFilter,
//                             statusFilter,
//                             e.target.value
//                         );
//                     }}
//                 />

//                 <button
//                     className="reset-btn"
//                     onClick={() => {

//                         setSearch("");

//                         setDepartmentFilter("");

//                         setStatusFilter("");

//                         setDateFilter("");

//                         setFilteredAttendance(attendance);

//                     }}
//                 >
//                     Reset
//                 </button>

//             </div>



//             {loading ? (

//                 <div className="loading">

//                     Loading attendance...

//                 </div>

//             ) : filteredAttendance.length === 0 ? (

//                 <div className="no-data">

//                     No attendance records found.

//                 </div>

//             ) : (

//                 <>
//                     <div className="attendance-table-wrapper">

//                         <table className="attendance-table">

//                             <thead>

//                                 <tr>

//                                     <th>#</th>

//                                     <th>Employee ID</th>

//                                     <th>Name</th>

//                                     <th>Department</th>

//                                     <th>Date</th>

//                                     <th>Check In</th>

//                                     <th>Check Out</th>

//                                     <th>Total Hours</th>

//                                     <th>Status</th>

//                                 </tr>

//                             </thead>

//                             <tbody>

//                                 {filteredAttendance.map((item, index) => (

//                                     <tr key={index}>

//                                         <td>{index + 1}</td>

//                                         <td>{item.employeeId}</td>

//                                         <td>{item.name}</td>

//                                         <td>{item.department}</td>

//                                         <td>{item.date}</td>

//                                         <td>{item.checkIn || "--"}</td>

//                                         <td>{item.checkOut || "--"}</td>

//                                         <td>{item.totalHours || "--"}</td>

//                                         <td>

//                                             <span
//                                                 className={`status-badge ${String(
//                                                     item.status || ""
//                                                 ).toLowerCase()}`}
//                                             >

//                                                 {item.status}

//                                             </span>

//                                         </td>

//                                     </tr>

//                                 ))}

//                             </tbody>

//                         </table>

//                     </div>

//                 </>

//             )}

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
    // FILTER + SORT
    // =====================================================

    const filteredAttendance = [...attendance]

        // =================================================
        // SEARCH
        // =================================================

        .filter((item) => {

            const searchText =
                search.toLowerCase().trim();


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

            if (statusFilter === "All") {

                return true;

            }

            return (
                item.status === statusFilter
            );

        })


        // =================================================
        // DATE FILTER
        // =================================================

        .filter((item) => {

            if (!dateFilter) {

                return true;

            }


            // dateFilter from input is YYYY-MM-DD

            const [year, month, day] =
                dateFilter.split("-");


            const formattedDate =
                `${day}/${month}/${year}`;


            return (
                String(item.date) ===
                formattedDate
            );

        })


        // =================================================
        // LATEST DATE FIRST
        // TODAY WILL COME AT THE TOP
        // =================================================

        .sort((a, b) => {

            const [
                dayA,
                monthA,
                yearA
            ] =
                String(a.date || "")
                    .split("/");


            const [
                dayB,
                monthB,
                yearB
            ] =
                String(b.date || "")
                    .split("/");


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
                String(item.status)
                    .toLowerCase() ===
                "present"
        ).length;


    const absentCount =
        attendance.filter(
            item =>
                String(item.status)
                    .toLowerCase() ===
                "absent"
        ).length;


    const lateCount =
        attendance.filter(
            item =>
                String(item.status)
                    .toLowerCase() ===
                "late"
        ).length;


    // =====================================================
    // RESET FILTER
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

                    <FaSearch className="search-icon" />


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



                {/* STATUS */}

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



                {/* DATE */}

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

                    onClick={resetFilters}

                >

                    Reset

                </button>

            </div>



            {/* =================================================
                TABLE
            ================================================= */}

            <div className="attendance-table-wrapper">


                {
                    filteredAttendance.length === 0 ?

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

                                        {/* <th>
                                            Department
                                        </th> */}

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
                                            (item, index) => (

                                                <tr
                                                    key={
                                                        item.attendanceId ||
                                                        index
                                                    }
                                                >

                                                    <td>

                                                        <strong>

                                                            {item.date}

                                                        </strong>

                                                    </td>


                                                    <td>

                                                        {item.employeeId}

                                                    </td>


                                                    <td>

                                                        {item.name}

                                                    </td>


                                                    <td>

                                                        {item.designation}

                                                    </td>


                                                    {/* <td>

                                                        {item.department}

                                                    </td> */}


                                                    <td>

                                                        {item.checkIn || "-"}

                                                    </td>


                                                    <td>

                                                        {item.checkOut || "-"}

                                                    </td>


                                                    <td>

                                                        {item.totalHours || "-"}

                                                    </td>


                                                    <td>

                                                        <span

                                                            className={
                                                                `status-badge ${
                                                                    String(
                                                                        item.status || ""
                                                                    )
                                                                        .toLowerCase()
                                                                }`
                                                            }

                                                        >

                                                            {item.status}

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