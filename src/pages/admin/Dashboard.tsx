import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/admin/DashboardLayout";
import { StatCard } from "@/components/admin/StatCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users, Eye, Receipt, Megaphone, ShoppingBag, Calendar, Ticket, Building, Mail, CircleUserRound
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { showError } from "@/utils/toast";

type DashboardData = {
  totalTorcedores: number;
  latestTorcedores: { first_name: string; last_name: string; estado: string; associated_at: string }[];
  torcedoresByState: { estado: string; count: number }[];
  totalSponsors: number;
  totalViews: string;
  possibleRevenue: string;
  totalCampaigns: number;
  totalSales: number;
  totalEvents: number;
  ticketsSold: number;
  totalSubSedes: number;
  totalAccesses: string;
};

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('dashboard-metrics');

      if (error) {
        showError("Erro ao carregar dados do dashboard: " + error.message);
        console.error(error);
      } else {
        setData(data);
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

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
          {loading || !data ? (
            Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-36 rounded-2xl" />)
          ) : (
            <>
              <StatCard icon={CircleUserRound} title="Patrocinadores" value={data.totalSponsors.toString()} dark />
              <StatCard icon={Users} title="Torcedores" value={data.totalTorcedores.toLocaleString('pt-BR')} />
              <StatCard icon={Eye} title="Visualizações" value={data.totalViews} />
              <StatCard icon={Receipt} title="Possível Receita" value={data.possibleRevenue} />
              <StatCard icon={Megaphone} title="Campanhas" value={data.totalCampaigns.toString()} />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Últimos Cadastros</h2>
            <div className="overflow-x-auto">
              {loading || !data ? (
                <div className="space-y-2">
                  {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
                </div>
              ) : (
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className="text-gray-400 text-sm">
                      <th className="pb-2 font-normal">Nome</th>
                      <th className="pb-2 font-normal">Estado</th>
                      <th className="pb-2 font-normal">Data de Cadastro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.latestTorcedores.map((item, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="py-3 font-semibold text-gray-700">{`${item.first_name || ''} ${item.last_name || ''}`}</td>
                        <td className="py-3 text-gray-500">{item.estado || 'N/A'}</td>
                        <td className="py-3 text-gray-500">{new Date(item.associated_at).toLocaleDateString('pt-BR')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Torcedores por Estado</h2>
            {loading || !data ? (
              <Skeleton className="w-full h-64 rounded-lg" />
            ) : (
              <div className="space-y-2 overflow-y-auto max-h-64 pr-2">
                {data.torcedoresByState.sort((a, b) => b.count - a.count).map((state) => (
                  <div key={state.estado} className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-gray-700">{state.estado}</span>
                    <span className="text-gray-500">{state.count.toLocaleString('pt-BR')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {loading || !data ? (
            Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-36 rounded-2xl" />)
          ) : (
            <>
              <StatCard icon={ShoppingBag} title="Vendas Loja" value={data.totalSales.toLocaleString('pt-BR')} dark />
              <StatCard icon={Calendar} title="Eventos" value={data.totalEvents.toString()} />
              <StatCard icon={Ticket} title="Ingressos Vendidos" value={data.ticketsSold.toLocaleString('pt-BR')} />
              <StatCard icon={Building} title="Sub-Sede" value={data.totalSubSedes.toString()} />
              <StatCard icon={Users} title="Acessos" value={data.totalAccesses} />
            </>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;