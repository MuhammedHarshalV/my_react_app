
import React, { useEffect, useState } from "react";
import "./HistoricalAudit.css";
import {
    FiHome,
    FiFileText,
    FiCoffee,
    FiTruck,
    FiPlusSquare,
    FiMapPin,
    FiCircle,
} from "react-icons/fi";
import { getCategoryDetailsApi } from "../../services/api/historyDetails/getCategoryDetailsapi";
import { getClinicalDetailsApi } from "../../services/api/historyDetails/getClinicDetailsApi";
import { getPersonalDetailsApi } from "../../services/api/historyDetails/getPersonalDetailsApi";

const LIMIT = 6;

const formatCurrency = (amount) =>
    `₹ ${Number(amount || 0).toLocaleString("en-IN")}`;

// Handle both Axios response and direct response objects
const getResponseData = (response) => response?.data ?? response ?? {};

// --------------------------------------------------
// RESPONSE MAPPING
// --------------------------------------------------

const mapEmployee = (item) => ({
    id: item.userId,
    name: item.name || "",
    code: item.userId || "",
    location: item.location || "",
    amount: item.totalExpenseClaimed || 0,
    approvedAmount: item.totalExpenseApproved || 0,
    image: item.profilePicture || "",
});
const getCategoryIcon = (category) => {
    const name = category?.toLowerCase() || "";

    if (name.includes("hotel") || name.includes("stay")) {
        return <FiHome size={20} />;
    }

    if (name.includes("other")) {
        return <FiFileText size={20} />;
    }

    if (name.includes("food") || name.includes("lunch")) {
        return <FiCoffee size={20} />;
    }

    if (name.includes("fuel")) {
        return <FiTruck size={20} />;
    }

    if (name.includes("medical")) {
        return <FiPlusSquare size={20} />;
    }

    if (name.includes("travel")) {
        return <FiMapPin size={20} />;
    }

    return <FiCircle size={20} />;
};
const mapClinic = (item) => ({
    id: item.clinicName,
    name: item.clinicName || "",
    code: "",
    location: item.clinicPlace || "",
    visits: item.totalVisits || 0,
    amount: item.totalClinicSpend || 0,
    approvedAmount: item.totalApprovedAmount || 0,
    image: item.clinicPhoto || "",
});

const mapCategory = (item, index) => ({
    id: item.categoryName || index,
    name: item.categoryName || "",
    icon: getCategoryIcon(item.categoryName),
    vouchers: item.totalClaims || 0,
    amount: item.totalExpense || 0,
    approvedAmount: item.totalApprovedExpense || 0,
});

// --------------------------------------------------
// PAGINATION
// --------------------------------------------------

const getPagination = (response, currentPage) => {
    const pagination = response?.pagination || {};

    return {
        currentPage: Number(pagination.currentPage || currentPage),
        limit: Number(pagination.limit || LIMIT),
        totalRecords: Number(pagination.totalRecords || 0),
        totalPages: Number(
            pagination.totalPages ||
            Math.ceil((pagination.totalRecords || 0) / LIMIT) ||
            1
        ),
    };
};

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

