import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, Instagram, Facebook, MessageCircle, User } from "lucide-react";
import newBg from "@/assets/bg.png";
import { supabase } from "@/integrations/supabase/client";

type ProfileData = {
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  sub_sede: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  whatsapp_number: string | null;
};

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!username) {
        setError("Nome de usuário não fornecido.");
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name, avatar_url, sub_sede, instagram_url, facebook_url, whatsapp_number")
        .eq("username", username)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        setError("Perfil não encontrado ou ocorreu um erro.");
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [username]);

  const handleExternalLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(e.currentTarget.href, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <MainLayout bgImage={newBg}>
        <div className="flex flex-col items-center justify-center text-center p-6 min-h-[calc(100vh-160px)]">
          <div className="flex flex-col items-center space-y-5">
            <Skeleton className="w-28 h-28 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-6 w-40" />
            <div className="flex items-center space-x-6 pt-2">
              <Skeleton className="w-8 h-8 rounded-md" />
              <Skeleton className="w-8 h-8 rounded-md" />
              <Skeleton className="w-8 h-8 rounded-md" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !profile) {
    return (
      <MainLayout bgImage={newBg}>
        <div className="flex flex-col items-center justify-center text-center p-6 min-h-[calc(100vh-160px)]">
          <h1 className="text-2xl font-bold text-red-500">{error}</h1>
          <Link to="/" className="mt-4 text-white underline">Voltar para o início</Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout bgImage={newBg}>
      <div className="flex flex-col items-center justify-center text-center p-6 min-h-[calc(100vh-160px)]">
        <div className="flex flex-col items-center space-y-5">
          <div className="relative">
            <Avatar className="w-28 h-28">
              <AvatarImage
                src={profile.avatar_url || undefined}
                alt={`${profile.first_name} ${profile.last_name}`}
              />
              <AvatarFallback>
                <User size={48} />
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 bg-yellow-400 rounded-full p-1.5 border-2 border-black">
              <Check size={18} className="text-black" />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl font-bold">{profile.first_name} {profile.last_name}</h1>
            <p className="text-gray-400">{profile.sub_sede || "Sub-Sede não informada"}</p>
          </div>

          <p className="font-semibold text-lg">Presidente Gaviões</p>

          <div className="flex items-center space-x-6 pt-2">
            {profile.instagram_url && (
              <a href={profile.instagram_url} onClick={handleExternalLink} className="text-white">
                <Instagram size={32} />
              </a>
            )}
            {profile.facebook_url && (
              <a href={profile.facebook_url} onClick={handleExternalLink}>
                <div className="bg-white rounded-md p-1">
                  <Facebook size={24} className="text-black" />
                </div>
              </a>
            )}
            {profile.whatsapp_number && (
              <a href={`https://wa.me/${profile.whatsapp_number.replace(/\D/g, '')}`} onClick={handleExternalLink} className="text-white">
                <MessageCircle size={32} />
              </a>
            )}
          </div>

          <nav className="grid grid-cols-3 gap-x-10 gap-y-6 text-lg font-semibold pt-8">
            <Link to="/news" className="hover:text-red-500 transition-colors">
              Noticias
            </Link>
            <Link to="/store" className="hover:text-red-500 transition-colors">
              Loja
            </Link>
            <Link to="/tickets" className="hover:text-red-500 transition-colors">
              Ingressos
            </Link>
            <Link to="/channels" className="hover:text-red-500 transition-colors">
              Chat
            </Link>
            <Link to="/events" className="hover:text-red-500 transition-colors">
              Eventos
            </Link>
            <Link to="/polls" className="hover:text-red-500 transition-colors">
              Enquete
            </Link>
            <Link to="/estatuto" className="hover:text-red-500 transition-colors">
              Estatuto
            </Link>
            <Link to="/historia" className="hover:text-red-500 transition-colors">
              Historia
            </Link>
            <a
              href="https://www.youtube.com/watch?v=IOSHNue2Pjs&list=PLNawbhEFSd-dyLhAj5znCA8j1-VsBvtpg"
              onClick={handleExternalLink}
              className="hover:text-red-500 transition-colors"
            >
              PodCast
            </a>
          </nav>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;