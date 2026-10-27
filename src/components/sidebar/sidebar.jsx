import { motion } from "motion/react";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import "./Sidebar.css";
import ProfileSection from "../profile_section/ProfileSection";

const sidebarItems = [
    {
        id: 1,
        name: "Dashboard",
        path: "/dashboard",
    },
    {
        id: 2,
        name: "Users",
        path: "/dashboard/users",
    },
    {
        id: 3,
        name: "Clinics",
        path: "/dashboard/clinics",
    },
    {
        id: 4,
        name: "Expenses",
        path: "/dashboard/expenses",
    },
    {
        id: 5,
        name: "Settings",
        path: "/dashboard/settings",
    },
];

export default function Sidebar({
    onItemClick,
}) {
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
                            location.pathname ===
                            item.path;

                        return (
                            <motion.div
                                key={item.id}
                                className={`sidebar-item ${isSelected
                                        ? "selected"
                                        : ""
                                    }`}
                                onClick={() =>
                                    handleItemClick(item)
                                }
                                whileHover={{
                                    scale: 1.03,
                                }}
                                whileTap={{
                                    scale: 0.97,
                                }}
                            >
                                <span className="sidebar-item-name">
                                    {item.name}
                                </span>
                            </motion.div>
                        );
                    })}

                </div>

            </div>

        </div>
    );
}