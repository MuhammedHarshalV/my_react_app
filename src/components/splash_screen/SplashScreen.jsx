import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TokenStorage } from "../../services/core/tokenStorage";

import "./SplashScreen.css";

export default function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            const refreshToken = TokenStorage.getRefreshToken();

            if (refreshToken) {
                navigate("/dashboard", { replace: true });
            } else {
                navigate("/login", { replace: true });
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="splash-screen">
            <h2>My Application</h2>
            <p>Loading...</p>
        </div>
    );
}