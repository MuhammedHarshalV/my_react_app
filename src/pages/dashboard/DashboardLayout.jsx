import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu, FiLogOut } from "react-icons/fi";
import Sidebar from "../../components/sidebar/sidebar";
import "./DashboardLayout.css";

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen((previous) => !previous);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
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
                    >
                        <FiLogOut />
                        <span>Logout</span>
                    </button>

                </header>

                <main className="dashboard-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}