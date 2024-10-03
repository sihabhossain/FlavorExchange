import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import UserList from "@/components/userList/UserList";
import { ReactNode } from "react";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      {/* Hide the sidebar on small screens */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-grow">
        <Navbar />
        {/* Center the main content and set a max-width */}
        <main className="mx-auto p-4 mt-4 flex-grow max-w-5xl w-full">
          {children}
        </main>
      </div>
      {/* User list section on the right side */}
      <div className="hidden lg:block">
        <UserList />
      </div>
    </div>
  );
}

export default MainLayout;
