import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DashboardLayout from "./app/dashboard/page-2"
import DegreesPage from "./Pages/Degree"
import RegisterDegreePage from "./Pages/RegisterDegree"
import CollegeDetail from "./components/Colleges/CollegesDetail"
import CollegesPage from "./components/Colleges/CollegesPages"
import UniversitiesPage from "./Pages/universities"
import RegisterCollegePage from "./Pages/RegisterCollege"
import LoginPage from "./app/Login/page"
import SuperAdmin from "./components/SuperAdmin/SuperAdmin"
import SuperAdminLogin from "./components/SuperAdmin/SuperAdminLogin"
import Calendar02 from "./components/calendar-02"
import RequireAuth from "./components/RequireAuth"
import { Toaster } from "./components/ui/toast"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/super-admin-login" element={<SuperAdminLogin />} />
                <Route path="/calender-02" element={<Calendar02 />} />
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <DashboardLayout />
                        </RequireAuth>
                    }
                >
                    <Route index element={
                        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
                            <h1 className="text-3xl font-bold text-gray-900">Welcome to Education Portal</h1>
                            <p className="text-lg text-gray-600 max-w-md">
                                Explore Pakistani universities, colleges, degrees, and educational resources all in one place.
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Current User: <span className="font-medium">M-SAMIULLAH786</span> |
                                Current Time: <span className="font-medium">2025-08-23 11:00:32 UTC</span>
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                <a
                                    href="/universities"
                                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                                >
                                    🏛️ Universities
                                </a>
                                <a
                                    href="/colleges"
                                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-lg"
                                >
                                    🏫 Colleges
                                </a>
                                <a
                                    href="/degrees"
                                    className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg"
                                >
                                    🎓 Degrees
                                </a>
                                <a
                                    href="/super-admin-login"
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
                                >
                                    👑 Super Admin
                                </a>
                            </div>
                        </div>
                    } />
                    <Route path="degrees" element={<DegreesPage />} />
                    <Route path="register-degree" element={<RegisterDegreePage />} />
                    <Route path="colleges" element={<CollegesPage />} />
                    <Route path="colleges/:slug" element={<CollegeDetail />} />
                    <Route path="universities" element={<UniversitiesPage />} />
                    <Route path="register-college" element={<RegisterCollegePage />} />
                </Route>
                <Route path="/super-admin" element={<SuperAdmin />} />
                <Route
                    path="*"
                    element={
                        <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center bg-gray-50">
                            <div className="text-6xl">🏛️</div>
                            <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>
                            <p className="text-lg text-gray-600 max-w-md">
                                The page you are looking for does not exist or has been moved.
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Current User: <span className="font-medium">M-SAMIULLAH786</span> |
                                Current Time: <span className="font-medium">2025-08-23 11:00:32 UTC</span>
                            </p>
                            <div className="flex gap-4">
                                <a
                                    href="/"
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    🏠 Go Home
                                </a>
                                <a
                                    href="/universities"
                                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                                >
                                    🏛️ Pakistani Universities
                                </a>
                            </div>
                        </div>
                    }
                />
            </Routes>
            <Toaster />
        </Router>
    )
}

export default App