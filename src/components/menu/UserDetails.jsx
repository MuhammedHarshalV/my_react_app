
import React, { useEffect, useState } from "react";
import {
    FiUsers,
    FiSearch,
    FiMapPin,
    FiEye,
    FiChevronLeft,
    FiChevronRight,
    FiX,
    FiPhone,
    FiMail,
    FiCalendar,
    FiUser,
    FiShield,
    FiSmartphone,

    FiCopy,
    FiInfo,
} from "react-icons/fi";

import "./UserDetails.css";
import "./userProfilePop.css"
import { getAllEmployeesApi } from "../../services/api/menu_screen/allEmployeesApi";

const USERS_PER_PAGE = 6;

function UserDetails() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");            // what the user types
    const [debouncedSearch, setDebouncedSearch] = useState(""); // what the API uses
    const [currentPage, setCurrentPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);
    const [totalEmployees, setTotalEmployees] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // 1) Debounce the search text. When it settles, reset to page 1.
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search.trim());
            setCurrentPage(1);
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);

    // 2) Fetch whenever the page or the (debounced) search changes.
    //    Every response REPLACES the list.
    useEffect(() => {
        let ignore = false;

        const getUsers = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await getAllEmployeesApi({
                    page: currentPage,
                    limit: USERS_PER_PAGE,
                    search: debouncedSearch,
                });

                if (!result.success) {
                    throw new Error(result.message || "Failed to fetch employees");
                }

                if (ignore) return;

                const employees = result.data.map((item) => {
                    const name = item.user_name || "Unknown User";

                    const avatar = name
                        .split(" ")
                        .filter(Boolean)
                        .map((word) => word[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase();


                    return {
                        id: item.user_emp_key,
                        name,
                        proId: item.user_emp_key?.toString() || "",
                        phone: item.user_phone_number || "—",
                        email: item.user_email || "—",
                        dob: item.date_of_birth || "",
                        gender: item.user_gender || "—",
                        department: "—",
                        location: item.user_location || "—",
                        about: item.user_about || "—",
                        isAdmin: Boolean(item.is_admin),
                        deviceCount: item.device_count || 0,
                        devices: `${item.device_count || 0} ${item.device_count === 1 ? "Device" : "Devices"
                            }`,
                        avatar,
                        profilePhoto: item.profile_photo_url,
                        color: "#263F45",
                        status: "Active", pin: item.user_pin,
                        flagged: Boolean(item.is_multiple_device),
                    };
                });

                setUsers(employees); // replaces the old list
                setTotalEmployees(result.pagination?.total_employees || 0);
                setTotalPages(Math.max(1, result.pagination?.total_pages || 1));
            } catch (err) {
                console.error("Error fetching employees:", err);

                if (!ignore) {
                    setUsers([]);
                    setTotalEmployees(0);
                    setTotalPages(1);
                    setError(err.message || "Something went wrong");
                }
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        getUsers();

        // If page/search changes again before this request finishes,
        // the old response is ignored so it can't overwrite the new list.
        return () => {
            ignore = true;
        };
    }, [currentPage, debouncedSearch]);

    // Search handler: just update the text, nothing else
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    // Pagination handler: just change the page, the effect fetches it
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };
    // Open user profile popup
    const handleViewProfile = (user) => {
        setSelectedUser(user);
        setIsProfileOpen(true);
    };

    // Close user profile popup
    const handleCloseProfile = () => {
        setIsProfileOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="roster-container">

            {/* HEADER */}
            <div className="roster-header">
                <div className="roster-heading">
                    <div className="roster-heading-icon">
                        <FiUsers />
                    </div>

                    <div className="roster-heading-text">
                        <div className="roster-title-row">
                            <h2>All Logged Employees</h2>
                        </div>

                        <p>
                            Live personnel authentication roster, active
                            session timers, and assigned laboratory nodes.
                        </p>
                    </div>
                </div>
            </div>

            {/* SEARCH */}
            <div className="roster-filter-panel">
                <div className="roster-search">
                    <FiSearch />

                    <input
                        type="text"
                        placeholder="Search Employee name..."
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {/* USER CARDS */}
            <div className="user-grid">

                {loading ? (
                    <div className="roster-empty-state">
                        <p>Loading employees...</p>
                    </div>
                ) : error ? (
                    <div className="roster-empty-state">
                        <FiUsers />
                        <h3>Unable to load employees</h3>
                        <p>{error}</p>
                    </div>
                ) : users.length > 0 ? (
                    users.map((user, index) => (
                        <div
                            className={`user-card ${user.flagged ? "flagged-card" : ""
                                }`}
                            key={index}
                        >
                            {/* CARD HEADER */}
                            <div className="user-card-header">

                                <div className="user-main-info">

                                    <div
                                        className="user-avatar"
                                        style={{
                                            backgroundColor: user.color,
                                        }}
                                    >
                                        {user.profilePhoto ? (
                                            <img
                                                src={user.profilePhoto}
                                                alt={user.name}
                                                className="user-profile-image"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                    e.currentTarget.nextElementSibling.style.display = "flex";
                                                }}
                                            />
                                        ) : null}

                                        <span
                                            className="user-avatar-fallback"
                                            style={{
                                                display: user.profilePhoto ? "none" : "flex",
                                            }}
                                        >
                                            {user.avatar}
                                        </span>

                                        {user.status && (
                                            <span
                                                className={`avatar-indicator ${user.status === "Active"
                                                    ? "indicator-active"
                                                    : "indicator-inactive"
                                                    }`}
                                            />
                                        )}
                                    </div>

                                    <div className="user-name-info">

                                        <div className="user-name-row">
                                            <h3>{user.name}</h3>

                                            <span className="user-pro-id">
                                                PRO - ID {user.proId}
                                            </span>
                                        </div>

                                        <p>{user.phone}</p>

                                        <div className="user-location">
                                            <FiMapPin />
                                            <span>{user.location}</span>
                                        </div>

                                    </div>
                                </div>

                                <div className="user-card-badges">
                                    <span className="device-count">
                                        {user.devices}
                                    </span>
                                </div>

                            </div>

                            {/* CARD ACTIONS */}
                            <div className="user-card-actions">
                                <button
                                    className="user-action-btn view-profile-btn"
                                    onClick={() => handleViewProfile(user)}
                                >
                                    <FiEye />
                                    View Profile
                                </button>
                            </div>

                        </div>
                    ))
                ) : (
                    <div className="roster-empty-state">
                        <FiUsers />
                        <h3>No employees found</h3>
                        <p>Try searching with another employee detail.</p>
                    </div>
                )}

            </div>

            {/* PAGINATION */}
            {!loading && !error && totalEmployees > 0 && (
                <div className="roster-pagination">

                    <p>
                        Showing{" "}
                        <strong>
                            {(currentPage - 1) * USERS_PER_PAGE + 1}
                        </strong>{" "}
                        to{" "}
                        <strong>
                            {Math.min(
                                currentPage * USERS_PER_PAGE,
                                totalEmployees
                            )}
                        </strong>{" "}
                        of <strong>{totalEmployees}</strong> employees
                    </p>

                    <div className="pagination-controls">

                        {/* PREVIOUS */}
                        <button
                            className="pagination-btn"
                            disabled={currentPage === 1}
                            onClick={() =>
                                handlePageChange(currentPage - 1)
                            }
                            aria-label="Previous page"
                        >
                            <FiChevronLeft />
                        </button>

                        {/* PAGE NUMBERS */}
                        {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1
                        ).map((page) => (
                            <button
                                key={page}
                                className={`pagination-number ${currentPage === page ? "active" : ""
                                    }`}
                                onClick={() =>
                                    handlePageChange(page)
                                }
                            >
                                {page}
                            </button>
                        ))}

                        {/* NEXT */}
                        <button
                            className="pagination-btn"
                            disabled={currentPage === totalPages}
                            onClick={() =>
                                handlePageChange(currentPage + 1)
                            }
                            aria-label="Next page"
                        >
                            <FiChevronRight />
                        </button>

                    </div>
                </div>
            )}

            {/* USER PROFILE POPUP */}
            {isProfileOpen && selectedUser && (
                <div
                    className="profile-modal-overlay"
                    onClick={handleCloseProfile}
                >
                    <div
                        className="profile-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* HEADER */}
                        <div className="profile-modal-header">
                            <div className="profile-modal-title">
                                <div className="profile-modal-icon">
                                    <FiShield />
                                </div>

                                <div>
                                    <div className="profile-title-line">
                                        <h2>User Profile Dossier</h2>

                                        <span className="profile-pin">
                                            PRO-ID #{selectedUser.proId}
                                        </span>

                                        <span className="profile-active-badge">
                                            <span />
                                            Active User
                                        </span>
                                    </div>

                                    <p>
                                        Personnel details and device
                                    </p>
                                </div>
                            </div>

                            <button
                                className="profile-close-btn"
                                onClick={handleCloseProfile}
                            >
                                <FiX />
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="profile-modal-body">

                            {/* EMPLOYEE SUMMARY */}
                            <div className="profile-summary">
                                <div className="profile-summary-left">

                                    <div className="profile-large-avatar">
                                        {selectedUser.profilePhoto ? (
                                            <img
                                                src={selectedUser.profilePhoto}
                                                alt={selectedUser.name}
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                    e.currentTarget.nextElementSibling.style.display = "flex";
                                                }}
                                            />
                                        ) : null}
                                        <span
                                            style={{
                                                display: selectedUser.profilePhoto ? "none" : "flex",
                                            }}
                                        >
                                            {selectedUser.avatar}
                                        </span>
                                        <span className="profile-status-dot online" />
                                    </div>

                                    <div className="profile-summary-info">
                                        <div className="profile-name-line">
                                            <h2>{selectedUser.name}</h2>

                                            <span>
                                                {selectedUser.isAdmin
                                                    ? "Administrator"
                                                    : "Staff"}
                                            </span>
                                        </div>



                                        <div className="profile-summary-tags">
                                            <span>
                                                <FiShield />
                                                {selectedUser.isAdmin
                                                    ? "Administrator"
                                                    : "Standard Staff"}
                                            </span>

                                            <span>
                                                <FiSmartphone />
                                                {selectedUser.deviceCount} Devices Bound
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-summary-right">
                                    <span>ID: #PRO-{selectedUser.id}</span>
                                    <span>{selectedUser.location}</span>
                                </div>
                            </div>

                            {/* DETAILS GRID */}
                            <div className="profile-details-grid">

                                <div className="profile-detail-card">
                                    <div className="profile-detail-icon">
                                        <FiPhone />
                                    </div>

                                    <div className="profile-detail-content">
                                        <label>PHONE NUMBER</label>
                                        <strong>{selectedUser.phone}</strong>
                                    </div>

                                    {selectedUser.phone !== "—" && (
                                        <button
                                            className="profile-copy-btn"
                                            onClick={() =>
                                                navigator.clipboard.writeText(
                                                    selectedUser.phone
                                                )
                                            }
                                        >
                                            <FiCopy />
                                        </button>
                                    )}
                                </div>

                                <div className="profile-detail-card">
                                    <div className="profile-detail-icon">
                                        <FiMail />
                                    </div>

                                    <div className="profile-detail-content">
                                        <label>EMAIL ADDRESS</label>
                                        <strong>{selectedUser.email}</strong>
                                    </div>

                                    {selectedUser.email !== "—" && (
                                        <button
                                            className="profile-copy-btn"
                                            onClick={() =>
                                                navigator.clipboard.writeText(
                                                    selectedUser.email
                                                )
                                            }
                                        >
                                            <FiCopy />
                                        </button>
                                    )}
                                </div>

                                <div className="profile-detail-card">
                                    <div className="profile-detail-icon">
                                        <FiCalendar />
                                    </div>

                                    <div className="profile-detail-content">
                                        <label>DATE OF BIRTH</label>
                                        <strong>
                                            {selectedUser.dob
                                                ? new Date(
                                                    `${selectedUser.dob}T00:00:00`
                                                ).toLocaleDateString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })
                                                : "—"}
                                        </strong>
                                    </div>
                                </div>

                                <div className="profile-detail-card">
                                    <div className="profile-detail-icon">
                                        <FiUser />
                                    </div>

                                    <div className="profile-detail-content">
                                        <label>GENDER</label>
                                        <strong>{selectedUser.gender}</strong>
                                    </div>
                                </div>

                                <div className="profile-detail-card">
                                    <div className="profile-detail-icon">
                                        <FiMapPin />
                                    </div>

                                    <div className="profile-detail-content">
                                        <label>ASSIGNED LOCATION</label>
                                        <strong>{selectedUser.location}</strong>
                                    </div>
                                </div>

                                <div className="profile-detail-card">
                                    <div className="profile-detail-icon">
                                        <FiShield />
                                    </div>

                                    <div className="profile-detail-content">
                                        <label>EMPLOYEE PIN</label>
                                        <strong className="profile-pin-value">
                                            {selectedUser.pin}
                                        </strong>
                                    </div>


                                </div>
                            </div>

                            {/* ABOUT */}
                            <div className="profile-about">
                                <div className="profile-section-title">
                                    <FiInfo />
                                    ABOUT / PERSONNEL MEMO
                                </div>

                                <div className="profile-about-content">
                                    {selectedUser.about}
                                </div>
                            </div>

                            {/* DEVICES */}
                            <div className="profile-devices-section">
                                <div className="profile-devices-heading">
                                    <h4>
                                        <FiSmartphone />
                                        CONNECTED REGISTERED HARDWARE
                                    </h4>

                                    <span>
                                        device_count: {selectedUser.deviceCount}
                                    </span>
                                </div>

                                <div className="profile-device-card">
                                    <div className="profile-device-icon">
                                        <FiSmartphone />
                                    </div>

                                    <div className="profile-device-info">
                                        <strong>Registered Devices</strong>
                                        <p>
                                            {selectedUser.deviceCount > 0
                                                ? `${selectedUser.deviceCount} device(s) registered`
                                                : "No registered devices found"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            )}


        </div>
    );
}

export default UserDetails;
