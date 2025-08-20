import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./app/dashboard/page-2";
import DegreesPage from "./Pages/Degree";
import RegisterDegreePage from "./Pages/RegisterDegree";
import CollegesPage from "./Pages/Colleges";
import RegisterCollegePage from "./Pages/RegisterCollege";
import LoginPage from "./app/Login/page";
import SuperAdmin from "./Pages/SuperAdmin";
import Calendar02 from "./components/calendar-02";
import RequireAuth from "./components/RequireAuth";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/calender-02" element={<Calendar02 />} />
                <Route path="/" element={
                    <RequireAuth>
                        <DashboardLayout />
                    </RequireAuth>
                }>
                    <Route path="degrees" element={<DegreesPage />} />
                    <Route path="register-degree" element={<RegisterDegreePage />} />
                    <Route path="colleges" element={<CollegesPage />} />
                    <Route path="register-college" element={<RegisterCollegePage />} />
                    <Route path="super-admin" element={<SuperAdmin />} />
                </Route>
            </Routes>
        </Router>
    );
}
export default App;
