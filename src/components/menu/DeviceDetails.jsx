import React, { useMemo, useState } from "react";
import {
    FiShield,
    FiSearch,
    FiSmartphone,
    FiMonitor,
    FiMapPin,
    FiEye,
    FiSlash,
    FiChevronLeft,
    FiChevronRight,
    FiAlertTriangle,
    FiWifi,
    FiX,
} from "react-icons/fi";

import "./DeviceDetails.css";

const ITEMS_PER_PAGE = 6;

const initialDevices = [
    {
        id: 1,
        employee: "Rahul Menon",
        employeeId: "PRO-104",
        department: "Senior Field Liaison",
        branch: "Kakkanad SEZ",
        device: "Samsung Galaxy S23 Ultra",
        platform: "Android 14",
        os: "Expense PRO Field v4.3.2 (Build 2026.10)",
        trust: 98,
        mac: "10.13.115.24.89",
        ip: "10.13.115.24.89",
        network: "Static ISP",
        geofence: "120m Kakkanad Lab",
        biometric: "PASS",
        session: "Active: Live Ping",
        status: "Trusted",
        risk: "Low",
        flagged: false,
        type: "Mobile",
    },
    {
        id: 2,
        employee: "Kavitha Nair",
        employeeId: "PRO-201",
        department: "Phlebotomist PRO",
        branch: "Kochi Central Lab",
        device: "Redmi Note 12 5G (Rooted)",
        platform: "Magisk Flag",
        os: "Out of Policy: Tampered Keystore",
        trust: 24,
        mac: "49.37.991.72",
        ip: "49.37.991.72",
        network: "VPN Anomaly",
        geofence: "4.8km Out of Range",
        biometric: "Hardware TEE Compromised",
        session: "Untrusted Session",
        status: "Untrusted",
        risk: "Critical",
        flagged: true,
        type: "Mobile",
    },
    {
        id: 3,
        employee: "Sijomon Varghese",
        employeeId: "PRO-042",
        department: "Dispatch Supervisor",
        branch: "Angamaly Hub",
        device: "Apple iPhone 14 Pro",
        platform: "iOS 17.2",
        os: "Expense PRO iOS v4.7.9 (Build 2026.04)",
        trust: 99,
        mac: "10.14.10.88",
        ip: "10.14.10.88",
        network: "Lab Mesh WPA3",
        geofence: "Angamaly Peripheral Floor 1",
        biometric: "Face ID: Enforced",
        session: "Active: 1m ago",
        status: "Trusted",
        risk: "Low",
        flagged: false,
        type: "Mobile",
    },
    {
        id: 4,
        employee: "Admin Controller - Dr. Mathew",
        employeeId: "ROOT-ADM",
        department: "Chief Pathology Auditor",
        branch: "Central HQ",
        device: "Lenovo ThinkPad T14 Gen 3",
        platform: "Windows 11 Ent",
        os: "Chrome 122.0 / Expense PRO Web Workstation",
        trust: 100,
        mac: "192.168.10.8",
        ip: "192.168.10.8",
        network: "Ethernet 0",
        geofence: "Hardware Token #4492-FIDO",
        biometric: "Session: 6 hrs 12 mins",
        session: "Live Webhook",
        status: "Trusted",
        risk: "Low",
        flagged: false,
        type: "Desktop",
    },
    {
        id: 5,
        employee: "Deepa Mohan",
        employeeId: "PRO-119",
        department: "Phlebotomist PRO",
        branch: "Kochi Central Lab",
        device: "OnePlus Nord CE 3",
        platform: "OxygenOS 14",
        os: "Expense PRO Field v4.8.2",
        trust: 95,
        mac: "157.49.201.3",
        ip: "157.49.201.3",
        network: "Jio 5G Cell",
        geofence: "Route Hub Marine Drive",
        biometric: "In-Display Biometrics: OK",
        session: "Active: 4 mins ago",
        status: "Trusted",
        risk: "Low",
        flagged: false,
        type: "Mobile",
    },
    {
        id: 6,
        employee: "Arun Kumar",
        employeeId: "PRO-118",
        department: "Dispatch Courier PRO",
        branch: "Kakkanad SEZ",
        device: "Google Pixel 7a",
        platform: "Android 14",
        os: "Expense PRO Field v4.8.2",
        trust: 97,
        mac: "10.13.115.24.91",
        ip: "10.13.115.24.91",
        network: "Wi-Fi",
        geofence: "450m Kakkanad SEZ",
        biometric: "Titan M2 Enclave: Valid",
        session: "Active: 8 mins ago",
        status: "Trusted",
        risk: "Low",
        flagged: false,
        type: "Mobile",
    },
    {
        id: 7,
        employee: "Anjali Thomas",
        employeeId: "PRO-125",
        department: "Laboratory Technician",
        branch: "Aluva Lab",
        device: "Samsung Galaxy A54",
        platform: "Android 13",
        os: "Expense PRO Field v4.8.2",
        trust: 89,
        mac: "10.20.15.42",
        ip: "10.20.15.42",
        network: "Lab Wi-Fi",
        geofence: "Aluva Lab",
        biometric: "Fingerprint: PASS",
        session: "Active: 12 mins ago",
        status: "Trusted",
        risk: "Low",
        flagged: false,
        type: "Mobile",
    },
    {
        id: 8,
        employee: "Nithin Raj",
        employeeId: "PRO-132",
        department: "Field Executive",
        branch: "Kochi Central Lab",
        device: "iPhone 13",
        platform: "iOS 17",
        os: "Expense PRO iOS v4.7.9",
        trust: 72,
        mac: "10.20.15.67",
        ip: "10.20.15.67",
        network: "Office Wi-Fi",
        geofence: "Kochi Central Lab",
        biometric: "Face ID: PASS",
        session: "Inactive: 2 days ago",
        status: "Trusted",
        risk: "Medium",
        flagged: false,
        type: "Mobile",
    },
];

