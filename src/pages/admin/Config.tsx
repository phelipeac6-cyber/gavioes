import { DashboardLayout } from "@/components/admin/DashboardLayout";

const Config = () => {
  return (
    <DashboardLayout pageTitle="Configurações">
      <main className="p-8">
        <h1 className="text-4xl font-bold text-gray-800">Configurações</h1>
        <p className="text-gray-500">Ajustes e configurações gerais do dashboard.</p>
      </main>
    </DashboardLayout>
  );
};

export default Config;