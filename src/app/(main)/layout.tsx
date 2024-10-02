import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
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
        {/* Adjust margin for small screens when the sidebar is hidden */}
        <main className="p-4 mt-4 md:ml-72">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;
