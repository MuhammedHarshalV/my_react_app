
import React, { useMemo, useState } from "react";
import {
    FiUsers,
    FiUserPlus,
    FiDownload,
    FiSearch,
    FiMapPin,
    FiClock,
    FiEye,
    FiLogOut,
    FiSlash,
    FiChevronLeft,
    FiChevronRight,
    FiMonitor,
} from "react-icons/fi";

import "./UserDetails.css";

const USERS_PER_PAGE = 6;

const initialUsers = [
    {
        id: 1,
        name: "Rahul Menon",
        proId: "PRO-104",
        department: "Senior Field Liaison",
        location: "Kakkanad SEZ",
        branch: "Kochi Central Lab",
        role: "Field Liaison",
        status: "Active",
        session: "3h 42m",
        lastActive: "Active Now",
        devices: "1 Device",
        avatar: "RM",
        color: "#263F45",
        flagged: false,
    },
    {
        id: 2,
        name: "Kavitha Nair",
        proId: "PRO-201",
        department: "Phlebotomist PRO",
        location: "Kochi Central Lab",
        branch: "Kochi Central Lab",
        role: "Phlebotomist",
        status: "Flagged",
        session: "1h 14m",
        lastActive: "Geofence Breach",
        devices: "1 Device",
        avatar: "KN",
        color: "#246A83",
        flagged: true,
    },
    {
        id: 3,
        name: "Sijomon Varghese",
        proId: "PRO-042",
        department: "Dispatch Supervisor",
        location: "Angamaly Hub",
        branch: "Angamaly Hub",
        role: "Supervisor",
        status: "Active",
        session: "5h 08m",
        lastActive: "Active: 1m ago",
        devices: "2 Devices",
        avatar: "SV",
        color: "#A78B70",
        flagged: false,
    },
    {
        id: 4,
        name: "Dr. Mathew",
        proId: "ROOT-ADM",
        department: "Chief Pathology Auditor",
        location: "Central HQ",
        branch: "Central HQ",
        role: "Administrator",
        status: "Active",
        session: "6h 12m",
        lastActive: "FIDO2 Authenticated",
        devices: "1 Workstation",
        avatar: "DM",
        color: "#475569",
        flagged: false,
    },
    {
        id: 5,
        name: "Deepa Mohan",
        proId: "PRO-119",
        department: "Phlebotomist PRO",
        location: "Kochi Central Lab",
        branch: "Kochi Central Lab",
        role: "Phlebotomist",
        status: "Active",
        session: "2h 20m",
        lastActive: "Active: 4m ago",
        devices: "1 Device",
        avatar: "DM",
        color: "#4B7891",
        flagged: false,
    },
    {
        id: 6,
        name: "Arun Kumar",
        proId: "PRO-110",
        department: "Dispatch Courier PRO",
        location: "Kakkanad SEZ",
        branch: "Kakkanad SEZ",
        role: "Courier",
        status: "Active",
        session: "4h 15m",
        lastActive: "Active: 8m ago",
        devices: "1 Device",
        avatar: "AK",
        color: "#92785C",
        flagged: false,
    },
    {
        id: 7,
        name: "Anjali Thomas",
        proId: "PRO-125",
        department: "Laboratory Technician",
        location: "Aluva Lab",
        branch: "Aluva Lab",
        role: "Technician",
        status: "Pending",
        session: "0h 00m",
        lastActive: "Not Active",
        devices: "1 Device",
        avatar: "AT",
        color: "#946B86",
        flagged: false,
    },
    {
        id: 8,
        name: "Nithin Raj",
        proId: "PRO-132",
        department: "Field Executive",
        location: "Thrippunithura",
        branch: "Kochi Central Lab",
        role: "Field Liaison",
        status: "Inactive",
        session: "0h 00m",
        lastActive: "Active: 2 days ago",
        devices: "1 Device",
        avatar: "NR",
        color: "#557A63",
        flagged: false,
    },
    {
        id: 9,
        name: "Meera Suresh",
        proId: "PRO-140",
        department: "Phlebotomist PRO",
        location: "Kochi Central Lab",
        branch: "Kochi Central Lab",
        role: "Phlebotomist",
        status: "Active",
        session: "3h 10m",
        lastActive: "Active: 2m ago",
        devices: "1 Device",
        avatar: "MS",
        color: "#9A705F",
        flagged: false,
    },
];

