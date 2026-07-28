import React, {
    useEffect,
    useState
} from "react";


import {
    FaUsers,
    FaCalendarCheck,
    FaTasks,
    FaUserClock,
    FaChartLine,
    FaFilePdf,
    FaFileExcel,
    FaSearch
} from "react-icons/fa";


import { toast } from "react-toastify";


import {
    getEmployeeReport,
    getAttendanceReport,
    getTaskReport,
    getLeaveReport,
    getPerformanceReport
} from "../../../services/reportService";


import "./AdminReports.css";


import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";


import * as XLSX from "xlsx";





function AdminReports(){



// =====================================
// STATES
// =====================================


const [loading,setLoading] =
useState(true);



const [employeeReport,setEmployeeReport] =
useState([]);



const [attendanceReport,setAttendanceReport] =
useState({

    summary:{},

    attendance:[]

});



const [taskReport,setTaskReport] =
useState({

    summary:{},

    tasks:[]

});



const [leaveReport,setLeaveReport] =
useState({

    summary:{},

    leaves:[]

});



const [performanceReport,setPerformanceReport] =
useState([]);



const [search,setSearch] =
useState("");







// =====================================
// LOAD REPORTS
// =====================================


useEffect(()=>{

    loadReports();

},[]);






const loadReports = async()=>{


try{


setLoading(true);



const [

employees,

attendance,

tasks,

leaves,

performance


] = await Promise.all([


getEmployeeReport(),

getAttendanceReport(),

getTaskReport(),

getLeaveReport(),

getPerformanceReport()


]);





// ==========================
// EMPLOYEE REPORT
// ==========================


if(employees.success){


setEmployeeReport(

employees.data?.employees || []

);


}






// ==========================
// ATTENDANCE REPORT
// ==========================


if(attendance.success){


setAttendanceReport({

summary:

attendance.data?.summary || {},


attendance:

attendance.data?.attendance || []


});


}







// ==========================
// TASK REPORT
// ==========================


if(tasks.success){


setTaskReport({

summary:

tasks.data?.summary || {},


tasks:

tasks.data?.tasks || []


});


}








// ==========================
// LEAVE REPORT
// ==========================


if(leaves.success){


setLeaveReport({

summary:

leaves.data?.summary || {},


leaves:

leaves.data?.leaves || []


});


}







// ==========================
// PERFORMANCE REPORT
// ==========================


if(performance.success){


setPerformanceReport(

performance.data?.performance ||
performance.data?.performanceReport ||
performance.data?.employees ||
performance.data ||
[]

);


}



}

catch(error){


console.error(error);


toast.error(
"Failed to load reports"
);


}


finally{


setLoading(false);


}



};








// =====================================
// EXPORT ALL REPORTS PDF
// =====================================


const exportAllPDF =()=>{


const doc =
new jsPDF();




doc.setFontSize(18);


doc.text(

"Employee Management System",

14,

15

);




doc.setFontSize(12);


doc.text(

"Complete Reports",

14,

25

);




let y = 35;






// ==========================
// EMPLOYEE REPORT
// ==========================


doc.text(

"Employee Report",

14,

y

);



autoTable(doc,{


startY:y+5,


head:[

[

"Employee ID",

"Name",

"Department",

"Designation",

"Status"

]

],



body:

employeeReport.map(emp=>[

emp.employeeId,

emp.name,

emp.department,

emp.designation,

emp.status

])


});




y = doc.lastAutoTable.finalY + 15;








doc.text(
"Task Report",
14,
y
);

autoTable(doc,{

startY:y+5,

head:[[
"Task ID",
"Employee",
"Task",
"Status",
"Priority"
]],

body:

taskReport.tasks.map(task=>[

task.taskId,

task.employeeName || task.name,

task.title || task.taskName,

task.status,

task.priority

])

});

y = doc.lastAutoTable.finalY + 15;


// ==========================
// ATTENDANCE REPORT
// ==========================


doc.text(

"Attendance Report",

14,

y

);



autoTable(doc,{


startY:y+5,


head:[

[

"Employee",

"Date",

"Check In",

"Check Out",

"Hours",

"Status"

]

],



body:

attendanceReport.attendance.map(att=>[


att.name,


att.date,


att.checkIn,


att.checkOut,


att.totalHours,


att.status


])


});




y = doc.lastAutoTable.finalY + 15;








// ==========================
// LEAVE REPORT
// ==========================


doc.text(

"Leave Report",

14,

y

);



autoTable(doc,{


startY:y+5,


head:[

[

"Employee",

"Type",

"From",

"To",

"Status"

]

],



body:

leaveReport.leaves.map(leave=>[


leave.name,


leave.leaveType,


leave.fromDate,


leave.toDate,


leave.status


])


});






doc.save(

"Complete_Report.pdf"

);



};








// =====================================
// EXPORT ALL REPORTS EXCEL
// =====================================


const exportAllExcel =()=>{



const workbook =

XLSX.utils.book_new();






// EMPLOYEE SHEET


XLSX.utils.book_append_sheet(

workbook,

XLSX.utils.json_to_sheet(

employeeReport

),

"Employees"

);







// TASK SHEET


XLSX.utils.book_append_sheet(

workbook,

XLSX.utils.json_to_sheet(

taskReport.tasks

),

"Tasks"

);







// ATTENDANCE SHEET


XLSX.utils.book_append_sheet(

workbook,

XLSX.utils.json_to_sheet(

attendanceReport.attendance

),

"Attendance"

);








// LEAVE SHEET


XLSX.utils.book_append_sheet(

workbook,

XLSX.utils.json_to_sheet(

leaveReport.leaves

),

"Leaves"

);







// PERFORMANCE SHEET


XLSX.utils.book_append_sheet(

workbook,

XLSX.utils.json_to_sheet(

performanceReport

),

"Performance"

);







XLSX.writeFile(

workbook,

"Complete_Report.xlsx"

);



};
// =====================================
// SEARCH FILTER
// =====================================


const filteredEmployees = employeeReport.filter((emp)=>{


const value =
search.toLowerCase();



return(


emp.employeeId
?.toLowerCase()
.includes(value)



||

emp.name
?.toLowerCase()
.includes(value)



||

emp.department
?.toLowerCase()
.includes(value)



||

emp.designation
?.toLowerCase()
.includes(value)



);


});







// =====================================
// LOADING
// =====================================


if(loading){


return(

<div className="adm-report-loading">

    Loading Reports...

</div>

);


}







// =====================================
// JSX START
// =====================================


return(


<div className="adm-report-container">





{/* ==========================
HEADER
========================== */}


<div className="adm-report-header">



<div>


<h1>

Reports

</h1>


<p>

Employee Management Reports

</p>


</div>






<div className="adm-report-buttons">



<button

onClick={exportAllPDF}

>


<FaFilePdf/>


Export All PDF


</button>







<button

onClick={exportAllExcel}

>


<FaFileExcel/>


Export Google Excel


</button>





</div>




</div>








{/* ==========================
SUMMARY CARDS
========================== */}



<div className="adm-report-summary">





<SummaryCard


icon={<FaUsers/>}


title="Total Employees"


value={

employeeReport.length

}


/>







<SummaryCard


icon={<FaCalendarCheck/>}


title="Total Attendances"


value={


attendanceReport.summary?.present ||


attendanceReport.summary?.presentToday ||


0


}


/>







<SummaryCard


icon={<FaTasks/>}


title="Total Tasks"


value={


taskReport.tasks.length


}


/>







<SummaryCard


icon={<FaUserClock/>}


title="Pending Leaves"


value={


leaveReport.summary?.pending ||


leaveReport.summary?.pendingLeaves ||


0


}


/>








<SummaryCard


icon={<FaChartLine/>}


title="Performance"


value={

performanceReport.length

}


/>






</div>









{/* ==========================
SEARCH
========================== */}



<div className="adm-report-search">



<FaSearch/>

<input


type="text"


placeholder="Search employee..."


value={search}



onChange={(e)=>


setSearch(e.target.value)

}/>
</div>

{/* ==========================
EMPLOYEE REPORT TABLE
========================== */}


<div className="adm-report-section">


<h2>

Employee Report

</h2>



<div className="adm-report-table">


<table>


<thead>


<tr>

<th>Employee ID</th>

<th>Name</th>

<th>Department</th>

<th>Designation</th>

<th>Status</th>


</tr>


</thead>



<tbody>


{


filteredEmployees.length > 0 ?


filteredEmployees.map((emp,index)=>(


<tr key={index}>


<td>

{emp.employeeId}

</td>


<td>

{emp.name}

</td>


<td>

{emp.department}

</td>


<td>

{emp.designation}

</td>


<td>


<span

className={

emp.status==="Active"

?

"adm-status-active"

:

"adm-status-inactive"

}


>

{emp.status}

</span>


</td>


</tr>


))


:


<tr>

<td colSpan="5">

No Employee Records

</td>

</tr>


}



</tbody>


</table>


</div>


</div>







{/* ==========================
ATTENDANCE REPORT TABLE
========================== */}



<div className="adm-report-section">


<h2>

Attendance Report

</h2>



<div className="adm-report-table">


<table>


<thead>

<tr>


<th>Employee</th>

<th>Date</th>

<th>Check In</th>

<th>Check Out</th>

<th>Total Hours</th>

<th>Status</th>


</tr>


</thead>



<tbody>



{


attendanceReport.attendance.length > 0 ?


attendanceReport.attendance.map((att,index)=>(


<tr key={index}>


<td>

{att.name}

</td>


<td>

{att.date}

</td>


<td>

{att.checkIn}

</td>


<td>

{att.checkOut}

</td>


<td>

{att.totalHours}

</td>


<td>

{att.status}

</td>


</tr>


))


:


<tr>

<td colSpan="6">

No Attendance Records

</td>

</tr>


}



</tbody>


</table>


</div>


</div>








{/* ==========================
TASK REPORT TABLE
========================== */}



<div className="adm-report-section">


<h2>

Task Report

</h2>




<div className="adm-report-table">


<table>


<thead>


<tr>


<th>Task ID</th>

<th>Employee</th>

<th>Task</th>

<th>Status</th>

<th>Priority</th>

<th>Date</th>


</tr>


</thead>




<tbody>


{


taskReport.tasks.length > 0 ?


taskReport.tasks.map((task,index)=>(


<tr key={index}>


<td>

{task.taskId}

</td>


<td>

{task.employeeName || task.name}

</td>


<td>

{
task.task ||
task.title ||
task.taskName ||
task.description ||
"-"

}

</td>


<td>

{task.status}

</td>


<td>

{task.priority}

</td>

<td>

{
task.date ||
task.taskDate ||
task.submittedDate ||
"-"

}

</td>


</tr>


))


:


<tr>

<td colSpan="6">

No Task Records

</td>

</tr>


}


</tbody>



</table>



</div>


</div>









{/* ==========================
LEAVE REPORT TABLE
========================== */}



<div className="adm-report-section">


<h2>

Leave Report

</h2>




<div className="adm-report-table">


<table>


<thead>


<tr>


<th>Employee</th>

<th>Leave Type</th>

<th>From</th>

<th>To</th>

<th>Status</th>


</tr>


</thead>




<tbody>


{


leaveReport.leaves.length > 0 ?


leaveReport.leaves.map((leave,index)=>(


<tr key={index}>


<td>

{leave.name}

</td>


<td>

{leave.leaveType}

</td>


<td>

{
leave.fromDate ||
leave.startDate ||
leave.from ||
leave.leaveFrom ||
"-"

}

</td>


<td>

{
leave.toDate ||
leave.endDate ||
leave.to ||
leave.leaveTo ||
"-"

}

</td>


<td>

{leave.status}

</td>


</tr>


))


:


<tr>

<td colSpan="5">

No Leave Records

</td>

</tr>


}



</tbody>


</table>


</div>


</div>

{/* ==========================
PERFORMANCE REPORT TABLE
========================== */}



<div className="adm-report-section">

<h2>

Performance Report

</h2>




<div className="adm-report-table">


<table>


<thead>


<tr>


<th>Employee</th>

<th>Total Tasks</th>

<th>Completed</th>

<th>Pending</th>

<th>Score</th>


</tr>


</thead>




<tbody>

{

performanceReport.length > 0 ?


performanceReport.map((performance,index)=>(


<tr key={index}>


<td>

{
performance.name ||
performance.employeeName ||
"-"
}

</td>

<td>
{
performance.tasks?.total || 0
}
</td>

<td>
{
performance.tasks?.completed || 0
}
</td>

<td>
{
performance.tasks?.pending || 0
}
</td>



<td>

{

performance.score ||

performance.performanceScore ||

"-"

}

</td>



</tr>


))


:

<tr>

<td colSpan="5">

No Performance Records

</td>

</tr>


}



</tbody>



</table>



</div>


</div>






</div>


);


}

// =====================================
// SUMMARY CARD COMPONENT
// =====================================


function SummaryCard({

icon,

title,

value


}){


return(


<div className="adm-report-card">



<div className="adm-report-icon">


{icon}


</div>





<div>


<h3>

{title}

</h3>


<h2>

{value}

</h2>


</div>




</div>


);



}







export default AdminReports;