import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import DashboardLayout from "./app/dashboard/page-2"
import DegreesPage from "./Pages/Degree"
import RegisterDegreePage from "./Pages/RegisterDegree"
import CollegeDetail from "./components/Colleges/CollegesDetail"
import CollegesPage from "./components/Colleges/CollegesPages"    // NEW: detail page
import RegisterCollegePage from "./Pages/RegisterCollege"
import LoginPage from "./app/Login/page"
import SuperAdmin from "./Pages/SuperAdmin"
import Calendar02 from "./components/calendar-02"
import RequireAuth from "./components/RequireAuth"

// (Optional) If you have a dashboard home component you can import it and add an index route:
// import DashboardHome from "./app/dashboard/DashboardHome"

function App() {
    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/calender-02" element={<Calendar02 />} />

                {/* Protected application layout */}
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <DashboardLayout />
                        </RequireAuth>
                    }
                >
                    {/* Optional index route for / (uncomment if you have a dashboard home) */}
                    {/* <Route index element={<DashboardHome />} /> */}

                    {/* Degrees */}
                    <Route path="degrees" element={<DegreesPage />} />
                    <Route path="register-degree" element={<RegisterDegreePage />} />

                    {/* Colleges list & detail */}
                    <Route path="colleges" element={<CollegesPage />} />
                    <Route path="colleges/:slug" element={<CollegeDetail />} /> {/* NEW detail route */}

                    {/* College registration */}
                    <Route path="register-college" element={<RegisterCollegePage />} />

                    {/* Admin */}
                    <Route path="super-admin" element={<SuperAdmin />} />

                    {/* You can add more nested protected routes here */}
                </Route>

                {/* Fallback 404 (catch all) */}
                <Route
                    path="*"
                    element={
                        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
                            <h1 className="text-2xl font-bold">404 – Page Not Found</h1>
                            <p className="text-sm text-muted-foreground">
                                The page you are looking for does not exist.
                            </p>
                            <a
                                href="/colleges"
                                className="text-sm font-medium text-primary underline underline-offset-4 hover:no-underline"
                            >
                                Back to Colleges
                            </a>
                        </div>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App