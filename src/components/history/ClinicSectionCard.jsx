
import React from "react";
import "./ClinicSectionCard.css";

const defaultClinic = {
    name: "Care Diagnostic Centre & Imaging",
    code: "CLN-3340",
    address: "Infopark Expressway, Kakkanad, Kochi",
    latitude: "10.0159",
    longitude: "76.3419",
    radius: "150m",
    geoFenceActive: true,

    heroImage: "",

    heroTitle: "Diagnostic Wing Alpha",
    heroSubtitle: "Primary Sample Consolidation Center",

    cumulativeSpend: 312450,
    quarters: 8,

    fieldVisits: 142,
    averageVisits: 11.8,

    assignedCount: 8,
    activeRoster: true,

    personnel: [
        {
            id: 1,
            name: "Rahul Menon",
            code: "PRO-104",
            image: "",
        },
        {
            id: 2,
            name: "Kavitha Nair",
            code: "PRO-112",
            image: "",
        },
        {
            id: 3,
            name: "Arun Kumar",
            code: "PRO-102",
            image: "",
        },
        {
            id: 4,
            name: "Sijomon Varghese",
            code: "PRO-115",
            image: "",
        },
        {
            id: 5,
            name: "Deepa Mohan",
            code: "PRO-108",
            image: "",
        },
    ],

    primaryHandlers:
        "Rahul Menon (PRO-104), Kavitha Nair (PRO-112), Arun Kumar (PRO-102)",

    visitVelocity: [
        { month: "JAN", visits: 8 },
        { month: "FEB", visits: 10 },
        { month: "MAR", visits: 9 },
        { month: "APR", visits: 13 },
        { month: "MAY", visits: 12 },
        { month: "JUN", visits: 15 },
        { month: "JUL", visits: 14 },
        { month: "AUG", visits: 18 },
        { month: "SEP", visits: 17 },
        { month: "OCT", visits: 18 },
        { month: "NOV", visits: 16 },
        { month: "DEC", visits: 17 },
    ],

    peakMonth: "Aug",
    peakVisits: 24,

    fieldLogs: [
        {
            id: 1,
            day: "28",
            month: "OCT",
            title: "Doctor Engagement & Protocol Signoff",
            description:
                "Logged by Rahul Menon (PRO-104) • Dr. Thomas Mathew (Chief Biochemist)",
            gps: "GPS MATCHED (12M)",
            amount: 1850,
        },
        {
            id: 2,
            day: "24",
            month: "OCT",
            title: "STAT Serum Batch Pickup",
            description:
                "Logged by Kavitha Nair (PRO-112) • 3 Cryo-boxes dispatched to Central Lab",
            gps: "GPS MATCHED (5M)",
            amount: 940,
        },
        {
            id: 3,
            day: "19",
            month: "OCT",
            title: "Histopathology Slide Handover & Supplies Check",
            description:
                "Logged by Arun Kumar (PRO-102) • Supply replenishments acknowledged",
            gps: "GPS MATCHED (18M)",
            amount: 2100,
        },
    ],
};

const formatCurrency = (amount) =>
    `₹ ${Number(amount || 0).toLocaleString("en-IN")}`;

const getInitials = (name = "") =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();


/* =========================================
   VISIT VELOCITY CHART
========================================= */

