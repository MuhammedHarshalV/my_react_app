
import React, { useEffect, useMemo, useState } from "react";
import "./HistoricalAudit.css";

// --------------------------------------------------
// DUMMY DATA
// --------------------------------------------------

const dummyData = {
    employees: [
        { id: 1, name: "Rahul Menon", code: "PRO-104", location: "Aluva Hub", amount: 148250, status: "ACTIVE SELECTION", image: "" },
        { id: 2, name: "Kavitha Nair", code: "PRO-112", location: "Kochi North", amount: 184300, image: "" },
        { id: 3, name: "Sijomon Varghese", code: "PRO-115", location: "Angamaly", amount: 112600, image: "" },
        { id: 4, name: "Deepa Mohan", code: "PRO-108", location: "Tripunithura", amount: 89400, image: "" },
        { id: 5, name: "Arun Kumar", code: "PRO-102", location: "Kakkanad SEZ", amount: 132700, image: "" },
        { id: 6, name: "Meera Pillai", code: "PRO-120", location: "Central Kochi", amount: 98150, image: "" },
    ],

    clinics: [
        { id: 1, name: "Care Diagnostic Centre", code: "CLN-3340", location: "Kakkanad", visits: 142, amount: 312450, image: "" },
        { id: 2, name: "Apex Clinical Labs", code: "CLN-1092", location: "Ernakulam Town", visits: 168, amount: 284900, image: "" },
        { id: 3, name: "Medicare Speciality", code: "CLN-4011", location: "Aluva Bypass", visits: 95, amount: 174300, image: "" },
        { id: 4, name: "St. Jude Medical Lab", code: "CLN-2298", location: "Angamaly", visits: 112, amount: 198400, image: "" },
        { id: 5, name: "Lisie Specialty Centre", code: "CLN-5510", location: "Kaloor Junction", visits: 88, amount: 146800, image: "" },
    ],

    categories: [
        { id: 1, name: "Reagents & Consumables", icon: "⚗", vouchers: 58, amount: 184300 },
        { id: 2, name: "Fuel & Vehicle Transit", icon: "⛽", vouchers: 110, amount: 96200 },
        { id: 3, name: "Food / Lunch Engagement", icon: "🍴", vouchers: 44, amount: 68450 },
        { id: 4, name: "Per Diem & Lodging", icon: "▣", vouchers: 16, amount: 54000 },
        { id: 5, name: "STAT Courier Transit", icon: "♧", vouchers: 32, amount: 42900 },
        { id: 6, name: "Toll & Parking Passes", icon: "◉", vouchers: 94, amount: 16800 },
    ],
};

const formatCurrency = (amount) =>
    `₹ ${Number(amount || 0).toLocaleString("en-IN")}`;

// --------------------------------------------------
// API FUNCTION
// Replace the URL with your actual API endpoint.
// Expected response: { employees: [], clinics: [], categories: [] }
// --------------------------------------------------

const getHistoricalAuditData = async () => {
    const response = await fetch("/api/historical-audits");

    if (!response.ok) {
        throw new Error("Failed to fetch historical audit data");
    }

    return response.json();
};

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

