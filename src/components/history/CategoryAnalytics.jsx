

import {
    FiCoffee,
    FiPackage,
    FiTruck,
    FiCircle,
    FiHome,
    FiPlusSquare,
} from "react-icons/fi";

import "./CategoryAnalytics.css";

export default function CategoryAnalytics() {
    const categories = [
        {
            title: "Food / Lunch Engagement",
            icon: <FiCoffee size={18} />,
            entries: 44,
            aggregate: "68,450",
            spender: "Sijomon Varghese (PRO-115)",
            spendAmount: "4,800",
            facility: "St. Jude Medical Laboratory & Scans",
            receipt: "Receipt #REST-9912 (Doctor Dinner)",
            date: "Oct 12, 2026",
            status: "Audit status: 100% Bill Verification",
            highlightAggregate: false,
        },
        {
            title: "Consumables & Reagents",
            icon: <FiPackage size={18} />,
            entries: 58,
            aggregate: "1,84,300",
            spender: "Kavitha Nair (PRO-112)",
            spendAmount: "18,500",
            facility: "Apex Clinical Labs Kochi",
            receipt: "Batch Vacutainer Gel Tubes #VAC-44",
            date: "Oct 20, 2026",
            status: "Bulk inventory invoices attached",
            highlightAggregate: true,
        },
        {
            title: "STAT Courier Transit",
            icon: <FiTruck size={18} />,
            entries: 82,
            aggregate: "42,900",
            spender: "Rahul Menon (PRO-104)",
            spendAmount: "2,450",
            facility: "Medicare Speciality Polyclinic",
            receipt: "Cryo-box Biopsy Temperature Transit",
            date: "Oct 15, 2026",
            status: "Average transit duration: 34 mins",
            highlightAggregate: false,
        },
        {
            title: "Fuel & Vehicle Transit",
            icon: <FiTruck size={18} />,
            entries: 110,
            aggregate: "96,200",
            spender: "Arun Kumar (PRO-102)",
            spendAmount: "3,600",
            facility: "Lisie Specialty Diagnostic Centre",
            receipt: "Long-haul Inter-district Specimen Route",
            date: "Oct 08, 2026",
            status: "Odometer verification: Verified 100%",
            highlightAggregate: false,
        },
        {
            title: "Toll & Parking Charges",
            icon: <FiCircle size={18} />,
            entries: 94,
            aggregate: "16,800",
            spender: "Deepa Mohan (PRO-108)",
            spendAmount: "850",
            facility: "Aluva Central Medical Lab",
            receipt: "NH-66 Fastag Multi-toll pass",
            date: "Oct 19, 2026",
            status: "Automated Fastag API matched",
            highlightAggregate: false,
        },
        {
            title: "Accommodation & Per Diem",
            icon: <FiHome size={18} />,
            entries: 16,
            aggregate: "54,000",
            spender: "Meera Pillai (PRO-120)",
            spendAmount: "6,200",
            facility: "Ernakulam North Diagnostics",
            receipt: "District Audit 2-Day Residency Lodge",
            date: "Oct 04, 2026",
            status: "Corporate Travel Rate Approved",
            highlightAggregate: false,
        },
    ];

    return (
        <div className="analytics-container">

            {/* HEADER */}

            <header className="analytics-header">

                <div className="header-left">

                    <div className="forensic-badge">
                        FORENSIC
                        <br />
                        MATRIX
                    </div>

                    <div className="header-text">
                        <h2>
                            Comprehensive Category-Wise Deep-Dive
                            Analytics
                        </h2>

                        <p>
                            Dissection of 6 statutory expense codes
                            highlighting top spenders, facilities,
                            and peak transaction records.
                        </p>
                    </div>

                </div>

                <div className="header-right">

                    <span className="total-label">
                        Total
                        <br />
                        Classified:
                    </span>

                    <span className="total-amount">
                        ₹ 4,62,650
                    </span>

                </div>

            </header>


            {/* CATEGORY GRID */}

            <div className="analytics-grid">

                {categories.map((cat) => (

                    <div className="expense-card" key={cat.title}>

                        {/* CARD HEADER */}

                        <div className="card-top">

                            <div className="card-title-group">

                                <span className="category-icon">
                                    {cat.icon}
                                </span>

                                <h3 className="card-title">
                                    {cat.title}
                                </h3>

                            </div>

                            <span className="entries-badge">
                                {cat.entries} Entries
                            </span>

                        </div>


                        {/* AGGREGATE */}

                        <div className="aggregate-section">

                            <span className="section-label">
                                AGGREGATE ALLOCATION
                            </span>

                            <span
                                className={`aggregate-amount ${cat.highlightAggregate
                                        ? "text-primary"
                                        : ""
                                    }`}
                            >
                                ₹ {cat.aggregate}
                            </span>

                        </div>


                        {/* HIGHEST EXPENSE */}

                        <div className="highest-expense-block">

                            <span className="highlight-label text-primary">
                                HIGHEST SINGLE EXPENSE
                            </span>

                            <div className="spender-row">

                                <span className="spender-name">
                                    {cat.spender}
                                </span>

                                <span className="spender-amount text-primary">
                                    ₹ {cat.spendAmount}
                                </span>

                            </div>

                            <div className="facility-row">

                                <FiPlusSquare
                                    size={13}
                                    className="facility-icon"
                                />

                                <span className="facility-name">
                                    {cat.facility}
                                </span>

                            </div>

                            <div className="receipt-row">

                                <span className="receipt-text">
                                    {cat.receipt}
                                </span>

                                <span className="receipt-date">
                                    {cat.date}
                                </span>

                            </div>

                        </div>


                        {/* FOOTER */}

                        <div className="card-footer">

                            <span className="status-text">
                                {cat.status}
                            </span>

                            <button
                                type="button"
                                className="view-slips-btn text-primary"
                                onClick={() => {
                                    console.log(
                                        "View slips:",
                                        cat.title
                                    );
                                }}
                            >
                                View {cat.entries} Slips
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}
