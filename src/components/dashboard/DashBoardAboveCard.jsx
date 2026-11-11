import { useEffect, useState } from "react";
import DashBoardMiddleCard from "./DashBoardMiddleCard";
import "./DashBoardAboveCard.css";

import CenterLoader from "../common/CenterLoader";
import { getExpClinicApi } from "../../services/api/dashboard/getExpClinnicApi";


function DashBoardAboveCard() {

    const [isLoading, setIsLoading] = useState(true);

    const [expenseData, SetExpenseData] = useState(null);
    const currentDate = new Date();



    const [selectedMonth, setSelectedMonth] = useState(
        currentDate.getMonth()
    );

    const [selectedYear, setSelectedYear] = useState(
        currentDate.getFullYear()
    );



    const [startMonth, setStartMonth] = useState("");
    const [endMonth, setEndMonth] = useState(
        currentDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
        })
    );

    const [showStartMonth, setShowStartMonth] = useState(false);

    useEffect(() => {
        fetchDashboard();
    }, []);


    const fetchDashboard = async ({
        compareMonth = "",
        compareYear = "",
    } = {}) => {

        setIsLoading(true);

        try {
            const response = await getExpClinicApi(
                {
                    compareMonth,
                    compareYear,
                }
            );

            if (response?.success) {
                SetExpenseData(response);
            } else {
                console.log(response?.message);
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

    if (!expenseData) {

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
                            AUDIT {new Date().toLocaleString("en-US", { month: "long" }).toUpperCase()}

                        </span>



                    </div>
                    <div className="month-picker-container">

                        {/* Compare Month Button */}
                        <button
                            className="dashboard-filter-button"
                            type="button"
                            onClick={() => setShowStartMonth(!showStartMonth)}
                        >
                            <span className="filter-content">
                                <small>COMPARISON MONTH</small>
                                <strong>{startMonth || "Select month"}</strong>
                            </span>

                            <span className="filter-arrow">⌄</span>
                        </button>

                        {/* Month Picker Popup */}
                        {showStartMonth && (
                            <div className="custom-month-popup">

                                {/* Header */}
                                <div className="month-popup-header">
                                    {new Date(selectedYear, selectedMonth).toLocaleString(
                                        "en-US",
                                        { month: "long", year: "numeric" }
                                    )}
                                    <span>⌄</span>
                                </div>

                                {/* Year List */}
                                {/* Year List */}
                                <div className="month-year-list">
                                    {Array.from(
                                        { length: 20 },
                                        (_, index) => currentDate.getFullYear() - 10 + index
                                    ).map((year) => (
                                        <div
                                            key={year}
                                            className={`month-year-item ${selectedYear === year ? "active-year" : ""
                                                }`}
                                            onClick={() => setSelectedYear(year)}
                                        >
                                            {year}
                                        </div>
                                    ))}
                                </div>

                                {/* Month Grid */}
                                <div className="month-grid">
                                    {Array.from({ length: 12 }, (_, index) => {
                                        const monthName = new Date(
                                            2000,
                                            index
                                        ).toLocaleString("en-US", {
                                            month: "short",
                                        });

                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                className={`month-grid-item ${selectedMonth === index
                                                    ? "selected-month"
                                                    : ""
                                                    }`}
                                                onClick={() => {
                                                    setSelectedMonth(index);

                                                    const formatted = new Date(
                                                        selectedYear,
                                                        index
                                                    ).toLocaleString("en-US", {
                                                        month: "long",
                                                        year: "numeric",
                                                    });

                                                    setStartMonth(formatted);
                                                    setShowStartMonth(false);
                                                    fetchDashboard({
                                                        compareMonth: index + 1,
                                                        compareYear: selectedYear,
                                                    });
                                                }}
                                            >
                                                {monthName}
                                            </button>
                                        );
                                    })}
                                </div>

                            </div>
                        )}

                    </div>
                    <div className="dashboard-month-filters">

                        <div className="audit-badge">V/S</div>

                        {/* Current Month */}
                        <button
                            className="dashboard-filter-button"
                            type="button"
                            disabled
                        >
                            <span className="filter-content">
                                <small>CURRENT MONTH</small>
                                <strong>{endMonth}</strong>
                            </span>
                        </button>

                    </div>
                </div>

            </div>



            <DashBoardMiddleCard
                compareMonth={startMonth ? selectedMonth + 1 : ""}
                compareYear={startMonth ? selectedYear : ""}
            />
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
                        <span className="card-title">TOTAL EXPENSE</span>
                        <span className="status-badge">{endMonth}</span>
                    </div>

                    <div className="expense-value-row">
                        <strong className="main-value">
                            ₹ {expenseData?.totalExpense?.currentMonth ?? 0}
                        </strong>
                        <span className="currency-text">INR</span>
                    </div>

                    <div className="comparison-row">
                        <span>
                            {startMonth
                                ? new Date(selectedYear, selectedMonth).toLocaleString("en-US", {
                                    month: "long",
                                }) + " " + String(selectedYear).slice(-2)
                                : "Comparitive Month"
                            } : ₹ {expenseData?.totalExpense?.compareMonth ?? 0}
                        </span>
                    </div>

                    <div className="expense-bottom">
                        <div className="expense-label-row">
                            <span>
                                Fuel/Travel (
                                {expenseData?.fuelTravel ?? 0}
                                )
                            </span>

                            <span>
                                Food&Lunch (
                                {expenseData?.foodLunch ?? 0}
                                )
                            </span>
                        </div>

                        <div className="expense-progress">
                            <div
                                className="FuelTravel"
                                style={{
                                    width: `${expenseData?.totalExpense?.currentMonth > 0
                                        ? (expenseData.fuelTravel / expenseData.totalExpense.currentMonth) * 100
                                        : 0
                                        }%`
                                }}
                            />

                            <div
                                className="FoodLunch"
                                style={{
                                    width: `${expenseData?.totalExpense?.currentMonth > 0
                                        ? (expenseData.foodLunch / expenseData.totalExpense.currentMonth) * 100
                                        : 0
                                        }%`
                                }}
                            />

                            <div
                                className="MedicalDemo"
                                style={{
                                    width: `${expenseData?.totalExpense?.currentMonth > 0
                                        ? (expenseData.medicalDemo / expenseData.totalExpense.currentMonth) * 100
                                        : 0
                                        }%`
                                }}
                            />

                            <div
                                className="HotelStay"
                                style={{
                                    width: `${expenseData?.totalExpense?.currentMonth > 0
                                        ? (expenseData.hotelStay / expenseData.totalExpense.currentMonth) * 100
                                        : 0
                                        }%`
                                }}
                            />

                            <div
                                className="Stationery"
                                style={{
                                    width: `${expenseData?.totalExpense?.currentMonth > 0
                                        ? (expenseData.stationery / expenseData.totalExpense.currentMonth) * 100
                                        : 0
                                        }%`
                                }}
                            />

                            <div
                                className="Others"
                                style={{
                                    width: `${expenseData?.totalExpense?.currentMonth > 0
                                        ? (expenseData.others / expenseData.totalExpense.currentMonth) * 100
                                        : 0
                                        }%`
                                }}
                            />
                        </div>

                        <div className="expense-legend">
                            <span><i className="legend-dot fuel-dot" />Fuel/Travel</span>
                            <span><i className="legend-dot food-dot" />Food&Lunch</span>
                            <span><i className="legend-dot medical-dot" />Medical Demo</span>
                            <span><i className="legend-dot hotel-dot" />Hotel/Stay</span>
                            <span><i className="legend-dot stationery-dot" />Stationery</span>
                            <span><i className="legend-dot other-dot" />Others</span>
                        </div>
                    </div>
                </div>



                {/* =================================
                    CLINICS CARD
                ================================== */}

                <div className="overview-card clinic-card">
                    <div className="card-header">
                        <span className="card-title">TOTAL CLINICS VISITED</span>
                        <span className="status-badge">{endMonth}</span>
                    </div>

                    <div className="clinic-value">
                        <strong className="main-value">
                            {expenseData?.totalClinic?.currentMonth ?? 0}
                        </strong>

                        <span>Clinics visited</span>
                    </div>

                    <div className="comparison-row">
                        <span>
                            {startMonth
                                ? new Date(selectedYear, selectedMonth).toLocaleString("en-US", {
                                    month: "long",
                                }) + " " + String(selectedYear).slice(-2)
                                : "Comparitive Month"
                            } : ₹ {expenseData?.totalClinic?.compareMonth ?? 0}

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
                                ₹ {expenseData?.averageClaimPerVisit ?? 0}
                            </strong>
                        </div>
                    </div>
                </div>



            </div>

        </div>
    );
}


export default DashBoardAboveCard;