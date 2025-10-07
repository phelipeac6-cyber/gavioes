import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";

const Socio = () => {
  return (
    <PageLayout title="Sócio Gavião">
      <div className="space-y-6">
        <div className="bg-gray-900 p-4 rounded-lg space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Nome</span>
            <span className="font-semibold">Gavião Fiel</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Matrícula</span>
            <span className="font-semibold">123456789</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Plano</span>
            <span className="font-semibold">Sócio Torcedor</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Status</span>
            <span className="font-semibold text-green-400">Ativo</span>
          </div>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg flex flex-col items-center space-y-4">
          <p className="font-semibold">Apresente o QR Code na entrada</p>
          <div className="p-4 bg-white rounded-lg">
            <QrCode size={160} className="text-black" />
          </div>
        </div>
        <Button className="w-full bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-12">
          Carteirinha Digital
        </Button>
      </div>
    </PageLayout>
  );
};

export default Socio;