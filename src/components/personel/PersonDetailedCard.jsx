import { useEffect, useState } from "react";
import "./PersonDetailedCard.css";

function PersonDetailedCard({ person }) {

    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setImageError(false);
    }, [person?.profileImageUrl]);

    if (!person) {
        return null;
    }

    const formatAmount = (amount) => {
        return `₹ ${Number(amount ?? 0).toLocaleString("en-IN")}`;
    };

    const handleViewLedger = () => {
        console.log("View Ledger:", person);
    };

    const handleCopyProId = async () => {
        try {
            await navigator.clipboard.writeText(
                String(person.proId ?? "")
            );
            console.log("Copied:", person.proId);
        } catch (error) {
            console.log("Copy Error:", error);
        }
    };

    return (
        <div className="person-detailed-card">

            <div className="person-card-top-line" />

            {/* PERSON HEADER */}

            <div className="person-card-header">

                <div className="person-main-info">

                    {/* PROFILE IMAGE */}

                    {person.profileImageUrl && !imageError ? (

                        <img
                            src={person.profileImageUrl}
                            alt={person.name}
                            className="person-profile-image"
                            onError={() => setImageError(true)}
                        />

                    ) : (

                        <div className="person-profile-image person-profile-fallback">
                            {person.name?.trim()?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                    )}

                    {/* NAME / DESIGNATION */}

                    <div className="person-name-section">

                        <div className="person-name-row">

                            <h3>
                                {person.name || "-"}
                            </h3>

                            <span className="person-pro-id">
                                PRO-ID {person.proId || "-"}
                            </span>

                        </div>

                        <p>
                            {person.designation || "-"}
                        </p>

                    </div>

                </div>

                {/* COPY BUTTON */}

                <button
                    className="person-copy-button"
                    type="button"
                    title="Copy PRO ID"
                    onClick={handleCopyProId}
                >
                    ▣
                </button>

            </div>

            {/* CONTACT INFORMATION */}

            <div className="person-contact-section">

                <div className="person-contact-row">

                    <span className="person-contact-icon">
                        ☎
                    </span>

                    <span>
                        {person.phoneNumber || "-"}
                    </span>

                </div>

                <div className="person-location-row">

                    <div className="person-location">

                        <span className="person-location-icon">
                            ◁
                        </span>

                        <span>
                            {person.location || "-"}
                        </span>

                    </div>

                </div>

            </div>

            {/* STATISTICS */}

            <div className="person-stat-grid">

                <div className="person-stat-box">

                    <div className="person-stat-title">
                        <span>⊞</span>
                        <span>CLINICS VISITED</span>
                    </div>

                    <strong className="person-stat-value">
                        {person.totalClinicVisited ?? 0} Visited
                    </strong>

                    <span className="person-stat-subtext highlight">
                        Total clinic visits
                    </span>

                </div>

                <div className="person-stat-box">

                    <div className="person-stat-title">
                        <span>▤</span>
                        <span>EXPENSE CLAIMS</span>
                    </div>

                    <strong className="person-stat-value">
                        {person.totalClaimedCount ?? 0} Claims
                    </strong>

                    <span className="person-stat-subtext">
                        Total claims
                    </span>

                </div>

            </div>

            {/* TOTAL CLAIMED */}

            <div className="person-total-claim">

                <div className="person-total-left">

                    <span className="person-total-label">
                        TOTAL CLAIMED
                    </span>

                    <div className="person-total-value">

                        <strong>
                            {formatAmount(person.totalClaimedExpense)}
                        </strong>

                        <span>
                            INR
                        </span>

                    </div>

                </div>

                <div className="person-verified-amount">

                    {formatAmount(person.totalApprovedAmount)}

                    {" "}

                    <span>
                        APPROVED
                    </span>

                </div>

            </div>

            {/* ACTION BUTTON */}

            <div className="person-card-actions">

                <button
                    type="button"
                    className="person-action-button ledger-button"
                    onClick={handleViewLedger}
                >

                    <span>▤</span>

                    View Ledger

                </button>

            </div>

        </div>
    );
}

export default PersonDetailedCard;