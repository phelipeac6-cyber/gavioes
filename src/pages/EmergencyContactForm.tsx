import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import registerBg from "@/assets/gavioes-wallpaper.png";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";

const EmergencyContactForm = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [parentesco, setParentesco] = useState("");
  const [email, setEmail] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!terms) {
      showError("Você precisa concordar com a política de privacidade.");
      return;
    }
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from("profiles")
        .update({
          contato_emergencia_nome: nome,
          contato_emergencia_telefone: telefone,
          contato_emergencia_parentesco: parentesco,
          contato_emergencia_email: email,
        })
        .eq("id", user.id);

      if (error) {
        showError(error.message);
      } else {
        showSuccess("Contato de emergência salvo com sucesso!");
        
        // Fetch the profile to get the username
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .single();

        if (profileError) {
          showError("Não foi possível encontrar seu perfil. Por favor, faça o login.");
          navigate("/login");
        } else if (profileData?.username) {
          navigate(`/${profileData.username}`);
        } else {
          showError("Username não encontrado. Por favor, faça o login.");
          navigate("/login");
        }
      }
    } else {
      showError("Usuário não encontrado. Faça o login novamente.");
      navigate("/login");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#1800AD] font-sans relative overflow-x-hidden">
      <img
        src={registerBg}
        alt="Gaviões da Fiel background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-20 z-0"
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="p-4 flex items-center space-x-4 sticky top-0 bg-white z-20 border-b border-[#1800AD]/20">
          <button onClick={() => navigate(-1)} className="p-2 text-[#1800AD]">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Contato Emergência</h1>
        </header>

        <main className="flex-grow p-6">
          <form onSubmit={handleSave} className="w-full max-w-sm mx-auto space-y-5">
            <Input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} className="bg-transparent border-2 border-[#1800AD] rounded-lg h-14 placeholder:text-[#1800AD]/60 text-base text-[#1800AD]" />
            <Input placeholder="Telefone com whatsapp" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="bg-transparent border-2 border-[#1800AD] rounded-lg h-14 placeholder:text-[#1800AD]/60 text-base text-[#1800AD]" />
            <Input placeholder="Grau parentesco" value={parentesco} onChange={(e) => setParentesco(e.target.value)} className="bg-transparent border-2 border-[#1800AD] rounded-lg h-14 placeholder:text-[#1800AD]/60 text-base text-[#1800AD]" />
            <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent border-2 border-[#1800AD] rounded-lg h-14 placeholder:text-[#1800AD]/60 text-base text-[#1800AD]" />
            
            <div className="flex items-center space-x-3 pt-2">
              <Checkbox id="terms" checked={terms} onCheckedChange={(checked) => setTerms(!!checked)} className="border-[#1800AD] data-[state=checked]:bg-[#1800AD] data-[state=checked]:text-white" />
              <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Concordo com a <a href="#" className="underline">privacidade e a política</a>
              </label>
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-[#1800AD] text-white font-bold rounded-lg text-lg hover:bg-[#1800AD]/90 h-14 !mt-8">
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </form>
        </main>

        <footer className="p-6 flex justify-center">
          <img
            src={esportesDaSorteLogo}
            alt="Esportes da Sorte Logo"
            className="w-40 h-auto"
          />
        </footer>
      </div>
    </div>
  );
};

export default EmergencyContactForm;