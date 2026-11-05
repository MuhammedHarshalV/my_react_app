
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TokenStorage } from "../../services/core/tokenStorage";

import "./SplashScreen.css";

export default function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            const refreshToken = TokenStorage.getRefreshToken();

            navigate(
                refreshToken ? "/dashboard" : "/login",
                { replace: true }
            );
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="splash-screen">

            <div className="splash-background">
                <span className="splash-circle circle-one"></span>
                <span className="splash-circle circle-two"></span>
                <span className="splash-circle circle-three"></span>
            </div>

            <div className="splash-content">

                <div className="splash-logo">
                    <div className="splash-logo-inner">
                        <span>EP</span>
                    </div>
                    <span className="splash-logo-ring"></span>
                </div>

                <h1 className="splash-title">
                    Expense <span>PRO</span>
                </h1>

                <p className="splash-subtitle">
                    Smart Expense Management
                </p>

                <div className="splash-loader">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <p className="splash-loading-text">
                    Preparing your dashboard
                </p>

            </div>

            <div className="splash-footer">
                Powered by <strong>Icon Infoware Technologies</strong>
            </div>

        </div>
    );
}
