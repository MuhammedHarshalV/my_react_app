import { motion } from "motion/react";
import {
    FiGrid,
    FiUsers,
    FiMapPin,
    FiCreditCard,
    FiClock,
    FiMenu,
} from "react-icons/fi";

import { useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import ProfileSection from "../profile_section/ProfileSection";

const sidebarItems = [
    { id: 1, name: "Dashboard", path: "/dashboard", icon: FiGrid },
    { id: 2, name: "Users", path: "/dashboard/users", icon: FiUsers },
    { id: 3, name: "Clinics", path: "/dashboard/clinics", icon: FiMapPin },
    { id: 4, name: "Expenses", path: "/dashboard/expenses", icon: FiCreditCard },
    { id: 5, name: "History", path: "/dashboard/history", icon: FiClock },
    { id: 6, name: "Menu", path: "/dashboard/menu", icon: FiMenu },
];

export default function Sidebar({ onItemClick }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleItemClick = (item) => {
        navigate(item.path);
        onItemClick?.();
    };

    return (
        <div className="sidebar-container">

            <ProfileSection />

            <div className="sidebar-scroll-content">
                <div className="sidebar-list">

                    {sidebarItems.map((item) => {
                        const isSelected =
                            item.path === "/dashboard"
                                ? location.pathname === "/dashboard"
                                : location.pathname.startsWith(item.path);

                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.id}
                                className={`sidebar-item ${isSelected ? "selected" : ""}`}
                                onClick={() => handleItemClick(item)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >

                                <span className="sidebar-item-name">
                                    <Icon />   {item.name}
                                </span>
                                {isSelected && (
                                    <span className="sidebar-item-icon">
                                        ◉
                                    </span>
                                )}

                            </motion.div>
                        );
                    })}

                </div>
            </div>
        </div>
    );
}
