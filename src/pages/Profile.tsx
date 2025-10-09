import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MainLayout } from "@/components/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, MessageSquare, User, CheckCircle2, HeartPulse } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import profileBg from "@/assets/bg.png";

type ProfileType = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  username: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  whatsapp_number: string | null;
  bio: string | null;
  sub_sede: string | null;
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="font-bold text-lg hover:text-red-500 transition-colors">
    {children}
  </Link>
);

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!username) {
        toast.error("Nome de usuário não encontrado.");
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

      if (error || !data) {
        console.error("Error fetching profile:", error);
        toast.error("Perfil não encontrado.");
        navigate("/");
        return;
      }

      setProfile(data);
      setLoading(false);
    };

    fetchProfile();
  }, [username, navigate]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!profile) {
    return (
      <MainLayout bgImage={profileBg}>
        <div className="min-h-screen flex flex-col items-center justify-center text-white">
          <p>Perfil não encontrado.</p>
          <Button onClick={() => navigate("/")} className="mt-4">Voltar para Home</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout bgImage={profileBg}>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] text-center p-6 space-y-5 text-white">
        <div className="relative">
          <Avatar className="w-32 h-32 border-4 border-white">
            <AvatarImage src={profile.avatar_url || ""} alt={`${profile.first_name} ${profile.last_name}`} />
            <AvatarFallback className="bg-gray-800">
              <User size={64} />
            </AvatarFallback>
          </Avatar>
          <CheckCircle2 size={32} className="absolute -bottom-2 -right-2 text-yellow-400 bg-black rounded-full p-1" fill="black" />
        </div>
        
        <div className="space-y-1">
          <h1 className="text-4xl font-bold">{profile.first_name}</h1>
          <p className="text-gray-400">{profile.sub_sede || "Sub-Sede não informada"}</p>
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

        <Button asChild className="bg-red-600 text-white font-bold rounded-lg text-lg hover:bg-red-700 h-12 w-full max-w-xs">
          <Link to={`/emergency-card/${username}`}>
            <HeartPulse className="mr-2 h-5 w-5" />
            Carteirinha de Emergência
          </Link>
        </Button>

        <div className="grid grid-cols-3 gap-x-8 gap-y-4 pt-4">
          <NavLink to="/news">Noticias</NavLink>
          <NavLink to="/store">Loja</NavLink>
          <NavLink to="/tickets">Ingressos</NavLink>
          <NavLink to="/channels">Chat</NavLink>
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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] text-center p-6 space-y-5 text-white animate-pulse">
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
      <Skeleton className="h-12 w-full max-w-xs rounded-lg" />
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