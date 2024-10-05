"use client";

import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Calendar,
  User,
  LogOut,
  ArrowRight,
  Users,
  Pizza,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/user.provider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  const role = user?.role;

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Handle logout logic here (e.g., clear token or call an API)
    router.push("/");
    console.log("User logged out successfully");
  };

  // Dynamic navigation links based on the role
  const navLinks = (() => {
    switch (role) {
      case "ADMIN":
        return [
          { href: "/dashboard", label: "Home", icon: Home },
          { href: "/dashboard/users", label: "Users", icon: Users },
          {
            href: "/dashboard/recipes",
            label: "Recipes",
            icon: Pizza,
          },
        ];
      case "USER":
        return [
          { href: "/dashboard", label: "Home", icon: Home },
          {
            href: "/dashboard/my-recipes",
            label: "My Recipes",
            icon: Calendar,
          },
          { href: "/dashboard/profile", label: "Profile", icon: User },
        ];
      default:
        return [{ href: "/dashboard", label: "Home", icon: Home }];
    }
  })();

  // Dynamic layout title based on role
  const layoutTitle = (() => {
    switch (role) {
      case "ADMIN":
        return "Admin Dashboard";
      case "USER":
        return "User Dashboard";
      default:
        return "Dashboard";
    }
  })();

  return (
    <div className="relative flex h-screen overflow-hidden bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-gray-800 text-gray-100 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:w-64 md:translate-x-0`}
      >
        <div className="flex items-center justify-between bg-gray-700 p-4">
          <h2 className="text-lg font-semibold">{layoutTitle}</h2>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="transform text-gray-100 transition-transform duration-300 hover:rotate-90 md:hidden"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav className="p-4">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center rounded p-2 text-gray-300 hover:bg-gray-700 hover:text-gray-100"
                >
                  <link.icon size={20} className="mr-2" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 w-full bg-gray-700 p-4">
          <Link href="/">
            <button className="flex w-full items-center rounded p-2 text-gray-300 hover:bg-gray-600 hover:text-gray-100">
              <ArrowRight size={20} className="mr-2" /> Exit
            </button>
          </Link>
          <button
            className="mt-2 flex w-full items-center rounded p-2 text-gray-300 hover:bg-gray-600 hover:text-gray-100"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div
        className={`flex-1 bg-gray-900 p-6 transition-transform duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <div className="mb-10 flex items-center justify-between md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="transform text-gray-100 transition-transform duration-300 hover:rotate-90"
          >
            <Menu size={24} />
          </button>
          <h2>{layoutTitle}</h2>
        </div>
        <div className="max-h-screen overflow-y-auto">
          {/* Render children here */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
