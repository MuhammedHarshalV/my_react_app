import { useState } from "react";

import "./PersonDetailedCard.css";


function PersonDetailedCard() {

    /* =========================================
       INITIAL DATA

       Later replace this with API response
    ========================================= */

    const [person, setPerson] = useState(() => ({
        id: 1,

        name: "Rahul Menon",

        proId: "PRO-104",

        designation:
            "Sr. Route Diagnostic Specialist",

        image:
            "https://i.pravatar.cc/150?img=12",

        phone:
            "+91 98471 23091",

        location:
            "Ernakulam North • Medical District",

        status:
            "ON FIELD",

        statusType:
            "on-field",

        clinicsVisited:
            24,

        clinicSubText:
            "+4 vs target",

        expenseClaims:
            18,

        expenseSubText:
            "3 under audit",

        totalClaimed:
            "₹ 14,850",

        verifiedAmount:
            "₹ 12,400",

        verifiedLabel:
            "VERIFIED",

        gpsAvailable:
            true,
    }));


    /* =========================================
       BUTTON FUNCTIONS
    ========================================= */

    const handleViewLedger = () => {

        console.log(
            "View Ledger:",
            person
        );
    };


    const handleLiveGps = () => {

        console.log(
            "Live GPS:",
            person
        );
    };


    const handleStationLog = () => {

        console.log(
            "Station Log:",
            person
        );
    };


    const handleCopyProId = async () => {

        try {

            await navigator.clipboard.writeText(
                person.proId
            );

            console.log(
                "Copied:",
                person.proId
            );

        } catch (error) {

            console.log(
                "Copy Error:",
                error
            );
        }
    };


    /* =========================================
       NO DATA
    ========================================= */

    if (!person) {

        return null;
    }


    return (

        <div className="person-detailed-card">


            {/* =====================================
                TOP RED LINE
            ====================================== */}

            <div className="person-card-top-line" />


            {/* =====================================
                PERSON HEADER
            ====================================== */}

            <div className="person-card-header">


                <div className="person-main-info">


                    {/* PROFILE IMAGE */}

                    <img
                        src={person.image}
                        alt={person.name}
                        className="person-profile-image"
                    />


                    {/* NAME / DESIGNATION */}

                    <div className="person-name-section">


                        <div className="person-name-row">

                            <h3>
                                {person.name}
                            </h3>


                            <span className="person-pro-id">
                                {person.proId}
                            </span>

                        </div>


                        <p>
                            {person.designation}
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


            {/* =====================================
                CONTACT INFORMATION
            ====================================== */}

            <div className="person-contact-section">


                <div className="person-contact-row">

                    <span className="person-contact-icon">
                        ☎
                    </span>

                    <span>
                        {person.phone}
                    </span>

                </div>


                <div className="person-location-row">


                    <div className="person-location">

                        <span className="person-location-icon">
                            ◁
                        </span>

                        <span>
                            {person.location}
                        </span>

                    </div>


                    <span
                        className={`person-status ${person.statusType || ""
                            }`}
                    >
                        {person.status}
                    </span>

                </div>

            </div>


            {/* =====================================
                STATISTICS
            ====================================== */}

            <div className="person-stat-grid">


                {/* CLINICS VISITED */}

                <div className="person-stat-box">


                    <div className="person-stat-title">

                        <span>
                            ⊞
                        </span>

                        <span>
                            CLINICS VISITED
                        </span>

                    </div>


                    <strong className="person-stat-value">

                        {person.clinicsVisited} Visited

                    </strong>


                    <span className="person-stat-subtext highlight">

                        {person.clinicSubText}

                    </span>

                </div>


                {/* EXPENSE CLAIMS */}

                <div className="person-stat-box">


                    <div className="person-stat-title">

                        <span>
                            ▤
                        </span>

                        <span>
                            EXPENSE CLAIMS
                        </span>

                    </div>


                    <strong className="person-stat-value">

                        {person.expenseClaims} Claims

                    </strong>


                    <span className="person-stat-subtext">

                        {person.expenseSubText}

                    </span>

                </div>

            </div>


            {/* =====================================
                TOTAL CLAIMED
            ====================================== */}

            <div className="person-total-claim">


                <div className="person-total-left">


                    <span className="person-total-label">

                        TOTAL MTD CLAIMED

                    </span>


                    <div className="person-total-value">

                        <strong>
                            {person.totalClaimed}
                        </strong>

                        <span>
                            INR
                        </span>

                    </div>

                </div>


                <div className="person-verified-amount">

                    {person.verifiedAmount}

                    {" "}

                    <span>
                        {person.verifiedLabel}
                    </span>

                </div>

            </div>


            {/* =====================================
                ACTION BUTTONS
            ====================================== */}

            <div className="person-card-actions">


                {/* VIEW LEDGER */}

                <button
                    type="button"
                    className="
                        person-action-button
                        ledger-button
                    "
                    onClick={
                        handleViewLedger
                    }
                >

                    <span>
                        ▤
                    </span>

                    View Ledger

                </button>


                {/* GPS / STATION */}

                {person.gpsAvailable ? (

                    <button
                        type="button"
                        className="
                            person-action-button
                            gps-button
                        "
                        onClick={
                            handleLiveGps
                        }
                    >

                        <span>
                            ◎
                        </span>

                        Live GPS

                    </button>

                ) : (

                    <button
                        type="button"
                        className="
                            person-action-button
                            station-button
                        "
                        onClick={
                            handleStationLog
                        }
                    >

                        <span>
                            ◴
                        </span>

                        Station Log

                    </button>

                )}

            </div>

        </div>
    );
}


export default PersonDetailedCard;