function DeviceDetails() {
    const [devices, setDevices] = useState(initialDevices);

    const [search, setSearch] = useState("");
    const [platformFilter, setPlatformFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [branchFilter, setBranchFilter] = useState("All");
    const [flaggedOnly, setFlaggedOnly] = useState(false);
    const [sortBy, setSortBy] = useState("heartbeat");

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDevice, setSelectedDevice] = useState(null);

    const flaggedCount = devices.filter(
        (device) => device.flagged
    ).length;

    const filteredDevices = useMemo(() => {
        let result = devices.filter((device) => {
            const searchValue = search.toLowerCase();

            const matchesSearch =
                device.employee.toLowerCase().includes(searchValue) ||
                device.employeeId.toLowerCase().includes(searchValue) ||
                device.device.toLowerCase().includes(searchValue) ||
                device.ip.toLowerCase().includes(searchValue) ||
                device.mac.toLowerCase().includes(searchValue) ||
                device.branch.toLowerCase().includes(searchValue);

            const matchesPlatform =
                platformFilter === "All" ||
                device.platform.toLowerCase().includes(
                    platformFilter.toLowerCase()
                );

            const matchesStatus =
                statusFilter === "All" ||
                device.status === statusFilter;

            const matchesBranch =
                branchFilter === "All" ||
                device.branch === branchFilter;

            const matchesFlagged =
                !flaggedOnly || device.flagged;

            return (
                matchesSearch &&
                matchesPlatform &&
                matchesStatus &&
                matchesBranch &&
                matchesFlagged
            );
        });

        if (sortBy === "risk") {
            const riskOrder = {
                Critical: 0,
                Medium: 1,
                Low: 2,
            };

            result.sort(
                (a, b) => riskOrder[a.risk] - riskOrder[b.risk]
            );
        } else {
            result.sort((a, b) => a.id - b.id);
        }

        return result;
    }, [
        devices,
        search,
        platformFilter,
        statusFilter,
        branchFilter,
        flaggedOnly,
        sortBy,
    ]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredDevices.length / ITEMS_PER_PAGE)
    );

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const currentDevices = filteredDevices.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    const handleFilterChange = (setter) => (event) => {
        setter(event.target.value);
        setCurrentPage(1);
    };

    const handleFlaggedChange = (event) => {
        setFlaggedOnly(event.target.checked);
        setCurrentPage(1);
    };

    const handleRevoke = (deviceId) => {
        const device = devices.find((item) => item.id === deviceId);

        if (!device) return;

        const confirmed = window.confirm(
            `Revoke access for ${device.employee}'s device?`
        );

        if (!confirmed) return;

        setDevices((previous) =>
            previous.map((item) =>
                item.id === deviceId
                    ? {
                        ...item,
                        status: "Revoked",
                        session: "Access Revoked",
                        flagged: false,
                    }
                    : item
            )
        );
    };

    const handleQuarantine = (deviceId) => {
        const device = devices.find((item) => item.id === deviceId);

        if (!device) return;

        const confirmed = window.confirm(
            `Quarantine ${device.device}?`
        );

        if (!confirmed) return;

        setDevices((previous) =>
            previous.map((item) =>
                item.id === deviceId
                    ? {
                        ...item,
                        status: "Quarantined",
                        session: "Quarantined Session",
                        flagged: true,
                    }
                    : item
            )
        );
    };

    const handleTerminateFlagged = () => {
        if (flaggedCount === 0) {
            alert("There are no flagged devices.");
            return;
        }

        const confirmed = window.confirm(
            `Terminate access for ${flaggedCount} flagged device(s)?`
        );

        if (!confirmed) return;

        setDevices((previous) =>
            previous.map((item) =>
                item.flagged
                    ? {
                        ...item,
                        status: "Revoked",
                        session: "Access Terminated",
                        flagged: false,
                    }
                    : item
            )
        );
    };

    const handleExport = () => {
        const headers = [
            "Employee",
            "Employee ID",
            "Device",
            "Platform",
            "IP Address",
            "Branch",
            "Trust Score",
            "Status",
            "Risk",
        ];

        const rows = filteredDevices.map((device) => [
            device.employee,
            device.employeeId,
            device.device,
            device.platform,
            device.ip,
            device.branch,
            device.trust,
            device.status,
            device.risk,
        ]);

        const csv = [headers, ...rows]
            .map((row) =>
                row
                    .map((value) =>
                        `"${String(value).replace(/"/g, '""')}"`
                    )
                    .join(",")
            )
            .join("\n");

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "device-registry.csv";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => URL.revokeObjectURL(url), 1000);
    };

    const getTrustClass = (trust) => {
        if (trust < 50) return "trust-low";
        if (trust < 80) return "trust-medium";
        return "trust-high";
    };

    const getStatusClass = (status) => {
        if (status === "Trusted") return "status-trusted";
        if (status === "Untrusted") return "status-untrusted";
        if (status === "Quarantined") return "status-quarantined";
        return "status-revoked";
    };

    const getDeviceIcon = (type) => {
        return type === "Desktop" ? <FiMonitor /> : <FiSmartphone />;
    };

    return (
        <div className="device-container">

            {/* HEADER */}
            <div className="device-header">
                <div className="device-header-left">
                    <div className="device-header-icon">
                        <FiShield />
                    </div>

                    <div>
                        <div className="device-title-row">
                            <h2>Logged Devices &amp; Hardware Registry</h2>

                            <span className="device-total-badge">
                                {devices.length} Nodes Total
                            </span>
                        </div>

                        <p>
                            Remote cryptographic ledger, hardware TEE
                            integrity tokens, and live network telemetry.
                        </p>
                    </div>
                </div>

                <button
                    className="terminate-btn"
                    onClick={handleTerminateFlagged}
                >
                    <FiSlash />
                    Terminate Flagged ({flaggedCount})
                </button>
            </div>

            {/* FILTERS */}
            <div className="device-filter-panel">

                <div className="device-search">
                    <FiSearch />

                    <input
                        type="text"
                        placeholder="Search device model, MAC, IP address, OS, UUID, or hardware..."
                        value={search}
                        onChange={handleFilterChange(setSearch)}
                    />
                </div>

                <select
                    className="device-select"
                    value={platformFilter}
                    onChange={handleFilterChange(setPlatformFilter)}
                >
                    <option value="All">All Platforms</option>
                    <option value="Android">Android</option>
                    <option value="iOS">iOS</option>
                    <option value="Windows">Windows</option>
                </select>

                <select
                    className="device-select"
                    value={statusFilter}
                    onChange={handleFilterChange(setStatusFilter)}
                >
                    <option value="All">Compliance: All Statuses</option>
                    <option value="Trusted">Trusted</option>
                    <option value="Untrusted">Untrusted</option>
                    <option value="Quarantined">Quarantined</option>
                    <option value="Revoked">Revoked</option>
                </select>

                <select
                    className="device-select"
                    value={branchFilter}
                    onChange={handleFilterChange(setBranchFilter)}
                >
                    <option value="All">All Laboratory Hubs</option>
                    <option value="Kakkanad SEZ">Kakkanad SEZ</option>
                    <option value="Kochi Central Lab">Kochi Central Lab</option>
                    <option value="Angamaly Hub">Angamaly Hub</option>
                    <option value="Central HQ">Central HQ</option>
                    <option value="Aluva Lab">Aluva Lab</option>
                </select>

                <label className="flagged-filter">
                    <input
                        type="checkbox"
                        checked={flaggedOnly}
                        onChange={handleFlaggedChange}
                    />
                    Flagged Only
                </label>
            </div>

            {/* LIST HEADER */}
            <div className="device-list-header">
                <span>
                    SYNCHRONIZED NODES ({filteredDevices.length} DISPLAYED)
                </span>

                <div className="device-sort">
                    <label htmlFor="device-sort">Sort by:</label>

                    <select
                        id="device-sort"
                        value={sortBy}
                        onChange={(event) => setSortBy(event.target.value)}
                    >
                        <option value="heartbeat">Latest Heartbeat</option>
                        <option value="risk">Risk Score</option>
                    </select>
                </div>
            </div>

            {/* DEVICE LIST */}
            <div className="device-list">
                {currentDevices.length > 0 ? (
                    currentDevices.map((device) => (
                        <div
                            className={`device-card ${device.flagged ? "device-card-flagged" : ""
                                }`}
                            key={device.id}
                        >
                            {/* TOP ROW */}
                            <div className="device-card-top">

                                {/* EMPLOYEE */}
                                <div className="device-employee">
                                    <div className="device-avatar">
                                        {device.employee
                                            .split(" ")
                                            .filter(Boolean)
                                            .slice(0, 2)
                                            .map((word) => word[0])
                                            .join("")
                                            .toUpperCase()}

                                        <span
                                            className={`device-online-dot ${device.status === "Trusted"
                                                ? "online"
                                                : "offline"
                                                }`}
                                        />
                                    </div>

                                    <div className="device-employee-info">
                                        <div className="device-employee-name">
                                            <h3>{device.employee}</h3>

                                            <span className="employee-id">
                                                {device.employeeId}
                                            </span>
                                        </div>

                                        <p>
                                            {device.department} • {device.branch}
                                        </p>
                                    </div>
                                </div>

                                {/* DEVICE NAME */}
                                <div className="device-model">
                                    <div className="device-model-icon">
                                        {getDeviceIcon(device.type)}
                                    </div>

                                    <div className="device-model-info">
                                        <div className="device-model-title">
                                            <h3>{device.device}</h3>

                                            <span className="platform-badge">
                                                {device.platform}
                                            </span>

                                            {device.flagged && (
                                                <span className="model-flag">
                                                    Magisk Flag
                                                </span>
                                            )}
                                        </div>

                                        <p>{device.os}</p>
                                    </div>
                                </div>

                                {/* TRUST SCORE */}
                                <div className={`trust-badge ${getTrustClass(device.trust)}`}>
                                    <FiShield />
                                    TRUST {device.trust}/100
                                </div>

                                {/* ACTIONS */}
                                <div className="device-actions">
                                    <button
                                        className="inspect-btn"
                                        onClick={() => setSelectedDevice(device)}
                                    >
                                        <FiEye />
                                        Inspect
                                    </button>

                                    {device.flagged ? (
                                        <button
                                            className="quarantine-btn"
                                            onClick={() =>
                                                handleQuarantine(device.id)
                                            }
                                        >
                                            <FiSlash />
                                            Quarantine
                                        </button>
                                    ) : (
                                        <button
                                            className="revoke-btn"
                                            onClick={() =>
                                                handleRevoke(device.id)
                                            }
                                        >
                                            <FiSlash />
                                            Revoke
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* BOTTOM TELEMETRY ROW */}
                            <div className="device-telemetry">

                                <div className="telemetry-item">
                                    <FiWifi />
                                    <span>
                                        IP: {device.ip} ({device.network})
                                    </span>
                                </div>

                                <div className="telemetry-item">
                                    <FiMapPin />
                                    <span>Geofence: {device.geofence}</span>
                                </div>

                                <div className="telemetry-item">
                                    <FiShield />
                                    <span>{device.biometric}</span>
                                </div>

                                <div className="telemetry-session">
                                    <span className="telemetry-live-dot" />
                                    {device.session}
                                </div>
                            </div>

                            {device.flagged && (
                                <div className="device-alert">
                                    <FiAlertTriangle />
                                    <span>
                                        Security warning: Device integrity
                                        verification failed.
                                    </span>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="device-empty">
                        <FiSmartphone />
                        <h3>No devices found</h3>
                        <p>Try changing your search or filter options.</p>
                    </div>
                )}
            </div>

            {/* PAGINATION */}
            {filteredDevices.length > 0 && (
                <div className="device-pagination">
                    <p>
                        Showing{" "}
                        <strong>{startIndex + 1}</strong> to{" "}
                        <strong>
                            {Math.min(
                                startIndex + ITEMS_PER_PAGE,
                                filteredDevices.length
                            )}
                        </strong>{" "}
                        of <strong>{filteredDevices.length}</strong> devices
                    </p>

                    <div className="device-pagination-controls">
                        <button
                            className="device-page-btn"
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage((page) => page - 1)
                            }
                        >
                            <FiChevronLeft />
                        </button>

                        {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1
                        ).map((page) => (
                            <button
                                key={page}
                                className={`device-page-number ${currentPage === page ? "active" : ""
                                    }`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            className="device-page-btn"
                            disabled={currentPage === totalPages}
                            onClick={() =>
                                setCurrentPage((page) => page + 1)
                            }
                        >
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
            )}

            {/* DEVICE INSPECT MODAL */}
            {selectedDevice && (
                <div
                    className="device-modal-overlay"
                    onClick={() => setSelectedDevice(null)}
                >
                    <div
                        className="device-modal"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="device-modal-header">
                            <div>
                                <h3>Device Inspection</h3>
                                <p>Hardware and security information</p>
                            </div>

                            <button
                                className="device-modal-close"
                                onClick={() => setSelectedDevice(null)}
                            >
                                <FiX />
                            </button>
                        </div>

                        <div className="device-modal-content">
                            <div className="modal-device-heading">
                                <div className="device-model-icon">
                                    {getDeviceIcon(selectedDevice.type)}
                                </div>

                                <div>
                                    <h3>{selectedDevice.device}</h3>
                                    <p>{selectedDevice.platform}</p>
                                </div>
                            </div>

                            <div className="modal-device-details">
                                <div>
                                    <span>Employee</span>
                                    <strong>{selectedDevice.employee}</strong>
                                </div>

                                <div>
                                    <span>Employee ID</span>
                                    <strong>{selectedDevice.employeeId}</strong>
                                </div>

                                <div>
                                    <span>Branch</span>
                                    <strong>{selectedDevice.branch}</strong>
                                </div>

                                <div>
                                    <span>IP Address</span>
                                    <strong>{selectedDevice.ip}</strong>
                                </div>

                                <div>
                                    <span>Network</span>
                                    <strong>{selectedDevice.network}</strong>
                                </div>

                                <div>
                                    <span>Geofence</span>
                                    <strong>{selectedDevice.geofence}</strong>
                                </div>

                                <div>
                                    <span>Biometric</span>
                                    <strong>{selectedDevice.biometric}</strong>
                                </div>

                                <div>
                                    <span>Trust Score</span>
                                    <strong>
                                        {selectedDevice.trust}/100
                                    </strong>
                                </div>

                                <div>
                                    <span>Compliance</span>
                                    <strong>{selectedDevice.status}</strong>
                                </div>
                            </div>
                        </div>

                        <div className="device-modal-footer">
                            <button
                                className="inspect-btn"
                                onClick={() => setSelectedDevice(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeviceDetails;
