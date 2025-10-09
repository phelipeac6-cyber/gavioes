import { DashboardLayout } from "@/components/admin/DashboardLayout";

const Campanhas = () => {
  return (
    <DashboardLayout pageTitle="Campanhas">
      <main className="p-8">
        <h1 className="text-4xl font-bold text-gray-800">Campanhas</h1>
        <p className="text-gray-500">Crie e gerencie campanhas de marketing.</p>
      </main>
    </DashboardLayout>
  );
};

export default Campanhas;