
import { useEffect, useState } from "react";
import "./ExpenseCard.css";

const initialExpenseData = [
    {
        id: 89021,
        voucherNo: "EXP-89021",
        category: "BIKE DA",
        employee: "Rahul Menon",
        proId: "PRO-104",
        role: "Route Diagnostic Specialist",
        location: "City Health Centre & Diagnostics",
        expenseType: "Fuel / Transit DA",
        description: "Allowance, delivery and travel expenses",
        submittedAt: "24 Oct 2026, 09:45 AM",
        date: "2026-10-24",
        receipt: "petrol_receipt.jpg",
        claimedAmount: 850,
        approvedAmount: 850,
        status: "PENDING REVIEW",
        statusType: "pending",
    },
    {
        id: 89022,
        voucherNo: "EXP-89022",
        category: "COLD-CHAIN",
        employee: "Anish Kumar",
        proId: "PRO-109",
        role: "Ernakulam Central Hub",
        location: "Metro PathLab & Multi-Speciality",
        expenseType: "Cold-Chain Logistics",
        description: "Specimen delivery and ice pack expenses",
        submittedAt: "24 Oct 2026, 08:30 AM",
        date: "2026-10-24",
        receipt: "cold_chain.jpg",
        claimedAmount: 2400,
        approvedAmount: 2400,
        status: "APPROVED",
        statusType: "approved",
    },
    {
        id: 89023,
        voucherNo: "EXP-89023",
        category: "REAGENTS",
        employee: "Kavita Nair",
        proId: "PRO-112",
        role: "Kakkanad IT Corridor",
        location: "Grace Multi-Speciality Clinic",
        expenseType: "Lab Consumables",
        description: "Reagents and diagnostic supplies",
        submittedAt: "23 Oct 2026, 04:30 PM",
        date: "2026-10-23",
        receipt: "reagents.jpg",
        claimedAmount: 4500,
        approvedAmount: 4500,
        status: "PARTIALLY APPROVED",
        statusType: "partial",
    },
    {
        id: 89024,
        voucherNo: "EXP-89024",
        category: "MEALS / ENGAGE",
        employee: "Sijomon Varghese",
        proId: "PRO-115",
        role: "Anangam North Corridor",
        location: "St. Jude Medical Laboratory",
        expenseType: "Doctor Engagement",
        description: "Refreshments and meeting expenses",
        submittedAt: "23 Oct 2026, 01:20 PM",
        date: "2026-10-23",
        receipt: "meal_receipt.jpg",
        claimedAmount: 1250,
        approvedAmount: 1250,
        status: "PENDING REVIEW",
        statusType: "pending",
    },
    {
        id: 89025,
        voucherNo: "EXP-89025",
        category: "STAT COURIER",
        employee: "Rahul Menon",
        proId: "PRO-104",
        role: "Aluva Transit Route",
        location: "Metro Speciality Polyclinic",
        expenseType: "Emergency Courier",
        description: "STAT sample transport charges",
        submittedAt: "22 Oct 2026, 02:10 PM",
        date: "2026-10-22",
        receipt: "courier.jpg",
        claimedAmount: 980,
        approvedAmount: 980,
        status: "APPROVED",
        statusType: "approved",
    },
    {
        id: 89026,
        voucherNo: "EXP-89026",
        category: "TOLL & PARKING",
        employee: "Deepak Varma",
        proId: "PRO-112",
        role: "Tripunithura Region",
        location: "Apex Clinical Labs",
        expenseType: "Parking & Toll Charges",
        description: "Parking and toll reimbursement",
        submittedAt: "22 Oct 2026, 10:15 AM",
        date: "2026-10-22",
        receipt: "parking.jpg",
        claimedAmount: 350,
        approvedAmount: 350,
        status: "PENDING REVIEW",
        statusType: "pending",
    },
];

const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);

