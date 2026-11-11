
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ClinicDetails.css";
import { getClinicDetailsApi } from "../../services/api/clinicDetails/clinicDetailsApi";
import { getUsersNameApi } from "../../services/api/users/getUsersNameApi";

function ClinicDetails({
    employeeName = "",
    startDate: initialStartDate = "",
    endDate: initialEndDate = "",
    filter = "", }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [clinics, setClinics] = useState([]);
    const [searchText, setSearchText] = useState(employeeName);
    const [debouncedSearch, setDebouncedSearch] = useState(employeeName);

    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);


    const [totalVisit, setTotalVisit] = useState(0);



    const [statusFilter, setStatusFilter] = useState("all");

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(employeeName);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isUsersLoading, setIsUsersLoading] = useState(false);

    const [userPage, setUserPage] = useState(1);
    const [userTotalPages, setUserTotalPages] = useState(1);

    const userDropdownRef = useRef(null);
    const userLoadingRef = useRef(false);

    /* =========================================
       PAGINATION
    ========================================= */

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(6);

    /* =========================================
       SEARCH DEBOUNCE
    ========================================= */

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchText.trim());
        }, 400);

        return () => clearTimeout(timer);
    }, [searchText]);

    /* =========================================
       GET CLINIC DATA
    ========================================= */

    useEffect(() => {
        const getClinicData = async () => {
            setIsLoading(true);

            try {
                const response = await getClinicDetailsApi({
                    search: debouncedSearch || null,
                    startDate: startDate || null,
                    endDate: endDate || null,

                    approved:
                        statusFilter === "all"
                            ? null
                            : statusFilter === "approved" ? "true" : "false",

                    page: currentPage,
                    limit: rowsPerPage,
                });

                if (response?.success) {
                    setClinics(
                        Array.isArray(response.data)
                            ? response.data
                            : []
                    );

                    setTotalVisit(
                        response?.pagination?.totalRecords ?? 0
                    );
                } else {
                    setClinics([]);
                    setTotalVisit(0);

                    console.log(response?.message);
                }
            } catch (error) {
                console.log("Clinic API Error:", error);

                setClinics([]);
                setTotalVisit(0);
            } finally {
                setIsLoading(false);
            }
        };

        getClinicData();
    }, [
        debouncedSearch,
        startDate,
        endDate,
        statusFilter,
        currentPage,
        rowsPerPage,
    ]);
    const loadUsers = async (page, reset = false) => {
        if (userLoadingRef.current) return;

        userLoadingRef.current = true;
        setIsUsersLoading(true);

        try {
            const response = await getUsersNameApi({
                page,
                limit: 10,
            });

            if (response?.success) {
                const newUsers = Array.isArray(response.data)
                    ? response.data
                    : [];

                setUsers((previous) =>
                    reset ? newUsers : [...previous, ...newUsers]
                );

                setUserTotalPages(
                    response?.pagination?.totalPages ?? 1
                );

                setUserPage(page);
            }
        } catch (error) {
            console.log("Get Users Error:", error);
        } finally {
            userLoadingRef.current = false;
            setIsUsersLoading(false);
        }
    };
    useEffect(() => {
        if (!isUserDropdownOpen || isUsersLoading) return;

        const element = userDropdownRef.current;

        if (!element) return;

        // If dropdown content does not fill the available height,
        // automatically load the next page.
        if (
            element.scrollHeight <= element.clientHeight + 5 &&
            userPage < userTotalPages
        ) {
            loadUsers(userPage + 1);
        }
    }, [
        users,
        isUserDropdownOpen,
        isUsersLoading,
        userPage,
        userTotalPages,
    ]);
    /* =========================================
       PAGINATION CALCULATION
    ========================================= */

    const totalItems = Number(totalVisit) || 0;

    const totalPages = Math.max(
        1,
        Math.ceil(totalItems / rowsPerPage)
    );

    const safeCurrentPage = Math.min(
        currentPage,
        totalPages
    );

    const showingFrom =
        totalItems === 0
            ? 0
            : (safeCurrentPage - 1) * rowsPerPage + 1;

    const showingTo = Math.min(
        safeCurrentPage * rowsPerPage,
        totalItems
    );

    // API already returns the selected page
    const currentClinics = clinics;

    /* =========================================
       PAGE CHANGE
    ========================================= */

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) {
            return;
        }

        setCurrentPage(page);
    };

    /* =========================================
       SEARCH
    ========================================= */

    const handleSearch = (event) => {
        setSearchText(event.target.value);
        setCurrentPage(1);
    };

    /* =========================================
       STATUS
    ========================================= */

    const handleStatusChange = (event) => {
        setStatusFilter(event.target.value);
        setCurrentPage(1);
    };

    /* =========================================
       ROW COUNT
    ========================================= */

    const handleRowsChange = (event) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    /* =========================================
       VIEW CLINIC
    ========================================= */

    const handleViewClinic = (clinic) => {
        console.log("View Clinic:", clinic);
    };

    //dropdown
    const handleUserDropdown = () => {
        if (!isUserDropdownOpen) {
            setUserPage(1);
            setUsers([]);
            loadUsers(1, true);
        }

        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const handleUserScroll = () => {
        const element = userDropdownRef.current;

        if (!element || isUsersLoading) return;

        const isBottom =
            element.scrollTop + element.clientHeight >=
            element.scrollHeight - 10;

        if (isBottom && userPage < userTotalPages) {
            loadUsers(userPage + 1);
        }
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user.name);
        setSearchText(user.name);
        setCurrentPage(1);
        setIsUserDropdownOpen(false);
    };

    /* =========================================
       PROGRESS PERCENTAGE
    ========================================= */

    const getProgress = (clinic) => {
        const total = Number(clinic.totalExpense) || 0;
        const approved = Number(clinic.approvedAmount) || 0;

        if (total <= 0) {
            return 0;
        }

        return Math.min(
            (approved / total) * 100,
            100
        );
    };

    return (
        <div className="clinic-details-page">

            {/* PAGE HEADER */}

            <div className="clinic-page-header">

                <div className="clinic-page-title">

                    <span className="clinic-header-label">
                        CLINIC OPERATIONS
                    </span>

                    <h1>
                        Clinic Directory & Healthcare
                        Facility Expenses
                    </h1>

                    <p>
                        Monitor assigned healthcare
                        facilities, personnel activity,
                        specimen records, visits and
                        expense performance.
                    </p>

                </div>

            </div>

            {/* FILTER BAR */}

            <div className="clinic-filter-bar">

                {/* SEARCH */}

                <div className="clinic-search">
                    <span className="search-icon">⌕</span>

                    <input
                        type="text"
                        value={searchText}
                        onChange={handleSearch}
                        placeholder="Search..."
                    />

                    {searchText && (
                        <button
                            type="button"
                            className="search-clear-button"
                            onClick={() => handleSearch({ target: { value: "" } })}
                            title="Clear search"
                        >
                            ×
                        </button>
                    )}

                    <div className="user-dropdown-container">

                        <button
                            type="button"
                            className="search-by-dropdown"
                            onClick={handleUserDropdown}
                        >
                            {selectedUser || "Select Employee"}
                            <span>{isUserDropdownOpen ? "▲" : "▼"}</span>
                        </button>

                        {isUserDropdownOpen && (
                            <div
                                className="user-dropdown-list"
                                ref={userDropdownRef}
                                onScroll={handleUserScroll}
                            >

                                {users.length === 0 && !isUsersLoading ? (
                                    <div className="user-dropdown-empty">
                                        No employees found
                                    </div>
                                ) : (
                                    users.map((user, index) => (
                                        <div
                                            key={`${user.name}-${index}`}
                                            className="user-dropdown-item"
                                            onClick={() => handleUserSelect(user)}
                                        >
                                            {user.name}
                                        </div>
                                    ))
                                )}

                                {isUsersLoading && (
                                    <div className="user-dropdown-loading">
                                        Loading...
                                    </div>
                                )}

                                {!isUsersLoading &&
                                    userPage >= userTotalPages &&
                                    users.length > 0 && (
                                        <div className="user-dropdown-end">
                                            No more employees
                                        </div>
                                    )}

                            </div>
                        )}

                    </div>
                </div>

                {/* DATE */}

                <div className="clinic-date-range">

                    <div className="clinic-date-input-wrapper">
                        {!startDate && (
                            <span className="date-placeholder">dd-mm-yyyy</span>
                        )}

                        <input
                            type="date"
                            value={startDate}
                            onChange={(event) => {
                                setStartDate(event.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    <span className="date-separator">-</span>

                    <div className="clinic-date-input-wrapper">
                        {!endDate && (
                            <span className="date-placeholder">dd-mm-yyyy</span>
                        )}

                        <input
                            type="date"
                            value={endDate}
                            onChange={(event) => {
                                setEndDate(event.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                </div>

                {/* STATUS */}

                <select
                    className="clinic-filter-select"
                    value={statusFilter}
                    onChange={handleStatusChange}
                >

                    <option value="all">
                        All
                    </option>

                    <option value="approved">
                        Approved
                    </option>

                    <option value="pending">
                        Pending
                    </option>

                </select>

            </div>

            {/* SECTION TITLE */}

            <div className="clinic-section-header">

                <div>

                    <h2>
                        Partner Healthcare Facilities
                    </h2>

                    <p>
                        Showing registered clinic
                        performance and expense
                        information.
                    </p>

                </div>

                <span>
                    {totalVisit} Visits
                </span>

            </div>

            {/* LOADING / EMPTY / CLINIC GRID */}

            {isLoading ? (

                <div className="clinic-loading-container">
                    <div className="clinic-loader" />
                </div>

            ) : currentClinics.length === 0 ? (

                <div className="clinic-empty">
                    No clinics found
                </div>

            ) : (

                <div className="clinic-card-grid">

                    {currentClinics.map((clinic, index) => (

                        <div
                            className="clinic-card"
                            key={index}
                        >

                            {/* IMAGE */}

                            <div className="clinic-image-wrapper">

                                {clinic?.clinicImage ? (
                                    <img
                                        src={clinic.clinicImage}
                                        alt={clinic.clinicName || "Clinic"}
                                        className="clinic-image"
                                    />
                                ) : (
                                    <div className="clinic-image-placeholder">
                                        <span>🏥</span>
                                        <small>No Image Available</small>
                                    </div>
                                )}

                                <span
                                    className={`clinic-status ${clinic.isApproved
                                        ? "active"
                                        : "pending"
                                        }`}
                                >
                                    {clinic.isApproved
                                        ? "Approved"
                                        : "Pending"}
                                </span>

                                <span className="clinic-code">
                                    CLN-ID {clinic.clinicId}
                                </span>

                            </div>

                            {/* INFORMATION */}

                            <div className="clinic-card-content">

                                <h3>
                                    {clinic.clinicName}
                                </h3>

                                <div className="clinic-location">

                                    <span>
                                        ◉
                                    </span>

                                    <span>
                                        {clinic.location}
                                    </span>

                                </div>

                                {/* DETAILS */}

                                <div className="clinic-information-grid">

                                    <div>

                                        <span>
                                            VISITOR NAME
                                        </span>

                                        <strong>
                                            {clinic.employeeName}
                                        </strong>

                                    </div>

                                    <div>

                                        <span>
                                            TOTAL CLAIMS
                                        </span>

                                        <strong>
                                            {clinic.totalEntries ?? 0}
                                        </strong>

                                    </div>

                                </div>

                                {/* EXPENSE */}

                                <div className="clinic-expense-section">

                                    <div className="clinic-expense-top">

                                        <div>

                                            <span>
                                                TOTAL EXPENSE
                                            </span>

                                            <strong>
                                                {clinic.totalExpense ?? 0}
                                            </strong>

                                        </div>

                                        <div className="clinic-verified">

                                            <span>
                                                VERIFIED
                                            </span>

                                            <strong>
                                                {clinic.approvedAmount ?? 0}
                                            </strong>

                                        </div>

                                    </div>

                                    {/* PROGRESS */}

                                    <div className="clinic-progress">

                                        <div
                                            style={{
                                                width: `${getProgress(clinic)}%`,
                                            }}
                                        />

                                    </div>

                                    <div className="clinic-progress-label">

                                        <span>
                                            Verification progress
                                        </span>

                                        <strong>
                                            {getProgress(clinic).toFixed(1)}%
                                        </strong>

                                    </div>

                                </div>

                                {/* ACTIONS */}

                                <div className="clinic-card-actions">

                                    <button
                                        type="button"
                                        className="clinic-view-button"
                                        onClick={() =>
                                            navigate("/dashboard/expenses", {
                                                state: {
                                                    employeeName: searchText.trim(),
                                                    startDate: startDate,
                                                    endDate: endDate,
                                                    filter: statusFilter,
                                                },
                                            })
                                        }
                                    >
                                        View Expenses
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

            {/* PAGINATION */}

            {!isLoading && (

                <div className="clinic-pagination">

                    {/* LEFT */}

                    <div className="clinic-pagination-info">

                        <strong>
                            Showing {showingFrom}
                            {"–"}
                            {showingTo}
                            {" of "}
                            {totalItems}
                            {" Clinics"}
                        </strong>

                        <span>
                            •
                        </span>

                        <label>
                            Rows per page:
                        </label>

                        <select
                            value={rowsPerPage}
                            onChange={handleRowsChange}
                        >

                            <option value={3}>3</option>
                            <option value={6}>6</option>
                            <option value={9}>9</option>
                            <option value={12}>12</option>

                        </select>

                    </div>

                    {/* RIGHT */}

                    <div className="clinic-pagination-buttons">

                        <button
                            type="button"
                            disabled={safeCurrentPage === 1}
                            onClick={() => goToPage(1)}
                        >
                            |‹
                        </button>

                        <button
                            type="button"
                            disabled={safeCurrentPage === 1}
                            onClick={() =>
                                goToPage(safeCurrentPage - 1)
                            }
                        >
                            ‹
                        </button>

                        {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1
                        ).map((page) => (

                            <button
                                type="button"
                                key={page}
                                className={
                                    page === safeCurrentPage
                                        ? "active"
                                        : ""
                                }
                                onClick={() => goToPage(page)}
                            >
                                {page}
                            </button>

                        ))}

                        <button
                            type="button"
                            disabled={safeCurrentPage === totalPages}
                            onClick={() =>
                                goToPage(safeCurrentPage + 1)
                            }
                        >
                            ›
                        </button>

                        <button
                            type="button"
                            disabled={safeCurrentPage === totalPages}
                            onClick={() => goToPage(totalPages)}
                        >
                            ›|
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}

export default ClinicDetails;
