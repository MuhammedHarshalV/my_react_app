import { useState } from "react";

import "./AllPersonDetails.css";


function AllPersonDetails() {

    /* =========================================
       PAGINATION
    ========================================= */

    const [currentPage, setCurrentPage] =
        useState(1);

    const [rowsPerPage, setRowsPerPage] =
        useState(7);


    /* =========================================
       DUMMY DATA

       Later replace this array with API response
    ========================================= */

    const [persons] = useState([
        {
            id: 1,
            initials: "RM",
            name: "Rahul Menon",
            email: "rahul.m@diagnostics-pro.in",

            designation: "Field Medical PRO",
            grade: "GRADE II",
            role: "DISPATCH",

            phone: "+91 98471 23091",

            node: "Kochi Central Lab",

            lastEntryDate: "Today, 11:20 AM",
            lastEntry:
                "Fuel Reimbursement (₹ 450)",

            performance:
                "24 Clinics • ₹ 14,850",
            submissions:
                "18 Submissions",

            status: "ACTIVE DUTY",
            statusType: "active",
        },

        {
            id: 2,
            initials: "AS",
            name: "Ananya Sharma",
            email: "ananya.s@diagnostics-pro.in",

            designation:
                "Clinic Liaison Officer",
            grade: "GRADE I",
            role: "STRATEGIC",

            phone: "+91 97455 88204",

            node: "Aluva Satellite Station",

            lastEntryDate: "Today, 10:45 AM",
            lastEntry:
                "Doctor Meet Lunch (₹ 1,200)",

            performance:
                "31 Clinics • ₹ 18,920",
            submissions:
                "22 Submissions",

            status: "IN TRANSIT",
            statusType: "transit",
        },

        {
            id: 3,
            initials: "MR",
            name: "Mohammad Riyaz",
            email: "riyaz.m@diagnostics-pro.in",

            designation:
                "Lab Sample Courier",
            grade: "EXPRESS",
            role: "LOGISTICS",

            phone: "+91 98950 44219",

            node: "Kakkanad Hub",

            lastEntryDate: "Today, 09:15 AM",
            lastEntry:
                "Cold Chain Ice Packs (₹ 380)",

            performance:
                "42 Pickups • ₹ 8,420",
            submissions:
                "26 Submissions",

            status: "ACTIVE DUTY",
            statusType: "active",
        },

        {
            id: 4,
            initials: "DV",
            name: "Deepak Varma",
            email: "deepak.v@diagnostics-pro.in",

            designation:
                "Area Operations Lead",
            grade: "SUPERVISOR",
            role: "",

            phone: "+91 94460 11928",

            node: "Kochi Central Lab",

            lastEntryDate:
                "Yesterday, 06:45 PM",
            lastEntry:
                "Mystery Travel (₹ 2,100)",

            performance:
                "19 Clinics • ₹ 11,200",
            submissions:
                "14 Submissions",

            status: "STATION DUTY",
            statusType: "station",
        },

        {
            id: 5,
            initials: "SP",
            name: "Sneha Paul",
            email: "sneha.p@diagnostics-pro.in",

            designation:
                "Field Outreach PRO",
            grade: "GRADE I",
            role: "FLEET",

            phone: "+91 99952 47310",

            node: "Kakkanad Hub",

            lastEntryDate: "Today, 08:30 AM",
            lastEntry:
                "Toll + Parking Tag (₹ 180)",

            performance:
                "27 Clinics • ₹ 16,340",
            submissions:
                "19 Submissions",

            status: "ACTIVE DUTY",
            statusType: "active",
        },

        {
            id: 6,
            initials: "GK",
            name: "George Kutty",
            email: "george.k@diagnostics-pro.in",

            designation:
                "Financial Auditor",
            grade: "COMPLIANCE",
            role: "",

            phone: "+91 94478 92011",

            node: "Central Audit Desk",

            lastEntryDate: "24 Oct 2026",
            lastEntry:
                "Audit Stationary (₹ 650)",

            performance:
                "0 Clinics • ₹ 650",
            submissions:
                "Internal Lead",

            status: "AUDIT STAFF",
            statusType: "audit",
        },

        {
            id: 7,
            initials: "KN",
            name: "Kavita Nair",
            email: "kavita.n@diagnostics-pro.in",

            designation:
                "Field Medical PRO",
            grade: "GRADE I",
            role: "ROUTE NORTH",

            phone: "+91 97471 00384",

            node: "Aluva Satellite Station",

            lastEntryDate: "19 Oct 2026",
            lastEntry:
                "Standard Route Allowance",

            performance:
                "14 Clinics • ₹ 9,200",
            submissions:
                "11 Submissions",

            status: "ON LEAVE",
            statusType: "leave",
        },

        {
            id: 8,
            initials: "AN",
            name: "Arjun Nair",
            email: "arjun.n@diagnostics-pro.in",

            designation:
                "Field Operations PRO",
            grade: "GRADE II",
            role: "FLEET",

            phone: "+91 98460 12234",

            node: "Edappally Hub",

            lastEntryDate: "18 Oct 2026",
            lastEntry:
                "Fuel Expense (₹ 780)",

            performance:
                "22 Clinics • ₹ 13,500",
            submissions:
                "16 Submissions",

            status: "ACTIVE DUTY",
            statusType: "active",
        },
    ]);


    /* =========================================
       PAGINATION CALCULATION
    ========================================= */

    const totalItems =
        persons.length;

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                totalItems / rowsPerPage
            )
        );


    const startIndex =
        (currentPage - 1) *
        rowsPerPage;


    const endIndex =
        startIndex + rowsPerPage;


    const currentPersons =
        persons.slice(
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
       ROW CHANGE
    ========================================= */

    const handleRowsChange = (event) => {

        setRowsPerPage(
            Number(event.target.value)
        );

        setCurrentPage(1);
    };


    /* =========================================
       ACTIONS
    ========================================= */

    const handleProfile = (person) => {

        console.log(
            "Profile:",
            person
        );
    };


    const handleHistory = (person) => {

        console.log(
            "History:",
            person
        );
    };


    const handleMore = (person) => {

        console.log(
            "More:",
            person
        );
    };


    return (

        <div className="all-person-card">


            {/* =====================================
                HEADER
            ====================================== */}

            <div className="all-person-header">


                <div className="all-person-title-section">

                    <div className="all-person-title-row">

                        <h2>
                            Comprehensive User Directory
                            & Historical Ledger
                        </h2>


                        <span className="audit-master-badge">
                            AUDIT MASTER
                        </span>

                    </div>


                    <p>
                        Showing complete roster with
                        lifetime visits, active telemetry
                        nodes, and cumulative verified
                        claims.
                    </p>

                </div>


                <div className="all-person-header-actions">

                    <button
                        type="button"
                        onClick={() =>
                            console.log(
                                "Customize Columns"
                            )
                        }
                    >
                        <span>
                            ▥
                        </span>

                        Customize Columns
                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            console.log(
                                "Sync Ledger"
                            )
                        }
                    >
                        <span>
                            ↻
                        </span>

                        Sync Ledger
                    </button>

                </div>

            </div>


            {/* =====================================
                TABLE SCROLL AREA
            ====================================== */}

            <div className="all-person-table-scroll">

                <table className="all-person-table">


                    {/* =================================
                        TABLE HEADER
                    ================================== */}

                    <thead>

                        <tr>

                            <th>
                                USER PROFILE & NAME
                            </th>

                            <th>
                                DESIGNATION & ROLE
                            </th>

                            <th>
                                CONTACT
                            </th>

                            <th>
                                ASSIGNED NODE
                            </th>

                            <th>
                                LAST ENTRY DATE
                            </th>

                            <th>
                                MTD PERFORMANCE
                            </th>

                            <th>
                                STATUS
                            </th>

                            <th className="actions-column">
                                ACTIONS
                            </th>

                        </tr>

                    </thead>


                    {/* =================================
                        TABLE BODY
                    ================================== */}

                    <tbody>

                        {currentPersons.map(
                            (person) => (

                                <tr key={person.id}>


                                    {/* =================
                                        USER
                                    ================== */}

                                    <td>

                                        <div className="directory-user">

                                            <div
                                                className={`directory-avatar ${person.statusType ===
                                                    "transit"
                                                    ? "avatar-red"
                                                    : ""
                                                    }`}
                                            >
                                                {
                                                    person.initials
                                                }
                                            </div>


                                            <div className="directory-user-info">

                                                <strong>
                                                    {
                                                        person.name
                                                    }
                                                </strong>

                                                <span>
                                                    {
                                                        person.email
                                                    }
                                                </span>

                                            </div>

                                        </div>

                                    </td>


                                    {/* =================
                                        DESIGNATION
                                    ================== */}

                                    <td>

                                        <div className="directory-designation">

                                            <strong>
                                                {
                                                    person.designation
                                                }
                                            </strong>


                                            <span>
                                                {
                                                    person.grade
                                                }

                                                {person.role &&
                                                    ` • ${person.role}`
                                                }
                                            </span>

                                        </div>

                                    </td>


                                    {/* =================
                                        CONTACT
                                    ================== */}

                                    <td>

                                        <span className="directory-contact">
                                            {person.phone}
                                        </span>

                                    </td>


                                    {/* =================
                                        NODE
                                    ================== */}

                                    <td>

                                        <div className="directory-node">

                                            <span className="node-location-icon">
                                                ♧
                                            </span>

                                            <span>
                                                {person.node}
                                            </span>

                                        </div>

                                    </td>


                                    {/* =================
                                        LAST ENTRY
                                    ================== */}

                                    <td>

                                        <div className="directory-entry">

                                            <strong>
                                                {
                                                    person.lastEntryDate
                                                }
                                            </strong>

                                            <span>
                                                {
                                                    person.lastEntry
                                                }
                                            </span>

                                        </div>

                                    </td>


                                    {/* =================
                                        PERFORMANCE
                                    ================== */}

                                    <td>

                                        <div className="directory-performance">

                                            <strong>
                                                {
                                                    person.performance
                                                }
                                            </strong>

                                            <span>
                                                {
                                                    person.submissions
                                                }
                                            </span>

                                        </div>

                                    </td>


                                    {/* =================
                                        STATUS
                                    ================== */}

                                    <td>

                                        <span
                                            className={`directory-status ${person.statusType
                                                }`}
                                        >
                                            <span className="status-dot" />

                                            {
                                                person.status
                                            }

                                        </span>

                                    </td>


                                    {/* =================
                                        ACTIONS
                                    ================== */}

                                    <td>

                                        <div className="directory-actions">

                                            <button
                                                type="button"
                                                title="View Profile"
                                                onClick={() =>
                                                    handleProfile(
                                                        person
                                                    )
                                                }
                                            >
                                                ◎
                                            </button>


                                            <button
                                                type="button"
                                                title="History"
                                                onClick={() =>
                                                    handleHistory(
                                                        person
                                                    )
                                                }
                                            >
                                                ↻
                                            </button>


                                            <button
                                                type="button"
                                                title="More"
                                                onClick={() =>
                                                    handleMore(
                                                        person
                                                    )
                                                }
                                            >
                                                ⋮
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>


            {/* =====================================
                FOOTER / PAGINATION
            ====================================== */}

            <div className="all-person-footer">


                {/* LEFT */}

                <div className="all-person-footer-info">

                    <strong>

                        Showing{" "}

                        {showingFrom}

                        {"–"}

                        {showingTo}

                        {" of "}

                        {totalItems}

                        {" Personnel"}

                    </strong>


                    <span className="footer-dot">
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

                        <option value={7}>
                            7
                        </option>

                        <option value={10}>
                            10
                        </option>

                        <option value={20}>
                            20
                        </option>

                        <option value={50}>
                            50
                        </option>

                    </select>

                </div>


                {/* RIGHT */}

                <div className="all-person-pagination">


                    {/* FIRST */}

                    <button
                        type="button"
                        disabled={
                            currentPage === 1
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
                            currentPage === 1
                        }
                        onClick={() =>
                            goToPage(
                                currentPage - 1
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
                    ).map((page) => (

                        <button
                            type="button"
                            key={page}
                            className={
                                currentPage ===
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
                            currentPage ===
                            totalPages
                        }
                        onClick={() =>
                            goToPage(
                                currentPage + 1
                            )
                        }
                    >
                        ›
                    </button>


                    {/* LAST */}

                    <button
                        type="button"
                        disabled={
                            currentPage ===
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

        </div>
    );
}


export default AllPersonDetails;