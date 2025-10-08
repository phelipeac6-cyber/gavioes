import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      <Sidebar />
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};