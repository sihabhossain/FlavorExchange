// Sidebar.tsx
import React from "react";
import {
  Home,
  Compass,
  Bell,
  Mail,
  Bookmark,
  Monitor,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const Sidebar = () => {
  return (
    <aside className="fixed top-20 left-0 h-full w-[250px] mx-4 flex flex-col items-center py-6">
      {/* Profile Section */}
      <div className="flex items-center bg-white rounded-lg shadow-md w-full px-6 p-4 mb-8">
        <Avatar className="w-16 h-16 mr-4">
          <AvatarImage src="https://github.com/shadcn.png" alt="John Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800">John Doe</h2>
          <p className="text-sm text-gray-500">@johndoe</p>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex bg-white py-4 rounded-lg shadow-md flex-col w-full px-6">
        {[
          { icon: Home, label: "Home" },
          { icon: Compass, label: "Explore" },
          { icon: Bell, label: "Notifications" },
          { icon: Mail, label: "Messages" },
          { icon: Bookmark, label: "Bookmarks" },
          { icon: Monitor, label: "Theme" },
          { icon: Settings, label: "Settings" },
        ].map(({ icon, label }, index) => (
          <NavItem key={index} icon={icon} label={label} />
        ))}
      </nav>

      <div className="my-6 ">
        <Button className="rounded-full w-[250px]">Create post</Button>
      </div>
    </aside>
  );
};

const NavItem = ({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType;
  label: string;
}) => {
  return (
    <div className="flex items-center mb-4 p-2 rounded-lg text-gray-800 hover:bg-gray-100 px-2 cursor-pointer hover:text-green-500">
      <div className="mr-4">
        <Icon />
      </div>
      <span className="text-base">{label}</span>
    </div>
  );
};

export default Sidebar;
