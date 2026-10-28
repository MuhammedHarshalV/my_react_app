import "./DashBoardMiddleCard.css";


function DashBoardMiddleCard() {

    /* =========================================
       TEMP DATA

       Replace with API response later
    ========================================= */

    const data = {

        title:
            "Month-over-Month Expense & Field Activity Analysis",

        subtitle:
            "Aggregated expenditure cadence, diagnostic transit volume, and unit-cost variance benchmarks.",

        period:
            "Oct 2026 vs Sep 2026",

        currentMonth:
            "Current Month (Oct)",

        previousMonth:
            "Previous Month (Sep)",


        /* =====================================
           WEEKLY CHART
        ====================================== */

        weeklyExpenses: [
            {
                week: "W1 (1-7)",
                previous: 102,
                current: 120,
            },
            {
                week: "W2 (8-14)",
                previous: 112,
                current: 129,
            },
            {
                week: "W3 (15-21)",
                previous: 120,
                current: 142,
            },
            {
                week: "W4 (22-31)",
                previous: 110,
                current: 134,
            },
        ],


        /* =====================================
           AUDIT MESSAGE
        ====================================== */

        auditMessage:
            "Largest surge observed in Week 3 (+16.6%) due to intensive outer-hub specimen routing.",

        auditStatus:
            "AUDIT LOG VERIFIED",


        /* =====================================
           VARIANCE LIST
        ====================================== */

        varianceItems: [
            {
                id: 1,
                icon: "⌘",
                title: "Field Travel Mileage",
                comparison:
                    "Oct: 18,420 km • Sep: 15,900 km",
                value: "+2,520 km",
                variance: "+15.8% MoM",
                type: "increase",
            },

            {
                id: 2,
                icon: "▣",
                title: "Specimen Transit & Logistics",
                comparison:
                    "Oct: ₹1,12,000 • Sep: ₹98,500",
                value: "₹ 13,500",
                variance: "+13.7% MoM",
                type: "increase",
            },

            {
                id: 3,
                icon: "♜",
                title: "Daily Field DA & Food",
                comparison:
                    "Oct: ₹96,200 • Sep: ₹91,400",
                value: "₹ 4,800",
                variance: "+5.2% MoM",
                type: "normal",
            },

            {
                id: 4,
                icon: "▱",
                title: "Lodging & Overnight Stays",
                comparison:
                    "Oct: ₹45,000 • Sep: ₹52,000",
                value: "-₹ 7,000",
                variance: "-13.5% Saved",
                type: "saving",
            },
        ],
    };


    /* =========================================
       CHART MAX VALUE

       Screenshot graph = 150k maximum
    ========================================= */

    const chartMaxValue = 150;


    const getBarHeight = (value) => {

        const percentage =
            (value / chartMaxValue) * 100;

        return `${Math.min(
            percentage,
            100
        )}%`;
    };


    return (

        <section className="dashboard-middle-card">


            {/* =====================================
                HEADER
            ====================================== */}

            <div className="middle-card-header">


                {/* LEFT */}

                <div className="middle-card-heading">

                    <div className="middle-title-row">

                        <h2>
                            {data.title}
                        </h2>

                        <span className="middle-period-badge">
                            {data.period}
                        </span>

                    </div>


                    <p>
                        {data.subtitle}
                    </p>

                </div>


                {/* LEGEND */}

                <div className="middle-chart-legend">

                    <div className="middle-legend-item">

                        <span className="legend-box legend-current" />

                        <span>
                            {data.currentMonth}
                        </span>

                    </div>


                    <div className="middle-legend-item">

                        <span className="legend-box legend-previous" />

                        <span>
                            {data.previousMonth}
                        </span>

                    </div>

                </div>

            </div>


            {/* =====================================
                BODY
            ====================================== */}

            <div className="middle-card-body">


                {/* =================================
                    LEFT CHART SECTION
                ================================== */}

                <div className="weekly-chart-card">


                    {/* CHART HEADER */}

                    <div className="weekly-chart-header">

                        <h3>
                            Weekly Expense Run Rate Comparison
                        </h3>

                        <span>
                            Values in INR (Thousands)
                        </span>

                    </div>


                    {/* =================================
                        GRAPH
                    ================================== */}

                    <div className="weekly-chart-area">


                        {/* Y AXIS */}

                        <div className="chart-y-axis">

                            <span>
                                150k
                            </span>

                            <span>
                                100k
                            </span>

                            <span>
                                50k
                            </span>

                            <span>
                                0
                            </span>

                        </div>


                        {/* GRAPH */}

                        <div className="chart-content">


                            {/* GRID LINES */}

                            <div className="chart-grid-lines">

                                <div />
                                <div />
                                <div />
                                <div />

                            </div>


                            {/* BARS */}

                            <div className="chart-bars">

                                {data.weeklyExpenses.map(
                                    (item) => (

                                        <div
                                            className="chart-week"
                                            key={item.week}
                                        >

                                            <div className="week-bars">

                                                {/* PREVIOUS */}

                                                <div
                                                    className="expense-bar previous-bar"
                                                    style={{
                                                        height:
                                                            getBarHeight(
                                                                item.previous
                                                            ),
                                                    }}
                                                    title={`Previous: ₹${item.previous}k`}
                                                />


                                                {/* CURRENT */}

                                                <div
                                                    className="expense-bar current-bar"
                                                    style={{
                                                        height:
                                                            getBarHeight(
                                                                item.current
                                                            ),
                                                    }}
                                                    title={`Current: ₹${item.current}k`}
                                                />

                                            </div>


                                            <span className="week-label">
                                                {item.week}
                                            </span>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    </div>


                    {/* =================================
                        AUDIT INFO
                    ================================== */}

                    <div className="chart-audit-info">

                        <div className="audit-info-message">

                            <span className="audit-info-icon">
                                ⓘ
                            </span>

                            <span>
                                {data.auditMessage}
                            </span>

                        </div>


                        <strong className="audit-verified">

                            {data.auditStatus}

                        </strong>

                    </div>

                </div>


                {/* =================================
                    RIGHT SIDE
                ================================== */}

                <div className="variance-section">

                    <h3>
                        Sub-Ledger Variance Breakdown
                    </h3>


                    <div className="variance-list">

                        {data.varianceItems.map(
                            (item) => (

                                <div
                                    className="variance-item"
                                    key={item.id}
                                >

                                    {/* ICON */}

                                    <div
                                        className={`variance-icon ${item.type === "increase"
                                                ? "variance-icon-red"
                                                : ""
                                            }`}
                                    >
                                        {item.icon}
                                    </div>


                                    {/* INFORMATION */}

                                    <div className="variance-info">

                                        <strong>
                                            {item.title}
                                        </strong>

                                        <span>
                                            {item.comparison}
                                        </span>

                                    </div>


                                    {/* VALUE */}

                                    <div className="variance-value">

                                        <strong>
                                            {item.value}
                                        </strong>

                                        <span
                                            className={
                                                item.type === "increase"
                                                    ? "variance-increase"
                                                    : item.type === "saving"
                                                        ? "variance-saving"
                                                        : ""
                                            }
                                        >
                                            {item.variance}
                                        </span>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </div>

            </div>

        </section>
    );
}


export default DashBoardMiddleCard;