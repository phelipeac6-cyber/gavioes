import { Link } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronRight, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const Socio = () => {
  const { profile, loading } = useAuth();

  const renderProfileSection = () => {
    if (loading) {
      return (
        <div className="flex items-center space-x-4">
          <Skeleton className="w-14 h-14 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      );
    }

    if (profile) {
      return (
        <div className="flex items-center space-x-4">
          <Avatar className="w-14 h-14">
            <AvatarImage
              src={profile.avatar_url || ""}
              alt={profile.first_name || "Usuário"}
            />
            <AvatarFallback>
              {profile.first_name ? profile.first_name.charAt(0) : <User />}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{profile.first_name}</h2>
            <p className="text-gray-400">{profile.sub_sede || "Sub-Sede não informada"}</p>
          </div>
        </div>
      );
    }

    return null; // Or a login prompt
  };

  return (
    <PageLayout title="Gavião Sócio">
      <div className="space-y-8">
        {renderProfileSection()}

        <div className="bg-gray-800/50 rounded-2xl p-6 text-center space-y-4">
          <h3 className="text-lg font-bold">Seja um Gavião Sócio</h3>
          <p className="text-gray-300">
            Faça parte da nossa história e tenha acesso a benefícios exclusivos.
          </p>
          <Button className="w-full bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-12">
            Associe-se Agora
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">Benefícios</h3>
          <div className="bg-gray-800/50 rounded-2xl p-4 space-y-4">
            <BenefitItem text="Descontos em produtos oficiais" />
            <BenefitItem text="Acesso a eventos exclusivos" />
            <BenefitItem text="Participação em sorteios" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold">Informações</h3>
          <div className="bg-gray-800/50 rounded-2xl divide-y divide-gray-700">
            <InfoLink to="/estatuto" text="Estatuto do Sócio" />
            <InfoLink to="/historia" text="Nossa História" />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

const BenefitItem = ({ text }: { text: string }) => (
  <div className="flex items-center space-x-3">
    <CheckCircle className="text-green-500" size={20} />
    <span className="text-gray-200">{text}</span>
  </div>
);

const InfoLink = ({ to, text }: { to: string; text: string }) => (
  <Link to={to} className="flex items-center justify-between p-4 hover:bg-gray-700/50 transition-colors">
    <span className="font-semibold">{text}</span>
    <ChevronRight className="text-gray-400" />
  </Link>
);

export default Socio;