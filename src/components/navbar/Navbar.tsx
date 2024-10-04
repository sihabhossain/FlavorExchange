"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { UserDropdown } from "./DropDown";
import Link from "next/link";
import MobileSidebar from "./MobileSidebar";
import SearchInput from "./Search";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center px-4 md:px-10 lg:px-20 justify-between p-4 bg-white shadow-md">
      {/* Left: Logo and Hamburger */}
      <div className="flex items-center">
        {/* Hamburger Icon for Mobile */}
        <button onClick={toggleSidebar} className="md:hidden p-2">
          {isSidebarOpen ? (
            <X className="w-5 h-5" /> // Smaller X icon
          ) : (
            <Menu className="w-10 h-6" /> // Smaller Menu icon
          )}
        </button>

        <Link href={"/"} className="text-2xl font-bold text-gray-800">
          FlavorXchange
        </Link>
      </div>

      {/* Center: Search Input */}
      <SearchInput />

      {/* Right: User Dropdown */}
      <div className="items-center">
        <UserDropdown />
      </div>

      {/* Sidebar Component */}
      <MobileSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </nav>
  );
};

export default Navbar;
