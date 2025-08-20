"use client";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  GraduationCap,
  Upload,
  University,
  LogOut,
  Smile,
  Menu,
} from "lucide-react";

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 used for active highlight
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className={`flex h-screen ${collapsed ? "w-20" : "w-64"
        } flex-col bg-gradient-to-b from-sky-400 to-blue-500 text-white transition-all duration-300`}
    >
      {/* Header with Logo + Toggle */}
      <div className="flex items-center justify-between px-4 py-3">
        {!collapsed && (
          <img
            src="https://pkdservers.com/CDC/static/media/logo.5294e2f22022c5a5f613.png"
            alt="Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md border border-red-400 hover:bg-green-300"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 mt-6 space-y-2">
        <SidebarItem
          collapsed={collapsed}
          icon={<Home size={20} />}
          label="Home"
          onClick={() => navigate("/")}
          active={location.pathname === "/"}
        />
        <SidebarItem
          collapsed={collapsed}
          icon={<GraduationCap size={20} />}
          label="Degrees"
          onClick={() => navigate("/degrees")}
          active={location.pathname === "/degrees"}
        />
        <SidebarItem
          collapsed={collapsed}
          icon={<Upload size={20} />}
          label="Register Degree"
          onClick={() => navigate("/register-degree")}
          active={location.pathname === "/register-degree"}
        />
        <SidebarItem
          collapsed={collapsed}
          icon={<University size={20} />}
          label="Colleges"
          onClick={() => navigate("/colleges")}
          active={location.pathname === "/colleges"}
        />
        <SidebarItem
          collapsed={collapsed}
          icon={<Upload size={20} />}
          label="Register College"
          onClick={() => navigate("/register-college")}
          active={location.pathname === "/register-college"}
        />
      </div>

      {/* Bottom User Section */}
      <div className="px-4 py-3 border-t border-white/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-amber-900">
            <Smile size={20} />
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold">M Nouman</p>
              <p className="text-xs opacity-80">store admin</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="p-2 hover:bg-white/20 rounded-lg"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  collapsed,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2 w-full text-left rounded-md transition 
        ${collapsed ? "justify-center" : ""}
        ${active ? "bg-amber-700" : "hover:bg-amber-600"}
      `}
    >
      {icon}
      {!collapsed && <span className="font-medium">{label}</span>}
    </button>
  );
}
