import { useEffect, useState } from "react";
import "./ExpenseCard.css";

import { getAllExpensesApi } from "../../services/api/expenseDetails/getAllExpensesApi";
import { approveExpensesApi } from "../../services/api/expenseDetails/expenseApprovelApi";
import { toast } from "react-toastify";

const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Number(amount || 0));

export default function ExpenseCard({
    employeeName = "",
    startDate: initialStartDate = "",
    endDate: initialEndDate = "",
    filter = "" }) {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedExpenses, setSelectedExpenses] = useState([]);
    const [approvedAmounts, setApprovedAmounts] = useState({});
    const [isApproving, setIsApproving] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);


    // Filters
    const [search, setSearch] = useState(employeeName);
    const [debouncedSearch, setDebouncedSearch] = useState(employeeName);

    const [expenseType, setExpenseType] = useState("All");

    const [statusFilter, setStatusFilter] = useState(
        filter === "all" || !filter ? "All" : filter
    );

    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Summary
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

    // Load expenses
    useEffect(() => {
        let isActive = true;

        const loadExpenses = async () => {
            try {
                setIsLoading(true);
                setSelectedExpenses([]);

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

                const result =
                    response?.success !== undefined
                        ? response
                        : response?.data ?? response;

                if (!isActive) return;

                const formattedExpenses = (result.data || []).map(
                    (expense) => {
                        const isApproved =
                            expense.approvedAmount != null;

                        return {
                            id: expense.expenseId,
                            voucherNo: `EXP-${expense.expenseId}`,
                            category: expense.expenseCategory || "Other",
                            employee: expense.name || "Unknown",
                            proId: expense.proId || "",
                            location: expense.clinicName || "N/A",
                            expenseType: expense.expenseCategory || "Other",
                            description: expense.description || "",

                            submittedAt: expense.expenseDate
                                ? new Date(
                                    expense.expenseDate
                                ).toLocaleString("en-IN")
                                : "",

                            date: expense.expenseDate,
                            receipt: expense.receiptPhotoUrl || null,

                            claimedAmount: Number(
                                expense.expenseAmount || 0
                            ),

                            approvedAmount: expense.approvedAmount,

                            personCount:
                                expense.personCount == null
                                    ? 1
                                    : expense.personCount,

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

                // Set default approved amount for pending expenses
                setApprovedAmounts((previous) => {
                    const updated = { ...previous };

                    formattedExpenses.forEach((expense) => {
                        if (
                            expense.approvedAmount == null &&
                            updated[expense.id] === undefined
                        ) {
                            updated[expense.id] =
                                expense.claimedAmount;
                        }
                    });

                    return updated;
                });

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
                console.error("Failed to load expenses:", error);

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
        refreshKey,
    ]);

    // Select / unselect one expense
    const handleExpenseSelection = (expenseId, checked) => {
        if (checked) {
            setSelectedExpenses((previous) => [
                ...previous,
                expenseId,
            ]);
        } else {
            setSelectedExpenses((previous) =>
                previous.filter((id) => id !== expenseId)
            );
        }
    };

    // Select / unselect all pending expenses on current page
    const pendingExpenses = expenses.filter(
        (expense) => expense.statusType === "pending"
    );

    const allPendingSelected =
        pendingExpenses.length > 0 &&
        pendingExpenses.every((expense) =>
            selectedExpenses.includes(expense.id)
        );

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedExpenses(
                pendingExpenses.map((expense) => expense.id)
            );
        } else {
            setSelectedExpenses([]);
        }
    };

    // Update approved amount
    const handleApprovedAmountChange = (expenseId, value) => {
        setApprovedAmounts((previous) => ({
            ...previous,
            [expenseId]: value,
        }));
    };

    // Prepare and validate approval data
    const getApprovalData = (selectedIds) => {
        const selected = expenses.filter(
            (expense) =>
                selectedIds.includes(expense.id) &&
                expense.statusType === "pending"
        );

        if (selected.length === 0) {
            window.alert("Please select pending expenses.");
            return null;
        }

        const approvalData = [];

        for (const expense of selected) {
            const amount = Number(
                approvedAmounts[expense.id]
            );

            if (
                approvedAmounts[expense.id] === "" ||
                !Number.isFinite(amount) ||
                amount < 0 ||
                amount > expense.claimedAmount
            ) {
                toast.error(
                    `Enter a valid approved amount for ${expense.voucherNo}.`
                );
                return null;
            }

            approvalData.push({
                expenseId: expense.id,
                expenseAmount: amount,
            });
        }

        return approvalData;
    };



    // Bulk approve selected expenses
    const handleBulkApprove = async () => {
        const approvalData = getApprovalData(selectedExpenses);


        await submitApproval(approvalData);
    };

    // Common approval API call
    const submitApproval = async (approvalData) => {
        try {
            if (!approvalData || approvalData.length === 0) {
                toast.error("No expenses selected.");
                return;
            }

            setIsApproving(true);

            console.log("Approval request:", approvalData);

            const response = await approveExpensesApi(approvalData);

            const result = response?.data ?? response;

            console.log("Approval response:", result);

            if (result?.success !== true) {
                toast.error(
                    result?.message || "Expense approval failed."
                );
                return;
            }

            // Show success message
            toast.success(
                result?.message || "Expenses approved successfully."
            );

            // Clear selected expenses
            setSelectedExpenses([]);

            // Reload expense list and summary
            setRefreshKey((previous) => previous + 1);

        } catch (error) {
            console.error("Expense approval failed:", error);

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to approve expenses."
            );

        } finally {
            setIsApproving(false);
        }
    };

    // Pagination values
    const totalPages = Math.max(
        Number(pagination.totalPages) || 1,
        1
    );

    const safePage = Math.min(currentPage, totalPages);
    const totalRecords = pagination.totalRecords;

    const startItem =
        totalRecords === 0
            ? 0
            : (safePage - 1) * rowsPerPage + 1;

    const endItem = Math.min(
        safePage * rowsPerPage,
        totalRecords
    );

    const visibleExpenses = expenses;

    // Summary values
    const totalClaimed = summary.totalClaimedAmount;
    const approvedCount = summary.approvedClaimsCount;

    const pendingCount = Math.max(
        summary.totalClaimsCount - summary.approvedClaimsCount,
        0
    );

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
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <select
                    value={statusFilter}
                    onChange={(event) => {
                        setStatusFilter(event.target.value);
                        setCurrentPage(1);
                    }}
                    aria-label="Filter by approval status"
                >
                    <option value="All">All</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Not Approved</option>
                </select>

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

                <>
                    {/* Select All + Bulk Approval */}
                    <div className="expense-bulk-toolbar">

                        <label className="expense-select-all">
                            <input
                                type="checkbox"
                                checked={allPendingSelected}
                                onChange={(event) =>
                                    handleSelectAll(event.target.checked)
                                }
                                disabled={pendingExpenses.length === 0}
                            />

                            <span>
                                Select all pending ({pendingExpenses.length})
                            </span>
                        </label>

                        <button
                            type="button"
                            className="bulk-approve-btn"
                            onClick={handleBulkApprove}
                            disabled={
                                selectedExpenses.length === 0 ||
                                isApproving ||
                                isLoading
                            }
                        >
                            {isApproving ? (
                                "Approving..."
                            ) : (
                                <>
                                    <span>✓</span>
                                    Bulk Approve

                                    <span className="bulk-approve-count">
                                        {selectedExpenses.length}
                                    </span>
                                </>
                            )}
                        </button>

                    </div>

                    <div className="expense-list">

                        {visibleExpenses.map((expense) => (

                            <article
                                className="expense-card"
                                key={expense.id}
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
                                                <b>{expense.employee}</b>
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
                                                    ? new Date(
                                                        expense.date
                                                    ).toLocaleDateString("en-IN")
                                                    : ""}
                                            </small>
                                        </div>

                                        <div className="expense-person-count">
                                            <span>Persons</span>
                                            <strong>
                                                {expense.personCount}
                                            </strong>
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
                                            <span>RECEIPT FILE</span>

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

                                        <span>Claimed</span>

                                        <strong>
                                            {formatCurrency(
                                                expense.claimedAmount
                                            )}
                                        </strong>

                                        {expense.approvedAmount == null ? (
                                            <>
                                                <label
                                                    htmlFor={`approved-${expense.id}`}
                                                >
                                                    Approved amount
                                                </label>

                                                <input
                                                    id={`approved-${expense.id}`}
                                                    type="number"
                                                    min="0"
                                                    max={expense.claimedAmount}
                                                    step="0.01"
                                                    value={
                                                        approvedAmounts[expense.id] ??
                                                        expense.claimedAmount
                                                    }
                                                    onChange={(event) =>
                                                        handleApprovedAmountChange(
                                                            expense.id,
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <label>
                                                    Approved amount
                                                </label>

                                                <strong>
                                                    {formatCurrency(
                                                        expense.approvedAmount
                                                    )}
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
                                                <label className="expense-select-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedExpenses.includes(
                                                            expense.id
                                                        )}
                                                        onChange={(event) =>
                                                            handleExpenseSelection(
                                                                expense.id,
                                                                event.target.checked
                                                            )
                                                        }
                                                    />

                                                    <span>Select</span>
                                                </label>

                                                <button
                                                    type="button"
                                                    className="expense-approve-button"
                                                    onClick={async () => {
                                                        const expenseData = [
                                                            {
                                                                expenseId: expense.id,
                                                                expenseAmount: Number(
                                                                    approvedAmounts[expense.id] ?? expense.claimedAmount
                                                                ),
                                                            },
                                                        ];

                                                        await submitApproval(expenseData);
                                                    }}
                                                    disabled={isApproving}
                                                >
                                                    ✓ Approve
                                                </button>
                                            </>
                                        )}

                                    </div>

                                </div>

                            </article>

                        ))}

                    </div>
                </>
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

                    <button
                        type="button"
                        disabled={safePage === 1 || isLoading}
                        onClick={() => setCurrentPage(1)}
                        aria-label="First page"
                    >
                        «
                    </button>

                    <button
                        type="button"
                        disabled={safePage === 1 || isLoading}
                        onClick={() => setCurrentPage(safePage - 1)}
                        aria-label="Previous page"
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
                                safePage === page ? "active" : ""
                            }
                            aria-current={
                                safePage === page ? "page" : undefined
                            }
                            disabled={isLoading}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>

                    ))}

                    <button
                        type="button"
                        disabled={
                            safePage === totalPages || isLoading
                        }
                        onClick={() => setCurrentPage(safePage + 1)}
                        aria-label="Next page"
                    >
                        ›
                    </button>

                    <button
                        type="button"
                        disabled={
                            safePage === totalPages || isLoading
                        }
                        onClick={() => setCurrentPage(totalPages)}
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