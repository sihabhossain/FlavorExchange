import { ReactNode } from "react";

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>Dashboard layout</h1>
      {children}
    </div>
  );
}

export default DashboardLayout;
