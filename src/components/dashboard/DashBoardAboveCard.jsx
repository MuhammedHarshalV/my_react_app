import { useEffect, useState } from "react";
import DashBoardMiddleCard from "./DashBoardMiddleCard";
import "./DashBoardAboveCard.css";

import CenterLoader from "../common/CenterLoader";


function DashBoardAboveCard() {

    const [isLoading, setIsLoading] = useState(true);

    const [dashboardData, setDashboardData] = useState(null);
    const [startMonth, setStartMonth] = useState("");
    const [endMonth, setEndMonth] = useState("");

    const [showStartMonth, setShowStartMonth] = useState(false);
    const [showEndMonth, setShowEndMonth] = useState(false);

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
                            15,

                        FoodPercentage:
                            15,

                        MedicalPercentage:
                            20,
                        HotelPercentage: 20,
                        StationeryPercentage: 15, OtherPercentage: 15,
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
                        Operations & Expense Overview
                    </h1>

                    <p>
                        Real-time ledger reconciliation, field mobility, and clinic visit auditing
                    </p>

                </div>


                {/* RIGHT ACTIONS */}

                <div className="dashboard-actions">


                    <div className="audit-badge">

                        <span>
                            AUDIT OCTOBER
                        </span>

                        <strong>
                            {dashboardData.auditCount} Claims
                        </strong>

                    </div>

                    <div className="dashboard-month-filters">
                        {/* Start Month */}
                        <button
                            className="dashboard-filter-button"
                            type="button"
                            onClick={() => setShowStartMonth(true)}
                        >
                            <span className="filter-content">
                                <small>COMPARITIVE MONTH</small>
                                <strong>{startMonth || "Select month"}</strong>
                            </span>
                            <span className="filter-arrow">⌄</span>
                        </button>
                        <div className="audit-badge">V/S</div>
                        {/* End Month */}
                        <button
                            className="dashboard-filter-button"
                            type="button"
                            onClick={() => setShowEndMonth(true)}
                        >
                            <span className="filter-content">
                                <small>COMPARITIVE MONTH</small>
                                <strong>{endMonth || "Select month"}</strong>
                            </span>
                            <span className="filter-arrow">⌄</span>
                        </button>
                    </div>
                    {/* <button
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

                    </button> */}


                    {/* <button
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

                    </button> */}




                </div>

            </div>



            <DashBoardMiddleCard />
            <div style={{ height: "24px" }} />
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
                            TOTAL EXPENSE
                        </span>

                        <span className="status-badge">
                            OCTOBER
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
                                className="FuelTravel"
                                style={{ width: `${dashboardData.expense.fuelPercentage}%` }}
                            />

                            <div
                                className="FoodLunch"
                                style={{ width: `${dashboardData.expense.FoodPercentage}%` }}
                            />

                            <div
                                className="MedicalDemo"
                                style={{ width: `${dashboardData.expense.MedicalPercentage}%` }}
                            />

                            <div
                                className="HotelStay"
                                style={{ width: `${dashboardData.expense.HotelPercentage}%` }}
                            />

                            <div
                                className="Stationery"
                                style={{ width: `${dashboardData.expense.StationeryPercentage}%` }}
                            />

                            <div
                                className="Others"
                                style={{ width: `${dashboardData.expense.OtherPercentage}%` }}
                            />
                        </div>


                        <div className="expense-legend">

                            <span>
                                <i className="legend-dot fuel-dot" />
                                Fuel/Travel
                            </span>

                            <span>
                                <i className="legend-dot food-dot" />
                                Food&Lunch
                            </span>

                            <span>
                                <i className="legend-dot medical-dot" />
                                Medical Demo
                            </span>
                            <span>
                                <i className="legend-dot hotel-dot" />
                                Hotel/Stay
                            </span> <span>
                                <i className="legend-dot stationery-dot" />
                                Stationery
                            </span>
                            <span>
                                <i className="legend-dot other-dot" />
                                Others
                            </span>

                        </div>

                    </div>

                </div>


                {/* =================================
                    PERSONNEL CARD
                ================================== */}

                {/* <div className="overview-card personnel-card">

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
 */}

                {/* =================================
                    CLINICS CARD
                ================================== */}

                <div className="overview-card clinic-card">

                    <div className="card-header">

                        <span className="card-title">
                            TOTAL CLINICS VISITED
                        </span>

                        <span className="status-badge">
                            OCTOBER
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



            </div>

        </div>
    );
}


export default DashBoardAboveCard;