
import { useEffect, useState } from "react";

import { getHLcategoryDetailsApi } from "../../services/api/historyDetails/getHLCategoryDetailsApi";

import {
    FiCoffee,
    FiPackage,
    FiTruck,
    FiCircle,
    FiHome,
    FiPlusSquare,
    FiLoader,
} from "react-icons/fi";

import "./CategoryAnalytics.css";

export default function CategoryAnalytics({
    startDate,
    endDate,
    categoryType,
}) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Category icons
    const getCategoryIcon = (category) => {
        const name = category?.toLowerCase() || "";

        if (name.includes("food") || name.includes("lunch")) {
            return <FiCoffee size={18} />;
        }

        if (name.includes("fuel")) {
            return <FiTruck size={18} />;
        }

        if (name.includes("hotel") || name.includes("stay")) {
            return <FiHome size={18} />;
        }

        if (name.includes("travel")) {
            return <FiPackage size={18} />;
        }

        if (name.includes("medical")) {
            return <FiPlusSquare size={18} />;
        }

        return <FiCircle size={18} />;
    };

    // Fetch category details
    const fetchCategoryDetails = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getHLcategoryDetailsApi(
                startDate,
                endDate,
                categoryType
            );

            const result = response?.data ?? response;

            if (result.success) {
                // Handles category_details: [[{}, {}]]
                const categoryList = (
                    result.category_details || []
                ).flat();

                setCategories(categoryList);
            } else {
                setCategories([]);
                setError(
                    result.message || "Failed to fetch category details."
                );
            }
        } catch (error) {
            console.error("Category Details Error:", error);

            setCategories([]);
            setError("Unable to fetch category details.");
        } finally {
            setLoading(false);
        }
    };

    // Initial API call and parameter changes
    useEffect(() => {
        fetchCategoryDetails();
    }, [startDate, endDate, categoryType]);

    const formatAmount = (amount) => {
        return Number(amount || 0).toLocaleString("en-IN");
    };

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-IN");
    };

    return (
        <div className="analytics-container">

            {/* LOADING */}

            {loading && (
                <div className="analytics-message">
                    <FiLoader className="loading-icon" />
                    <span>Loading category details...</span>
                </div>
            )}

            {/* ERROR */}

            {!loading && error && (
                <div className="analytics-message error-message">
                    {error}
                </div>
            )}

            {/* EMPTY */}

            {!loading && !error && categories.length === 0 && (
                <div className="analytics-message">
                    No category details found.
                </div>
            )}

            {/* CATEGORY GRID */}

            {!loading && !error && categories.length > 0 && (

                <div className="analytics-grid">

                    {categories.map((cat, index) => (

                        <div
                            className="expense-card"
                            key={cat.category_name || index}
                        >

                            {/* CARD HEADER */}

                            <div className="card-top">

                                <div className="card-title-group">

                                    <span className="category-icon">
                                        {getCategoryIcon(cat.category_name)}
                                    </span>

                                    <h3 className="card-title">
                                        {cat.category_name}
                                    </h3>

                                </div>

                                <span className="entries-badge">
                                    {cat.total_entries} Entries
                                </span>

                            </div>

                            {/* AGGREGATE */}

                            <div className="aggregate-section">

                                <span className="section-label">
                                    TOTAL AMOUNT SPENT
                                </span>

                                <span className="aggregate-amount">
                                    ₹ {formatAmount(cat.total_amount_spend)}
                                </span>

                                <div className="approved-amount">
                                    Approved: ₹ {formatAmount(
                                        cat.total_amount_approved
                                    )}
                                </div>

                            </div>

                            {/* HIGHEST EXPENSE */}

                            <div className="highest-expense-block">

                                <span className="highlight-label text-primary">
                                    HIGHEST SINGLE EXPENSE
                                </span>

                                <div className="spender-row">

                                    <span className="spender-name">
                                        {cat.highest_spend_user_name || "-"}
                                        {" "}
                                        ({cat.highest_spend_user_id || "-"})
                                    </span>

                                    <span className="spender-amount text-primary">
                                        ₹ {formatAmount(
                                            cat.highest_single_category_amount
                                        )}
                                    </span>

                                </div>

                                <div className="facility-row">

                                    <FiPlusSquare
                                        size={13}
                                        className="facility-icon"
                                    />

                                    <span className="facility-name">
                                        {cat.highest_clinic_name || "-"}
                                    </span>

                                </div>

                                <div className="receipt-row">

                                    <span className="receipt-text">
                                        Persons: {cat.highest_person_count ?? "1"}
                                    </span>

                                    <span className="receipt-date">
                                        {formatDate(cat.highest_expense_date)}
                                    </span>

                                </div>

                            </div>

                            {/* LOWEST EXPENSE */}

                            <div className="highest-expense-block">

                                <span className="highlight-label text-primary">
                                    LOWEST SINGLE EXPENSE
                                </span>

                                <div className="spender-row">

                                    <span className="spender-name">
                                        {cat.lowest_spend_user_name || "-"}
                                        {" "}
                                        ({cat.lowest_spend_user_id || "-"})
                                    </span>

                                    <span className="spender-amount text-primary">
                                        ₹ {formatAmount(
                                            cat.lowest_spend_amount
                                        )}
                                    </span>

                                </div>

                                <div className="facility-row">

                                    <FiPlusSquare
                                        size={13}
                                        className="facility-icon"
                                    />

                                    <span className="facility-name">
                                        {cat.lowest_clinic_name || "-"}
                                    </span>

                                </div>

                                <div className="receipt-row">

                                    <span className="receipt-text">
                                        Persons: {cat.lowest_person_count ?? "1"}
                                    </span>

                                    <span className="receipt-date">
                                        {formatDate(cat.lowest_expense_date)}
                                    </span>

                                </div>

                            </div>



                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}
