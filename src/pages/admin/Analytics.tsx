import { DashboardLayout } from "@/components/admin/DashboardLayout";

const Analytics = () => {
  return (
    <DashboardLayout pageTitle="Analytics">
      <main className="p-8">
        <h1 className="text-4xl font-bold text-gray-800">Analytics</h1>
        <p className="text-gray-500">Visualize as métricas e dados do aplicativo.</p>
      </main>
    </DashboardLayout>
  );
};

export default Analytics;