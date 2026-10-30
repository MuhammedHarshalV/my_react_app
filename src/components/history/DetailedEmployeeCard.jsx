
import React from "react";
import "./DetailedEmployeeCard.css";

const defaultEmployee = {
    id: 1,
    name: "Rahul Menon",
    employeeCode: "PRO-104",
    clearanceLevel: "CLEARANCE LVL 3",
    designation: "Senior Field Liaison",
    location: "Aluva Transit Corridor & NH Connectors",
    image: "",

    auditCompliance: 98.7,

    totalExpenseRaised: 148250,
    totalExpenseApproved: 142800,
    totalVouchers: 64,
    settlementRate: 96.3,

    clinicVisits: 184,
    healthcareNodes: 32,

    topMonth: "August 2026",
    topMonthVisits: 68,
    topMonthCleared: 48200,

    flaggedEntries: 4,

    vouchers: [
        {
            id: "#EXP-7721",
            category: "Reagents Delivery",
            icon: "⚗",
            date: "14 Aug 2026",
            facility: "Apex Clinical Labs",
            claimed: 4200,
            approved: 4200,
            status: "APPROVED",
            note: "",
        },
        {
            id: "#EXP-7740",
            category: "Doctor Lunch Engagement",
            icon: "🍴",
            date: "18 Aug 2026",
            facility: "Care Diagnostic Centre",
            claimed: 1850,
            approved: 1600,
            status: "CAP ADJUSTED",
            note: "Policy cap applied (-₹250)",
        },
        {
            id: "#EXP-7798",
            category: "STAT Courier Biopsy Sample",
            icon: "♧",
            date: "22 Aug 2026",
            facility: "Medicare Speciality Polyclinic",
            claimed: 950,
            approved: 950,
            status: "APPROVED",
            note: "",
        },
        {
            id: "#EXP-7815",
            category: "Fuel Allowance & NH Toll",
            icon: "⛽",
            date: "27 Aug 2026",
            facility: "Apex Clinical Labs Route",
            claimed: 2400,
            approved: 2400,
            status: "APPROVED",
            note: "Fastag OCR Cross-verified",
        },
    ],

    summary: {
        claimed: 9400,
        approved: 9150,
        disallowance: 250,
        auditorId: "AUD-91",
    },
};

const formatCurrency = (amount) => {
    return `₹ ${Number(amount || 0).toLocaleString("en-IN")}`;
};

const getInitials = (name = "") => {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
};

const DetailedEmployeeCard = ({
    employee = defaultEmployee,
    onViewDossier,
    onDownload,
    onViewReceipt,
}) => {

    const handleDossier = () => {
        if (onViewDossier) {
            onViewDossier(employee);
        }
    };

    const handleDownload = () => {
        if (onDownload) {
            onDownload(employee);
        } else {
            window.print();
        }
    };

    return (
        
        <section className="employee-audit-card">

            {/* =====================================
                EMPLOYEE PROFILE
            ===================================== */}

            <div className="employee-profile">

                <div className="employee-profile-image">

                    {employee.image ? (
                        <img
                            src={employee.image}
                            alt={employee.name}
                        />
                    ) : (
                        <div className="employee-avatar-placeholder">
                            {getInitials(employee.name)}
                        </div>
                    )}

                    <span className="employee-audited-label">
                        AUDITED
                    </span>

                </div>

                <div className="employee-profile-details">

                    <div className="employee-name-row">

                        <h2>{employee.name}</h2>

                        <span className="employee-code-badge">
                            {employee.employeeCode}
                        </span>

                        <span className="employee-clearance-badge">
                            {employee.clearanceLevel}
                        </span>

                    </div>

                    <p>
                        {employee.designation} • {employee.location}
                    </p>

                    <div className="employee-profile-actions">

                        <span className="employee-compliance-badge">
                            <span>♧</span>
                            Voucher Audit Compliance:{" "}
                            <strong>{employee.auditCompliance}%</strong>
                        </span>

                        <button
                            type="button"
                            onClick={handleDossier}
                            className="employee-dossier-button"
                        >
                            Full Personnel Dossier
                        </button>

                    </div>

                </div>

            </div>


            {/* =====================================
                SUMMARY CARDS
            ===================================== */}

            <div className="employee-summary-grid">

                <div className="employee-summary-card">

                    <div className="employee-summary-heading">
                        <span>TOTAL EXPENSE RAISED</span>
                        <span className="summary-icon">▤</span>
                    </div>

                    <strong className="summary-amount">
                        {formatCurrency(employee.totalExpenseRaised)}
                    </strong>

                    <small>
                        {employee.totalVouchers} Total Vouchers Submitted
                    </small>

                </div>


                <div className="employee-summary-card approved-summary">

                    <div className="employee-summary-heading">
                        <span>TOTAL EXPENSE APPROVED</span>
                        <span className="summary-icon">✓</span>
                    </div>

                    <strong className="summary-amount">
                        {formatCurrency(employee.totalExpenseApproved)}
                    </strong>

                    <small>
                        {employee.settlementRate}% Clearance Settlement Rate
                    </small>

                </div>


                <div className="employee-summary-card">

                    <div className="employee-summary-heading">
                        <span>CLINIC ENGAGEMENTS</span>
                        <span className="summary-icon">⊞</span>
                    </div>

                    <strong className="summary-amount">
                        {employee.clinicVisits} Visits
                    </strong>

                    <small>
                        Distributed Across {employee.healthcareNodes} Healthcare Nodes
                    </small>

                </div>


                <div className="employee-summary-card top-month-summary">

                    <div className="employee-summary-heading">
                        <span>TOP-PERFORMING MONTH</span>
                        <span className="summary-icon">☆</span>
                    </div>

                    <strong className="summary-amount">
                        {employee.topMonth}
                    </strong>

                    <small>
                        {employee.topMonthVisits} Clinic Visits •{" "}
                        {formatCurrency(employee.topMonthCleared)} Cleared
                    </small>

                </div>

            </div>








            {/* =====================================
                MONTHLY SUMMARY FOOTER
            ===================================== */}

            <div className="employee-month-summary">

                <div className="month-summary-title">
                    MONTH SUMMARY:
                </div>

                <div className="month-summary-item">
                    <span>Claimed:</span>
                    <strong>
                        {formatCurrency(employee.summary.claimed)}
                    </strong>
                </div>

                <div className="month-summary-item">
                    <span>Approved:</span>
                    <strong className="month-approved">
                        {formatCurrency(employee.summary.approved)}
                    </strong>
                </div>

                <div className="month-summary-item">
                    <span>Disallowance:</span>
                    <strong>
                        {formatCurrency(employee.summary.disallowance)}
                    </strong>
                </div>

                <div className="month-summary-auditor">
                    All digital vouchers signed by Field Auditor
                    <strong>#{employee.summary.auditorId}</strong>
                </div>

            </div>

        </section>
    );
};

export default DetailedEmployeeCard;