function VisitVelocityChart({ data = [], peakMonth }) {
    const width = 600;
    const height = 100;
    const padding = 8;

    const maxValue = Math.max(
        20,
        ...data.map((item) => Number(item.visits || 0))
    );

    const points = data.map((item, index) => {
        const x =
            padding +
            (index * (width - padding * 2)) /
            Math.max(data.length - 1, 1);

        const y =
            height -
            padding -
            (Number(item.visits || 0) / maxValue) *
            (height - padding * 2);

        return { ...item, x, y };
    });

    const path = points
        .map((point, index) =>
            `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
        )
        .join(" ");

    const peakPoint = points.find(
        (point) =>
            point.month.toLowerCase() === peakMonth?.toLowerCase()
    );

    return (
        <div className="clinic-velocity-card">

            <div className="clinic-velocity-heading">
                <h3>Monthly Visit Velocity (2026)</h3>

                <small>
                    Peak: {peakMonth} ({peakPoint?.visits || 0} Visits)
                </small>
            </div>

            <div className="clinic-chart-area">

                <svg
                    className="clinic-velocity-svg"
                    viewBox={`0 0 ${width} ${height}`}
                    preserveAspectRatio="none"
                    role="img"
                    aria-label="Monthly clinic visit velocity chart"
                >
                    <line
                        x1="8"
                        y1="50"
                        x2={width - 8}
                        y2="50"
                        className="clinic-chart-grid-line"
                    />

                    <line
                        x1="8"
                        y1="82"
                        x2={width - 8}
                        y2="82"
                        className="clinic-chart-grid-line"
                    />

                    <path
                        d={path}
                        className="clinic-chart-line"
                    />

                    {points.map((point) => (
                        <circle
                            key={point.month}
                            cx={point.x}
                            cy={point.y}
                            r={point.month === peakMonth ? 4 : 0}
                            className="clinic-chart-point"
                        />
                    ))}
                </svg>

            </div>

            <div className="clinic-chart-months">
                {data.map((item) => (
                    <span
                        key={item.month}
                        className={
                            item.month.toLowerCase() ===
                                peakMonth?.toLowerCase()
                                ? "active"
                                : ""
                        }
                    >
                        {item.month}
                    </span>
                ))}
            </div>

        </div>
    );
}


/* =========================================
   MAIN CLINIC CARD
========================================= */

function ClinicSectionCard({
    clinic = defaultClinic,
    onViewHistory,
    onViewPersonnel,
    onViewFieldLog,
}) {
    const visiblePersonnel = clinic.personnel?.slice(0, 5) || [];
    const extraPersonnel = Math.max(
        0,
        (clinic.assignedCount || 0) - visiblePersonnel.length
    );

    return (
        <section className="clinic-section-card">

            {/* =====================================
                CLINIC HEADER
            ===================================== */}

            <div className="clinic-section-header">

                <div className="clinic-section-title">

                    <div className="clinic-title-row">

                        <span className="clinic-inspection-label">
                            FACILITY INSPECTION
                        </span>

                        <h2>{clinic.name}</h2>

                        <small>#{clinic.code}</small>

                    </div>

                    <p>
                        {clinic.address} • GPS Coordinates:{" "}
                        {clinic.latitude}° N, {clinic.longitude}° E
                        {" "}(Radius: {clinic.radius} Geo-fenced)
                    </p>

                </div>

                <div className="clinic-header-actions">

                    <span
                        className={`clinic-geofence-badge ${clinic.geoFenceActive ? "active" : "inactive"
                            }`}
                    >
                        <span>⌖</span>
                        {clinic.geoFenceActive
                            ? "Geo-Fence Active"
                            : "Geo-Fence Inactive"}
                    </span>

                    <button
                        type="button"
                        className="clinic-history-button"
                        onClick={() => onViewHistory?.(clinic)}
                    >
                        Facility Ledger History
                    </button>

                </div>

            </div>


            {/* =====================================
                HERO IMAGE
            ===================================== */}

            <div className="clinic-hero">

                {clinic.heroImage ? (
                    <img
                        src={clinic.heroImage}
                        alt={clinic.name}
                    />
                ) : (
                    <div className="clinic-hero-placeholder">
                        <span>⌂</span>
                        <strong>{clinic.name}</strong>
                    </div>
                )}

                <div className="clinic-hero-caption">
                    <strong>{clinic.heroTitle}</strong>
                    <small>{clinic.heroSubtitle}</small>
                </div>

            </div>


            {/* =====================================
                CLINIC STATISTICS
            ===================================== */}

            <div className="clinic-stat-grid">

                <div className="clinic-stat-card">

                    <small>CUMULATIVE SPEND</small>

                    <strong className="clinic-spend-value">
                        {formatCurrency(clinic.cumulativeSpend)}
                    </strong>

                    <span>Across {clinic.quarters} quarters</span>

                </div>

                <div className="clinic-stat-card">

                    <small>FIELD VISITS</small>

                    <strong>
                        {clinic.fieldVisits} Logs
                    </strong>

                    <span>
                        Avg {clinic.averageVisits} visits/mo
                    </span>

                </div>

            </div>


            {/* =====================================
                ASSIGNED PERSONNEL
            ===================================== */}

            <div className="clinic-personnel-card">

                <div className="clinic-personnel-heading">

                    <strong>
                        {clinic.assignedCount} ASSIGNED PRO PERSONNEL
                    </strong>

                    <span className={clinic.activeRoster ? "roster-active" : "roster-inactive"}>
                        {clinic.activeRoster ? "Active Roster" : "Inactive Roster"}
                    </span>

                </div>

                <div className="clinic-personnel-list">

                    {visiblePersonnel.map((person) => (
                        <button
                            type="button"
                            key={person.id}
                            className="clinic-person-avatar"
                            title={`${person.name} (${person.code})`}
                            onClick={() => onViewPersonnel?.(person, clinic)}
                        >
                            {person.image ? (
                                <img
                                    src={person.image}
                                    alt={person.name}
                                />
                            ) : (
                                <span>{getInitials(person.name)}</span>
                            )}
                        </button>
                    ))}

                    {extraPersonnel > 0 && (
                        <button
                            type="button"
                            className="clinic-person-extra"
                            onClick={() => onViewPersonnel?.(null, clinic)}
                        >
                            +{extraPersonnel}
                        </button>
                    )}

                </div>

                <p>
                    Primary Handlers: {clinic.primaryHandlers}
                </p>

            </div>


            {/* =====================================
                MONTHLY VISIT CHART
            ===================================== */}

            <VisitVelocityChart
                data={clinic.visitVelocity}
                peakMonth={clinic.peakMonth}
            />




        </section>
    );
}

export default ClinicSectionCard;