const HistoricalAudit = () => {
    const [dashboardData, setDashboardData] = useState(dummyData);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [activePeriod, setActivePeriod] = useState("Last 30D");

    const [selectedEmployee, setSelectedEmployee] = useState(1);
    const [employeePage, setEmployeePage] = useState(0);
    const [clinicPage, setClinicPage] = useState(0);
    const [categoryPage, setCategoryPage] = useState(0);

    const [dateFrom, setDateFrom] = useState("2026-10-01");
    const [dateTo, setDateTo] = useState("2026-10-31");

    // Initial API call
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                const result = await getHistoricalAuditData();

                // Use dummy data for any missing or empty API sections.
                setDashboardData({
                    employees: result?.employees?.length
                        ? result.employees : dummyData.employees,

                    clinics: result?.clinics?.length
                        ? result.clinics : dummyData.clinics,

                    categories: result?.categories?.length
                        ? result.categories : dummyData.categories,
                });
            } catch (error) {
                console.error("Historical audit API error:", error);

                // API unavailable: show dummy data.
                setDashboardData(dummyData);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Search filtering
    const filterItems = (items) => {
        const query = search.toLowerCase().trim();

        if (!query) return items;

        return items.filter((item) =>
            `${item.name} ${item.code || ""} ${item.location || ""}`
                .toLowerCase()
                .includes(query)
        );
    };

    const employees = useMemo(
        () => filterItems(dashboardData.employees),
        [dashboardData.employees, search]
    );

    const clinics = useMemo(
        () => filterItems(dashboardData.clinics),
        [dashboardData.clinics, search]
    );

    const categories = useMemo(
        () => filterItems(dashboardData.categories),
        [dashboardData.categories, search]
    );

    const changePage = (setter, currentPage, totalItems) => {
        const totalPages = Math.ceil(totalItems / 6);

        setter(
            (currentPage + 1) % Math.max(totalPages, 1)
        );
    };

    const visibleEmployees = employees.slice(employeePage * 6, employeePage * 6 + 6);
    const visibleClinics = clinics.slice(clinicPage * 6, clinicPage * 6 + 6);
    const visibleCategories = categories.slice(categoryPage * 6, categoryPage * 6 + 6);

    const handlePrint = () => window.print();

    const handleExportExcel = () => {
        const rows = [
            ["Category", "Name", "Code", "Location", "Amount"],
            ...dashboardData.employees.map((item) => [
                "Employee", item.name, item.code, item.location, item.amount
            ]),
            ...dashboardData.clinics.map((item) => [
                "Clinic", item.name, item.code, item.location, item.amount
            ]),
            ...dashboardData.categories.map((item) => [
                "Expense", item.name, "", "", item.amount
            ]),
        ];

        const csv = rows
            .map((row) => row.map((value) =>
                `"${String(value ?? "").replace(/"/g, '""')}"`
            ).join(","))
            .join("\n");

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;"
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "historical-audit.csv";
        link.click();

        URL.revokeObjectURL(url);
    };

    const handleExportPDF = () => {
        window.print();
    };

    return (
        <div className="historical-audit-page">

            {/* PAGE HEADING */}
            <div className="history-heading">
                <div>
                    <div className="history-brand">
                        <span>AUDIT ENGINE</span>
                        <small>Historical Multi-Vector Telemetry</small>
                    </div>

                    <h1>Historical Audits &amp; Multi-Dimension Analytics</h1>

                    <p>
                        Cross-sectional expense trail across field personnel,
                        medical facilities, and clinical logistics ledgers.
                    </p>
                </div>

               
            </div>

            {/* SEARCH AND FILTERS */}
            <div className="history-filter-panel">
                <div className="history-search">
                    <span>⌕</span>
                    <input
                        type="text"
                        placeholder="Search employee, clinic, voucher ID, or category..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setEmployeePage(0);
                            setClinicPage(0);
                            setCategoryPage(0);
                        }}
                    />
                </div>

                <div className="history-filter-bottom">
                    <div className="history-periods">
                        {["Last 30D", "Q3 2026", "YTD (26-27)"].map((period) => (
                            <button
                                key={period}
                                className={activePeriod === period ? "active" : ""}
                                onClick={() => setActivePeriod(period)}
                            >
                                {period}
                            </button>
                        ))}
                    </div>

                    <div className="history-date-range">
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                        />
                        <span>-</span>
                        <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                        />
                    </div>
                </div>

                <div className="history-jump-links">
                    JUMP TO:
                    <a href="#employees">PROs</a>
                    <a href="#clinics">Clinics</a>
                    <a href="#categories">Categories</a>
                </div>
            </div>

            {loading && (
                <div className="history-loading">Loading historical audit...</div>
            )}

            {/* EMPLOYEE DIMENSION */}
            <section className="history-dimension" id="employees">
                <div className="dimension-heading">
                    <h2><span /> DIMENSION 01: FIELD EMPLOYEES &amp; PRO OFFICERS</h2>
                    <small>{employees.length} Active in View</small>

                    <div className="dimension-arrows">
                        <button onClick={() => setEmployeePage(Math.max(0, employeePage - 1))}>‹</button>
                        <button onClick={() => changePage(setEmployeePage, employeePage, employees.length)}>›</button>
                    </div>
                </div>

                <div className="history-card-grid">
                    {visibleEmployees.map((item) => (
                        <article
                            className={`history-person-card ${selectedEmployee === item.id ? "selected" : ""}`}
                            key={item.id}
                            onClick={() => setSelectedEmployee(item.id)}
                        >
                            <div className="history-card-image">
                                {item.image ? (
                                    <img src={item.image} alt={item.name} />
                                ) : (
                                    <div className="history-image-placeholder">
                                        {item.name.charAt(0)}
                                    </div>
                                )}

                                <span>{item.code}</span>
                            </div>

                            {selectedEmployee === item.id && (
                                <b className="selection-label">ACTIVE SELECTION</b>
                            )}

                            <h3>{item.name}</h3>
                            <p>{item.code} • {item.location}</p>

                            <div className="history-card-footer">
                                <small>DISBURSED</small>
                                <strong>{formatCurrency(item.amount)}</strong>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* CLINIC DIMENSION */}
            <section className="history-dimension" id="clinics">
                <div className="dimension-heading">
                    <h2><span /> DIMENSION 02: PARTNER CLINICS &amp; DIAGNOSTIC NODES</h2>
                    <small>{clinics.length} Facilities Active</small>

                    <div className="dimension-arrows">
                        <button onClick={() => setClinicPage(Math.max(0, clinicPage - 1))}>‹</button>
                        <button onClick={() => changePage(setClinicPage, clinicPage, clinics.length)}>›</button>
                    </div>
                </div>

                <div className="history-card-grid">
                    {visibleClinics.map((item, index) => (
                        <article className="history-clinic-card" key={item.id}>
                            <div className="clinic-image">
                                {item.image ? (
                                    <img src={item.image} alt={item.name} />
                                ) : (
                                    <div className="clinic-placeholder">🏥</div>
                                )}

                                {index === 0 && (
                                    <span className="focus-label">FOCUS NODE</span>
                                )}
                            </div>

                            <h3>{item.name}</h3>
                            <p>#{item.code} • {item.location}</p>

                            <div className="clinic-card-footer">
                                <small>{item.visits} FIELD VISITS</small>
                                <strong>{formatCurrency(item.amount)}</strong>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* EXPENSE CATEGORY DIMENSION */}
            <section className="history-dimension" id="categories">
                <div className="dimension-heading">
                    <h2><span /> DIMENSION 03: EXPENSE CATEGORY LEDGER ARCHETYPES</h2>
                    <small>{categories.length} Standard Heads</small>

                    <div className="dimension-arrows">
                        <button onClick={() => setCategoryPage(Math.max(0, categoryPage - 1))}>‹</button>
                        <button onClick={() => changePage(setCategoryPage, categoryPage, categories.length)}>›</button>
                    </div>
                </div>

                <div className="history-card-grid category-grid">
                    {visibleCategories.map((item) => (
                        <article className="history-category-card" key={item.id}>
                            <div className="category-card-top">
                                <span className="category-icon">{item.icon}</span>
                                <small>{item.vouchers} Vouchers</small>
                            </div>

                            <h3>{item.name}</h3>
                            <strong>{formatCurrency(item.amount)}</strong>
                        </article>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default HistoricalAudit;
