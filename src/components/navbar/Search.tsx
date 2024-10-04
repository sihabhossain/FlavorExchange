import React from "react";
import { Search, Menu, X } from "lucide-react";
import { Input } from "../ui/input";

const SearchInput = () => {
  return (
    <div className="hidden md:flex items-center justify-center flex-grow mx-4">
      <div className="relative w-full max-w-[300px] md:max-w-[500px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search..."
          className="pl-10 py-2 bg-gray-100 rounded-full border border-gray-300 focus:outline-none focus:border-green-500 shadow-sm w-full"
        />
      </div>
    </div>
  );
};

export default SearchInput;
