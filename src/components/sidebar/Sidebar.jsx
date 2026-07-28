import React from "react";
import { NavLink, useNavigate } from "react-router-dom";


import {
    FaHome,
    FaUser,
    // FaClock,
    FaHistory,
    FaTasks,
    FaCalendarAlt,
    FaFileAlt,
    FaSignOutAlt
} from "react-icons/fa";


import "./Sidebar.css";



function Sidebar({role}){


    const navigate = useNavigate();



    const employeeMenu = [

        {
            name:"Dashboard",
            path:"/employee",
            icon:<FaHome/>
        },


        {
            name:"My Profile",
            path:"/employee/profile",
            icon:<FaUser/>
        },


        // {
        //     name:"Check In / Check Out",
        //     path:"/employee/attendance",
        //     icon:<FaClock/>
        // },


        {
            name:"Attendance History",
            path:"/employee/attendance-history",
            icon:<FaHistory/>
        },


        {
            name:"Submit Task",
            path:"/employee/submit-task",
            icon:<FaTasks/>
        },


        {
            name:"Task History",
            path:"/employee/task-history",
            icon:<FaFileAlt/>
        },


        {
            name:"Apply Leave",
            path:"/employee/leave",
            icon:<FaCalendarAlt/>
        },


        {
            name:"Leave History",
            path:"/employee/leave-history",
            icon:<FaHistory/>
        }


    ];





    const logout = ()=>{


        localStorage.removeItem("user");

        navigate("/");


    };


return(


<aside className="sidebar">



<div className="sidebar-logo">


<h2>
HRMS
</h2>


<p>
Employee Panel
</p>


</div>





<ul className="sidebar-menu">


{

employeeMenu.map((item,index)=>(


<li key={index}>


<NavLink

to={item.path}

className={({isActive})=>

isActive ? "active" : ""

}

end={item.path==="/employee"}

>


<span className="menu-icon">

{item.icon}

</span>


<span className="menu-text">

{item.name}

</span>



</NavLink>


</li>


))


}


</ul>







<button

className="logout-btn"

onClick={logout}

>


<FaSignOutAlt/>


<span>
Logout
</span>


</button>





</aside>


)


}



export default Sidebar;