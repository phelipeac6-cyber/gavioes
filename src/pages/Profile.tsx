import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, MessageSquare, User, CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import profileBg from "@/assets/bg.png";
import { supabase } from "@/integrations/supabase/client";

type PublicProfile = {
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  sub_sede: string | null;
  bio: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  whatsapp_number: string | null;
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="font-bold text-lg text-primary hover:text-primary/80 transition-colors">
    {children}
  </Link>
);

const Profile = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isUuid = (s: string) =>
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(s);

    const resolveAndLoad = async () => {
      if (!slug) {
        setLoading(false);
        navigate("/not-found");
        return;
      }
      setLoading(true);

      // Se for UUID, manter o fluxo atual (pulseira/edge functions)
      if (isUuid(slug)) {
        const res = await fetch("https://esckspxnezngxhnqmznc.supabase.co/functions/v1/resolve-pulseira", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uuid: slug }),
        });
        const info = await res.json();

        if (!res.ok) {
          toast.error(info?.error || "Erro ao resolver pulseira.");
          setLoading(false);
          return;
        }
        if (!info.exists) {
          toast.error("Pulseira não encontrada.");
          setLoading(false);
          return;
        }
        if (["desativada", "extraviada"].includes(info.status)) {
          toast.error("Pulseira inativa ou extraviada.");
          setLoading(false);
          return;
        }
        if (!info.assigned) {
          navigate(`/register?code=${slug}`);
          setLoading(false);
          return;
        }

        const res2 = await fetch("https://esckspxnezngxhnqmznc.supabase.co/functions/v1/public-profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uuid: slug }),
        });
        const data = await res2.json();
        if (!res2.ok || !data?.ok) {
          toast.error(data?.error || "Não foi possível carregar o perfil.");
          setLoading(false);
          return;
        }
        setProfile(data.data);
        setLoading(false);
        return;
      }

      // Caso contrário, tratar como username (perfil do usuário)
      const { data: prof, error } = await supabase
        .from("profiles")
        .select("first_name, last_name, avatar_url, sub_sede, bio, instagram_url, facebook_url, whatsapp_number")
        .eq("username", slug)
        .maybeSingle();

      if (error) {
        toast.error(error.message || "Erro ao carregar perfil.");
        setLoading(false);
        return;
      }
      if (!prof) {
        navigate("/not-found");
        setLoading(false);
        return;
      }

      setProfile({
        first_name: prof.first_name,
        last_name: prof.last_name,
        avatar_url: prof.avatar_url,
        sub_sede: prof.sub_sede,
        bio: prof.bio,
        instagram_url: prof.instagram_url,
        facebook_url: prof.facebook_url,
        whatsapp_number: prof.whatsapp_number,
      });
      setLoading(false);
    };

    resolveAndLoad();
  }, [slug, navigate]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!profile) {
    return (
      <MainLayout bgImage={profileBg}>
        <div className="min-h-screen flex flex-col items-center justify-center text-primary text-center p-4">
          <h1 className="text-2xl font-bold mb-2">Perfil não disponível</h1>
          <p className="mb-4">Verifique o link ou tente novamente mais tarde.</p>
          <Button onClick={() => navigate("/")} className="bg-white text-black hover:bg-gray-200">Voltar para o Início</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout bgImage={profileBg}>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] text-center p-6 space-y-5 text-primary">
        <div className="relative">
          <Avatar className="w-32 h-32 border-4 border-white">
            <AvatarImage src={profile.avatar_url || ""} alt={`${profile.first_name || ""} ${profile.last_name || ""}`} />
            <AvatarFallback className="bg-gray-800">
              <User size={64} />
            </AvatarFallback>
          </Avatar>
          <CheckCircle2 size={32} className="absolute -bottom-2 -right-2 text-yellow-400 bg-black rounded-full p-1" fill="black" />
        </div>
        
        <div className="space-y-1">
          <h1 className="text-4xl font-bold">{profile.first_name} {profile.last_name}</h1>
          <p className="">{profile.sub_sede || "Sub-Sede não informada"}</p>
        </div>
        
        <p className="font-semibold text-lg">{profile.bio || "Gavião da Fiel"}</p>

        <div className="flex items-center space-x-6">
          {profile.instagram_url && (
            <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-full">
              <Instagram className="text-black" />
            </a>
          )}
          {profile.facebook_url && (
            <a href={profile.facebook_url} target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-full">
              <Facebook className="text-black" />
            </a>
          )}
          {profile.whatsapp_number && (
            <a href={`https://wa.me/${profile.whatsapp_number}`} target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-full">
              <MessageSquare className="text-black" />
            </a>
          )}
        </div>

        <div className="grid grid-cols-3 gap-x-8 gap-y-4 pt-4">
          <NavLink to="/news">Noticias</NavLink>
          <NavLink to="/store">Loja</NavLink>
          <NavLink to="/tickets">Ingressos</NavLink>
          <NavLink to="/chat-list">Chat</NavLink>
          <NavLink to="/events">Eventos</NavLink>
          <NavLink to="/polls">Enquete</NavLink>
          <NavLink to="/estatuto">Estatuto</NavLink>
          <NavLink to="/historia">Historia</NavLink>
          <NavLink to="/#">PodCast</NavLink>
        </div>
      </div>
    </MainLayout>
  );
};

const ProfileSkeleton = () => (
  <MainLayout bgImage={profileBg}>
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] text-center p-6 space-y-5 text-primary animate-pulse">
      <div className="relative">
        <Skeleton className="w-32 h-32 rounded-full border-4 border-gray-700" />
        <Skeleton className="w-8 h-8 rounded-full absolute -bottom-2 -right-2" />
      </div>
      <div className="space-y-2 w-full max-w-xs">
        <Skeleton className="h-10 w-3/4 mx-auto rounded" />
        <Skeleton className="h-5 w-1/2 mx-auto rounded" />
      </div>
      <Skeleton className="h-6 w-2/5 mx-auto rounded" />
      <div className="flex items-center space-x-6">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>
      <div className="grid grid-cols-3 gap-x-8 gap-y-4 pt-4 w-full max-w-xs">
        <Skeleton className="h-7 w-full rounded" />
        <Skeleton className="h-7 w-full rounded" />
        <Skeleton className="h-7 w-full rounded" />
        <Skeleton className="h-7 w-full rounded" />
        <Skeleton className="h-7 w-full rounded" />
        <Skeleton className="h-7 w-full rounded" />
        <Skeleton className="h-7 w-full rounded" />
        <Skeleton className="h-7 w-full rounded" />
        <Skeleton className="h-7 w-full rounded" />
      </div>
    </div>
  </MainLayout>
);

export default Profile;