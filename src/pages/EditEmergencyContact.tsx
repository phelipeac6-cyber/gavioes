import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";
import registerBg from "@/assets/gavioes-wallpaper.png";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";
import { Skeleton } from "@/components/ui/skeleton";

const EditEmergencyContact = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [parentesco, setParentesco] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("contato_emergencia_nome, contato_emergencia_telefone, contato_emergencia_parentesco, contato_emergencia_email")
          .eq("id", user.id)
          .single();

        if (error) {
          showError("Erro ao carregar seu contato de emergência.");
        } else if (data) {
          setNome(data.contato_emergencia_nome || "");
          setTelefone(data.contato_emergencia_telefone || "");
          setParentesco(data.contato_emergencia_parentesco || "");
          setEmail(data.contato_emergencia_email || "");
        }
      } else {
        showError("Você precisa estar logado.");
        navigate("/login");
      }
      setPageLoading(false);
    };
    fetchProfile();
  }, [navigate]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
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
        navigate("/settings/my-info");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden">
      <img src={registerBg} alt="Gaviões da Fiel background" className="absolute inset-0 w-full h-full object-cover object-center opacity-20 z-0" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="p-4 flex items-center space-x-4 sticky top-0 bg-black/80 backdrop-blur-sm z-20 border-b border-gray-800">
          <button onClick={() => navigate(-1)} className="p-2"><ArrowLeft size={24} /></button>
          <h1 className="text-xl font-bold">Editar Contato Emergência</h1>
        </header>
        <main className="flex-grow p-6">
          {pageLoading ? (
            <div className="w-full max-w-sm mx-auto space-y-5">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
              <Skeleton className="h-14 w-full mt-8" />
            </div>
          ) : (
            <form onSubmit={handleSave} className="w-full max-w-sm mx-auto space-y-5">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" placeholder="Nome completo do contato" value={nome} onChange={(e) => setNome(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone com Whatsapp</Label>
                <Input id="telefone" placeholder="(00) 90000-0000" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentesco">Grau de Parentesco</Label>
                <Input id="parentesco" placeholder="Ex: Mãe, Irmão, Amigo" value={parentesco} onChange={(e) => setParentesco(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="email@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-14 !mt-8">
                {loading ? <Loader2 className="animate-spin" /> : "Salvar Alterações"}
              </Button>
            </form>
          )}
        </main>
        <footer className="p-6 flex justify-center"><img src={esportesDaSorteLogo} alt="Esportes da Sorte Logo" className="w-40 h-auto" /></footer>
      </div>
    </div>
  );
};

export default EditEmergencyContact;