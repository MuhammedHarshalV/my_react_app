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

const LoginPage = lazy(
    () => import("../pages/LoginPage")
);

const DashboardLayout = lazy(
    () => import("../pages/dashboard/DashboardLayout")
);

const DashboardHome = lazy(
    () => import("../pages/dashboard/DashboardHome")
);

const UsersPage = lazy(
    () => import("../pages/dashboard/UsersPage")
);

const ClinicsPage = lazy(
    () => import("../pages/dashboard/ClinicsPage")
);

const ExpensesPage = lazy(
    () => import("../pages/dashboard/ExpensesPage")
);

const SettingsPage = lazy(
    () => import("../pages/dashboard/SettingsPage")
);

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Suspense fallback={<PageLoader />}>

                <Routes>

                    {/* LOGIN */}
                    <Route
                        path="/"
                        element={<LoginPage />}
                    />

                    {/* DASHBOARD LAYOUT */}
                    <Route
                        path="/dashboard"
                        element={<DashboardLayout />}
                    >

                        {/* /dashboard */}
                        <Route
                            index
                            element={<DashboardHome />}
                        />

                        {/* /dashboard/users */}
                        <Route
                            path="users"
                            element={<UsersPage />}
                        />

                        {/* /dashboard/clinics */}
                        <Route
                            path="clinics"
                            element={<ClinicsPage />}
                        />

                        {/* /dashboard/expenses */}
                        <Route
                            path="expenses"
                            element={<ExpensesPage />}
                        />

                        {/* /dashboard/settings */}
                        <Route
                            path="settings"
                            element={<SettingsPage />}
                        />

                    </Route>

                    {/* UNKNOWN ROUTE */}
                    <Route
                        path="*"
                        element={
                            <Navigate
                                to="/"
                                replace
                            />
                        }
                    />

                </Routes>

            </Suspense>
        </BrowserRouter>
    );
}

function PageLoader() {
    return (
        <div>
            Loading...
        </div>
    );
}