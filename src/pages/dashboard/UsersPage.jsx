import { useMemo, useState } from "react";

import PersonDetailedCard from "../../components/personel/PersonDetailedCard";
import AllPersonDetails from "../../components/personel/AllPersonDetails";

import "./UsersPage.css";


export default function UsersPage() {

    /* =========================================
       FILTER STATES
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
        useState(4);


    /* =========================================
       DUMMY DATA

       Later replace with API response
    ========================================= */

    const [persons] = useState([
        {
            id: 1,
            name: "Rahul Menon",
            proId: "PRO-104",
            designation: "Sr. Route Diagnostic Specialist",
            image: "https://i.pravatar.cc/150?img=12",
            phone: "+91 98471 23091",
            location: "Ernakulam North • Medical District",
            status: "ON FIELD",
            statusType: "on-field",
            clinicsVisited: 24,
            clinicSubText: "+4 vs target",
            expenseClaims: 18,
            expenseSubText: "3 under audit",
            totalClaimed: "₹ 14,850",
            verifiedAmount: "₹ 12,400",
            verifiedLabel: "VERIFIED",
            gpsAvailable: true,
        },

        {
            id: 2,
            name: "Ananya Sharma",
            proId: "PRO-109",
            designation: "Senior Liaison Officer",
            image: "https://i.pravatar.cc/150?img=47",
            phone: "+91 97455 88204",
            location: "Aluva Bypass • Transit Corridor",
            status: "IN TRANSIT",
            statusType: "in-transit",
            clinicsVisited: 31,
            clinicSubText: "Top Performer",
            expenseClaims: 22,
            expenseSubText: "All settled",
            totalClaimed: "₹ 18,920",
            verifiedAmount: "₹ 18,920",
            verifiedLabel: "CLEARED",
            gpsAvailable: true,
        },

        {
            id: 3,
            name: "Deepak Varma",
            proId: "PRO-112",
            designation: "Route Verification Lead",
            image: "https://i.pravatar.cc/150?img=11",
            phone: "+91 94460 11928",
            location: "Kochi Central Lab • Desk Audit",
            status: "HQ REVIEW",
            statusType: "review",
            clinicsVisited: 19,
            clinicSubText: "Special Audits",
            expenseClaims: 14,
            expenseSubText: "High Fuel Ratio",
            totalClaimed: "₹ 11,200",
            verifiedAmount: "₹ 11,200",
            verifiedLabel: "APPROVED",
            gpsAvailable: false,
        },

        {
            id: 4,
            name: "Sneha Paul",
            proId: "PRO-118",
            designation: "Clinical Outreach Officer",
            image: "https://i.pravatar.cc/150?img=44",
            phone: "+91 99052 47310",
            location: "Kakkanad IT Zone • Tech Clinics",
            status: "ON FIELD",
            statusType: "on-field",
            clinicsVisited: 27,
            clinicSubText: "+8 vs quota",
            expenseClaims: 19,
            expenseSubText: "Auto-parsed",
            totalClaimed: "₹ 16,340",
            verifiedAmount: "₹ 15,100",
            verifiedLabel: "VERIFIED",
            gpsAvailable: true,
        },

        {
            id: 5,
            name: "Arjun Nair",
            proId: "PRO-121",
            designation: "Field Operations Executive",
            image: "https://i.pravatar.cc/150?img=13",
            phone: "+91 98460 12234",
            location: "Edappally • North Zone",
            status: "ON FIELD",
            statusType: "on-field",
            clinicsVisited: 22,
            clinicSubText: "+2 vs target",
            expenseClaims: 15,
            expenseSubText: "All settled",
            totalClaimed: "₹ 13,500",
            verifiedAmount: "₹ 13,500",
            verifiedLabel: "VERIFIED",
            gpsAvailable: true,
        },

        {
            id: 6,
            name: "Meera Joseph",
            proId: "PRO-126",
            designation: "Clinical Field Executive",
            image: "https://i.pravatar.cc/150?img=45",
            phone: "+91 97460 11223",
            location: "Thrippunithura • South Zone",
            status: "IN TRANSIT",
            statusType: "in-transit",
            clinicsVisited: 29,
            clinicSubText: "+5 vs target",
            expenseClaims: 17,
            expenseSubText: "2 under audit",
            totalClaimed: "₹ 15,800",
            verifiedAmount: "₹ 14,900",
            verifiedLabel: "VERIFIED",
            gpsAvailable: true,
        },

        {
            id: 7,
            name: "Vishnu Raj",
            proId: "PRO-130",
            designation: "Route Diagnostic Officer",
            image: "https://i.pravatar.cc/150?img=14",
            phone: "+91 98470 99881",
            location: "Kaloor • Central Zone",
            status: "HQ REVIEW",
            statusType: "review",
            clinicsVisited: 18,
            clinicSubText: "Review pending",
            expenseClaims: 12,
            expenseSubText: "1 under audit",
            totalClaimed: "₹ 10,400",
            verifiedAmount: "₹ 9,800",
            verifiedLabel: "APPROVED",
            gpsAvailable: false,
        },

        {
            id: 8,
            name: "Fathima Ali",
            proId: "PRO-135",
            designation: "Clinical Outreach Executive",
            image: "https://i.pravatar.cc/150?img=48",
            phone: "+91 97450 88776",
            location: "Vyttila • Medical Zone",
            status: "ON FIELD",
            statusType: "on-field",
            clinicsVisited: 33,
            clinicSubText: "Top Performer",
            expenseClaims: 21,
            expenseSubText: "All settled",
            totalClaimed: "₹ 19,200",
            verifiedAmount: "₹ 19,200",
            verifiedLabel: "CLEARED",
            gpsAvailable: true,
        },
    ]);


    /* =========================================
       FILTER PERSONS
    ========================================= */

    const filteredPersons = useMemo(() => {

        const search =
            searchText.trim().toLowerCase();

        return persons.filter((person) => {

            const matchesSearch =
                !search ||
                person.name
                    .toLowerCase()
                    .includes(search) ||
                person.proId
                    .toLowerCase()
                    .includes(search) ||
                person.phone
                    .toLowerCase()
                    .includes(search) ||
                person.location
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                statusFilter === "all" ||
                person.statusType === statusFilter;


            return (
                matchesSearch &&
                matchesStatus
            );
        });

    }, [
        persons,
        searchText,
        statusFilter,
    ]);


    /* =========================================
       PAGINATION CALCULATION
    ========================================= */

    const totalItems =
        filteredPersons.length;

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                totalItems / rowsPerPage
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
        startIndex + rowsPerPage;


    const currentPersons =
        filteredPersons.slice(
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
       SEARCH
    ========================================= */

    const handleSearch = (event) => {

        setSearchText(
            event.target.value
        );

        setCurrentPage(1);
    };


    /* =========================================
       STATUS FILTER
    ========================================= */

    const handleStatusChange = (event) => {

        setStatusFilter(
            event.target.value
        );

        setCurrentPage(1);
    };


    /* =========================================
       ROW COUNT
    ========================================= */

    const handleRowsChange = (event) => {

        setRowsPerPage(
            Number(event.target.value)
        );

        setCurrentPage(1);
    };


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


    return (

        <div className="personnel-page">


            {/* =====================================
                TOP FILTER SECTION
            ====================================== */}

            <div className="personnel-filter-bar">


                {/* SEARCH */}

                <div className="personnel-search">

                    <span className="search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        value={searchText}
                        onChange={handleSearch}
                        placeholder="Search personnel by name, PRO ID, mobile, or location"
                    />

                </div>


                {/* DATE RANGE */}

                <div className="personnel-date-range">

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
                    className="personnel-filter-select"
                    value={statusFilter}
                    onChange={
                        handleStatusChange
                    }
                >

                    <option value="all">
                        All Active Personnel
                    </option>

                    <option value="on-field">
                        On Field
                    </option>

                    <option value="in-transit">
                        In Transit
                    </option>

                    <option value="review">
                        HQ Review
                    </option>

                    <option value="offline">
                        Offline
                    </option>

                </select>

            </div>


            {/* =====================================
                SECTION HEADER
            ====================================== */}

            <div className="personnel-section-header">


                <div className="deployment-title-row">

                    <h2>
                        Active Field Deployments
                    </h2>


                    <span className="active-pro-badge">

                        {totalItems} ACTIVE FIELD PROS

                    </span>


                    <span className="deployment-range">

                        Range:{" "}

                        {startDate}

                        {" - "}

                        {endDate}

                    </span>

                </div>


                <div className="gps-pulse">

                    <span />

                    Real-time GPS telemetry pulse:
                    active

                </div>

            </div>


            {/* =====================================
                PERSON CARDS
            ====================================== */}

            {currentPersons.length > 0 ? (

                <div className="personnel-card-grid">

                    {currentPersons.map(
                        (person) => (

                            <PersonDetailedCard
                                key={person.id}
                                person={person}
                            />

                        )
                    )}

                </div>

            ) : (

                <div className="personnel-empty">

                    No personnel found

                </div>

            )}


            {/* =====================================
                PAGINATION
            ====================================== */}

            <div className="personnel-pagination">


                {/* LEFT */}

                <div className="pagination-information">

                    <strong>

                        Showing{" "}

                        {showingFrom}

                        {"–"}

                        {showingTo}

                        {" of "}

                        {totalItems}

                        {" Personnel"}

                    </strong>


                    <span className="pagination-dot">
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

                        <option value={4}>
                            4
                        </option>

                        <option value={6}>
                            6
                        </option>

                        <option value={8}>
                            8
                        </option>

                        <option value={10}>
                            10
                        </option>

                    </select>

                </div>


                {/* RIGHT */}

                <div className="pagination-buttons">


                    {/* FIRST */}

                    <button
                        type="button"
                        disabled={
                            safeCurrentPage === 1
                        }
                        onClick={() =>
                            goToPage(1)
                        }
                    >
                        |‹
                    </button>


                    {/* PREVIOUS */}

                    <button
                        type="button"
                        disabled={
                            safeCurrentPage === 1
                        }
                        onClick={() =>
                            goToPage(
                                safeCurrentPage - 1
                            )
                        }
                    >
                        ‹
                    </button>


                    {/* PAGE NUMBERS */}

                    {Array.from(
                        {
                            length:
                                totalPages,
                        },
                        (_, index) =>
                            index + 1
                    )
                        .slice(
                            Math.max(
                                0,
                                safeCurrentPage - 3
                            ),
                            Math.max(
                                0,
                                safeCurrentPage - 3
                            ) + 5
                        )
                        .map((page) => (

                            <button
                                type="button"
                                key={page}
                                className={
                                    safeCurrentPage ===
                                        page
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    goToPage(page)
                                }
                            >

                                {page}

                            </button>

                        ))}


                    {/* NEXT */}

                    <button
                        type="button"
                        disabled={
                            safeCurrentPage ===
                            totalPages
                        }
                        onClick={() =>
                            goToPage(
                                safeCurrentPage + 1
                            )
                        }
                    >
                        ›
                    </button>


                    {/* LAST */}

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
            <AllPersonDetails />

        </div>
    );
}