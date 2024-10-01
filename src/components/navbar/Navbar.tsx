import React from "react";
import { Search, PlusCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { UserDropdown } from "./DropDown";

const Navbar = () => {
  return (
    <nav className="flex items-center px-4 md:px-10 lg:px-20 justify-between p-4 bg-white shadow-md">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-800">FlavorXchange</h1>
      </div>
      <div className="flex items-center justify-center flex-grow mx-4">
        <div className="relative w-full max-w-[300px] md:max-w-[500px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 py-2  bg-gray-100 rounded-full border border-gray-300 focus:outline-none focus:border-green-500 shadow-sm w-full"
          />
        </div>
      </div>
      <div className="flex items-center md:hidden">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="hidden md:flex items-center">
        <Button className="flex items-center  text-white rounded-full px-4 py-2 mr-4 transition duration-200 ">
          <PlusCircle className="mr-1 h-5 w-5" />
          Create
        </Button>

        <div>
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
