import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  dark?: boolean;
}

export const StatCard = ({ icon: Icon, title, value, dark = false }: StatCardProps) => {
  return (
    <div className={cn(
      "p-6 rounded-2xl flex flex-col justify-between",
      dark ? "bg-gray-800 text-white" : "bg-white text-gray-800"
    )}>
      <div className="flex items-center space-x-4">
        <div className={cn("p-2 rounded-full", dark ? "bg-gray-700" : "bg-gray-100")}>
          <Icon size={24} className={cn(dark ? "text-white" : "text-gray-600")} />
        </div>
        <h3 className="font-semibold text-gray-400">{title}</h3>
      </div>
      <p className="text-3xl font-bold mt-4">{value}</p>
    </div>
  );
};