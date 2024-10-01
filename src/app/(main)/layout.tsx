import Navbar from "@/components/navbar/Navbar";
import { ReactNode } from "react";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default MainLayout;
