import React, { useState } from "react"
import {
    FaHome,
    FaGraduationCap,
    FaUniversity,
    FaUserShield,
    FaUpload,
} from "react-icons/fa"
import { FiMenu, FiChevronDown, FiChevronRight } from "react-icons/fi"
import { Link, useLocation } from "react-router-dom"
import AccountDropdown from "./ui/AccountDropdown"

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [openRegisterMenu, setOpenRegisterMenu] = useState(false)
    const location = useLocation()

    const menuItems = [
        { name: "Home", icon: <FaHome />, link: "/" },
        { name: "Degrees", icon: <FaGraduationCap />, link: "/degrees" },
        { name: "Colleges", icon: <FaUniversity />, link: "/colleges" },
        { name: "Super Admin", icon: <FaUserShield />, link: "/super-admin" },
    ]

    // Check if current route belongs to register dropdown
    const isRegisterActive = location.pathname.startsWith("/register")

    return (
        <div
            className={`   relative flex flex-col full-screen text-foreground bg-background border-r border-border transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"
                }`}
        >
            {/* Top (scrollable area) */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 pb-24">
                {/* Collapse button */}
                <div className="flex justify-end mb-4">
                    <FiMenu
                        className="text-2xl cursor-pointer"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    />
                </div>

                {/* Nav items */}
                <nav className="flex flex-col gap-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.link}
                            className={`flex items-center gap-3 transition-colors p-2 rounded-lg ${location.pathname === item.link
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-accent hover:text-accent-foreground"
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {!isCollapsed && <span className="font-semibold">{item.name}</span>}
                        </Link>
                    ))}

                    {/* Dropdown for Register */}
                    <div>
                        <button
                            onClick={() => setOpenRegisterMenu(!openRegisterMenu)}
                            className={`flex items-center justify-between w-full gap-3 transition-colors p-2 rounded-lg ${isRegisterActive
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-accent hover:text-accent-foreground"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <FaUpload className="text-lg" />
                                {!isCollapsed && (
                                    <span className="font-semibold">Register</span>
                                )}
                            </div>
                            {!isCollapsed &&
                                (openRegisterMenu || isRegisterActive ? (
                                    <FiChevronDown />
                                ) : (
                                    <FiChevronRight />
                                ))}
                        </button>

                        {/* Dropdown links */}
                        {(openRegisterMenu || isRegisterActive) && !isCollapsed && (
                            <div className="ml-8 mt-1 flex flex-col gap-1">
                                <Link
                                    to="/register-degree"
                                    className={`px-2 py-1 rounded-lg transition-colors ${location.pathname === "/register-degree"
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-accent hover:text-accent-foreground"
                                        }`}
                                >
                                    Register Degree
                                </Link>
                                <Link
                                    to="/register-college"
                                    className={`px-2 py-1 rounded-lg transition-colors ${location.pathname === "/register-college"
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-accent hover:text-accent-foreground"
                                        }`}
                                >
                                    Register College
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            {/* Bottom user section (always at screen bottom) */}
            <div
                className={`absolute bottom-0 left-0 right-0 flex items-center justify-between bg-muted/40 p-3 border-t border-border transition-all duration-300 ${isCollapsed ? "flex-col gap-2 text-center" : ""
                    }`}
            >
                <div>
                    {!isCollapsed && (
                        <>
                            <p className="font-semibold">M SamiUllah</p>
                            <p className="text-sm text-muted-foreground">Admin</p>
                        </>
                    )}
                </div> 
                 <AccountDropdown />
            </div>
        </div>
    )
}

export default Sidebar
