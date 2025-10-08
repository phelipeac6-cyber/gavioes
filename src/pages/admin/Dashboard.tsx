import { DashboardLayout } from "@/components/admin/DashboardLayout";
import { StatCard } from "@/components/admin/StatCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users, Eye, Receipt, Megaphone, ShoppingBag, Calendar, Ticket, Building, Mail, CircleUserRound
} from "lucide-react";
import mapImage from "@/assets/map-placeholder.png";

const topAccessData = [
  { name: "Michael Knight", state: "Minas Gerais", views: 250 },
  { name: "Jonathan Higgins", state: "Pernambuco", views: 99 },
  { name: "Willie Tanner", state: "Pará", views: 75 },
  { name: "Murdock", state: "São Paulo", views: 63 },
  { name: "Theodore T.C. Calvin", state: "Pernambuco", views: 50 },
];

const Dashboard = () => {
  return (
    <DashboardLayout pageTitle="Dashboard">
      <main className="p-4 md:p-8">
        <header className="hidden md:flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Gaviões da Fiel</h1>
            <p className="text-gray-500">Engajando Marcas</p>
          </div>
          <div className="flex items-center space-x-4">
            <Mail size={24} className="text-gray-500" />
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="Julio Cesar" />
                <AvatarFallback>JC</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-gray-800">Julio Cesar</p>
                <p className="text-sm text-gray-500">juliocsm90@gmail.com</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          <StatCard icon={CircleUserRound} title="Patrocinadores" value="1" dark />
          <StatCard icon={Users} title="Torcedores" value="131.000" />
          <StatCard icon={Eye} title="Visualizações" value="19.650.000" />
          <StatCard icon={Receipt} title="Possível Receita" value="R$393.000,00" />
          <StatCard icon={Megaphone} title="Campanhas" value="15" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Top acessos</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="text-gray-400 text-sm">
                    <th className="pb-2 font-normal">Nome</th>
                    <th className="pb-2 font-normal">Estados</th>
                    <th className="pb-2 font-normal">Visualizações</th>
                    <th className="pb-2 font-normal"></th>
                  </tr>
                </thead>
                <tbody>
                  {topAccessData.map((item, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="py-3 font-semibold text-gray-700">{item.name}</td>
                      <td className="py-3 text-gray-500">{item.state}</td>
                      <td className="py-3 text-gray-500">{item.views}</td>
                      <td className="py-3"><Eye size={20} className="text-gray-400 cursor-pointer" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Torcedores</h2>
            <img src={mapImage} alt="Mapa de torcedores" className="w-full h-auto object-cover rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <StatCard icon={ShoppingBag} title="Vendas Loja" value="1.525" dark />
          <StatCard icon={Calendar} title="Eventos" value="35" />
          <StatCard icon={Ticket} title="Ingressos Vendidos" value="50.000" />
          <StatCard icon={Building} title="Sub-Sede" value="200" />
          <StatCard icon={Users} title="Acessos" value="5.845.021" />
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;