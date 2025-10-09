import { DashboardLayout } from "@/components/admin/DashboardLayout";

const Pagamentos = () => {
  return (
    <DashboardLayout pageTitle="Pagamentos">
      <main className="p-8">
        <h1 className="text-4xl font-bold text-gray-800">Pagamentos</h1>
        <p className="text-gray-500">Gerencie as transações e pagamentos.</p>
      </main>
    </DashboardLayout>
  );
};

export default Pagamentos;