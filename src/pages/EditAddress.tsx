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

const EditAddress = () => {
  const navigate = useNavigate();
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("cep, endereco, numero, complemento, bairro, cidade, estado")
          .eq("id", user.id)
          .single();

        if (error) {
          showError("Erro ao carregar seu endereço.");
        } else if (data) {
          setCep(data.cep || "");
          setEndereco(data.endereco || "");
          setNumero(data.numero || "");
          setComplemento(data.complemento || "");
          setBairro(data.bairro || "");
          setCidade(data.cidade || "");
          setEstado(data.estado || "");
        }
      } else {
        showError("Você precisa estar logado.");
        navigate("/login");
      }
      setPageLoading(false);
    };
    fetchProfile();
  }, [navigate]);

  const handleCepBlur = async () => {
    const cleanedCep = cep.replace(/\D/g, "");
    if (cleanedCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setEndereco(data.logradouro);
          setBairro(data.bairro);
          setCidade(data.localidade);
          setEstado(data.uf);
        } else {
          showError("CEP não encontrado.");
        }
      } catch (error) {
        showError("Não foi possível buscar o CEP.");
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from("profiles")
        .update({ cep, endereco, numero, complemento, bairro, cidade, estado })
        .eq("id", user.id);

      if (error) {
        showError(error.message);
      } else {
        showSuccess("Endereço salvo com sucesso!");
        navigate("/settings/my-info");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#1800AD] font-sans relative overflow-x-hidden">
      <img src={registerBg} alt="Gaviões da Fiel background" className="absolute inset-0 w-full h-full object-cover object-center opacity-20 z-0" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="p-4 flex items-center space-x-4 sticky top-0 bg-white z-20 border-b border-[#1800AD]/20">
          <button onClick={() => navigate(-1)} className="p-2 text-[#1800AD]"><ArrowLeft size={24} /></button>
          <h1 className="text-xl font-bold">Editar Endereço</h1>
        </header>
        <main className="flex-grow p-6">
          {pageLoading ? (
            <div className="w-full max-w-sm mx-auto space-y-5">
              {[...Array(7)].map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
              <Skeleton className="h-14 w-full mt-8" />
            </div>
          ) : (
            <form onSubmit={handleSave} className="w-full max-w-sm mx-auto space-y-5">
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" placeholder="00000-000" value={cep} onChange={(e) => setCep(e.target.value)} onBlur={handleCepBlur} maxLength={9} className="bg-transparent border-2 border-[#1800AD] rounded-lg h-14 placeholder:text-[#1800AD]/60 text-base text-[#1800AD]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input id="endereco" placeholder="Sua rua ou avenida" value={endereco} onChange={(e) => setEndereco(e.target.value)} className="bg-transparent border-2 border-[#1800AD] rounded-lg h-14 placeholder:text-[#1800AD]/60 text-base text-[#1800AD]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numero">Número</Label>
                <Input id="numero" placeholder="Ex: 123" value={numero} onChange={(e) => setNumero(e.target.value)} className="bg-transparent border-2 border-[#1800AD] rounded-lg h-14 placeholder:text-[#1800AD]/60 text-base text-[#1800AD]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="complemento">Complemento</Label>
                <Input id="complemento" placeholder="Apto, bloco, etc." value={complemento} onChange={(e) => setComplemento(e.target.value)} className="bg-transparent border-2 border-[#1800AD] rounded-lg h-14 placeholder:text-[#1800AD]/60 text-base text-[#1800AD]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bairro">Bairro</Label>
                <Input id="bairro" placeholder="Seu bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} className="bg-transparent border-2 border-[#1800AD] rounded-lg h-14 placeholder:text-[#1800AD]/60 text-base text-[#1800AD]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Input id="cidade" placeholder="Sua cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} className="bg-transparent border-2 border-[#1800AD] rounded-lg h-14 placeholder:text-[#1800AD]/60 text-base text-[#1800AD]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Input id="estado" placeholder="Seu estado" value={estado} onChange={(e) => setEstado(e.target.value)} className="bg-transparent border-2 border-[#1800AD] rounded-lg h-14 placeholder:text-[#1800AD]/60 text-base text-[#1800AD]" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-[#1800AD] text-white font-bold rounded-lg text-lg hover:bg-[#1800AD]/90 h-14 !mt-8">
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

export default EditAddress;