import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { ReactNode } from "react";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col flex-grow ">
        <Navbar />
        <main className="p-4 mt-4 ml-72">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;
