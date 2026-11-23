import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu, FiLogOut, FiX } from "react-icons/fi";
import Sidebar from "../../components/sidebar/sidebar";
import { TokenStorage } from "../../services/core/tokenStorage";
import "./DashboardLayout.css";

export default function DashboardLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen((previous) => !previous);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };
    const handleLogout = async () => {
        try {
            await TokenStorage.clearTokens();

            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="dashboard-layout">

            {/* MOBILE OVERLAY */}
            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={closeSidebar}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`dashboard-sidebar ${sidebarOpen ? "open" : ""
                    }`}
            >
                <Sidebar
                    onItemClick={closeSidebar}
                />
            </aside>

            {/* RIGHT SIDE */}
            <div className="dashboard-main">

                <header className="dashboard-header">

                    <button
                        className="menu-button"
                        onClick={toggleSidebar}
                        aria-label="Open sidebar"
                        type="button"
                    >
                        <FiMenu />
                    </button>
                    <div className="header-logo img">
                        <img src="src/assets/images/iconinfoware_logo.png" />
                    </div>
                    <div className="header-spacer" />
                    <h1 className="header-title">
                        Welcome to Icon Infoware Technologies!
                    </h1>
                    <button
                        className="logout-button"

                        type="button"
                        onClick={() => setShowLogoutPopup(true)}
                    >
                        <FiLogOut />
                        <span>Logout</span>
                    </button>
                    {showLogoutPopup && (
                        <div
                            className="logout-modal-overlay"
                            onClick={() => setShowLogoutPopup(false)}
                        >
                            <div
                                className="logout-modal"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className="logout-modal-close"
                                    onClick={() => setShowLogoutPopup(false)}
                                    type="button"
                                >
                                    <FiX />
                                </button>

                                <div className="logout-modal-icon">
                                    <FiLogOut />
                                </div>

                                <h2>Confirm Logout</h2>

                                <p>
                                    Are you sure you want to logout from your account?
                                </p>

                                <div className="logout-modal-actions">
                                    <button
                                        className="logout-cancel-btn"
                                        type="button"
                                        onClick={() => setShowLogoutPopup(false)}
                                    >
                                        No, Stay
                                    </button>

                                    <button
                                        className="logout-confirm-btn"
                                        type="button"
                                        onClick={handleLogout}
                                    >
                                        Yes, Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </header>

                <main className="dashboard-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}