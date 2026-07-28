import React, { useEffect, useState } from "react";

import {
    FaClipboardList,
    FaHourglassHalf,
    FaCheckCircle,
    FaTimesCircle,
    FaSearch,
    FaFilePdf,
    FaFileExcel
} from "react-icons/fa";

import { toast } from "react-toastify";

import {
    getAllLeaves,
    getLeaveSummary,
    approveLeaveRequest,
    rejectLeaveRequest
} from "../../../services/leaveService";

import "./AdminLeaves.css";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function AdminLeave() {

    const [loading, setLoading] = useState(true);

    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);

    const [summary, setSummary] = useState({

        totalLeaves: 0,
        pending: 0,
        approved: 0,
        rejected: 0

    });

    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    useEffect(() => {

        loadLeaves();

    }, []);

    // ==========================================
    // Load Summary
    // ==========================================

    const loadSummary = async () => {

        try {

            const response = await getLeaveSummary();

            const data =
                response.data ||
                response.summary ||
                {};

            setSummary({

                totalLeaves: data.totalLeaves || 0,
                pending: data.pending || 0,
                approved: data.approved || 0,
                rejected: data.rejected || 0

            });

        }

        catch (err) {

            console.error(err);

        }

    };

    // ==========================================
    // Load Leaves
    // ==========================================

    const loadLeaves = async () => {

        try {

            setLoading(true);

            const response = await getAllLeaves();

            const leaveData =
                response.data ||
                response.leaves ||
                [];

            setLeaves(leaveData);

            setFilteredLeaves(leaveData);

            await loadSummary();

        }

        catch (err) {

            console.error(err);

            toast.error("Unable to load leave details.");

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Filter
    // ==========================================

    const filterLeaves = (

        searchValue,
        leaveType,
        status,
        date

    ) => {

        let filtered = [...leaves];

        if (searchValue) {

            const value = searchValue.toLowerCase();

            filtered = filtered.filter(item =>

                String(item.employeeId || "")
                    .toLowerCase()
                    .includes(value)

                ||

                String(item.name || "")
                    .toLowerCase()
                    .includes(value)

            );

        }

        if (leaveType) {

            filtered = filtered.filter(

                item => item.leaveType === leaveType

            );

        }

        if (status) {

            filtered = filtered.filter(

                item => item.status === status

            );

        }

        if (date) {

            filtered = filtered.filter(

                item => item.fromDate === date

            );

        }

        setFilteredLeaves(filtered);

    };
    // ==========================================
    // APPROVE LEAVE
    // ==========================================

    const approveLeave = async (leaveId) => {

        try {

            const response = await approveLeaveRequest(leaveId);

            if (response.success) {

                toast.success(response.message || "Leave Approved Successfully");

                // Reload table
                const leaveRes = await getAllLeaves();

                const leaveData =
                    leaveRes.data ||
                    leaveRes.leaves ||
                    [];

                setLeaves(leaveData);
                setFilteredLeaves(leaveData);

                // Reload summary cards
                const summaryRes = await getLeaveSummary();

                const summaryData =
                    summaryRes.data ||
                    summaryRes.summary ||
                    {};

                setSummary({

                    totalLeaves: summaryData.totalLeaves || 0,

                    pending: summaryData.pending || 0,

                    approved: summaryData.approved || 0,

                    rejected: summaryData.rejected || 0

                });

            } else {

                toast.error(response.message);

            }

        } catch (error) {

            console.error(error);

            toast.error("Unable to approve leave.");

        }

    };
    // ==========================================
    // REJECT LEAVE
    // ==========================================

    const rejectLeave = async (leaveId) => {

        try {

            const response = await rejectLeaveRequest(leaveId);

            if (response.success) {

                toast.success(response.message || "Leave Rejected Successfully");

                // Reload table
                const leaveRes = await getAllLeaves();

                const leaveData =
                    leaveRes.data ||
                    leaveRes.leaves ||
                    [];

                setLeaves(leaveData);
                setFilteredLeaves(leaveData);

                // Reload summary cards
                const summaryRes = await getLeaveSummary();

                const summaryData =
                    summaryRes.data ||
                    summaryRes.summary ||
                    {};

                setSummary({

                    totalLeaves: summaryData.totalLeaves || 0,

                    pending: summaryData.pending || 0,

                    approved: summaryData.approved || 0,

                    rejected: summaryData.rejected || 0

                });

            } else {

                toast.error(response.message);

            }

        } catch (error) {

            console.error(error);

            toast.error("Unable to reject leave.");

        }

    };
    // ==========================================
    // View Reason
    // ==========================================

    const viewReason = (reason) => {

        alert(reason || "No reason provided.");

    };

    // ==========================================
    // Export PDF
    // ==========================================

    const exportPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(16);

        doc.text("Employee Leave Report", 14, 15);

        autoTable(doc, {

            startY: 25,

            head: [[

                "#",
                "Employee ID",
                "Name",
                "Leave Type",
                "From Date",
                "To Date",
                "Days",
                "Status"

            ]],

            body: filteredLeaves.map((item, index) => [

                index + 1,
                item.employeeId,
                item.name,
                item.leaveType,
                item.fromDate,
                item.toDate,
                item.totalDays || item.days,
                item.status

            ])

        });

        doc.save("Leave_Report.pdf");

    };

    // ==========================================
    // Export Excel
    // ==========================================

    const exportExcel = () => {

        const worksheet = XLSX.utils.json_to_sheet(

            filteredLeaves.map(item => ({

                EmployeeID: item.employeeId,
                EmployeeName: item.name,
                LeaveType: item.leaveType,
                FromDate: item.fromDate,
                ToDate: item.toDate,
                Days: item.totalDays || item.days,
                Status: item.status

            }))

        );

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(

            workbook,
            worksheet,
            "Leave Report"

        );

        const excelBuffer = XLSX.write(workbook, {

            bookType: "xlsx",
            type: "array"

        });

        const file = new Blob(

            [excelBuffer],

            {

                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

            }

        );

        saveAs(file, "Leave_Report.xlsx");

    };
    return (

        <div className="admin-leave">

            {/* =======================================
                Header
            ======================================== */}

            <div className="leave-header">

                <h2>Leave Management</h2>

                <div className="leave-actions">

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

            {/* =======================================
                Summary Cards
            ======================================== */}

            <div className="leave-summary">

                <div className="summary-card total">

                    <div className="summary-icon">

                        <FaClipboardList />

                    </div>

                    <div>

                        <h3>{summary.totalLeaves}</h3>

                        <p>Total Requests</p>

                    </div>

                </div>

                <div className="summary-card pending">

                    <div className="summary-icon">

                        <FaHourglassHalf />

                    </div>

                    <div>

                        <h3>{summary.pending}</h3>

                        <p>Pending</p>

                    </div>

                </div>

                <div className="summary-card approved">

                    <div className="summary-icon">

                        <FaCheckCircle />

                    </div>

                    <div>

                        <h3>{summary.approved}</h3>

                        <p>Approved</p>

                    </div>

                </div>

                <div className="summary-card rejected">

                    <div className="summary-icon">

                        <FaTimesCircle />

                    </div>

                    <div>

                        <h3>{summary.rejected}</h3>

                        <p>Rejected</p>

                    </div>

                </div>

            </div>

            {/* =======================================
                Search & Filters
            ======================================== */}

            <div className="leave-toolbar">

                <div className="search-box">

                    <FaSearch className="search-icon" />

                    <input
                        type="text"
                        placeholder="Search Employee..."
                        value={search}
                        onChange={(e) => {

                            setSearch(e.target.value);

                            filterLeaves(
                                e.target.value,
                                typeFilter,
                                statusFilter,
                                dateFilter
                            );

                        }}
                    />

                </div>

                <select
                    value={typeFilter}
                    onChange={(e) => {

                        setTypeFilter(e.target.value);

                        filterLeaves(
                            search,
                            e.target.value,
                            statusFilter,
                            dateFilter
                        );

                    }}
                >

                    <option value="">All Leave Types</option>

                    {[...new Set(
                        leaves.map(item => item.leaveType)
                    )]
                        .filter(Boolean)
                        .map((type, index) => (

                            <option
                                key={index}
                                value={type}
                            >
                                {type}
                            </option>

                        ))}

                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => {

                        setStatusFilter(e.target.value);

                        filterLeaves(
                            search,
                            typeFilter,
                            e.target.value,
                            dateFilter
                        );

                    }}
                >

                    <option value="">All Status</option>

                    <option value="Pending">Pending</option>

                    <option value="Approved">Approved</option>

                    <option value="Rejected">Rejected</option>

                </select>

                <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => {

                        setDateFilter(e.target.value);

                        filterLeaves(
                            search,
                            typeFilter,
                            statusFilter,
                            e.target.value
                        );

                    }}
                />

                <button
                    className="reset-btn"
                    onClick={() => {

                        setSearch("");
                        setTypeFilter("");
                        setStatusFilter("");
                        setDateFilter("");

                        setFilteredLeaves(leaves);

                    }}
                >

                    Reset

                </button>

            </div>
            {loading ? (

                <div className="loading">

                    Loading leave requests...

                </div>

            ) : filteredLeaves.length === 0 ? (

                <div className="no-data">

                    No leave requests found.

                </div>

            ) : (

                <div className="leave-table-wrapper">

                    <table className="leave-table">

                        <thead>

                            <tr>

                                <th>#</th>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Leave Type</th>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th>Total Days</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredLeaves.map((item, index) => (

                                <tr key={item.leaveId || index}>

                                    <td>{index + 1}</td>

                                    <td>{item.employeeId}</td>

                                    <td>{item.name}</td>

                                    <td>{item.leaveType}</td>

                                    <td>{item.fromDate}</td>

                                    <td>{item.toDate}</td>

                                    <td>{item.totalDays || item.days}</td>

                                    <td>

                                        <button
                                            className="reason-btn"
                                            onClick={() => viewReason(item.reason)}
                                        >
                                            View
                                        </button>

                                    </td>

                                    <td>

                                        <span
                                            className={`status-badge ${String(
                                                item.status || ""
                                            ).toLowerCase()}`}
                                        >
                                            {item.status}
                                        </span>

                                    </td>

                                    <td>

                                        {item.status === "Pending" ? (

                                            <div className="action-buttons">

                                                <button
                                                    className="approve-btn"
                                                    onClick={() =>
                                                        approveLeave(item.leaveId)
                                                    }
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    className="reject-btn"
                                                    onClick={() =>
                                                        rejectLeave(item.leaveId)
                                                    }
                                                >
                                                    Reject
                                                </button>

                                            </div>

                                        ) : (

                                            <span className="completed-text">

                                                {item.status}

                                            </span>

                                        )}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}
        </div>

    );

}

export default AdminLeave;
