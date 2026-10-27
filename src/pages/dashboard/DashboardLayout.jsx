import { useState } from "react";
import { Outlet } from "react-router-dom";

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
                        type="button"
                    >
                        ☰
                    </button>

                    <div className="header-title">
                        Welcome to Icon Infoware Technologies!
                    </div>

                </header>

                <main className="dashboard-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}