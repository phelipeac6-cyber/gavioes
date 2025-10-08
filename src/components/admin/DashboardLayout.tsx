import { useState, ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  pageTitle: string;
}

export const DashboardLayout = ({ children, pageTitle }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="md:ml-64">
        {/* Mobile Header */}
        <header className="p-4 flex items-center justify-between md:hidden sticky top-0 bg-white shadow-sm z-20">
          <h1 className="text-xl font-bold text-gray-800">{pageTitle}</h1>
          <button onClick={() => setSidebarOpen(true)} className="p-2">
            <Menu size={24} />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
};