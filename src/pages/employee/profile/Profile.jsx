import React, { useState } from "react";

import {
    FaUserCircle,
    FaEnvelope,
    FaPhoneAlt,
    FaBirthdayCake,
    FaIdBadge,
    FaUserTie,
    FaBuilding,
    FaBriefcase,
    FaMapMarkerAlt
} from "react-icons/fa";

import "./Profile.css";

function Profile() {

    // ==========================
    // LOAD USER + PROFILE IMAGE
    // ==========================

    const storedUser =
        JSON.parse(localStorage.getItem("user")) || {};

    const savedImage = localStorage.getItem(
        `profileImage_${storedUser.employeeId}`
    );

    if (savedImage) {
        storedUser.profileImage = savedImage;
    }

    const [user, setUser] = useState(storedUser);

    const [edit, setEdit] = useState(false);

    const [form, setForm] = useState(storedUser);

    // ==========================
    // INPUT CHANGE
    // ==========================

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    // ==========================
    // SAVE PROFILE
    // ==========================

    const saveProfile = () => {

        const image = localStorage.getItem(
            `profileImage_${form.employeeId}`
        );

        const updated = {

            ...form,

            profileImage: image || ""

        };

        localStorage.setItem(

            "user",

            JSON.stringify(updated)

        );

        setUser(updated);

        setEdit(false);

    };

    // ==========================
    // PHOTO UPLOAD
    // ==========================

    const uploadPhoto = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {

            const image = reader.result;

            localStorage.setItem(

                `profileImage_${user.employeeId}`,

                image

            );

            const updated = {

                ...form,

                profileImage: image

            };

            localStorage.setItem(

                "user",

                JSON.stringify(updated)

            );

            setUser(updated);

            setForm(updated);

        };

        reader.readAsDataURL(file);

    };

    // ==========================
    // REMOVE PHOTO
    // ==========================

    const removePhoto = () => {

        localStorage.removeItem(
            `profileImage_${user.employeeId}`
        );

        const updated = {

            ...user,

            profileImage: ""

        };

        localStorage.setItem(

            "user",

            JSON.stringify(updated)

        );

        setUser(updated);

        setForm(updated);

    };

    return (

        <div className="profile-page">

            {/* ==========================
                PROFILE HEADER
            ========================== */}

            <div className="profile-header">

                <div className="profile-avatar-section">

                    <div className="profile-avatars">

                        <label>

                            {

                                user.profileImage ?

                                    <img
                                        src={user.profileImage}
                                        alt="Profile"
                                        className="dashboard-profile-image"
                                    />

                                    :

                                    <FaUserCircle />

                            }

                        </label>

                    </div>
                    <input

                        id="profileUpload"

                        type="file"

                        accept="image/*"

                        onChange={uploadPhoto}

                        style={{ display: "none" }}

                    />

                    <button

                        className="upload-photo-btn"

                        onClick={() =>
                            document
                                .getElementById("profileUpload")
                                .click()
                        }

                    >

                        Upload Photo

                    </button>

                    {

                        user.profileImage &&

                        <button

                            className="remove-photo-btn"

                            onClick={removePhoto}

                        >

                            Remove Photo

                        </button>

                    }

                </div>

                <div className="profile-info">

                    <h1>

                        {user.name || "Employee"}

                    </h1>

                    <h3>

                        {user.designation || "Employee"}

                    </h3>

                    <p>

                        Employee ID :

                        <strong>

                            {user.employeeId}

                        </strong>

                    </p>

                    <span className="active-status">

                        🟢 {user.status || "Active"}

                    </span>

                </div>

            </div>

            {/* ==========================
                PERSONAL INFORMATION
            ========================== */}

            <div className="profile-section">

                <h2>

                    Personal Information

                </h2>

                <div className="profile-grid">
                    <ProfileField
                        icon={<FaUserCircle />}
                        title="Name"
                        value={form.name}
                        edit={edit}
                        name="name"
                        change={handleChange}
                    />

                    <ProfileField
                        icon={<FaEnvelope />}
                        title="Email"
                        value={form.email}
                    />

                    <ProfileField
                        icon={<FaPhoneAlt />}
                        title="Phone"
                        value={form.phone || form.mobile}
                        edit={edit}
                        name="phone"
                        change={handleChange}
                    />

                    <ProfileField
                        icon={<FaBirthdayCake />}
                        title="Date of Birth"
                        value={form.dob}
                        edit={edit}
                        name="dob"
                        change={handleChange}
                    />

                </div>

            </div>

            {/* ==========================
                OFFICIAL INFORMATION
            ========================== */}

            <div className="profile-section">

                <h2>

                    Official Information

                </h2>

                <div className="profile-grid">

                    <ProfileField
                        icon={<FaIdBadge />}
                        title="Employee ID"
                        value={form.employeeId}
                    />

                    <ProfileField
                        icon={<FaBriefcase />}
                        title="Designation"
                        value={form.designation}
                        edit={edit}
                        name="designation"
                        change={handleChange}
                    />

                    <ProfileField
                        icon={<FaBuilding />}
                        title="Department"
                        value={form.department}
                    />

                    <ProfileField
                        icon={<FaUserTie />}
                        title="Role"
                        value={form.role}
                    />

                </div>

            </div>

            {/* ==========================
                ADDRESS
            ========================== */}

            <div className="profile-section">

                <h2>

                    Address Information

                </h2>

                <div className="profile-grid">

                    <div className="full-width">

                        <ProfileField
                            icon={<FaMapMarkerAlt />}
                            title="Address"
                            value={form.address}
                            edit={edit}
                            name="address"
                            change={handleChange}
                        />

                    </div>

                </div>

            </div>

            {/* ==========================
                ACTION BUTTONS
            ========================== */}

            <div className="profile-actions">

                {

                    edit ?

                        <>

                            <button
                                className="edit-profile-btn"
                                onClick={saveProfile}
                            >
                                Save Profile
                            </button>

                            <button
                                className="cancel-btn"
                                onClick={() => {

                                    setForm(user);

                                    setEdit(false);

                                }}
                            >
                                Cancel
                            </button>

                        </>

                        :

                        <button
                            className="edit-profile-btn"
                            onClick={() => setEdit(true)}
                        >
                            Edit Profile
                        </button>

                }

            </div>

        </div>

    );

}

/* ==========================================
   PROFILE FIELD COMPONENT
========================================== */

function ProfileField({

    icon,

    title,

    value,

    edit,

    name,

    change

}) {

    return (

        <div className="profile-card">

            <div className="card-icon">

                {icon}

            </div>

            <div className="card-content">

                <label>

                    {title}

                </label>

                {

                    edit && name ?

                        <input
                            type="text"
                            name={name}
                            value={value || ""}
                            onChange={change}
                        />

                        :

                        <h4>

                            {value || "Not Available"}

                        </h4>

                }

            </div>

        </div>

    );

}

export default Profile;
