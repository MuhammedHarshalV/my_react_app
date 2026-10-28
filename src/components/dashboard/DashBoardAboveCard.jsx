import { useEffect, useState } from "react";

import "./DashBoardAboveCard.css";

import CenterLoader from "../common/CenterLoader";


function DashBoardAboveCard() {

    const [isLoading, setIsLoading] = useState(true);

    const [dashboardData, setDashboardData] = useState(null);


    useEffect(() => {
        fetchDashboard();
    }, []);


    const fetchDashboard = async () => {

        setIsLoading(true);

        try {

            /*
             * =====================================================
             * REPLACE THIS MOCK DATA WITH YOUR API CALL
             * =====================================================
             *
             * Example:
             *
             * const response = await getDashboardApi();
             *
             * if (response?.success === true) {
             *     setDashboardData(response.data);
             * }
             *
             */


            const response = {

                success: true,

                data: {

                    title:
                        "Operations & Expense Overview",

                    subtitle:
                        "Real-time ledger reconciliation, field mobility, and clinic visit auditing",


                    /* ================================
                       TOP FILTER DATA
                    ================================= */

                    auditCount: 26,

                    comparativeWindow:
                        "Oct 2026 vs Sep 2026",

                    operationalZone:
                        "Kochi Central Lab & All Nodes",


                    /* ================================
                       EXPENSE
                    ================================= */

                    expense: {

                        total:
                            "₹ 4,82,450",

                        currency:
                            "INR",

                        status:
                            "Budget Ok",

                        percentage:
                            "+12.4%",

                        comparison:
                            "vs Sep 2026 (₹ 4,29,100)",

                        fuelPercentage:
                            48,

                        clinicFoodPercentage:
                            32,

                        logisticsPercentage:
                            20,
                    },


                    /* ================================
                       PERSONNEL
                    ================================= */

                    personnel: {

                        active:
                            48,

                        total:
                            62,

                        label:
                            "PROs",

                        syncStatus:
                            "Live Sync",

                        techChange:
                            "+8 Techs",

                        comparison:
                            "(+16.7% vs last mo. 40 active)",

                        enRoute:
                            38,

                        atClinic:
                            6,

                        offline:
                            4,
                    },


                    /* ================================
                       CLINICS
                    ================================= */

                    clinics: {

                        visited:
                            342,

                        label:
                            "Clinics",

                        status:
                            "MTD Reach",

                        visitChange:
                            "+38 Visits",

                        comparison:
                            "(+12.5% vs Sep: 304 visits)",

                        averageClaim:
                            "₹ 1,410",

                        costChange:
                            "-3.2%",
                    },


                    /* ================================
                       APPROVALS
                    ================================= */

                    approvals: {

                        pendingAmount:
                            "₹ 64,800",

                        claims:
                            19,

                        status:
                            "Awaiting Auth",

                        pendingVouchers:
                            4,

                        pendingTime:
                            "> 48 hrs pending",
                    },
                },
            };


            /*
             * Simulating API delay.
             * Remove this when using actual API.
             */

            await new Promise(
                (resolve) =>
                    setTimeout(resolve, 600)
            );


            if (response?.success === true) {

                setDashboardData(
                    response.data
                );
            }

        } catch (error) {

            console.log(
                "Dashboard API Error:",
                error
            );

        } finally {

            setIsLoading(false);
        }
    };


    /* =========================================
       LOADING
    ========================================= */

    if (isLoading) {

        return (
            <div className="dashboard-home-loader">
                <CenterLoader />
            </div>
        );
    }


    /* =========================================
       NO DATA
    ========================================= */

    if (!dashboardData) {

        return (
            <div className="dashboard-no-data">
                No dashboard data available
            </div>
        );
    }


    return (

        <div className="dashboard-home">


            {/* =====================================
                TOP SECTION
            ====================================== */}

            <div className="dashboard-top-section">


                {/* LEFT TITLE */}

                <div className="dashboard-heading">

                    <h1>
                        {dashboardData.title}
                    </h1>

                    <p>
                        {dashboardData.subtitle}
                    </p>

                </div>


                {/* RIGHT ACTIONS */}

                <div className="dashboard-actions">


                    <div className="audit-badge">

                        <span>
                            AUDIT OCT
                        </span>

                        <strong>
                            +{dashboardData.auditCount}
                        </strong>

                    </div>


                    <button
                        className="dashboard-filter-button"
                        type="button"
                    >

                        <span className="filter-icon">
                            ▦
                        </span>

                        <span className="filter-content">

                            <small>
                                COMPARATIVE WINDOW
                            </small>

                            <strong>
                                {
                                    dashboardData
                                        .comparativeWindow
                                }
                            </strong>

                        </span>

                        <span className="filter-arrow">
                            ▾
                        </span>

                    </button>


                    <button
                        className="dashboard-filter-button zone-filter"
                        type="button"
                    >

                        <span className="filter-icon">
                            ▤
                        </span>

                        <span className="filter-content">

                            <small>
                                OPERATIONAL ZONE
                            </small>

                            <strong>
                                {
                                    dashboardData
                                        .operationalZone
                                }
                            </strong>

                        </span>

                        <span className="filter-arrow">
                            ▾
                        </span>

                    </button>


                    <button
                        className="export-button"
                        type="button"
                    >
                        ↓ Export Audit (PDF/XLS)
                    </button>


                    <button
                        className="new-expense-button"
                        type="button"
                    >
                        <span>⊕</span>

                        New Expense Claim
                    </button>

                </div>

            </div>


            {/* =====================================
                CARDS
            ====================================== */}

            <div className="dashboard-card-grid">


                {/* =================================
                    EXPENSE CARD
                ================================== */}

                <div className="overview-card expense-card">

                    <div className="card-header">

                        <span className="card-title">
                            TOTAL EXPENSE RUN RATE
                        </span>

                        <span className="status-badge">
                            {
                                dashboardData
                                    .expense
                                    .status
                            }
                        </span>

                    </div>


                    <div className="expense-value-row">

                        <strong className="main-value">
                            {
                                dashboardData
                                    .expense
                                    .total
                            }
                        </strong>

                        <span className="currency-text">
                            {
                                dashboardData
                                    .expense
                                    .currency
                            }
                        </span>

                    </div>


                    <div className="comparison-row">

                        <span className="positive-text">
                            ↗
                            {
                                dashboardData
                                    .expense
                                    .percentage
                            }
                        </span>

                        <span>
                            {
                                dashboardData
                                    .expense
                                    .comparison
                            }
                        </span>

                    </div>


                    <div className="expense-bottom">

                        <div className="expense-label-row">

                            <span>
                                Transit & Fuel (
                                {
                                    dashboardData
                                        .expense
                                        .fuelPercentage
                                }
                                %)
                            </span>

                            <span>
                                Clinic & Food (
                                {
                                    dashboardData
                                        .expense
                                        .clinicFoodPercentage
                                }
                                %)
                            </span>

                        </div>


                        <div className="expense-progress">

                            <div
                                className="progress-fuel"
                                style={{
                                    width:
                                        `${dashboardData.expense.fuelPercentage}%`,
                                }}
                            />

                            <div
                                className="progress-food"
                                style={{
                                    width:
                                        `${dashboardData.expense.clinicFoodPercentage}%`,
                                }}
                            />

                            <div
                                className="progress-logistics"
                                style={{
                                    width:
                                        `${dashboardData.expense.logisticsPercentage}%`,
                                }}
                            />

                        </div>


                        <div className="expense-legend">

                            <span>
                                <i className="legend-dot fuel-dot" />
                                Fuel
                            </span>

                            <span>
                                <i className="legend-dot food-dot" />
                                Clinic Tea
                            </span>

                            <span>
                                <i className="legend-dot logistics-dot" />
                                Logistics
                            </span>

                        </div>

                    </div>

                </div>


                {/* =================================
                    PERSONNEL CARD
                ================================== */}

                <div className="overview-card personnel-card">

                    <div className="card-header">

                        <span className="card-title">
                            ACTIVE SITE PERSONNEL
                        </span>

                        <span className="live-status">

                            <i />

                            {
                                dashboardData
                                    .personnel
                                    .syncStatus
                            }

                        </span>

                    </div>


                    <div className="personnel-value">

                        <strong className="main-value">
                            {
                                dashboardData
                                    .personnel
                                    .active
                            }
                        </strong>

                        <span>
                            /
                            {
                                dashboardData
                                    .personnel
                                    .total
                            }{" "}
                            {
                                dashboardData
                                    .personnel
                                    .label
                            }
                        </span>

                    </div>


                    <div className="comparison-row">

                        <span className="positive-text">
                            ♙
                            {
                                dashboardData
                                    .personnel
                                    .techChange
                            }
                        </span>

                        <span>
                            {
                                dashboardData
                                    .personnel
                                    .comparison
                            }
                        </span>

                    </div>


                    <div className="personnel-stats">

                        <div>

                            <span>
                                En Route
                            </span>

                            <strong>
                                {
                                    dashboardData
                                        .personnel
                                        .enRoute
                                }
                            </strong>

                        </div>


                        <div>

                            <span>
                                At Clinic
                            </span>

                            <strong className="red-text">
                                {
                                    dashboardData
                                        .personnel
                                        .atClinic
                                }
                            </strong>

                        </div>


                        <div>

                            <span>
                                Offline
                            </span>

                            <strong>
                                {
                                    dashboardData
                                        .personnel
                                        .offline
                                }
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================
                    CLINICS CARD
                ================================== */}

                <div className="overview-card clinic-card">

                    <div className="card-header">

                        <span className="card-title">
                            TOTAL CLINICS VISITED
                        </span>

                        <span className="status-badge blue-badge">
                            {
                                dashboardData
                                    .clinics
                                    .status
                            }
                        </span>

                    </div>


                    <div className="clinic-value">

                        <strong className="main-value">
                            {
                                dashboardData
                                    .clinics
                                    .visited
                            }
                        </strong>

                        <span>
                            {
                                dashboardData
                                    .clinics
                                    .label
                            }
                        </span>

                    </div>


                    <div className="comparison-row">

                        <span className="positive-text">
                            ♧
                            {
                                dashboardData
                                    .clinics
                                    .visitChange
                            }
                        </span>

                        <span>
                            {
                                dashboardData
                                    .clinics
                                    .comparison
                            }
                        </span>

                    </div>


                    <div className="clinic-bottom">

                        <div>

                            <span>
                                AVERAGE CLAIM /
                                <br />
                                VISIT
                            </span>

                            <strong>
                                {
                                    dashboardData
                                        .clinics
                                        .averageClaim
                                }
                            </strong>

                        </div>


                        <div>

                            <strong>
                                {
                                    dashboardData
                                        .clinics
                                        .costChange
                                }
                            </strong>

                            <span>
                                Cost/Stop
                            </span>

                        </div>

                    </div>

                </div>


                {/* =================================
                    APPROVAL CARD
                ================================== */}

                <div className="overview-card approval-card">

                    <div className="card-header">

                        <span className="card-title">
                            PENDING APPROVALS
                        </span>

                        <span className="claims-badge">

                            {
                                dashboardData
                                    .approvals
                                    .claims
                            } CLAIMS

                        </span>

                    </div>


                    <div className="approval-value">

                        <strong>
                            {
                                dashboardData
                                    .approvals
                                    .pendingAmount
                            }
                        </strong>

                        <span>
                            {
                                dashboardData
                                    .approvals
                                    .status
                            }
                        </span>

                    </div>


                    <div className="pending-warning">

                        <span>!</span>

                        {
                            dashboardData
                                .approvals
                                .pendingVouchers
                        }{" "}
                        vouchers{" "}
                        {
                            dashboardData
                                .approvals
                                .pendingTime
                        }

                    </div>


                    <button
                        className="quick-audit-button"
                        type="button"
                    >
                        ◎ Quick Audit All
                    </button>

                </div>

            </div>

        </div>
    );
}


export default DashBoardAboveCard;