import { Link } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronRight, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { format, intervalToDuration, isPast } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

    return null;
  };

  const renderMembershipCard = () => {
    if (loading) {
      return <Skeleton className="h-64 w-full rounded-2xl" />;
    }

    if (profile && profile.associated_at) {
      const associationDate = new Date(profile.associated_at);
      const expirationDate = profile.membership_expires_at ? new Date(profile.membership_expires_at) : null;

      const isExpired = expirationDate ? isPast(expirationDate) : true;
      const statusText = isExpired ? "Vencida" : "Em dia";
      const statusColor = isExpired ? "text-red-500" : "text-green-500";

      const duration = intervalToDuration({ start: associationDate, end: new Date() });
      const durationString = `${duration.years || 0} anos, ${duration.months || 0} meses e ${duration.days || 0} dias`;

      return (
        <div className="bg-gray-800/50 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-center">Minha Associação</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <p className="text-gray-400">Associado desde:</p>
            <p className="font-semibold text-right">{format(associationDate, 'dd/MM/yyyy', { locale: ptBR })}</p>

            <p className="text-gray-400">Vencimento:</p>
            <p className="font-semibold text-right">{expirationDate ? format(expirationDate, 'dd/MM/yyyy', { locale: ptBR }) : 'N/A'}</p>

            <p className="text-gray-400">Status:</p>
            <p className={`font-bold text-right ${statusColor}`}>{statusText}</p>
          </div>
          <div className="text-sm text-center pt-2">
            <p className="text-gray-400">Tempo de casa:</p>
            <p className="font-semibold">{durationString}</p>
          </div>
          <Button className="w-full bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-12 !mt-6">
            Pagar
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <PageLayout title="Gavião Sócio">
      <div className="space-y-8">
        {renderProfileSection()}
        {renderMembershipCard()}

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