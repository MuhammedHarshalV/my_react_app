import { useEffect, useState } from "react";
import { getExpenseComparisonApi } from "../../services/api/dashboard/getExpenseComparisonApi";
import "./DashBoardMiddleCard.css";

function DashBoardMiddleCard({
    compareMonth: selectedCompareMonth,
    compareYear: selectedCompareYear,
}) {

    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");


    const currentDate = new Date();

    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const previousMonthName = new Date(
        selectedCompareYear || currentYear,
        (selectedCompareMonth || (currentMonth === 1 ? 12 : currentMonth - 1)) - 1
    ).toLocaleString("en-US", {
        month: "short",
        year: "numeric",
    });

    const currentMonthName = currentDate.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
    });


    // Fetch API
    useEffect(() => {

        const fetchExpenseComparison = async () => {

            try {

                setIsLoading(true);
                setError("");

                const response = await getExpenseComparisonApi({
                    compareMonth: selectedCompareMonth || "",
                    compareYear: selectedCompareYear || "",
                });

                if (response?.success) {
                    setDashboardData(response);
                } else {
                    setError(response?.message || "Unable to fetch expense details");
                }


            } catch (error) {

                console.error("Expense comparison API error:", error);

                setError("Something went wrong while fetching expense details");

            } finally {

                setIsLoading(false);

            }
        };

        fetchExpenseComparison();

    }, [selectedCompareMonth, selectedCompareYear]);
    // Loading
    if (isLoading) {
        return (
            <section className="dashboard-middle-card">
                <div className="middle-card-loading">
                    Loading expense comparison...
                </div>
            </section>
        );
    }

    // Error / No data
    if (error || !dashboardData) {
        return (
            <section className="dashboard-middle-card">
                <div className="middle-card-loading">
                    {error || "No expense data available"}
                </div>
            </section>
        );
    }

    // API data
    const data = dashboardData;

    // Weekly chart data
    const weeklyExpenses = [
        {
            week: "W1 (1-7)",
            previous: Number(data.week1?.comparitiveMonth || 0),
            current: Number(data.week1?.currentMonth || 0),
        },
        {
            week: "W2 (8-14)",
            previous: Number(data.week2?.comparitiveMonth || 0),
            current: Number(data.week2?.currentMonth || 0),
        },
        {
            week: "W3 (15-21)",
            previous: Number(data.week3?.comparitiveMonth || 0),
            current: Number(data.week3?.currentMonth || 0),
        },
        {
            week: "W4 (22-31)",
            previous: Number(data.week4?.comparitiveMonth || 0),
            current: Number(data.week4?.currentMonth || 0),
        },
    ];

    // Expense category data
    const categoryItems = [
        {
            id: 1,
            icon: "🍔",
            title: "Food & Lunch",
            previous: Number(data.foodLunch?.comparitiveMonth || 0),
            current: Number(data.foodLunch?.currentMonth || 0),
        },
        {
            id: 2,
            icon: "⛽",
            title: "Fuel / Travel",
            previous: Number(data.fuelTravel?.comparitiveMonth || 0),
            current: Number(data.fuelTravel?.currentMonth || 0),
        },
        {
            id: 3,
            icon: "🏨",
            title: "Hotel / Stay",
            previous: Number(data.hotelStay?.comparitiveMonth || 0),
            current: Number(data.hotelStay?.currentMonth || 0),
        },
        {
            id: 4,
            icon: "📦",
            title: "Other Expenses",
            previous: Number(data.otherExpenses?.comparitiveMonth || 0),
            current: Number(data.otherExpenses?.currentMonth || 0),
        },
    ];

    // Dynamic chart maximum
    const highestValue = Math.max(
        ...weeklyExpenses.flatMap(item => [
            item.previous,
            item.current,
        ]),
        0
    );

    const chartMaxValue = highestValue > 0
        ? Math.ceil(highestValue / 4 / 100) * 100 * 4
        : 100;

    const getBarHeight = (value) => {
        return `${(value / chartMaxValue) * 100}%`;
    };

    // Currency format
    const formatAmount = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Calculate category variance
    const getVariance = (current, previous) => {

        const difference = current - previous;

        const percentage = previous > 0
            ? ((difference / previous) * 100).toFixed(1)
            : current > 0 ? "100" : "0";

        return {
            difference,
            percentage,
            type: difference > 0
                ? "increase"
                : difference < 0
                    ? "saving"
                    : "normal",
        };
    };



    return (

        <section className="dashboard-middle-card">

            {/* HEADER */}

            <div className="middle-card-header">

                <div className="middle-card-heading">

                    <div className="middle-title-row">

                        <h2>
                            Month-over-Month Expense Analysis
                        </h2>

                        <span className="middle-period-badge">
                            {currentMonthName} vs {previousMonthName}
                        </span>

                    </div>

                    <p>
                        Monthly expense comparison and weekly expenditure analysis.
                    </p>

                </div>

                {/* LEGEND */}

                <div className="middle-chart-legend">

                    <div className="middle-legend-item">
                        <span className="legend-box legend-current" />
                        <span>Current Month ({currentMonthName})</span>
                    </div>

                    <div className="middle-legend-item">
                        <span className="legend-box legend-previous" />
                        <span>Comparative Month ({previousMonthName})</span>
                    </div>

                </div>

            </div>

            {/* BODY */}

            <div className="middle-card-body">

                {/* WEEKLY CHART */}

                <div className="weekly-chart-card">

                    <div className="weekly-chart-header">

                        <h3>
                            Weekly Expense Comparison
                        </h3>

                        <span>Values in INR (₹)</span>

                    </div>

                    <div className="weekly-chart-area">

                        {/* Y AXIS */}

                        <div className="chart-y-axis">

                            {[4, 3, 2, 1, 0].map((value) => (
                                <span key={value}>
                                    {formatAmount(
                                        (chartMaxValue / 4) * value
                                    )}
                                </span>
                            ))}

                        </div>

                        {/* GRAPH */}

                        <div className="chart-content">

                            <div className="chart-grid-lines">
                                <div />
                                <div />
                                <div />
                                <div />
                                <div />
                            </div>

                            <div className="chart-bars">

                                {weeklyExpenses.map((item) => (

                                    <div
                                        className="chart-week"
                                        key={item.week}
                                    >

                                        <div className="week-bars">

                                            {/* PREVIOUS */}

                                            <div
                                                className="expense-bar previous-bar"
                                                style={{
                                                    height: getBarHeight(item.previous),
                                                }}
                                                title={`Previous: ${formatAmount(item.previous)}`}
                                            />

                                            {/* CURRENT */}

                                            <div
                                                className="expense-bar current-bar"
                                                style={{
                                                    height: getBarHeight(item.current),
                                                }}
                                                title={`Current: ${formatAmount(item.current)}`}
                                            />

                                        </div>

                                        <span className="week-label">
                                            {item.week}
                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

                {/* CATEGORY BREAKDOWN */}

                <div className="variance-section">

                    <h3>
                        Expense Category Breakdown
                    </h3>

                    <div className="variance-list">

                        {categoryItems.map((item) => {

                            const variance = getVariance(
                                item.current,
                                item.previous
                            );

                            return (

                                <div
                                    className="variance-item"
                                    key={item.id}
                                >

                                    <div className="variance-icon">
                                        {item.icon}
                                    </div>

                                    <div className="variance-info">

                                        <strong>
                                            {item.title}
                                        </strong>

                                        <span>
                                            Current: {formatAmount(item.current)}
                                            {" "}•{" "}
                                            Previous: {formatAmount(item.previous)}
                                        </span>

                                    </div>

                                    <div className="variance-value">

                                        <strong>
                                            {variance.difference > 0 ? "+" : ""}
                                            {formatAmount(variance.difference)}
                                        </strong>

                                        <span
                                            className={
                                                variance.type === "increase"
                                                    ? "variance-increase"
                                                    : variance.type === "saving"
                                                        ? "variance-saving"
                                                        : ""
                                            }
                                        >
                                            {variance.percentage}% MoM
                                        </span>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                </div>

            </div>

        </section>
    );
}

export default DashBoardMiddleCard;