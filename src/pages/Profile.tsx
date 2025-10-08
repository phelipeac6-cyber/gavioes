import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Globe, MessageSquare, Settings, ArrowLeft, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

type ProfileType = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  username: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  site_url: string | null;
  whatsapp_number: string | null;
  bio: string | null;
};

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

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

      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user.id === data.id) {
        setIsOwnProfile(true);
      }
      
      setLoading(false);
    };

    fetchProfile();
  }, [username, navigate]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <p>Perfil não encontrado.</p>
        <Button onClick={() => navigate("/")} className="mt-4">Voltar para Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="p-4 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-sm z-20">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-xl font-bold">Perfil</h1>
        {isOwnProfile ? (
          <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
            <Settings size={24} />
          </Button>
        ) : (
          <div className="w-10 h-10" /> // Placeholder for alignment
        )}
      </header>

      <main className="p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="w-32 h-32 border-4 border-red-600">
            <AvatarImage src={profile.avatar_url || ""} alt={`${profile.first_name} ${profile.last_name}`} />
            <AvatarFallback className="bg-gray-800">
              <User size={64} />
            </AvatarFallback>
          </Avatar>

          <h1 className="text-3xl font-bold mt-4">{`${profile.first_name || ''} ${profile.last_name || ''}`}</h1>
          <p className="text-red-500 font-semibold">@{profile.username}</p>

          <div className="mt-4 text-gray-300 max-w-md mx-auto">
            <p className="text-center">{profile.bio || "Nenhuma bio fornecida."}</p>
          </div>

          <div className="flex items-center space-x-6 pt-4">
            {profile.instagram_url && (
              <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer">
                <Instagram className="text-gray-400 hover:text-white transition-colors" />
              </a>
            )}
            {profile.facebook_url && (
              <a href={profile.facebook_url} target="_blank" rel="noopener noreferrer">
                <Facebook className="text-gray-400 hover:text-white transition-colors" />
              </a>
            )}
            {profile.site_url && (
              <a href={profile.site_url} target="_blank" rel="noopener noreferrer">
                <Globe className="text-gray-400 hover:text-white transition-colors" />
              </a>
            )}
            {profile.whatsapp_number && (
              <a href={`https://wa.me/${profile.whatsapp_number}`} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="text-gray-400 hover:text-white transition-colors" />
              </a>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const ProfileSkeleton = () => (
  <div className="min-h-screen bg-black text-white font-sans p-6 pt-24">
    <div className="flex flex-col items-center text-center animate-pulse">
      <Skeleton className="w-32 h-32 rounded-full border-4 border-gray-700" />
      <Skeleton className="h-8 w-48 mt-4 rounded" />
      <Skeleton className="h-5 w-32 mt-2 rounded" />
      <Skeleton className="h-10 w-full max-w-md mt-4 rounded" />
      <div className="flex items-center space-x-6 pt-4">
        <Skeleton className="w-6 h-6 rounded" />
        <Skeleton className="w-6 h-6 rounded" />
        <Skeleton className="w-6 h-6 rounded" />
        <Skeleton className="w-6 h-6 rounded" />
      </div>
    </div>
  </div>
);

export default Profile;