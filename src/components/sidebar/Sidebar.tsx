"use client";

import React from "react";
import { LayoutDashboard, House, PhoneCall, Info } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CreateRecipeModal } from "../modals/CreateRecipeModal";
import Link from "next/link";
import { useUser } from "@/contexts/user.provider";

const Sidebar = () => {
  const { user } = useUser();

  return (
    <aside className="fixed top-20 left-0 h-full w-[250px] mx-4 flex flex-col items-center py-6">
      {/* Profile Section */}
      <div className="flex items-center bg-white rounded-lg shadow-md w-full px-6 p-4 mb-8">
        <Avatar className="w-12 h-12 object-cover rounded-full mr-2">
          <AvatarImage src={user?.profilePhoto} alt={user?.name} />
          <AvatarFallback>user</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800">{user?.name}</h2>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex bg-white py-4 rounded-lg shadow-md flex-col w-full px-6">
        {[
          { icon: House, label: "Home", redirect: "/" },
          { icon: LayoutDashboard, label: "Dashboard", redirect: "/dashboard" },
          { icon: PhoneCall, label: "Contact", redirect: "/contact" },
          { icon: Info, label: "About", redirect: "/about" },
        ].map(({ icon, label, redirect }, index) => (
          <NavItem key={index} icon={icon} label={label} redirect={redirect} />
        ))}
      </nav>

      <div className="my-6">
        <CreateRecipeModal />
      </div>
    </aside>
  );
};

const NavItem = ({
  icon: Icon,
  label,
  redirect,
}: {
  icon: React.ComponentType;
  label: string;
  redirect: string;
}) => {
  return (
    <Link href={redirect} passHref>
      <div className="flex items-center mb-4 p-2 rounded-lg text-gray-800 hover:bg-gray-100 px-2 cursor-pointer hover:text-green-500">
        <div className="mr-4">
          <Icon />
        </div>
        <span className="text-base">{label}</span>
      </div>
    </Link>
  );
};

export default Sidebar;