function UserDetails() {
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [branchFilter, setBranchFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const searchValue = search.toLowerCase();

            const matchesSearch =
                user.name.toLowerCase().includes(searchValue) ||
                user.proId.toLowerCase().includes(searchValue) ||
                user.department.toLowerCase().includes(searchValue) ||
                user.location.toLowerCase().includes(searchValue);

            const matchesRole =
                roleFilter === "All" || user.role === roleFilter;

            const matchesStatus =
                statusFilter === "All" || user.status === statusFilter;

            const matchesBranch =
                branchFilter === "All" || user.branch === branchFilter;

            return (
                matchesSearch &&
                matchesRole &&
                matchesStatus &&
                matchesBranch
            );
        });
    }, [users, search, roleFilter, statusFilter, branchFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredUsers.length / USERS_PER_PAGE)
    );

    const startIndex = (currentPage - 1) * USERS_PER_PAGE;

    const paginatedUsers = filteredUsers.slice(
        startIndex,
        startIndex + USERS_PER_PAGE
    );

    const onlineCount = users.filter(
        (user) => user.status === "Active"
    ).length;

    const handleFilterChange = (setter) => (event) => {
        setter(event.target.value);
        setCurrentPage(1);
    };

    const handleExport = () => {
        const headers = [
            "Name",
            "PRO ID",
            "Department",
            "Role",
            "Branch",
            "Status",
            "Session",
            "Last Active",
            "Devices",
        ];

        const rows = filteredUsers.map((user) => [
            user.name,
            user.proId,
            user.department,
            user.role,
            user.branch,
            user.status,
            user.session,
            user.lastActive,
            user.devices,
        ]);

        const csvContent = [
            headers,
            ...rows,
        ]
            .map((row) =>
                row
                    .map((value) => `"${String(value).replace(/"/g, '""')}"`)
                    .join(",")
            )
            .join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "user-roster.csv";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => URL.revokeObjectURL(url), 1000);
    };

    const handleSignOut = (userId) => {
        const user = users.find((item) => item.id === userId);

        if (!user) return;

        const confirmed = window.confirm(
            `Sign out ${user.name}?`
        );

        if (!confirmed) return;

        setUsers((previousUsers) =>
            previousUsers.map((item) =>
                item.id === userId
                    ? {
                        ...item,
                        status: "Inactive",
                        lastActive: "Signed Out",
                    }
                    : item
            )
        );
    };

    const handleQuarantine = (userId) => {
        const user = users.find((item) => item.id === userId);

        if (!user) return;

        const confirmed = window.confirm(
            `Quarantine ${user.name}?`
        );

        if (!confirmed) return;

        setUsers((previousUsers) =>
            previousUsers.map((item) =>
                item.id === userId
                    ? {
                        ...item,
                        status: "Flagged",
                        flagged: true,
                        lastActive: "Quarantined",
                    }
                    : item
            )
        );
    };

    const handleAuthorize = () => {
        // Connect your authorize-user modal or API here.
        alert("Connect your Authorize New User form here.");
    };

    const handleViewProfile = (user) => {
        // Navigate to your user profile page or open a modal here.
        alert(`Selected user: ${user.name}`);
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
                            <h2>All Logged Employees &amp; Users</h2>

                            <span className="online-badge">
                                {onlineCount} Online
                            </span>
                        </div>

                        <p>
                            Live personnel authentication roster, active
                            session timers, and assigned laboratory nodes.
                        </p>
                    </div>
                </div>

                <div className="roster-header-actions">
                    <button
                        className="roster-btn roster-btn-secondary"
                        onClick={handleAuthorize}
                    >
                        <FiUserPlus />
                        Authorize New User
                    </button>

                    <button
                        className="roster-btn roster-btn-secondary"
                        onClick={handleExport}
                    >
                        <FiDownload />
                        Export User Roster
                    </button>
                </div>
            </div>

            {/* FILTERS */}
            <div className="roster-filter-panel">

                <div className="roster-search">
                    <FiSearch />

                    <input
                        type="text"
                        placeholder="Search by employee name, PRO ID, department, email..."
                        value={search}
                        onChange={handleFilterChange(setSearch)}
                    />
                </div>

                <select
                    className="roster-select"
                    value={roleFilter}
                    onChange={handleFilterChange(setRoleFilter)}
                >
                    <option value="All">All Roles &amp; Departments</option>
                    <option value="Field Liaison">Field Liaison</option>
                    <option value="Phlebotomist">Phlebotomist</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Courier">Courier</option>
                    <option value="Technician">Technician</option>
                </select>

                <select
                    className="roster-select"
                    value={statusFilter}
                    onChange={handleFilterChange(setStatusFilter)}
                >
                    <option value="All">Status: All Active States</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                    <option value="Flagged">Flagged</option>
                </select>

                <select
                    className="roster-select"
                    value={branchFilter}
                    onChange={handleFilterChange(setBranchFilter)}
                >
                    <option value="All">All Branches</option>
                    <option value="Kochi Central Lab">Kochi Central Lab</option>
                    <option value="Kakkanad SEZ">Kakkanad SEZ</option>
                    <option value="Angamaly Hub">Angamaly Hub</option>
                    <option value="Central HQ">Central HQ</option>
                    <option value="Aluva Lab">Aluva Lab</option>
                </select>
            </div>

            {/* USER CARDS */}
            <div className="user-grid">
                {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                        <div
                            className={`user-card ${user.flagged ? "flagged-card" : ""
                                }`}
                            key={user.id}
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
                                        {user.avatar}

                                        <span
                                            className={`avatar-indicator ${user.status === "Active"
                                                    ? "indicator-active"
                                                    : "indicator-inactive"
                                                }`}
                                        />
                                    </div>

                                    <div className="user-name-info">
                                        <div className="user-name-row">
                                            <h3>{user.name}</h3>

                                            <span
                                                className={`user-pro-id ${user.proId === "ROOT-ADM"
                                                        ? "root-pro-id"
                                                        : ""
                                                    }`}
                                            >
                                                {user.proId}
                                            </span>
                                        </div>

                                        <p>{user.department}</p>

                                        <div className="user-location">
                                            <FiMapPin />
                                            <span>{user.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="user-card-badges">
                                    {user.flagged && (
                                        <span className="flagged-badge">
                                            ! Flagged
                                        </span>
                                    )}

                                    {!user.flagged && (
                                        <span className="device-count">
                                            {user.devices}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* SESSION DETAILS */}
                            <div
                                className={`user-session-row ${user.flagged
                                        ? "session-row-flagged"
                                        : ""
                                    }`}
                            >
                                <div className="session-duration">
                                    <FiClock />
                                    <span>Session: {user.session}</span>
                                </div>

                                <div className="session-status">
                                    <span className="session-status-dot" />
                                    <span>{user.lastActive}</span>
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

                                {user.flagged ? (
                                    <button
                                        className="user-action-btn quarantine-btn"
                                        onClick={() =>
                                            handleQuarantine(user.id)
                                        }
                                    >
                                        <FiSlash />
                                        Quarantine
                                    </button>
                                ) : (
                                    <button
                                        className="user-action-btn signout-btn"
                                        onClick={() =>
                                            handleSignOut(user.id)
                                        }
                                    >
                                        <FiLogOut />
                                        Sign Out
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="roster-empty-state">
                        <FiUsers />
                        <h3>No employees found</h3>
                        <p>Try changing your search or filter options.</p>
                    </div>
                )}
            </div>

            {/* PAGINATION */}
            {filteredUsers.length > 0 && (
                <div className="roster-pagination">
                    <p>
                        Showing{" "}
                        <strong>{startIndex + 1}</strong> to{" "}
                        <strong>
                            {Math.min(
                                startIndex + USERS_PER_PAGE,
                                filteredUsers.length
                            )}
                        </strong>{" "}
                        of <strong>{filteredUsers.length}</strong> employees
                    </p>

                    <div className="pagination-controls">
                        <button
                            className="pagination-btn"
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage((page) => page - 1)
                            }
                            aria-label="Previous page"
                        >
                            <FiChevronLeft />
                        </button>

                        {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1
                        ).map((page) => (
                            <button
                                key={page}
                                className={`pagination-number ${currentPage === page ? "active" : ""
                                    }`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            className="pagination-btn"
                            disabled={currentPage === totalPages}
                            onClick={() =>
                                setCurrentPage((page) => page + 1)
                            }
                            aria-label="Next page"
                        >
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserDetails;