export default function ExpenseCard() {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [expenseType, setExpenseType] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [startDate, setStartDate] = useState("2026-10-01");
    const [endDate, setEndDate] = useState("2026-10-31");

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(6);

    useEffect(() => {
        const loadExpenses = async () => {
            try {
                setExpenses(initialExpenseData);
            } catch (error) {
                console.error("Failed to load expenses:", error);
                setExpenses([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadExpenses();
    }, []);

    const updateStatus = (id, nextStatus, nextStatusType) => {
        setExpenses((previous) =>
            previous.map((expense) =>
                expense.id === id
                    ? {
                        ...expense,
                        status: nextStatus,
                        statusType: nextStatusType,
                    }
                    : expense
            )
        );
    };

    const filteredExpenses = expenses.filter((expense) => {
        const searchText = [
            expense.voucherNo,
            expense.employee,
            expense.proId,
            expense.location,
            expense.expenseType,
            expense.category,
        ]
            .join(" ")
            .toLowerCase();

        const matchesSearch = searchText.includes(
            search.trim().toLowerCase()
        );

        const matchesType =
            expenseType === "All" || expense.category === expenseType;

        const matchesStatus =
            statusFilter === "All" ||
            expense.statusType === statusFilter;

        const matchesStartDate =
            !startDate || expense.date >= startDate;

        const matchesEndDate =
            !endDate || expense.date <= endDate;

        return (
            matchesSearch &&
            matchesType &&
            matchesStatus &&
            matchesStartDate &&
            matchesEndDate
        );
    });

    const totalPages = Math.max(
        1,
        Math.ceil(filteredExpenses.length / rowsPerPage)
    );

    const safePage = Math.min(currentPage, totalPages);

    const startItem =
        filteredExpenses.length === 0
            ? 0
            : (safePage - 1) * rowsPerPage + 1;

    const endItem = Math.min(
        safePage * rowsPerPage,
        filteredExpenses.length
    );

    const visibleExpenses = filteredExpenses.slice(
        (safePage - 1) * rowsPerPage,
        safePage * rowsPerPage
    );

    const totalClaimed = filteredExpenses.reduce(
        (sum, expense) => sum + expense.claimedAmount,
        0
    );

    const pendingCount = expenses.filter(
        (expense) => expense.statusType === "pending"
    ).length;

    const approvedCount = expenses.filter(
        (expense) => expense.statusType === "approved"
    ).length;

    const partiallyApprovedCount = expenses.filter(
        (expense) => expense.statusType === "partial"
    ).length;

    useEffect(() => {
        setCurrentPage(1);
    }, [search, expenseType, statusFilter, startDate, endDate, rowsPerPage]);

    const approveExpense = (expense) => {
        updateStatus(expense.id, "APPROVED", "approved");
    };

    const releaseExpense = (expense) => {
        updateStatus(expense.id, "RELEASED", "released");
    };

    const rejectExpense = (expense) => {
        updateStatus(expense.id, "REJECTED", "rejected");
    };

    return (
        <section className="expense-page">
            <header className="expense-page-header">
                <div>
                    <span className="expense-eyebrow">
                        AUDITING
                    </span>

                    <h1>Field Expenses & Bill Approvals</h1>

                    <p>
                        Audit submitted vouchers, inspect receipts and
                        verify field expense claims.
                    </p>
                </div>


            </header>

            <div className="expense-summary-grid">
                <SummaryCard
                    title="TOTAL CLAIMED"
                    value={formatCurrency(totalClaimed)}
                    subtitle={`${filteredExpenses.length} vouchers shown`}
                />

                <SummaryCard
                    title="APPROVED & QUEUED"
                    value={formatCurrency(
                        expenses
                            .filter(
                                (item) => item.statusType === "approved"
                            )
                            .reduce(
                                (sum, item) => sum + item.approvedAmount,
                                0
                            )
                    )}
                    subtitle={`${approvedCount} approved`}
                />

                <SummaryCard
                    title="PENDING REVIEW"
                    value={pendingCount}
                    subtitle="Awaiting supervisor review"
                    danger
                />

                <SummaryCard
                    title="PARTIALLY APPROVED"
                    value={partiallyApprovedCount}
                    subtitle="Claims requiring adjustment"
                />
            </div>

            <div className="expense-filter-panel">
                <label className="expense-search">
                    <span>⌕</span>
                    <input
                        type="search"
                        placeholder="Search voucher ID, employee, clinic or PRO ID"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </label>

                <select
                    value={expenseType}
                    onChange={(event) => setExpenseType(event.target.value)}
                    aria-label="Filter by expense type"
                >
                    <option value="All">All Expense Types</option>

                    {[...new Set(expenses.map((item) => item.category))].map(
                        (category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        )
                    )}
                </select>

                <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    aria-label="Filter by approval status"
                >
                    <option value="All">All Statuses</option>
                    <option value="pending">Pending Review</option>
                    <option value="approved">Approved</option>
                    <option value="partial">Partially Approved</option>
                    <option value="released">Released</option>
                    <option value="rejected">Rejected</option>
                </select>

                <div className="expense-date-range">
                    <input
                        type="date"
                        aria-label="Start date"
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                    />

                    <span>to</span>

                    <input
                        type="date"
                        aria-label="End date"
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                    />
                </div>
            </div>

            <div className="expense-list-heading">
                <strong>
                    Showing {startItem}–{endItem} of{" "}
                    {filteredExpenses.length} vouchers
                </strong>

                <span>Route Group: Central Kerala</span>
            </div>

            {isLoading ? (
                <div className="expense-empty">Loading expenses…</div>
            ) : visibleExpenses.length === 0 ? (
                <div className="expense-empty">
                    No expense vouchers match your filters.
                </div>
            ) : (
                <div className="expense-list">
                    {visibleExpenses.map((expense) => (
                        <article className="expense-card" key={expense.id}>
                            <div className="expense-card-main">
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
                                            <span>
                                                {expense.proId} · {expense.role}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="expense-location">
                                        ◉ {expense.location}
                                    </p>
                                </div>

                                <div className="expense-description">
                                    <strong>{expense.expenseType}</strong>
                                    <p>{expense.description}</p>
                                    <small>
                                        Submitted: {expense.submittedAt}
                                    </small>
                                </div>

                                <div className="expense-receipt">
                                    <div className="expense-receipt-placeholder">
                                        ▧
                                    </div>

                                    <div>
                                        <span>RECEIPT FILE</span>
                                        <b>{expense.receipt}</b>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                console.log(
                                                    "View receipt:",
                                                    expense
                                                )
                                            }
                                        >
                                            View / Scan
                                        </button>
                                    </div>
                                </div>

                                <div className="expense-amounts">
                                    <span>Claimed</span>
                                    <strong>
                                        {formatCurrency(expense.claimedAmount)}
                                    </strong>

                                    <label htmlFor={`approved-${expense.id}`}>
                                        Approved amount
                                    </label>

                                    <input
                                        id={`approved-${expense.id}`}
                                        type="number"
                                        min="0"
                                        max={expense.claimedAmount}
                                        defaultValue={expense.approvedAmount}
                                        aria-label={`Approved amount for ${expense.voucherNo}`}
                                    />
                                </div>

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

                                    {expense.statusType === "partial" && (
                                        <button
                                            type="button"
                                            className="expense-secondary-button"
                                            onClick={() =>
                                                updateStatus(
                                                    expense.id,
                                                    "PENDING REVIEW",
                                                    "pending"
                                                )
                                            }
                                        >
                                            Adjust
                                        </button>
                                    )}

                                    {expense.statusType === "approved" && (
                                        <button
                                            type="button"
                                            className="expense-secondary-button"
                                            onClick={() =>
                                                releaseExpense(expense)
                                            }
                                        >
                                            Release
                                        </button>
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
                        Showing <strong>{startItem}-{endItem}</strong> of{" "}
                        <strong>{filteredExpenses.length}</strong> expenses
                    </span>

                    <label>
                        Rows:
                        <select
                            value={rowsPerPage}
                            onChange={(event) =>
                                setRowsPerPage(Number(event.target.value))
                            }
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
                        disabled={safePage === 1}
                        onClick={() => setCurrentPage(1)}
                        aria-label="First page"
                    >
                        «
                    </button>

                    <button
                        type="button"
                        disabled={safePage === 1}
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
                            className={safePage === page ? "active" : ""}
                            aria-current={safePage === page ? "page" : undefined}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        type="button"
                        disabled={safePage === totalPages}
                        onClick={() => setCurrentPage(safePage + 1)}
                        aria-label="Next page"
                    >
                        ›
                    </button>

                    <button
                        type="button"
                        disabled={safePage === totalPages}
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

function SummaryCard({ title, value, subtitle, danger = false }) {
    return (
        <div className={`expense-summary-card ${danger ? "danger" : ""}`}>
            <span>{title}</span>
            <strong>{value}</strong>
            <small>{subtitle}</small>
        </div>
    );
}
