import { Link } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Phone } from "lucide-react";

const EmergencyCard = () => {
  const healthInfo = [
    { label: "Tipo Sanguíneo", value: "O+" },
    { label: "Alergias", value: "Nenhuma" },
    { label: "Doenças Crônicas", value: "Hipertensão" },
    { label: "Medicamentos em Uso", value: "Losartana 50mg" },
  ];

  const emergencyContact = {
    name: "Maria Silva",
    phone: "(11) 98765-4321",
  };

  return (
    <PageLayout title="Carteirinha de Emergência" showSponsor={false}>
      <div className="flex flex-col items-center text-center space-y-8">
        {/* User Identification */}
        <div className="flex flex-col items-center space-y-3">
          <Avatar className="w-24 h-24 border-4 border-gray-700">
            <AvatarImage
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400"
              alt="Alê"
            />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Alê</h1>
            <p className="text-gray-400">Presidente Gaviões</p>
          </div>
        </div>

        <div className="w-full max-w-sm bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 space-y-6 text-left">
          {/* Health Info */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-red-500">Dados de Saúde</h2>
            <div className="space-y-3">
              {healthInfo.map((item) => (
                <div key={item.label}>
                  <p className="text-sm text-gray-400">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-gray-700" />

          {/* Emergency Contact */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-red-500">Contato de Emergência</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Nome</p>
                <p className="font-semibold">{emergencyContact.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Telefone</p>
                <a href={`tel:${emergencyContact.phone}`} className="font-semibold flex items-center space-x-2 hover:underline">
                  <Phone size={16} />
                  <span>{emergencyContact.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black w-full max-w-sm h-12">
          <Link to="/health">Editar Dados</Link>
        </Button>
      </div>
    </PageLayout>
  );
};

export default EmergencyCard;