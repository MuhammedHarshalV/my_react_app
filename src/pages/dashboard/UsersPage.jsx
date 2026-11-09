import { useEffect, useRef, useState } from "react";

import PersonDetailedCard from "../../components/personel/PersonDetailedCard";
import { getUsersNameApi } from "../../services/api/users/getUsersDetailsApi";

import "./UsersPage.css";


export default function UsersPage() {

    /* =========================================
       DEFAULT DATE
    ========================================= */

    const getToday = () => {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const getMonthStart = () => {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");

        return `${year}-${month}-01`;
    };


    /* =========================================
       FILTER STATES
    ========================================= */

    const [searchText, setSearchText] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [startDate, setStartDate] = useState(getMonthStart());
    const [endDate, setEndDate] = useState(getToday());


    /* =========================================
       PERSON DATA
    ========================================= */

    const [persons, setPersons] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");


    /* =========================================
       PAGINATION
    ========================================= */

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);


    /* =========================================
       REQUEST CONTROL
    ========================================= */

    const requestId = useRef(0);


    /* =========================================
       SEARCH DEBOUNCE
    ========================================= */

    useEffect(() => {

        const timer = setTimeout(() => {
            setDebouncedSearch(searchText);
        }, 400);

        return () => clearTimeout(timer);

    }, [searchText]);


    /* =========================================
       GET USER DETAILS API
    ========================================= */

    const fetchUsers = async () => {

        const currentRequestId = ++requestId.current;

        try {

            setIsLoading(true);
            setError("");

            const params = {
                search: debouncedSearch.trim(),
                startDate: startDate,
                endDate: endDate,
                page: currentPage,
                limit: rowsPerPage,
            };

            console.log("GET USERS API PARAMS:", params);


            const response = await getUsersNameApi(params);




            // Ignore older API responses.
            if (currentRequestId !== requestId.current) {
                return;
            }


            if (response?.success) {

                const users = Array.isArray(response.data)
                    ? response.data
                    : [];


                /* =====================================
                   API DATA MAPPING
                ===================================== */



                setPersons(users);


                /* =====================================
                   PAGINATION DATA FROM API
                ===================================== */

                setTotalItems(
                    response.pagination?.totalRecords ?? 0
                );

                setTotalPages(
                    Math.max(
                        response.pagination?.totalPages ?? 1,
                        1
                    )
                );

            } else {

                setPersons([]);
                setTotalItems(0);
                setTotalPages(1);

                setError(
                    response?.message || "Failed to fetch users"
                );

            }

        } catch (error) {

            if (currentRequestId === requestId.current) {

                console.error("GET USERS ERROR:", error);

                setPersons([]);
                setTotalItems(0);
                setTotalPages(1);

                setError("Something went wrong while fetching users");

            }

        } finally {

            if (currentRequestId === requestId.current) {
                setIsLoading(false);
            }

        }
    };


    /* =========================================
       API CALLING ON FILTER / PAGE CHANGE
    ========================================= */

    useEffect(() => {

        fetchUsers();

        return () => {
            requestId.current++;
        };

    }, [
        debouncedSearch,
        startDate,
        endDate,
        currentPage,
        rowsPerPage,
    ]);


    /* =========================================
       PAGINATION CALCULATION
    ========================================= */

    const showingFrom = totalItems === 0
        ? 0
        : (currentPage - 1) * rowsPerPage + 1;


    const showingTo = Math.min(
        currentPage * rowsPerPage,
        totalItems
    );


    const currentPersons = persons;


    /* =========================================
       SEARCH
    ========================================= */

    const handleSearch = (event) => {

        setSearchText(event.target.value);

        setCurrentPage(1);

    };


    /* =========================================
       START DATE
    ========================================= */

    const handleStartDate = (event) => {

        setStartDate(event.target.value);

        setCurrentPage(1);

    };


    /* =========================================
       END DATE
    ========================================= */

    const handleEndDate = (event) => {

        setEndDate(event.target.value);

        setCurrentPage(1);

    };


    /* =========================================
       ROW COUNT CHANGE
    ========================================= */

    const handleRowsChange = (event) => {

        setRowsPerPage(Number(event.target.value));

        setCurrentPage(1);

    };


    /* =========================================
       PAGE CHANGE
    ========================================= */

    const goToPage = (page) => {

        if (
            page < 1 ||
            page > totalPages ||
            page === currentPage
        ) {
            return;
        }

        setCurrentPage(page);

    };


    /* =========================================
       PAGE NUMBER DISPLAY
    ========================================= */

    const getPageNumbers = () => {

        const maxVisiblePages = 5;

        let startPage = Math.max(
            currentPage - 2,
            1
        );

        let endPage = Math.min(
            startPage + maxVisiblePages - 1,
            totalPages
        );

        startPage = Math.max(
            endPage - maxVisiblePages + 1,
            1
        );

        return Array.from(
            {
                length: endPage - startPage + 1,
            },
            (_, index) => startPage + index
        );

    };


    /* =========================================
       RETURN
    ========================================= */

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
                        placeholder="Search Employee name..."
                    />

                </div>


                {/* DATE RANGE */}

                <div className="personnel-date-range">

                    <input
                        type="date"
                        value={startDate}
                        onChange={handleStartDate}
                    />

                    <span>
                        -
                    </span>

                    <input
                        type="date"
                        value={endDate}
                        onChange={handleEndDate}
                    />

                </div>


            </div>


            {/* =====================================
                SECTION HEADER
            ====================================== */}

            <div className="personnel-section-header">


                <div className="deployment-title-row">

                    <h2>
                        Active Employees
                    </h2>

                    <span className="deployment-range">

                        Range:{" "}

                        {startDate}

                        {" - "}

                        {endDate}

                    </span>

                </div>


                <div className="gps-pulse">

                    <span />

                    Real-time Result

                </div>

            </div>


            {/* =====================================
                PERSON CARDS
            ====================================== */}

            {isLoading ? (

                <div className="personnel-empty">

                    Loading personnel...

                </div>

            ) : error ? (

                <div className="personnel-empty">

                    {error}

                </div>

            ) : currentPersons.length > 0 ? (

                <div className="personnel-card-grid">

                    {currentPersons.map((person, index) => (

                        <PersonDetailedCard
                            key={index}
                            person={person}
                        />

                    ))}

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
                        onChange={handleRowsChange}
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
                        disabled={currentPage === 1}
                        onClick={() => goToPage(1)}
                    >
                        |‹
                    </button>


                    {/* PREVIOUS */}

                    <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => goToPage(currentPage - 1)}
                    >
                        ‹
                    </button>


                    {/* PAGE NUMBERS */}

                    {getPageNumbers().map((page) => (

                        <button
                            type="button"
                            key={page}
                            className={
                                currentPage === page
                                    ? "active"
                                    : ""
                            }
                            onClick={() => goToPage(page)}
                        >

                            {page}

                        </button>

                    ))}


                    {/* NEXT */}

                    <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() => goToPage(currentPage + 1)}
                    >
                        ›
                    </button>


                    {/* LAST */}

                    <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() => goToPage(totalPages)}
                    >
                        ›|
                    </button>


                </div>

            </div>


        </div>

    );

}