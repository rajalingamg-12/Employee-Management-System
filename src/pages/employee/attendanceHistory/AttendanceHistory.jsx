import React, { useEffect, useMemo, useState, useCallback } from "react";

import {
    FaCalendarAlt,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaSearch
} from "react-icons/fa";

import api from "../../../services/api";

import "./AttendanceHistory.css";

function AttendanceHistory() {

    const user =
        JSON.parse(localStorage.getItem("user")) || {};

    // ==========================================
    // STATES
    // ==========================================

    const [attendance, setAttendance] = useState([]);

    const [loading, setLoading] = useState(true);

    const [searchDate, setSearchDate] = useState("");

    const [month, setMonth] = useState("");

    const [year, setYear] = useState("");

    // ==========================================
    // LOAD ATTENDANCE
    // ==========================================

    // useEffect(() => {

    //     loadAttendanceHistory();

    // }, []);

    // ==========================================
    // API
    // ==========================================

    const employeeId = user.employeeId;

    const loadAttendanceHistory = useCallback(async () => {

        try {

            setLoading(true);
            const response = await api.post("", {
                action: "attendanceHistory",
                employeeId: employeeId
            });

            if (response.data.success) {

                setAttendance(response.data.data || []);

            }

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    }, [employeeId]);

    useEffect(() => {
        loadAttendanceHistory();
    }, [loadAttendanceHistory]);


    // ==========================================
    // FILTER DATA
    // ==========================================

    const filteredAttendance = useMemo(() => {

        return attendance.filter((item) => {

            let match = true;

            if (searchDate) {

                match =
                    match &&
                    item.date.includes(searchDate);

            }

            if (month) {

                const itemMonth =
                    item.date.split("/")[1];

                match =
                    match &&
                    itemMonth === month;

            }

            if (year) {

                const itemYear =
                    item.date.split("/")[2];

                match =
                    match &&
                    itemYear === year;

            }

            return match;

        });

    }, [

        attendance,

        searchDate,

        month,

        year

    ]);
    // ==========================================
    // SUMMARY
    // ==========================================

    const summary = useMemo(() => {

        let present = 0;
        let absent = 0;
        let totalMinutes = 0;

        filteredAttendance.forEach((item) => {

            if (item.status === "Present") {

                present++;

            } else {

                absent++;

            }

            if (item.totalHours) {

                const match = item.totalHours.match(/\d+/g);

                if (match && match.length >= 2) {

                    totalMinutes +=
                        Number(match[0]) * 60 +
                        Number(match[1]);

                }

            }

        });

        const averageMinutes =
            present > 0
                ? Math.floor(totalMinutes / present)
                : 0;

        return {

            total: filteredAttendance.length,

            present,

            absent,

            average:

                Math.floor(averageMinutes / 60) +

                "h " +

                (averageMinutes % 60) +

                "m"

        };

    }, [filteredAttendance]);

    // ==========================================
    // JSX
    // ==========================================

    return (

        <div className="attendance-history-page">

            {/* HEADER */}

            <div className="attendance-history-header">

                <h1>

                    Attendance History

                </h1>

                <p>

                    View all your attendance records

                </p>

            </div>

            {/* FILTERS */}

            <div className="attendance-filters">

                <div className="search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search by Date (dd/mm/yyyy)"

                        value={searchDate}

                        onChange={(e) =>

                            setSearchDate(e.target.value)

                        }

                    />

                </div>

                <select

                    value={month}

                    onChange={(e) =>

                        setMonth(e.target.value)

                    }

                >

                    <option value="">

                        All Months

                    </option>

                    {

                        Array.from(

                            { length: 12 },

                            (_, i) => (

                                <option

                                    key={i}

                                    value={String(i + 1).padStart(2, "0")}

                                >

                                    {

                                        new Date(

                                            0,

                                            i

                                        ).toLocaleString(

                                            "en-US",

                                            {

                                                month: "long"

                                            }

                                        )

                                    }

                                </option>

                            )

                        )

                    }

                </select>

                <select

                    value={year}

                    onChange={(e) =>

                        setYear(e.target.value)

                    }

                >

                    <option value="">

                        All Years

                    </option>

                    {

                        [...new Set(

                            attendance.map(

                                item => item.date.split("/")[2]

                            )

                        )].map(y => (

                            <option

                                key={y}

                                value={y}

                            >

                                {y}

                            </option>

                        ))

                    }

                </select>

            </div>
            {/* ==========================
                TABLE
            ========================== */}

            <div className="attendance-table-container">

                {

                    loading ?

                        <div className="loading">

                            Loading attendance records...

                        </div>

                        :

                        filteredAttendance.length === 0 ?

                            <div className="no-records">

                                No attendance records found.

                            </div>

                            :

                            <table className="attendance-table">

                                <thead>

                                    <tr>

                                        <th>Date</th>

                                        <th>Check In</th>

                                        <th>Check Out</th>

                                        <th>Hours</th>

                                        <th>Status</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        filteredAttendance.map((item, index) => (

                                            <tr key={index}>

                                                <td>

                                                    {item.date}

                                                </td>

                                                <td>

                                                    {item.checkIn || "--"}

                                                </td>

                                                <td>

                                                    {item.checkOut || "--"}

                                                </td>

                                                <td>

                                                    {item.totalHours || "--"}

                                                </td>

                                                <td>

                                                    <span

                                                        className={

                                                            item.status === "Present"

                                                                ?

                                                                "status present"

                                                                :

                                                                "status absent"

                                                        }

                                                    >

                                                        {

                                                            item.status

                                                        }

                                                    </span>

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                }

            </div>

            {/* ==========================
                SUMMARY
            ========================== */}

            <div className="attendance-footer-summary">

                <div className="summary-box">

                    <FaCalendarAlt />

                    <div>

                        <h4>Total Days</h4>

                        <h2>{summary.total}</h2>

                    </div>

                </div>

                <div className="summary-box">

                    <FaCheckCircle />

                    <div>

                        <h4>Present</h4>

                        <h2>{summary.present}</h2>

                    </div>

                </div>

                <div className="summary-box">

                    <FaTimesCircle />

                    <div>

                        <h4>Absent</h4>

                        <h2>{summary.absent}</h2>

                    </div>

                </div>

                <div className="summary-box">

                    <FaClock />

                    <div>

                        <h4>Average Hours</h4>

                        <h2>

                            {summary.average}

                        </h2>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AttendanceHistory;