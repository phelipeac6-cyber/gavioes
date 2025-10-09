import { DashboardLayout } from "@/components/admin/DashboardLayout";

const Eventos = () => {
  return (
    <DashboardLayout pageTitle="Eventos">
      <main className="p-8">
        <h1 className="text-4xl font-bold text-gray-800">Eventos</h1>
        <p className="text-gray-500">Gerencie os eventos do aplicativo.</p>
      </main>
    </DashboardLayout>
  );
};

export default Eventos;