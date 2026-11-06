
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    FiShield,
    FiSearch,
    FiSmartphone,
    FiMonitor,
    FiSlash,
    FiChevronLeft,
    FiChevronRight, FiAlertTriangle,
    FiX,
} from "react-icons/fi";

import { getAllDevicesApi } from "../../services/api/menu_screen/allDeviceDetails";
import { removeDeviceApi } from "../../services/api/menu_screen/deviceRemoveApi";
import "./DeviceDetails.css";
import "./removeDevice.css";

const ITEMS_PER_PAGE = 5;

function DeviceDetails() {
    const [devices, setDevices] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalDevices, setTotalDevices] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showRevokeModal, setShowRevokeModal] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [revoking, setRevoking] = useState(false);
    const [reload, setReload] = useState(0);

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search.trim());
            setCurrentPage(1);
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);

    // Initial API call and reload when search/page changes
    useEffect(() => {
        let ignore = false;
        const fetchDevices = async () => {
            setLoading(true);
            setError("");

            // Remove old page/search results immediately
            setDevices([]);

            try {
                const result = await getAllDevicesApi({
                    search: debouncedSearch,
                    page: currentPage,
                    limit: ITEMS_PER_PAGE,
                });

                if (!result.success) {
                    throw new Error(
                        result.message || "Failed to fetch devices"
                    );
                }

                if (ignore) return;

                const deviceList = (result.data || []).map((item) => ({
                    id: item.id ?? item.device_id,
                    employee: item.user_name || "Unknown User",
                    employeeId: item.user_emp_id ?? "—",
                    department: item.user_designation || "—",
                    profilePhoto: item.profile_photo_url,
                    device: item.device_name || "Unknown Device",
                    deviceId: item.device_id || "",



                    type: item.type || "Mobile",
                }));

                setDevices(deviceList);
                setTotalDevices(
                    result.pagination?.total_devices ??
                    result.pagination?.total ??
                    deviceList.length
                );
                setTotalPages(
                    Math.max(
                        1,
                        result.pagination?.total_pages ?? 1
                    )
                );
            } catch (err) {
                if (!ignore) {
                    setDevices([]);
                    setTotalDevices(0);
                    setTotalPages(1);
                    setError(
                        err.message || "Unable to load devices"
                    );
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }



        fetchDevices();

        return () => {
            ignore = true;
        };
    }, [currentPage, debouncedSearch, reload]);

    const openRevokeModal = (device) => {
        setSelectedDevice(device);
        setShowRevokeModal(true);
    };

    const closeRevokeModal = () => {
        if (revoking) return;

        setShowRevokeModal(false);
        setSelectedDevice(null);
    };

    const handleRevoke = async () => {
        if (!selectedDevice) return;

        try {
            setRevoking(true);

            const result = await removeDeviceApi({
                DeviceID: selectedDevice.deviceId,
            });

            if (result.success) {

                toast.success("Device removed successfully!");

                setShowRevokeModal(false);
                setSelectedDevice(null);
            }


            if (devices.length === 1 && currentPage > 1) {
                setCurrentPage((page) => page - 1);
            } else {
                setReload((previous) => previous + 1);
            }
        } catch (error) {
            console.log("device removal failed");
        } finally {
            setRevoking(false);
        }
    };

    const getDeviceIcon = (type) =>
        type === "Desktop" ? <FiMonitor /> : <FiSmartphone />;

    return (
        <div className="device-container">
            <div className="device-header">
                <div className="device-header-left">
                    <div className="device-header-icon">
                        <FiShield />
                    </div>

                    <div className="device-title-row">
                        <h2>Logged Devices</h2>
                        <span className="device-total-badge">
                            {totalDevices} Total Devices
                        </span>
                    </div>
                </div>
            </div>

            <div className="device-filter-panel">
                <div className="device-search">
                    <FiSearch />
                    <input
                        type="text"
                        placeholder="Search Employee name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="device-list-header">
                <span>
                    SYNCHRONIZED DEVICES ({devices.length} DISPLAYED)
                </span>
            </div>

            {loading ? (
                <div className="device-empty">
                    <p>Loading devices...</p>
                </div>
            ) : error ? (
                <div className="device-empty">
                    <p>{error}</p>
                    <button
                        onClick={() => {
                            // Trigger a fresh request for the current page.
                            setCurrentPage((page) => page);
                            setDebouncedSearch((value) => value + " ");
                            setDebouncedSearch(debouncedSearch);
                        }}
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <div className="device-list">
                    {devices.length > 0 ? (
                        devices.map((device, index) => (
                            <div
                                className="device-card"
                                key={index}
                            >
                                <div className="device-card-top">
                                    <div className="device-employee">
                                        <div className="device-avatar">
                                            {device.profilePhoto ? (
                                                <img
                                                    src={device.profilePhoto}
                                                    alt={device.employee}
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = "none";
                                                        e.currentTarget.nextElementSibling.style.display = "flex";
                                                    }}
                                                />
                                            ) : null}

                                            <span
                                                className="device-avatar-fallback"
                                                style={{
                                                    display: device.profilePhoto ? "none" : "flex",
                                                }}
                                            >
                                                {device.employee
                                                    .split(" ")
                                                    .filter(Boolean)
                                                    .slice(0, 2)
                                                    .map((word) => word[0])
                                                    .join("")
                                                    .toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="device-employee-info">
                                            <div className="device-employee-name">
                                                <h3>{device.employee}</h3>
                                                <span className="employee-id">
                                                    PRO-ID {device.employeeId}
                                                </span>
                                            </div>

                                            <p>{device.department}</p>
                                        </div>
                                    </div>

                                    <div className="device-model">
                                        <div className="device-model-icon">
                                            {getDeviceIcon(device.type)}
                                        </div>

                                        <div className="device-model-info">
                                            <div className="device-model-title">
                                                <h3>{device.device}</h3>

                                            </div>
                                            <div className="device-employee-info">
                                                <div className="device-employee-name">

                                                    <span className="employee-id">
                                                        DEVICE-ID #{device.id}
                                                    </span>
                                                </div>


                                            </div>

                                        </div>

                                    </div>

                                    <div className="device-actions">
                                        <button
                                            className="revoke-btn"
                                            onClick={() => openRevokeModal(device)}
                                        >
                                            <FiSlash />
                                            Revoke
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="device-empty">
                            <FiSmartphone />
                            <h3>No devices found</h3>
                            <p>Try another search.</p>
                        </div>
                    )}
                </div>
            )}

            {!loading && !error && totalDevices > 0 && (
                <div className="device-pagination">
                    <p>
                        Showing{" "}
                        <strong>
                            {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                        </strong>{" "}
                        to{" "}
                        <strong>
                            {(currentPage - 1) * ITEMS_PER_PAGE +
                                devices.length}
                        </strong>{" "}
                        of <strong>{totalDevices}</strong> devices
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
            {showRevokeModal && selectedDevice && (
                <div
                    className="revoke-modal-overlay"
                    onClick={closeRevokeModal}
                >
                    <div
                        className="revoke-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="revoke-modal-header">
                            <div className="revoke-header-left">
                                <div className="revoke-header-icon">
                                    <FiShield />
                                </div>

                                <div>
                                    <h3>Revoke Device Access</h3>
                                    <span className="revoke-impact">
                                        High Impact
                                    </span>
                                    <p>Hardware Token Invalidation</p>
                                </div>
                            </div>

                            <button
                                className="revoke-close-btn"
                                onClick={closeRevokeModal}
                                disabled={revoking}
                            >
                                <FiX />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="revoke-modal-body">

                            {/* Warning */}
                            <div className="revoke-warning">
                                <FiAlertTriangle />

                                <p>
                                    Are you sure you want to remove this device?
                                    This will instantly terminate active sessions,
                                    invalidate cryptographic keys, and require
                                    employee re-authorization.
                                </p>
                            </div>

                            {/* Device details */}
                            <div className="revoke-device-section">
                                <h4>TARGET DEVICE SPECIFICATION</h4>

                                <div className="revoke-detail-row">
                                    <span>Device:</span>

                                    <strong>
                                        <FiSmartphone />
                                        {selectedDevice.device}
                                    </strong>
                                </div>

                                <div className="revoke-detail-row">
                                    <span>Device ID:</span>

                                    <strong>
                                        {selectedDevice.deviceId || "—"}
                                    </strong>
                                </div>

                                <div className="revoke-detail-row">
                                    <span>Assigned User:</span>

                                    <strong>
                                        {selectedDevice.employee}
                                        {selectedDevice.employeeId !== "—" &&
                                            ` (${selectedDevice.employeeId})`}
                                    </strong>
                                </div>

                                <div className="revoke-detail-row">
                                    <span>Trust Score:</span>

                                    <strong className="revoke-trust">
                                        Not available
                                    </strong>
                                </div>
                            </div>

                            {/* Revocation information */}
                            <div className="revoke-token">
                                <FiShield />

                                <span>
                                    Revocation action: Device access removal
                                </span>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="revoke-modal-footer">
                            <button
                                className="revoke-cancel-btn"
                                onClick={closeRevokeModal}
                                disabled={revoking}
                            >
                                No, Keep Device
                            </button>

                            <button
                                className="revoke-confirm-btn"
                                onClick={handleRevoke}
                                disabled={revoking}
                            >
                                <FiSlash />

                                {revoking
                                    ? "Removing..."
                                    : "Yes, Revoke Device"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeviceDetails;
