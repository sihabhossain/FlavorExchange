import React from "react";
import { X, House, LayoutDashboard, PhoneCall, Info } from "lucide-react"; // Import the required icons
import Link from "next/link";

// Define the route structure
const routes = [
  { icon: House, label: "Home", redirect: "/" },
  { icon: LayoutDashboard, label: "Dashboard", redirect: "/dashboard" },
  { icon: PhoneCall, label: "Contact", redirect: "/contact" },
  { icon: Info, label: "About", redirect: "/about" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full text-gray-800 bg-gradient-to-b from-gray-100 to-white z-50 shadow-xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-in-out rounded-r-lg`}
      >
        {/* Close Button inside Sidebar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-800 transition-transform hover:scale-110"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Menu</h2>
          <ul className="space-y-4">
            {routes.map((route, index) => (
              <li key={index} className="flex items-center space-x-2">
                <route.icon className="w-5 h-5 text-gray-500" />
                <Link
                  href={route.redirect}
                  className="text-lg hover:text-green-500 transition duration-300"
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay to close sidebar */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black opacity-60 z-40 transition-opacity duration-500 ease-in-out"
        ></div>
      )}
    </>
  );
};

export default MobileSidebar;
