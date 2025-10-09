import { DashboardLayout } from "@/components/admin/DashboardLayout";

const Produtos = () => {
  return (
    <DashboardLayout pageTitle="Produtos">
      <main className="p-8">
        <h1 className="text-4xl font-bold text-gray-800">Produtos</h1>
        <p className="text-gray-500">Gerencie os produtos da loja.</p>
      </main>
    </DashboardLayout>
  );
};

export default Produtos;