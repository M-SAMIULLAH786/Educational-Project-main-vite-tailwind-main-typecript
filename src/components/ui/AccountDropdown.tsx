import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FiLogOut, FiUser, FiStar, FiShield } from "react-icons/fi"
import { logout, isAuthenticated } from "@/utils/auth"

const AccountDropdown = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout() // ✅ clear session
    setOpen(false)
    navigate("/login", { replace: true }) // redirect to login
  }

  return (
    <div className="relative">
      {/* Trigger Icon */}
      <FiLogOut
        className="text-xl cursor-pointer hover:text-accent-foreground"
        onClick={() => setOpen(!open)}
      />

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute bottom-12 right-0 bg-popover text-popover-foreground shadow-lg rounded-lg w-48 border border-border">
          <Link
            to="/account"
            className="flex items-center gap-2 px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-t-lg"
            onClick={() => setOpen(false)}
          >
            <FiUser /> Account Info
          </Link>
          <Link
            to="/upgrade"
            className="flex items-center gap-2 px-4 py-2 hover:bg-accent hover:text-accent-foreground"
            onClick={() => setOpen(false)}
          >
            <FiStar /> Upgrade to Premium
          </Link>
          <Link
            to="/calender-02"
            className="flex items-center gap-2 px-4 py-2 hover:bg-accent hover:text-accent-foreground"
            onClick={() => {
              setOpen(false)
              navigate("/calender-02")
            }}
          >
            <FiShield /> Date Calendar
          </Link>

          {/* ✅ Dynamic Login/Logout */}
          {isAuthenticated() ? (
            <button
              className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-red-100"
              onClick={handleLogout}
            >
              <FiLogOut /> Logout
            </button>
          ) : (
            <button
              className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-amber-100"
              onClick={() => {
                setOpen(false)
                navigate("/login")
              }}
            >
              <FiLogOut /> Login
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default AccountDropdown
