import { useEffect, useState } from "react";
import "./ExpenseCard.css";
import { getAllExpensesApi } from "../../services/api/expenseDetails/getAllExpensesApi";

const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Number(amount || 0));

export default function ExpenseCard() {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filters
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [expenseType, setExpenseType] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // API summary
    const [summary, setSummary] = useState({
        totalClaimedAmount: 0,
        totalClaimsCount: 0,
        totalApprovedAmount: 0,
        approvedClaimsCount: 0,
    });

    const [pagination, setPagination] = useState({
        totalPages: 1,
        limit: 10,
        totalRecords: 0,
    });

    // Search debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);

    // Load expenses from API
    useEffect(() => {
        let isActive = true;

        const loadExpenses = async () => {
            try {
                setIsLoading(true);

                const params = {
                    search: debouncedSearch,
                    startDate: startDate || undefined,
                    endDate: endDate || undefined,

                    expenseType:
                        expenseType === "All" ? "" : expenseType,

                    isApproved:
                        statusFilter === "All"
                            ? undefined
                            : statusFilter === "approved"
                                ? true
                                : false,

                    page: currentPage,
                    limit: rowsPerPage,
                };

                const response = await getAllExpensesApi(params);

                // Supports both API payload and Axios response formats
                const result =
                    response?.success !== undefined
                        ? response
                        : response?.data ?? response;

                if (!isActive) return;

                // Format API data for existing UI
                const formattedExpenses = (result.data || []).map(
                    (expense) => {
                        const isApproved =
                            expense.approvedAmount != null;

                        return {
                            id: expense.expenseId,

                            voucherNo: `EXP-${expense.expenseId}`,

                            category:
                                expense.expenseCategory || "Other",

                            employee: expense.name || "Unknown",

                            proId: expense.proId || "",



                            location:
                                expense.clinicName || "N/A",

                            expenseType:
                                expense.expenseCategory || "Other",

                            description:
                                expense.description || "",

                            submittedAt: expense.expenseDate
                                ? new Date(
                                    expense.expenseDate
                                ).toLocaleString("en-IN")
                                : "",

                            date: expense.expenseDate,

                            receipt:
                                expense.receiptPhotoUrl || null,

                            claimedAmount: Number(
                                expense.expenseAmount || 0
                            ),

                            approvedAmount:
                                expense.approvedAmount,

                            personCount:
                                expense.personCount == null ? 1 : expense.personCount,

                            status: isApproved
                                ? "APPROVED"
                                : "PENDING REVIEW",

                            statusType: isApproved
                                ? "approved"
                                : "pending",
                        };
                    }
                );

                setExpenses(formattedExpenses);

                // Summary from API
                setSummary({
                    totalClaimedAmount: Number(
                        result.totalClaimedAmount || 0
                    ),

                    totalClaimsCount: Number(
                        result.totalClaimsCount || 0
                    ),

                    totalApprovedAmount: Number(
                        result.totalApprovedAmount || 0
                    ),

                    approvedClaimsCount: Number(
                        result.approvedClaimsCount || 0
                    ),
                });

                // Pagination from API
                setPagination({
                    totalPages: Number(
                        result.pagination?.totalPages || 1
                    ),

                    limit: Number(
                        result.pagination?.limit || rowsPerPage
                    ),

                    totalRecords: Number(
                        result.pagination?.totalRecords || 0
                    ),
                });

            } catch (error) {
                console.error(
                    "Failed to load expenses:",
                    error
                );

                if (isActive) {
                    setExpenses([]);

                    setSummary({
                        totalClaimedAmount: 0,
                        totalClaimsCount: 0,
                        totalApprovedAmount: 0,
                        approvedClaimsCount: 0,
                    });

                    setPagination({
                        totalPages: 1,
                        limit: rowsPerPage,
                        totalRecords: 0,
                    });
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        };

        loadExpenses();

        return () => {
            isActive = false;
        };
    }, [
        debouncedSearch,
        expenseType,
        statusFilter,
        startDate,
        endDate,
        currentPage,
        rowsPerPage,
    ]);





    // Pagination values
    const totalPages = Math.max(
        Number(pagination.totalPages) || 1,
        1
    );

    const safePage = Math.min(
        currentPage,
        totalPages
    );

    const totalRecords = pagination.totalRecords;

    const startItem =
        totalRecords === 0
            ? 0
            : (safePage - 1) * rowsPerPage + 1;

    const endItem = Math.min(
        safePage * rowsPerPage,
        totalRecords
    );

    // API already returns filtered and paginated records
    const visibleExpenses = expenses;

    // Summary values
    const totalClaimed = summary.totalClaimedAmount;

    const approvedCount = summary.approvedClaimsCount;

    const pendingCount =
        summary.totalClaimsCount -
        summary.approvedClaimsCount;

    // Expense categories available in current API response
    const expenseCategories = [
        "Stationery",
        "Other Expense",
        "Food & Lunch",
        "Fuel / Travel",
        "Hotel / Stay",
        "Medical Demo",
    ];

    return (
        <section className="expense-page">

            {/* Header */}
            <header className="expense-page-header">
                <div>
                    <span className="expense-eyebrow">
                        AUDITING
                    </span>

                    <h1>
                        Field Expenses & Bill Approvals
                    </h1>

                    <p>
                        Audit submitted vouchers, inspect receipts and
                        verify field expense claims.
                    </p>
                </div>
            </header>

            {/* Summary Cards */}
            <div className="expense-summary-grid">

                <SummaryCard
                    title="TOTAL CLAIMED"
                    value={formatCurrency(totalClaimed)}
                    subtitle={`${summary.totalClaimsCount} total claims`}
                    claimed
                />

                <SummaryCard
                    title="APPROVED & QUEUED"
                    value={formatCurrency(summary.totalApprovedAmount)}
                    subtitle={`${approvedCount} approved`}
                    approved
                />

                <SummaryCard
                    title="PENDING REVIEW"
                    value={pendingCount}
                    subtitle="Awaiting supervisor review"
                    danger
                />

            </div>

            {/* Filters */}
            <div className="expense-filter-panel">

                {/* Search */}
                <label className="expense-search">
                    <span>⌕</span>

                    <input
                        type="search"
                        placeholder="Search employee name..."
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </label>

                {/* Expense Type */}
                <select
                    value={expenseType}
                    onChange={(event) => {
                        setExpenseType(event.target.value);
                        setCurrentPage(1);
                    }}
                    aria-label="Filter by expense type"
                >
                    <option value="All">
                        All Expense Types
                    </option>

                    {expenseCategories.map((category) => (
                        <option
                            key={category}
                            value={category}
                        >
                            {category}
                        </option>
                    ))}
                </select>

                {/* Status */}
                <select
                    value={statusFilter}
                    onChange={(event) => {
                        setStatusFilter(event.target.value);
                        setCurrentPage(1);
                    }}
                    aria-label="Filter by approval status"
                >
                    <option value="All">
                        All
                    </option>

                    <option value="approved">
                        Approved
                    </option>

                    <option value="pending">
                        Not Approved
                    </option>
                </select>

                {/* Date Range */}
                <div className="expense-date-range">

                    <input
                        type="date"
                        aria-label="Start date"
                        value={startDate}
                        onChange={(event) => {
                            setStartDate(event.target.value);
                            setCurrentPage(1);
                        }}
                    />

                    <span>to</span>

                    <input
                        type="date"
                        aria-label="End date"
                        value={endDate}
                        onChange={(event) => {
                            setEndDate(event.target.value);
                            setCurrentPage(1);
                        }}
                    />

                </div>

            </div>

            {/* List Heading */}
            <div className="expense-list-heading">

                <strong>
                    Showing {startItem}–{endItem} of{" "}
                    {totalRecords} vouchers
                </strong>

                <span>
                    Route Group: Central Kerala
                </span>

            </div>

            {/* Expense List */}
            {isLoading ? (

                <div className="expense-empty">
                    Loading expenses…
                </div>

            ) : visibleExpenses.length === 0 ? (

                <div className="expense-empty">
                    No expense vouchers match your filters.
                </div>

            ) : (

                <div className="expense-list">

                    {visibleExpenses.map((expense, index) => (

                        <article
                            className="expense-card"
                            key={index}
                        >

                            <div className="expense-card-main">

                                {/* Employee Information */}
                                <div className="expense-voucher-info">

                                    <strong>
                                        #{expense.voucherNo}

                                        <span className="expense-category-tag">
                                            {expense.category}
                                        </span>
                                    </strong>

                                    <div className="expense-employee">

                                        <span className="expense-avatar">
                                            {expense.employee
                                                .split(" ")
                                                .map((part) => part[0])
                                                .slice(0, 2)
                                                .join("")}
                                        </span>

                                        <div>
                                            <b>
                                                {expense.employee}
                                            </b>


                                        </div>

                                    </div>

                                    <p className="expense-location">
                                        ◉ {expense.location}
                                    </p>

                                </div>

                                {/* Expense Description */}
                                <div className="expense-description">

                                    <div className="expense-date-category">
                                        <strong>
                                            {expense.expenseType}
                                        </strong>
                                        <p>
                                            {expense.description}
                                        </p>
                                        <small>
                                            {expense.date
                                                ? new Date(expense.date).toLocaleDateString("en-IN")
                                                : ""}
                                        </small>
                                    </div>

                                    <div className="expense-person-count">
                                        <span>Persons</span>
                                        <strong>{expense.personCount ?? 0}</strong>
                                    </div>

                                </div>

                                {/* Receipt */}
                                <div className="expense-receipt">

                                    {expense.receipt == null ? <div className="expense-receipt-placeholder">
                                        ▧
                                    </div> : <img
                                        src={expense.receipt}
                                        alt="Expense receipt"
                                        className="expense-receipt-placeholder"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                            e.currentTarget.nextElementSibling.style.display = "flex";
                                        }}
                                    />}

                                    <div>

                                        <span>
                                            RECEIPT FILE
                                        </span>

                                        <b>
                                            {expense.receipt
                                                ? "Receipt available"
                                                : "No receipt"}
                                        </b>

                                        {expense.receipt && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    window.open(
                                                        expense.receipt,
                                                        "_blank",
                                                        "noopener,noreferrer"
                                                    )
                                                }
                                            >
                                                View / Scan
                                            </button>
                                        )}

                                    </div>

                                </div>

                                {/* Amounts */}
                                <div className="expense-amounts">

                                    <span>
                                        Claimed
                                    </span>

                                    <strong>
                                        {formatCurrency(expense.claimedAmount)}
                                    </strong>

                                    {expense.approvedAmount == null ? (
                                        <>
                                            <label htmlFor={`approved-${expense.id}`}>
                                                Approved amount
                                            </label>

                                            <input
                                                id={`approved-${expense.id}`}
                                                type="number"
                                                min="0"
                                                max={expense.claimedAmount}
                                                defaultValue={expense.claimedAmount}
                                                aria-label={`Approved amount for ${expense.voucherNo}`}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <label>Approved amount</label>

                                            <strong>
                                                {formatCurrency(expense.approvedAmount)}
                                            </strong>
                                        </>
                                    )}

                                </div>
                                {/* Actions */}
                                <div className="expense-card-actions">

                                    <span
                                        className={`expense-status ${expense.statusType}`}
                                    >
                                        {expense.status}
                                    </span>

                                    {expense.statusType === "pending" && (
                                        <>
                                            <button
                                                type="button"
                                                className="expense-approve-button"
                                                onClick={() =>
                                                    approveExpense(expense)
                                                }
                                            >
                                                ✓ Approve
                                            </button>

                                            <button
                                                type="button"
                                                className="expense-icon-button"
                                                title="Reject voucher"
                                                onClick={() =>
                                                    rejectExpense(expense)
                                                }
                                            >
                                                ×
                                            </button>
                                        </>
                                    )}





                                </div>

                            </div>

                        </article>

                    ))}

                </div>

            )}

            {/* Pagination */}
            <footer className="expense-pagination">

                <div className="expense-pagination-info">

                    <span>
                        Showing{" "}
                        <strong>{startItem}-{endItem}</strong>
                        {" "}of{" "}
                        <strong>{totalRecords}</strong>
                        {" "}expenses
                    </span>

                    <label>
                        Rows:

                        <select
                            value={rowsPerPage}
                            onChange={(event) => {
                                setRowsPerPage(
                                    Number(event.target.value)
                                );

                                setCurrentPage(1);
                            }}
                        >
                            <option value={6}>6</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>

                    </label>

                </div>

                <div className="expense-pagination-buttons">

                    {/* First Page */}
                    <button
                        type="button"
                        disabled={safePage === 1 || isLoading}
                        onClick={() => setCurrentPage(1)}
                        aria-label="First page"
                    >
                        «
                    </button>

                    {/* Previous Page */}
                    <button
                        type="button"
                        disabled={safePage === 1 || isLoading}
                        onClick={() =>
                            setCurrentPage(safePage - 1)
                        }
                        aria-label="Previous page"
                    >
                        ‹
                    </button>

                    {/* Page Numbers */}
                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    ).map((page) => (

                        <button
                            type="button"
                            key={page}
                            className={
                                safePage === page ? "active" : ""
                            }
                            aria-current={
                                safePage === page
                                    ? "page"
                                    : undefined
                            }
                            disabled={isLoading}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>

                    ))}

                    {/* Next Page */}
                    <button
                        type="button"
                        disabled={
                            safePage === totalPages || isLoading
                        }
                        onClick={() =>
                            setCurrentPage(safePage + 1)
                        }
                        aria-label="Next page"
                    >
                        ›
                    </button>

                    {/* Last Page */}
                    <button
                        type="button"
                        disabled={
                            safePage === totalPages || isLoading
                        }
                        onClick={() =>
                            setCurrentPage(totalPages)
                        }
                        aria-label="Last page"
                    >
                        »
                    </button>

                </div>

            </footer>

        </section>
    );
}


// Summary Card Component
function SummaryCard({
    title,
    value,
    subtitle,
    danger = false,
    claimed = false,
    approved = false,
}) {
    return (
        <div
            className={`expense-summary-card
                ${danger ? "danger" : ""}
                ${claimed ? "claimed" : ""}
                ${approved ? "approved" : ""}
            `}
        >
            <span>{title}</span>
            <strong>{value}</strong>
            <small>{subtitle}</small>
        </div>
    );
}