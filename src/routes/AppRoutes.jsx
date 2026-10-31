
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import {
    lazy,
    Suspense,
} from "react";

import CenterLoader from "../components/common/CenterLoader";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const DashboardLayout = lazy(() => import("../pages/dashboard/DashboardLayout"));
const DashboardHome = lazy(() => import("../pages/dashboard/DashboardHome"));
const UsersPage = lazy(() => import("../pages/dashboard/UsersPage"));
const ClinicsPage = lazy(() => import("../pages/dashboard/ClinicsPage"));
const ExpensesPage = lazy(() => import("../pages/dashboard/ExpensesPage"));
const MenuPage = lazy(() => import("../pages/dashboard/MenuPage"));
const HistoryPage = lazy(() => import("../pages/dashboard/HistoryPage"));

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
                <Routes>

                    {/* Login */}
                    <Route path="/" element={<LoginPage />} />

                    {/* Dashboard */}
                    <Route
                        path="/dashboard"
                        element={<DashboardLayout />}
                    >
                        <Route index element={<DashboardHome />} />
                        <Route path="users" element={<UsersPage />} />
                        <Route path="clinics" element={<ClinicsPage />} />
                        <Route path="expenses" element={<ExpensesPage />} />
                        <Route path="menu" element={<MenuPage />} />
                        <Route path="history" element={<HistoryPage />} />
                    </Route>

                    {/* Unknown Route */}
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />

                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

function PageLoader() {
    return (
        <div className="page-loader">
            <CenterLoader />
        </div>
    );
}
