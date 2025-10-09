import { DashboardLayout } from "@/components/admin/DashboardLayout";

const Saude = () => {
  return (
    <DashboardLayout pageTitle="Saúde">
      <main className="p-8">
        <h1 className="text-4xl font-bold text-gray-800">Dados de Saúde</h1>
        <p className="text-gray-500">Visualize os dados de saúde dos torcedores.</p>
      </main>
    </DashboardLayout>
  );
};

export default Saude;