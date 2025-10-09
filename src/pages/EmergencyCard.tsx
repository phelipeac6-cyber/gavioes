import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { showError } from "@/utils/toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Shield, HeartPulse, Phone, Mail, MapPin, Building } from "lucide-react";
import logo from "@/assets/gavioes-logo.png";
import QRCode from "react-qr-code";

const EmergencyCard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        showError("Você precisa estar logado para ver seu cartão.");
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        showError("Não foi possível carregar seu perfil.");
        console.error(error);
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Carregando...</div>;
  }

  if (!profile) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Perfil não encontrado.</div>;
  }

  const profileUrl = `${window.location.origin}/profile/${profile.username}`;

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 flex flex-col items-center">
      <div className="w-full max-w-sm bg-black rounded-2xl shadow-lg overflow-hidden relative border-2 border-gray-700">
        <div className="bg-red-600 h-24 flex items-center justify-between p-4">
          <img src={logo} alt="Gaviões da Fiel" className="h-16" />
          <h2 className="text-lg font-bold">CARTEIRINHA DE ASSOCIADO</h2>
        </div>
        
        <div className="p-6 flex flex-col items-center text-center -mt-16 z-10 relative">
          <Avatar className="w-24 h-24 border-4 border-white">
            <AvatarImage src={profile.avatar_url || ""} alt={profile.first_name || ""} />
            <AvatarFallback className="bg-gray-700 text-white text-3xl font-bold">
              {profile.first_name?.charAt(0).toUpperCase()}
              {profile.last_name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{profile.first_name || "Usuário"}</h1>
            <p className="text-gray-400">@{profile.username || "username"}</p>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold text-red-500 mb-2 flex items-center"><Building size={18} className="mr-2" /> Sub-Sede</h3>
            <p>{profile.sub_sede || "Não informado"}</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold text-red-500 mb-2 flex items-center"><HeartPulse size={18} className="mr-2" /> Dados de Saúde</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p><span className="font-semibold">Tipo Sanguíneo:</span> {profile.tipo_sanguineo || "N/A"}</p>
              <p><span className="font-semibold">Diabetes:</span> {profile.diabetes || "N/A"}</p>
              <p><span className="font-semibold">Cardíaco:</span> {profile.cardiaco || "N/A"}</p>
              <p><span className="font-semibold">Pressão:</span> {profile.pressao || "N/A"}</p>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold text-red-500 mb-2 flex items-center"><Shield size={18} className="mr-2" /> Contato de Emergência</h3>
            <p className="font-semibold">{profile.contato_emergencia_nome || "Não informado"}</p>
            <p className="text-sm text-gray-400">{profile.contato_emergencia_parentesco || ""}</p>
            <p className="text-sm">{profile.contato_emergencia_telefone || ""}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg flex justify-center">
            <QRCode value={profileUrl} size={128} />
          </div>
          <p className="text-xs text-gray-500 text-center">Aponte a câmera para o QR Code para ver o perfil completo.</p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyCard;