import { useEffect, useMemo, useState } from "react";

import "./ClinicDetails.css";


function ClinicDetails() {

    /* =========================================
       LOADING
    ========================================= */

    const [isLoading, setIsLoading] =
        useState(true);


    /* =========================================
       CLINIC DATA
    ========================================= */

    const [clinics, setClinics] =
        useState([]);


    /* =========================================
       FILTERS
    ========================================= */

    const [searchText, setSearchText] =
        useState("");

    const [startDate, setStartDate] =
        useState("2026-10-01");

    const [endDate, setEndDate] =
        useState("2026-10-31");

    const [statusFilter, setStatusFilter] =
        useState("all");


    /* =========================================
       PAGINATION
    ========================================= */

    const [currentPage, setCurrentPage] =
        useState(1);

    const [rowsPerPage, setRowsPerPage] =
        useState(6);


    /* =========================================
       INITIAL API CALL
    ========================================= */

    useEffect(() => {

        getClinicData();

    }, []);


    /* =========================================
       GET CLINIC DATA

       Replace dummy data with API later
    ========================================= */

    const getClinicData = async () => {

        setIsLoading(true);

        try {

            /*
            ==========================================
            LATER API CALL
            ==========================================

            const response =
                await getClinicApi({
                    search: searchText,
                    startDate: startDate,
                    endDate: endDate,
                    page: currentPage,
                    limit: rowsPerPage,
                });

            if (response?.success === true) {

                setClinics(
                    response.data ?? []
                );

                return;
            }
            */


            /* =====================================
               DUMMY DATA
            ====================================== */

            const dummyData = [

                {
                    id: 1,

                    name:
                        "City Health Centre & Diagnostics",

                    code:
                        "CLN-001",

                    location:
                        "Kochi Central, Ernakulam",

                    type:
                        "Diagnostic Centre",

                    status:
                        "ACTIVE",

                    statusType:
                        "active",

                    image:
                        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",

                    contactPerson:
                        "Dr. K. Nair",

                    phone:
                        "+91 98471 23091",

                    lastVisit:
                        "28 Oct 2026",

                    totalVisits:
                        38,

                    specimenRecords:
                        286,

                    totalExpense:
                        "₹ 24,650",

                    verifiedExpense:
                        "₹ 22,400",

                    progress:
                        82,
                },

                {
                    id: 2,

                    name:
                        "Metro PathLab & Multi Specialty",

                    code:
                        "CLN-002",

                    location:
                        "Aluva, Ernakulam",

                    type:
                        "Multi Specialty Lab",

                    status:
                        "UNDER REVIEW",

                    statusType:
                        "review",

                    image:
                        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",

                    contactPerson:
                        "Dr. Susan Thomas",

                    phone:
                        "+91 97455 88204",

                    lastVisit:
                        "27 Oct 2026",

                    totalVisits:
                        42,

                    specimenRecords:
                        314,

                    totalExpense:
                        "₹ 31,400",

                    verifiedExpense:
                        "₹ 27,850",

                    progress:
                        74,
                },

                {
                    id: 3,

                    name:
                        "Care Diagnostic Centre & Imaging",

                    code:
                        "CLN-003",

                    location:
                        "Kakkanad, Ernakulam",

                    type:
                        "Diagnostic & Imaging",

                    status:
                        "ACTIVE",

                    statusType:
                        "active",

                    image:
                        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",

                    contactPerson:
                        "Dr. Mathews Roy",

                    phone:
                        "+91 94460 11928",

                    lastVisit:
                        "26 Oct 2026",

                    totalVisits:
                        31,

                    specimenRecords:
                        198,

                    totalExpense:
                        "₹ 16,850",

                    verifiedExpense:
                        "₹ 15,500",

                    progress:
                        91,
                },

                {
                    id: 4,

                    name:
                        "Grace Multi-Speciality Polyclinic",

                    code:
                        "CLN-004",

                    location:
                        "Thrippunithura, Ernakulam",

                    type:
                        "Polyclinic",

                    status:
                        "ACTIVE",

                    statusType:
                        "active",

                    image:
                        "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=1200&q=80",

                    contactPerson:
                        "Dr. Priya Kurian",

                    phone:
                        "+91 99052 47310",

                    lastVisit:
                        "25 Oct 2026",

                    totalVisits:
                        27,

                    specimenRecords:
                        174,

                    totalExpense:
                        "₹ 19,200",

                    verifiedExpense:
                        "₹ 18,400",

                    progress:
                        68,
                },

                {
                    id: 5,

                    name:
                        "Sunrise Diagnostics & Diabetic Care",

                    code:
                        "CLN-005",

                    location:
                        "Edappally, Ernakulam",

                    type:
                        "Diagnostic Centre",

                    status:
                        "ACTIVE",

                    statusType:
                        "active",

                    image:
                        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80",

                    contactPerson:
                        "Dr. Joseph Mathew",

                    phone:
                        "+91 98460 12234",

                    lastVisit:
                        "24 Oct 2026",

                    totalVisits:
                        35,

                    specimenRecords:
                        241,

                    totalExpense:
                        "₹ 28,900",

                    verifiedExpense:
                        "₹ 26,300",

                    progress:
                        87,
                },

                {
                    id: 6,

                    name:
                        "Aster Prime Diagnostic Lab Centre",

                    code:
                        "CLN-006",

                    location:
                        "Vyttila, Ernakulam",

                    type:
                        "Diagnostic Laboratory",

                    status:
                        "PENDING AUDIT",

                    statusType:
                        "pending",

                    image:
                        "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80",

                    contactPerson:
                        "Dr. Nisha Paul",

                    phone:
                        "+91 97460 11223",

                    lastVisit:
                        "23 Oct 2026",

                    totalVisits:
                        46,

                    specimenRecords:
                        329,

                    totalExpense:
                        "₹ 34,750",

                    verifiedExpense:
                        "₹ 30,200",

                    progress:
                        62,
                },

                {
                    id: 7,

                    name:
                        "Lakeshore Clinical Laboratory",

                    code:
                        "CLN-007",

                    location:
                        "Maradu, Ernakulam",

                    type:
                        "Clinical Laboratory",

                    status:
                        "ACTIVE",

                    statusType:
                        "active",

                    image:
                        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",

                    contactPerson:
                        "Dr. Arun Kumar",

                    phone:
                        "+91 98470 99881",

                    lastVisit:
                        "22 Oct 2026",

                    totalVisits:
                        29,

                    specimenRecords:
                        205,

                    totalExpense:
                        "₹ 21,300",

                    verifiedExpense:
                        "₹ 20,100",

                    progress:
                        79,
                },

                {
                    id: 8,

                    name:
                        "MedCare Diagnostic Hub",

                    code:
                        "CLN-008",

                    location:
                        "Kaloor, Ernakulam",

                    type:
                        "Diagnostic Hub",

                    status:
                        "INACTIVE",

                    statusType:
                        "inactive",

                    image:
                        "https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?auto=format&fit=crop&w=1200&q=80",

                    contactPerson:
                        "Dr. Fathima Ali",

                    phone:
                        "+91 97450 88776",

                    lastVisit:
                        "18 Oct 2026",

                    totalVisits:
                        19,

                    specimenRecords:
                        121,

                    totalExpense:
                        "₹ 13,800",

                    verifiedExpense:
                        "₹ 12,600",

                    progress:
                        48,
                },

            ];


            setClinics(
                dummyData
            );

        } catch (error) {

            console.log(
                "Clinic API Error:",
                error
            );

        } finally {

            setIsLoading(false);
        }
    };


    /* =========================================
       FILTERED DATA
    ========================================= */

    const filteredClinics =
        useMemo(() => {

            const search =
                searchText
                    .trim()
                    .toLowerCase();


            return clinics.filter(
                (clinic) => {

                    const matchesSearch =
                        !search ||

                        clinic.name
                            .toLowerCase()
                            .includes(search) ||

                        clinic.code
                            .toLowerCase()
                            .includes(search) ||

                        clinic.location
                            .toLowerCase()
                            .includes(search) ||

                        clinic.contactPerson
                            .toLowerCase()
                            .includes(search);


                    const matchesStatus =
                        statusFilter === "all" ||

                        clinic.statusType ===
                        statusFilter;


                    return (
                        matchesSearch &&
                        matchesStatus
                    );
                }
            );

        }, [
            clinics,
            searchText,
            statusFilter,
        ]);


    /* =========================================
       SUMMARY
    ========================================= */

    const totalFacilities =
        filteredClinics.length;


    const totalVisits =
        filteredClinics.reduce(
            (total, clinic) =>
                total +
                clinic.totalVisits,
            0
        );


    const totalSpecimens =
        filteredClinics.reduce(
            (total, clinic) =>
                total +
                clinic.specimenRecords,
            0
        );


    const activeFacilities =
        filteredClinics.filter(
            (clinic) =>
                clinic.statusType ===
                "active"
        ).length;


    /* =========================================
       PAGINATION
    ========================================= */

    const totalItems =
        filteredClinics.length;


    const totalPages =
        Math.max(
            1,
            Math.ceil(
                totalItems /
                rowsPerPage
            )
        );


    const safeCurrentPage =
        Math.min(
            currentPage,
            totalPages
        );


    const startIndex =
        (safeCurrentPage - 1) *
        rowsPerPage;


    const endIndex =
        startIndex +
        rowsPerPage;


    const currentClinics =
        filteredClinics.slice(
            startIndex,
            endIndex
        );


    const showingFrom =
        totalItems === 0
            ? 0
            : startIndex + 1;


    const showingTo =
        Math.min(
            endIndex,
            totalItems
        );


    /* =========================================
       PAGE CHANGE
    ========================================= */

    const goToPage = (page) => {

        if (
            page < 1 ||
            page > totalPages
        ) {
            return;
        }

        setCurrentPage(page);
    };


    /* =========================================
       SEARCH
    ========================================= */

    const handleSearch = (
        event
    ) => {

        setSearchText(
            event.target.value
        );

        setCurrentPage(1);
    };


    /* =========================================
       STATUS
    ========================================= */

    const handleStatusChange = (
        event
    ) => {

        setStatusFilter(
            event.target.value
        );

        setCurrentPage(1);
    };


    /* =========================================
       ROW COUNT
    ========================================= */

    const handleRowsChange = (
        event
    ) => {

        setRowsPerPage(
            Number(
                event.target.value
            )
        );

        setCurrentPage(1);
    };


    /* =========================================
       VIEW CLINIC
    ========================================= */

    const handleViewClinic = (
        clinic
    ) => {

        console.log(
            "View Clinic:",
            clinic
        );
    };


    /* =========================================
       VIEW LEDGER
    ========================================= */

    const handleViewLedger = (
        clinic
    ) => {

        console.log(
            "View Ledger:",
            clinic
        );
    };


    return (

        <div className="clinic-details-page">


            {/* =====================================
                PAGE HEADER
            ====================================== */}

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


                <button
                    type="button"
                    className="clinic-add-button"
                    onClick={() =>
                        console.log(
                            "Add Clinic"
                        )
                    }
                >
                    + Register New Clinic
                </button>

            </div>


            {/* =====================================
                FILTER BAR
            ====================================== */}

            <div className="clinic-filter-bar">


                {/* SEARCH */}

                <div className="clinic-search">

                    <span>
                        ⌕
                    </span>


                    <input
                        type="text"
                        value={searchText}
                        onChange={
                            handleSearch
                        }
                        placeholder="Search clinic name, code, location, contact person..."
                    />

                </div>


                {/* DATE */}

                <div className="clinic-date-range">


                    <input
                        type="date"
                        value={startDate}
                        onChange={(event) => {

                            setStartDate(
                                event.target.value
                            );

                            setCurrentPage(1);
                        }}
                    />


                    <span>
                        -
                    </span>


                    <input
                        type="date"
                        value={endDate}
                        onChange={(event) => {

                            setEndDate(
                                event.target.value
                            );

                            setCurrentPage(1);
                        }}
                    />

                </div>


                {/* STATUS */}

                <select
                    className="clinic-filter-select"
                    value={statusFilter}
                    onChange={
                        handleStatusChange
                    }
                >

                    <option value="all">
                        All Status
                    </option>

                    <option value="active">
                        Active
                    </option>

                    <option value="review">
                        Under Review
                    </option>

                    <option value="pending">
                        Pending Audit
                    </option>

                    <option value="inactive">
                        Inactive
                    </option>

                </select>

            </div>


            {/* =====================================
                SUMMARY CARDS
            ====================================== */}

            <div className="clinic-summary-grid">


                <div className="clinic-summary-card">

                    <span>
                        TOTAL FACILITIES
                    </span>

                    <strong>
                        {totalFacilities}
                    </strong>

                    <small>
                        Registered clinics
                    </small>

                </div>


                <div className="clinic-summary-card">

                    <span>
                        ACTIVE FACILITIES
                    </span>

                    <strong>
                        {activeFacilities}
                    </strong>

                    <small className="clinic-positive">
                        Currently operational
                    </small>

                </div>


                <div className="clinic-summary-card">

                    <span>
                        TOTAL CLINIC VISITS
                    </span>

                    <strong>
                        {totalVisits}
                    </strong>

                    <small>
                        Selected period
                    </small>

                </div>


                <div className="clinic-summary-card">

                    <span>
                        SPECIMEN RECORDS
                    </span>

                    <strong>
                        {totalSpecimens}
                    </strong>

                    <small>
                        Processed records
                    </small>

                </div>

            </div>


            {/* =====================================
                SECTION TITLE
            ====================================== */}

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
                    {totalItems} Facilities
                </span>

            </div>


            {/* =====================================
                LOADING
            ====================================== */}

            {isLoading ? (

                <div className="clinic-loading-container">

                    <div className="clinic-loader" />

                </div>

            ) : currentClinics.length === 0 ? (

                /* =================================
                   EMPTY
                ================================== */

                <div className="clinic-empty">

                    No clinics found

                </div>

            ) : (

                /* =================================
                   CLINIC GRID
                ================================== */

                <div className="clinic-card-grid">


                    {currentClinics.map(
                        (clinic) => (

                            <div
                                className="clinic-card"
                                key={clinic.id}
                            >


                                {/* =================
                                    IMAGE
                                ================== */}

                                <div className="clinic-image-wrapper">


                                    <img
                                        src={
                                            clinic.image
                                        }
                                        alt={
                                            clinic.name
                                        }
                                        className="clinic-image"
                                    />


                                    <span
                                        className={`clinic-status ${clinic.statusType
                                            }`}
                                    >
                                        {
                                            clinic.status
                                        }
                                    </span>


                                    <span className="clinic-code">
                                        {
                                            clinic.code
                                        }
                                    </span>

                                </div>


                                {/* =================
                                    INFORMATION
                                ================== */}

                                <div className="clinic-card-content">


                                    <h3>
                                        {clinic.name}
                                    </h3>


                                    <p className="clinic-type">
                                        {clinic.type}
                                    </p>


                                    <div className="clinic-location">

                                        <span>
                                            ◉
                                        </span>

                                        <span>
                                            {
                                                clinic.location
                                            }
                                        </span>

                                    </div>


                                    {/* =================
                                        DETAILS
                                    ================== */}

                                    <div className="clinic-information-grid">


                                        <div>

                                            <span>
                                                CONTACT
                                            </span>

                                            <strong>
                                                {
                                                    clinic.contactPerson
                                                }
                                            </strong>

                                            <small>
                                                {
                                                    clinic.phone
                                                }
                                            </small>

                                        </div>


                                        <div>

                                            <span>
                                                LAST VISIT
                                            </span>

                                            <strong>
                                                {
                                                    clinic.lastVisit
                                                }
                                            </strong>

                                            <small>
                                                {
                                                    clinic.totalVisits
                                                }{" "}
                                                total visits
                                            </small>

                                        </div>

                                    </div>


                                    {/* =================
                                        EXPENSE
                                    ================== */}

                                    <div className="clinic-expense-section">


                                        <div className="clinic-expense-top">

                                            <div>

                                                <span>
                                                    TOTAL EXPENSE
                                                </span>

                                                <strong>
                                                    {
                                                        clinic.totalExpense
                                                    }
                                                </strong>

                                            </div>


                                            <div className="clinic-verified">

                                                <span>
                                                    VERIFIED
                                                </span>

                                                <strong>
                                                    {
                                                        clinic.verifiedExpense
                                                    }
                                                </strong>

                                            </div>

                                        </div>


                                        {/* PROGRESS */}

                                        <div className="clinic-progress">

                                            <div
                                                style={{
                                                    width:
                                                        `${clinic.progress}%`,
                                                }}
                                            />

                                        </div>


                                        <div className="clinic-progress-label">

                                            <span>
                                                Verification progress
                                            </span>

                                            <strong>
                                                {
                                                    clinic.progress
                                                }%
                                            </strong>

                                        </div>

                                    </div>


                                    {/* =================
                                        STATS
                                    ================== */}

                                    <div className="clinic-card-stats">


                                        <div>

                                            <span>
                                                VISITS
                                            </span>

                                            <strong>
                                                {
                                                    clinic.totalVisits
                                                }
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                SPECIMENS
                                            </span>

                                            <strong>
                                                {
                                                    clinic.specimenRecords
                                                }
                                            </strong>

                                        </div>

                                    </div>


                                    {/* =================
                                        ACTIONS
                                    ================== */}

                                    <div className="clinic-card-actions">


                                        <button
                                            type="button"
                                            className="clinic-ledger-button"
                                            onClick={() =>
                                                handleViewLedger(
                                                    clinic
                                                )
                                            }
                                        >
                                            ▤ View Ledger
                                        </button>


                                        <button
                                            type="button"
                                            className="clinic-view-button"
                                            onClick={() =>
                                                handleViewClinic(
                                                    clinic
                                                )
                                            }
                                        >
                                            View Clinic
                                        </button>

                                    </div>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}


            {/* =====================================
                PAGINATION
            ====================================== */}

            {!isLoading && (

                <div className="clinic-pagination">


                    {/* LEFT */}

                    <div className="clinic-pagination-info">


                        <strong>

                            Showing{" "}

                            {showingFrom}

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
                            onChange={
                                handleRowsChange
                            }
                        >

                            <option value={3}>
                                3
                            </option>

                            <option value={6}>
                                6
                            </option>

                            <option value={9}>
                                9
                            </option>

                            <option value={12}>
                                12
                            </option>

                        </select>

                    </div>


                    {/* RIGHT */}

                    <div className="clinic-pagination-buttons">


                        <button
                            type="button"
                            disabled={
                                safeCurrentPage ===
                                1
                            }
                            onClick={() =>
                                goToPage(1)
                            }
                        >
                            |‹
                        </button>


                        <button
                            type="button"
                            disabled={
                                safeCurrentPage ===
                                1
                            }
                            onClick={() =>
                                goToPage(
                                    safeCurrentPage -
                                    1
                                )
                            }
                        >
                            ‹
                        </button>


                        {Array.from(
                            {
                                length:
                                    totalPages,
                            },
                            (_, index) =>
                                index + 1
                        ).map((page) => (

                            <button
                                type="button"
                                key={page}
                                className={
                                    page ===
                                        safeCurrentPage
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    goToPage(
                                        page
                                    )
                                }
                            >
                                {page}
                            </button>

                        ))}


                        <button
                            type="button"
                            disabled={
                                safeCurrentPage ===
                                totalPages
                            }
                            onClick={() =>
                                goToPage(
                                    safeCurrentPage +
                                    1
                                )
                            }
                        >
                            ›
                        </button>


                        <button
                            type="button"
                            disabled={
                                safeCurrentPage ===
                                totalPages
                            }
                            onClick={() =>
                                goToPage(
                                    totalPages
                                )
                            }
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