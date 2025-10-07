import { NavLink } from "react-router-dom";
import { Home, Newspaper, Settings as SettingsIcon } from "lucide-react";

const navItems = [
  { to: "/profile", icon: Home, label: "Início" },
  { to: "/news", icon: Newspaper, label: "Notícias" },
  { to: "/settings", icon: SettingsIcon, label: "Ajustes" },
];

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-around p-2 z-20">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center space-y-1 p-2 rounded-md transition-colors w-1/3 ${
              isActive ? "text-white" : "text-gray-400 hover:text-white"
            }`
          }
        >
          <item.icon size={24} />
          <span className="text-xs">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};