const HistoricalAudit = () => {

    // Employee states
    const [employees, setEmployees] = useState([]);
    const [employeePage, setEmployeePage] = useState(1);

    const [employeePagination, setEmployeePagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0,
    });

    const [employeeLoading, setEmployeeLoading] = useState(false);

    // Clinic states
    const [clinics, setClinics] = useState([]);
    const [clinicPage, setClinicPage] = useState(1);

    const [clinicPagination, setClinicPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0,
    });

    const [clinicLoading, setClinicLoading] = useState(false);

    // Category states
    const [categories, setCategories] = useState([]);
    const [categoryPage, setCategoryPage] = useState(1);

    const [categoryPagination, setCategoryPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0,
    });

    const [categoryLoading, setCategoryLoading] = useState(false);

    // Common states
    const [search, setSearch] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const [error, setError] = useState("");

    // --------------------------------------------------
    // 1. EMPLOYEE API
    // --------------------------------------------------

    const loadEmployeeDetails = async () => {
        try {
            setEmployeeLoading(true);

            const result = await getPersonalDetailsApi({
                page: employeePage,
                limit: LIMIT,
                startDate: dateFrom,
                endDate: dateTo,
                search: search.trim(),
            });

            const response = getResponseData(result);
            const list = response?.personDetails || [];

            setEmployees(list.map(mapEmployee));


            setEmployeePagination(
                getPagination(response, employeePage)
            );

            setError("");

        } catch (err) {
            console.error("Employee API error:", err);
            setEmployees([]);
            setError("Unable to load employee details.");
        } finally {
            setEmployeeLoading(false);
        }
    };

    // --------------------------------------------------
    // 2. CLINIC API
    // --------------------------------------------------

    const loadClinicDetails = async () => {
        try {
            setClinicLoading(true);

            const result = await getClinicalDetailsApi({
                page: clinicPage,
                limit: LIMIT,
                startDate: dateFrom,
                endDate: dateTo,
                search: search.trim(),
            });

            const response = getResponseData(result);
            const list = response?.clinicDetails || [];

            setClinics(list.map(mapClinic));

            setClinicPagination(
                getPagination(response, clinicPage)
            );

        } catch (err) {
            console.error("Clinic API error:", err);
            setClinics([]);
            setError("Unable to load clinic details.");
        } finally {
            setClinicLoading(false);
        }
    };

    // --------------------------------------------------
    // 3. CATEGORY API
    // --------------------------------------------------

    const loadCategoryDetails = async () => {
        try {
            setCategoryLoading(true);

            const result = await getCategoryDetailsApi({
                page: categoryPage,
                limit: LIMIT,
                startDate: dateFrom,
                endDate: dateTo,
                search: search.trim(),
            });

            const response = getResponseData(result);
            const list = response?.categoryDetails || [];

            setCategories(list.map(mapCategory));

            setCategoryPagination(
                getPagination(response, categoryPage)
            );

        } catch (err) {
            console.error("Category API error:", err);
            setCategories([]);
            setError("Unable to load category details.");
        } finally {
            setCategoryLoading(false);
        }
    };

    // --------------------------------------------------
    // INITIAL LOAD + INDEPENDENT API CALLS
    // --------------------------------------------------

    useEffect(() => {
        loadEmployeeDetails();
    }, [employeePage, dateFrom, dateTo, search]);

    useEffect(() => {
        loadClinicDetails();
    }, [clinicPage, dateFrom, dateTo, search]);

    useEffect(() => {
        loadCategoryDetails();
    }, [categoryPage, dateFrom, dateTo, search]);

    // --------------------------------------------------
    // DATE FILTER
    // --------------------------------------------------

    const handleDateFromChange = (value) => {
        setDateFrom(value);
        setEmployeePage(1);
        setClinicPage(1);
        setCategoryPage(1);
    };

    const handleDateToChange = (value) => {
        setDateTo(value);
        setEmployeePage(1);
        setClinicPage(1);
        setCategoryPage(1);
    };

    // --------------------------------------------------
    // SEARCH
    // --------------------------------------------------

    const handleSearch = (value) => {
        setSearch(value);
        setEmployeePage(1);
        setClinicPage(1);
        setCategoryPage(1);
    };

    // --------------------------------------------------
    // INDEPENDENT PAGINATION
    // --------------------------------------------------

    const changeEmployeePage = (direction) => {
        const nextPage = employeePage + direction;

        if (
            nextPage >= 1 &&
            nextPage <= employeePagination.totalPages
        ) {
            setEmployeePage(nextPage);
        }
    };

    const changeClinicPage = (direction) => {
        const nextPage = clinicPage + direction;

        if (
            nextPage >= 1 &&
            nextPage <= clinicPagination.totalPages
        ) {
            setClinicPage(nextPage);
        }
    };


    // --------------------------------------------------
    // EMPLOYEE SELECTION
    // No API call here
    // --------------------------------------------------

    const handleEmployeeSelect = (employee) => {
        setSelectedEmployee(employee.id);
    };

    // --------------------------------------------------
    // UI
    // --------------------------------------------------

    return (
        <div className="historical-audit-page">

            {/* PAGE HEADING */}

            <div className="history-heading">
                <div>
                    <div className="history-brand">
                        <span>AUDIT ENGINE</span>
                        <small>Historical Multi-Vector Telemetry</small>
                    </div>

                    <h1>
                        Historical Audits &amp; Multi-Dimension Analytics
                    </h1>

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
                        placeholder="Search employee name..."
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                <div className="history-filter-bottom">

                    <div className="history-date-range">

                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) =>
                                handleDateFromChange(e.target.value)
                            }
                        />

                        <span>-</span>

                        <input
                            type="date"
                            value={dateTo}
                            min={dateFrom}
                            onChange={(e) =>
                                handleDateToChange(e.target.value)
                            }
                        />

                    </div>

                    <div className="history-jump-links">
                        JUMP TO:
                        <a href="#employees">PROs</a>
                        <a href="#clinics">Clinics</a>
                        <a href="#categories">Categories</a>
                    </div>

                </div>
            </div>

            {error && (
                <div className="history-error">
                    {error}
                </div>
            )}

            {/* EMPLOYEE DIMENSION */}

            <section className="history-dimension" id="employees">

                <div className="dimension-heading">

                    <h2>
                        <span />
                        DIMENSION 01: FIELD EMPLOYEES &amp; PRO OFFICERS
                    </h2>

                    <small>
                        {employeePagination.totalRecords} Active in View
                    </small>

                    <div className="dimension-arrows">

                        <button
                            onClick={() => changeEmployeePage(-1)}
                            disabled={employeePage <= 1 || employeeLoading}
                        >
                            ‹
                        </button>

                        <button
                            onClick={() => changeEmployeePage(1)}
                            disabled={
                                employeePage >= employeePagination.totalPages ||
                                employeeLoading
                            }
                        >
                            ›
                        </button>

                    </div>
                </div>

                {employeeLoading ? (
                    <div className="history-loading">
                        Loading employees...
                    </div>
                ) : (
                    <div className="history-card-grid">

                        {employees.length > 0 ? (
                            employees.map((item) => (

                                <article
                                    className={`history-person-card ${selectedEmployee === item.id
                                        ? "selected"
                                        : ""
                                        }`}
                                    key={item.id}
                                    onClick={() => handleEmployeeSelect(item)}
                                >

                                    <div className="history-card-image">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                    e.currentTarget.nextElementSibling.style.display = "flex";
                                                }}
                                            />
                                        ) : null}

                                        <div
                                            className="history-image-placeholder"
                                            style={{
                                                display: item.image ? "none" : "flex",
                                            }}
                                        >
                                            {item.name?.charAt(0)?.toUpperCase() || "?"}
                                        </div>

                                        <span>{item.code}</span>
                                    </div>

                                    {selectedEmployee === item.id && (
                                        <b className="selection-label">
                                            ACTIVE SELECTION
                                        </b>
                                    )}

                                    <h3>{item.name}</h3>

                                    <p>
                                        {item.code}
                                        {item.location
                                            ? ` • ${item.location}`
                                            : ""}
                                    </p>

                                    <div className="history-card-footer">

                                        <small>DISBURSED</small>

                                        <strong>
                                            {formatCurrency(item.amount)}
                                        </strong>

                                    </div>

                                </article>

                            ))
                        ) : (
                            <div className="history-empty">
                                No employees found.
                            </div>
                        )}

                    </div>
                )}

            </section>

            {/* CLINIC DIMENSION */}

            <section className="history-dimension" id="clinics">

                <div className="dimension-heading">

                    <h2>
                        <span />
                        DIMENSION 02: PARTNER CLINICS &amp; DIAGNOSTIC NODES
                    </h2>

                    <small>
                        {clinicPagination.totalRecords} Facilities Active
                    </small>

                    <div className="dimension-arrows">

                        <button
                            onClick={() => changeClinicPage(-1)}
                            disabled={clinicPage <= 1 || clinicLoading}
                        >
                            ‹
                        </button>

                        <button
                            onClick={() => changeClinicPage(1)}
                            disabled={
                                clinicPage >= clinicPagination.totalPages ||
                                clinicLoading
                            }
                        >
                            ›
                        </button>

                    </div>
                </div>

                {clinicLoading ? (
                    <div className="history-loading">
                        Loading clinics...
                    </div>
                ) : (
                    <div className="history-card-grid">

                        {clinics.length > 0 ? (
                            clinics.map((item, index) => (

                                <article
                                    className="history-clinic-card"
                                    key={`${item.id}-${index}`}
                                >

                                    <div className="clinic-image">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                    e.currentTarget.nextElementSibling.style.display = "flex";
                                                }}
                                            />
                                        ) : null}

                                        <div
                                            className="clinic-placeholder"
                                            style={{
                                                display: item.image ? "none" : "flex",
                                            }}
                                        >
                                            🏥
                                        </div>

                                        {index === 0 && (
                                            <span className="focus-label">
                                                FOCUS NODE
                                            </span>
                                        )}
                                    </div>

                                    <h3>{item.name}</h3>

                                    <p>
                                        {item.code ? `#${item.code} • ` : ""}
                                        {item.location}
                                    </p>

                                    <div className="clinic-card-footer">

                                        <small>
                                            {item.visits} FIELD VISITS
                                        </small>

                                        <strong>
                                            {formatCurrency(item.amount)}
                                        </strong>

                                    </div>

                                </article>

                            ))
                        ) : (
                            <div className="history-empty">
                                No clinics found.
                            </div>
                        )}

                    </div>
                )}

            </section>

            {/* CATEGORY DIMENSION */}

            <section className="history-dimension" id="categories">

                <div className="dimension-heading">

                    <h2>
                        <span />
                        DIMENSION 03: EXPENSE CATEGORY LEDGER ARCHETYPES
                    </h2>

                    <small>
                        {categoryPagination.totalRecords || categories.length}
                        {" "}Standard Heads
                    </small>


                </div>

                {categoryLoading ? (
                    <div className="history-loading">
                        Loading categories...
                    </div>
                ) : (
                    <div className="history-card-grid category-grid">

                        {categories.length > 0 ? (
                            categories.map((item, index) => (

                                <article
                                    className="history-category-card"
                                    key={`${item.id}-${index}`}
                                >

                                    <div className="category-card-top">

                                        <span className="category-icon">
                                            {item.icon}
                                        </span>

                                        <small>
                                            {item.vouchers} Vouchers
                                        </small>

                                    </div>

                                    <h3>{item.name}</h3>

                                    <strong>
                                        {formatCurrency(item.amount)}
                                    </strong>

                                </article>

                            ))
                        ) : (
                            <div className="history-empty">
                                No categories found.
                            </div>
                        )}

                    </div>
                )}

            </section>

        </div>
    );
};

export default HistoricalAudit;
