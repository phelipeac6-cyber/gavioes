import { DashboardLayout } from "@/components/admin/DashboardLayout";

const Cadastros = () => {
  return (
    <DashboardLayout pageTitle="Cadastros">
      <main className="p-8">
        <h1 className="text-4xl font-bold text-gray-800">Cadastros</h1>
        <p className="text-gray-500">Gerencie os cadastros do sistema.</p>
      </main>
    </DashboardLayout>
  );
};

export default Cadastros;