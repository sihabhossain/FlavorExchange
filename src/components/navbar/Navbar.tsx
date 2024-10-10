"use client";

import React, { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { useSearch } from "@/contexts/search.provider";
import { UserDropdown } from "./DropDown"; // Import UserDropdown
import MobileSidebar from "./MobileSidebar";

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setSearchInput } = useSearch(); // Access search input from context

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value); // Update the search input in context
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center lg:px-20 justify-between p-4 bg-white shadow-md">
      <div className="flex items-center">
        {/* Toggle for sidebar */}
        <button onClick={toggleSidebar} className="md:hidden p-2">
          {isSidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-10 h-6" />
          )}
        </button>

        {/* Logo */}
        <h1 className="text-2xl font-bold hidden md:block">FlavorXchange</h1>
      </div>

      {/* Centered Search Input */}
      <div className="flex-grow mx-4 flex justify-center">
        <div className="relative w-full max-w-[300px] md:max-w-[800px] mr-28">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 py-2 bg-gray-100 rounded-full border border-gray-300 focus:outline-none focus:border-green-500"
            onChange={handleSearchChange} // Update search context on input change
          />
        </div>
      </div>

      {/* User Dropdown */}
      <div className="items-center">
        <UserDropdown /> {/* Existing UserDropdown component */}
      </div>

      {/* Sidebar Component */}
      <MobileSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </nav>
  );
};

export default Navbar;
