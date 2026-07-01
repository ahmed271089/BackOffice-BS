import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShieldAlert,
  Users,
  FolderTree,
  Trophy,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../auth/AuthContext";
import ThemeToggle from "../components/ThemeToggle";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/moderation", label: "Moderation Queue", icon: ShieldAlert },
  { to: "/users", label: "User Management", icon: Users },
  { to: "/categories", label: "Categories", icon: FolderTree },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

function SidebarContent({
  onNavigate,
  onLogout,
}: {
  onNavigate?: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-5 py-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
          BS
        </div>
        <span className="text-sm font-bold text-textPrimary">
          Best Solving Admin
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            end={to === "/"}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-muted text-primary-light"
                  : "text-textSecondary hover:bg-bgElevated hover:text-textPrimary",
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-cardBorder p-3">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-textSecondary hover:bg-bgElevated hover:text-danger"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { userName, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials =
    userName
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AD";

  return (
    <div className="flex h-screen bg-bg">
      <aside className="hidden w-64 flex-shrink-0 border-r border-cardBorder bg-bgElevated md:block">
        <SidebarContent onLogout={handleLogout} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-64 bg-bgElevated">
            <div className="flex justify-end p-3">
              <button
                onClick={() => setMobileOpen(false)}
                className="text-textSecondary"
              >
                <X size={20} />
              </button>
            </div>
            <SidebarContent
              onNavigate={() => setMobileOpen(false)}
              onLogout={handleLogout}
            />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-cardBorder bg-bgElevated px-4 py-3 md:px-6">
          <button
            className="text-textSecondary md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>
          <ThemeToggle />
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-textSecondary sm:block">
              {userName}
            </span>
            <div className="h-8 w-8 rounded-full bg-primary-muted text-center text-xs font-bold leading-8 text-primary-light">
              {initials}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
