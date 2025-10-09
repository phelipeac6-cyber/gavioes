import { DashboardLayout } from "@/components/admin/DashboardLayout";

const Ingressos = () => {
  return (
    <DashboardLayout pageTitle="Ingressos">
      <main className="p-8">
        <h1 className="text-4xl font-bold text-gray-800">Ingressos</h1>
        <p className="text-gray-500">Gerencie a venda de ingressos.</p>
      </main>
    </DashboardLayout>
  );
};

export default Ingressos;