import { useEffect, useState } from "react";

import "./DashBoardBelowCard.css";

import CenterLoader from "../common/CenterLoader";


function DashBoardBelowCard() {

    const [isLoading, setIsLoading] = useState(true);

    const [clinicData, setClinicData] = useState(null);


    useEffect(() => {
        fetchClinicVisits();
    }, []);


    const fetchClinicVisits = async () => {

        setIsLoading(true);

        try {

            /*
             * =========================================
             * TEMP DATA
             *
             * Replace this with API later:
             *
             * const response =
             *     await getRecentClinicVisitsApi();
             *
             * if (response?.success === true) {
             *     setClinicData(response.data);
             * }
             * =========================================
             */

            const response = {

                success: true,

                data: {

                    title:
                        "Recent Clinic Visits & Claims",

                    subtitle:
                        "Automated OCR and geo-stamped vouchers",

                    feedStatus:
                        "REAL-TIME FEED",

                    successRate:
                        "96.4%",

                    totalClinicRecords:
                        342,

                    clinicVisits: [

                        {
                            id: 1,

                            clinicName:
                                "City Health Centre",

                            doctorName:
                                "Dr. K. Nair",

                            visitedBy:
                                "Rahul Menon",

                            proId:
                                "PRO-104",

                            activity:
                                "Routine Sample Pickup & Reagents Delivery",

                            amount:
                                "₹ 1,250",

                            status:
                                "APPROVED",

                            statusType:
                                "approved",

                            time:
                                "22 mins ago",

                            icon:
                                "♙",
                        },

                        {
                            id: 2,

                            clinicName:
                                "Metro PathLab & Diagnostics",

                            doctorName:
                                "Dr. Susan Thomas",

                            visitedBy:
                                "Ananya Sharma",

                            proId:
                                "PRO-218",

                            activity:
                                "Doctor Consultation & New Tie-up Onboarding",

                            amount:
                                "₹ 2,400",

                            status:
                                "RECONCILED",

                            statusType:
                                "reconciled",

                            time:
                                "1 hour ago",

                            icon:
                                "◈",
                        },

                        {
                            id: 3,

                            clinicName:
                                "Care Diagnostic Centre",

                            doctorName:
                                "Dr. Mathews Roy",

                            visitedBy:
                                "Deepak Varma",

                            proId:
                                "PRO-092",

                            activity:
                                "Cold-chain Temperature Kit Handover",

                            amount:
                                "₹ 890",

                            status:
                                "UNDER REVIEW",

                            statusType:
                                "review",

                            time:
                                "Today, 10:15 AM",

                            icon:
                                "❉",
                        },

                        {
                            id: 4,

                            clinicName:
                                "Grace Multi-Speciality Clinic",

                            doctorName:
                                "Dr. Priya Kurian",

                            visitedBy:
                                "Sneha Paul",

                            proId:
                                "PRO-305",

                            activity:
                                "Urgent STAT Biopsy Batch Transport",

                            amount:
                                "₹ 1,750",

                            status:
                                "APPROVED",

                            statusType:
                                "approved",

                            time:
                                "Today, 09:30 AM",

                            icon:
                                "▣",
                        },

                    ],
                },
            };


            /*
             * Simulating API loading.
             * Remove when actual API is connected.
             */

            await new Promise(
                (resolve) =>
                    setTimeout(resolve, 500)
            );


            if (response?.success === true) {

                setClinicData(
                    response.data
                );
            }

        } catch (error) {

            console.log(
                "Recent Clinic API Error:",
                error
            );

        } finally {

            setIsLoading(false);
        }
    };


    /* =========================================
       LOADING
    ========================================= */

    if (isLoading) {

        return (
            <div className="below-card-loader">
                <CenterLoader />
            </div>
        );
    }


    /* =========================================
       NO DATA
    ========================================= */

    if (!clinicData) {

        return (
            <div className="below-card-no-data">
                No recent clinic visits available
            </div>
        );
    }


    return (

        <section className="dashboard-below-card">


            {/* =====================================
                HEADER
            ====================================== */}

            <div className="below-card-header">


                <div className="below-header-left">

                    <div className="below-header-icon">
                        ⊞
                    </div>


                    <div className="below-header-content">

                        <h2>
                            {clinicData.title}
                        </h2>

                        <p>
                            {clinicData.subtitle}
                        </p>

                    </div>

                </div>


                <span className="real-time-badge">
                    {clinicData.feedStatus}
                </span>

            </div>


            {/* =====================================
                CLINIC LIST
            ====================================== */}

            <div className="clinic-visit-list">

                {clinicData.clinicVisits?.map(
                    (visit) => (

                        <div
                            className="clinic-visit-item"
                            key={visit.id}
                        >


                            {/* =========================
                                TOP ROW
                            ========================== */}

                            <div className="clinic-visit-top">


                                <div className="clinic-details">

                                    <div className="clinic-name-row">

                                        <strong className="clinic-name">
                                            {visit.clinicName}
                                        </strong>


                                        <span className="clinic-doctor">
                                            • {visit.doctorName}
                                        </span>

                                    </div>


                                    <div className="clinic-visited-by">

                                        Visited by{" "}

                                        <strong>
                                            {visit.visitedBy}
                                        </strong>

                                        {" "}

                                        ({visit.proId})

                                    </div>

                                </div>


                                {/* AMOUNT */}

                                <div className="clinic-claim">

                                    <strong
                                        className={`clinic-amount ${visit.statusType ===
                                                "review"
                                                ? "amount-review"
                                                : ""
                                            }`}
                                    >
                                        {visit.amount}
                                    </strong>


                                    <span
                                        className={`claim-status ${visit.statusType
                                            }`}
                                    >
                                        {visit.status}
                                    </span>

                                </div>

                            </div>


                            {/* =========================
                                DIVIDER
                            ========================== */}

                            <div className="clinic-divider" />


                            {/* =========================
                                BOTTOM ROW
                            ========================== */}

                            <div className="clinic-visit-bottom">


                                <div className="clinic-activity">

                                    <span className="activity-icon">
                                        {visit.icon}
                                    </span>


                                    <span>
                                        {visit.activity}
                                    </span>

                                </div>


                                <span className="clinic-time">
                                    {visit.time}
                                </span>

                            </div>

                        </div>

                    )
                )}

            </div>


            {/* =====================================
                FOOTER
            ====================================== */}

            <div className="below-card-footer">


                <span className="matching-rate">

                    Auto-matching:{" "}

                    <strong>
                        {clinicData.successRate}
                    </strong>

                    {" "}success rate

                </span>


                <button
                    className="open-records-button"
                    type="button"
                >

                    Open All{" "}

                    {clinicData.totalClinicRecords}{" "}

                    Clinic Records

                    <span>
                        ›
                    </span>

                </button>

            </div>

        </section>
    );
}


export default DashBoardBelowCard;