import { Outlet, NavLink } from "react-router";
import {
  Home,
  Link as LinkIcon,
  QrCode,
  Barcode,
  BarChart3,
  Settings,
  X,
} from "lucide-react";
import { Button } from "./ui/button";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-4 lg:p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="font-semibold text-gray-800 hidden lg:block">
            URLite
          </span>
          <button className="ml-auto text-gray-400 hidden lg:block">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Create New Button */}
        <div className="px-4 lg:px-6 mb-6">
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 lg:py-5">
            <span className="hidden lg:inline">Create New</span>
            <span className="lg:hidden text-2xl">+</span>
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 lg:px-4 space-y-1">
          <NavLink
            to="/app"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 lg:px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            <span className="hidden lg:inline">Home</span>
          </NavLink>

          <NavLink
            to="/app/links"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 lg:px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <LinkIcon className="w-5 h-5 flex-shrink-0" />
            <span className="hidden lg:inline">Links</span>
          </NavLink>

          <NavLink
            to="/app/qr-codes"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 lg:px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <QrCode className="w-5 h-5 flex-shrink-0" />
            <span className="hidden lg:inline">QR Codes</span>
          </NavLink>

          <NavLink
            to="/app/barcodes"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 lg:px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <Barcode className="w-5 h-5 flex-shrink-0" />
            <span className="hidden lg:inline">Barcodes</span>
          </NavLink>

          <NavLink
            to="/app/analytics"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 lg:px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <BarChart3 className="w-5 h-5 flex-shrink-0" />
            <span className="hidden lg:inline">Analytics</span>
          </NavLink>

          <NavLink
            to="/app/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 lg:px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span className="hidden lg:inline">Settings</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}