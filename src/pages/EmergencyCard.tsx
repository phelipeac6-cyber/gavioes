import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Phone, User } from "lucide-react";
import { showError } from "@/utils/toast";
import { Skeleton } from "@/components/ui/skeleton";

type CardData = {
  first_name: string | null;
  avatar_url: string | null;
  sub_sede: string | null;
  tipo_sanguineo: string | null;
  alergia_medicamento: string | null;
  diabetes: string | null;
  cardiaco: string | null;
  pressao: string | null;
  remedios: string | null;
  contato_emergencia_nome: string | null;
  contato_emergencia_telefone: string | null;
};

const EmergencyCard = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [profile, setProfile] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCard = async () => {
      if (!slug) {
        showError("UUID da pulseira não fornecido.");
        navigate("/");
        return;
      }

      setLoading(true);
      const res = await fetch("https://esckspxnezngxhnqmznc.supabase.co/functions/v1/public-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uuid: slug }),
      });
      const data = await res.json();

      if (!res.ok || !data?.ok) {
        showError(data?.error || "Não foi possível carregar a carteirinha.");
        setProfile(null);
        setLoading(false);
        return;
      }

      setProfile(data.data);
      setLoading(false);
    };

    fetchCard();
  }, [navigate, slug]);

  const getChronicConditions = () => {
    if (!profile) return "Nenhuma";
    const conditions = [];
    if (profile.diabetes === "Sim") conditions.push("Diabetes");
    if (profile.cardiaco === "Problemas Cardíacos") conditions.push("Problemas Cardíacos");
    if (profile.pressao === "Pressão Alta") conditions.push("Pressão Alta");
    return conditions.length > 0 ? conditions.join(", ") : "Nenhuma";
  };

  if (loading) {
    return <EmergencyCardSkeleton />;
  }

  if (!profile) {
    return (
      <PageLayout title="Carteirinha de Emergência" showSponsor={false}>
        <div className="text-center">
          <p>Não foi possível carregar os dados.</p>
        </div>
      </PageLayout>
    );
  }

  const healthInfo = [
    { label: "Tipo Sanguíneo", value: profile.tipo_sanguineo || "Não informado" },
    { label: "Alergias", value: profile.alergia_medicamento || "Nenhuma" },
    { label: "Doenças Crônicas", value: getChronicConditions() },
    { label: "Medicamentos em Uso", value: profile.remedios || "Nenhum" },
  ];

  return (
    <PageLayout title="Carteirinha de Emergência" showSponsor={false}>
      <div className="flex flex-col items-center text-center space-y-8">
        <div className="flex flex-col items-center space-y-3">
          <Avatar className="w-24 h-24 border-4 border-gray-700">
            <AvatarImage src={profile.avatar_url || ""} alt={profile.first_name || ""} />
            <AvatarFallback><User size={48} /></AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{profile.first_name}</h1>
            <p className="text-gray-400">{profile.sub_sede || "Sub-Sede não informada"}</p>
          </div>
        </div>

        <div className="w-full max-w-sm bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 space-y-6 text-left">
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

          <div>
            <h2 className="text-xl font-bold mb-4 text-red-500">Contato de Emergência</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Nome</p>
                <p className="font-semibold">{profile.contato_emergencia_nome || "Não informado"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Telefone</p>
                {profile.contato_emergencia_telefone ? (
                  <a href={`https://wa.me/55${profile.contato_emergencia_telefone}`} className="font-semibold flex items-center space-x-2 hover:underline">
                    <Phone size={16} />
                    <span>{profile.contato_emergencia_telefone}</span>
                  </a>
                ) : (
                  <p className="font-semibold">Não informado</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black w-full max-w-sm h-12">
          <Link to="/settings/my-info">Editar Dados</Link>
        </Button>
      </div>
    </PageLayout>
  );
};

const EmergencyCardSkeleton = () => (
  <PageLayout title="Carteirinha de Emergência" showSponsor={false}>
    <div className="flex flex-col items-center text-center space-y-8 animate-pulse">
      <div className="flex flex-col items-center space-y-3">
        <Skeleton className="w-24 h-24 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-32 rounded" />
          <Skeleton className="h-5 w-40 rounded" />
        </div>
      </div>
      <div className="w-full max-w-sm bg-gray-900/50 rounded-2xl p-6 space-y-6">
        <div>
          <Skeleton className="h-7 w-48 mb-4 rounded" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full rounded" />
            <Skeleton className="h-10 w-full rounded" />
            <Skeleton className="h-10 w-full rounded" />
          </div>
        </div>
        <Separator className="bg-gray-700" />
        <div>
          <Skeleton className="h-7 w-56 mb-4 rounded" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full rounded" />
            <Skeleton className="h-10 w-full rounded" />
          </div>
        </div>
      </div>
      <Skeleton className="h-12 w-full max-w-sm rounded-lg" />
    </div>
  </PageLayout>
);

export default EmergencyCard;