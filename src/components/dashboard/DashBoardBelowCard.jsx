import { useEffect, useState } from "react";

import "./DashBoardBelowCard.css";

import CenterLoader from "../common/CenterLoader";
import { getRecentClinicsApi } from "../../services/api/dashboard/getRecentClinics";

function DashBoardBelowCard() {

    const [isLoading, setIsLoading] = useState(true);

    const [clinicData, setClinicData] = useState(null);


    useEffect(() => {
        fetchClinicVisits();
    }, []);


    const fetchClinicVisits = async () => {

        setIsLoading(true);

        try {
            const response = await getRecentClinicsApi(

            );

            if (response?.success) {
                setClinicData(response);
            } else {
                console.log(response?.message);
            }





        } catch (error) {

            console.log(
                "recent clinic API Error:",
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
                            Recent Clinic Visits & Claims
                        </h2>

                        <p>
                            Automated OCR and geo-stamped vouchers
                        </p>

                    </div>

                </div>


                <span className="real-time-badge">
                    REAL-TIME FEED
                </span>

            </div>


            {/* =====================================
                CLINIC LIST
            ====================================== */}

            <div className="clinic-visit-list">

                {clinicData.recentExpenses?.map(
                    (visit, index) => (

                        <div
                            className="clinic-visit-item"
                            key={index}
                        >


                            {/* =========================
                                TOP ROW
                            ========================== */}

                            <div className="clinic-visit-top">


                                <div className="clinic-details">

                                    <div className="clinic-name-row">

                                        <strong className="clinic-name">
                                            {visit?.clinicName || "Unknown Clinic"}
                                        </strong>


                                        <span className="clinic-doctor">
                                            • PRO-ID {visit.visitedEmployeeEmpId}
                                        </span>

                                    </div>


                                    <div className="clinic-visited-by">

                                        Visited by{" "}

                                        <strong>
                                            {visit?.visitedEmployeeName || "-"}
                                        </strong>

                                        {" "}

                                        {/* ({visit.visitedEmployeeEmpId}) */}

                                    </div>

                                </div>


                                {/* AMOUNT */}

                                <div className="clinic-claim">

                                    <strong
                                        className={`clinic-amount ${visit?.approvedAmount != null

                                            ? ""
                                            : "amount-review"
                                            }`}
                                    >
                                        Requested : ₹ {visit.requestAmount}
                                    </strong>


                                    <span
                                        className={`claim-status ${visit?.approvedAmount != null ? "approved" : "review"
                                            }`}
                                    >
                                        {visit?.approvedAmount != null ? "APPROVED" : "UNDER REVIEW"}
                                    </span>

                                    {visit?.approvedAmount != null && (
                                        <strong className="clinic-amount">
                                            Approved: ₹ {visit.approvedAmount}
                                        </strong>
                                    )}


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
                                        ❉
                                    </span>


                                    <span>
                                        Field Visit Expenses
                                    </span>

                                </div>


                                <span className="clinic-time">
                                    {visit?.entryDate
                                        ? new Date(visit.entryDate).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })
                                        : "-"}
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





                <button
                    className="open-records-button"
                    type="button"
                >

                    Open All{" "}

                    {clinicData?.totalClinicVisited ?? 0}   {" "}

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