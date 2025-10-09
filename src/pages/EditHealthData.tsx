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

const EditHealthData = () => {
  const navigate = useNavigate();
  const [tipoSanguineo, setTipoSanguineo] = useState("");
  const [diabetes, setDiabetes] = useState("");
  const [cardiaco, setCardiaco] = useState("");
  const [pressao, setPressao] = useState("");
  const [remedios, setRemedios] = useState("");
  const [alergia, setAlergia] = useState("");
  const [laudo, setLaudo] = useState(""); // Placeholder for file upload
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("tipo_sanguineo, diabetes, cardiaco, pressao, remedios, alergia_medicamento")
          .eq("id", user.id)
          .single();

        if (error) {
          showError("Erro ao carregar seus dados de saúde.");
        } else if (data) {
          setTipoSanguineo(data.tipo_sanguineo || "");
          setDiabetes(data.diabetes || "");
          setCardiaco(data.cardiaco || "");
          setPressao(data.pressao || "");
          setRemedios(data.remedios || "");
          setAlergia(data.alergia_medicamento || "");
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
          tipo_sanguineo: tipoSanguineo,
          diabetes,
          cardiaco,
          pressao,
          remedios,
          alergia_medicamento: alergia,
        })
        .eq("id", user.id);

      if (error) {
        showError(error.message);
      } else {
        showSuccess("Dados de saúde salvos com sucesso!");
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
          <h1 className="text-xl font-bold">Editar Dados de Saúde</h1>
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
                <Label htmlFor="tipoSanguineo">Tipo Sanguíneo</Label>
                <Input id="tipoSanguineo" placeholder="Ex: O+" value={tipoSanguineo} onChange={(e) => setTipoSanguineo(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diabetes">Diabetes</Label>
                <Input id="diabetes" placeholder="Sim ou Não" value={diabetes} onChange={(e) => setDiabetes(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardiaco">Problema Cardíaco</Label>
                <Input id="cardiaco" placeholder="Sim ou Não" value={cardiaco} onChange={(e) => setCardiaco(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pressao">Pressão</Label>
                <Input id="pressao" placeholder="Ex: Alta, Baixa, Normal" value={pressao} onChange={(e) => setPressao(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="remedios">Uso de Remédios</Label>
                <Input id="remedios" placeholder="Quais?" value={remedios} onChange={(e) => setRemedios(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alergia">Alergia a Medicamento</Label>
                <Input id="alergia" placeholder="Qual?" value={alergia} onChange={(e) => setAlergia(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="laudo">Laudo em PDF</Label>
                <Input id="laudo" placeholder="Link para o arquivo" value={laudo} onChange={(e) => setLaudo(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
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

export default EditHealthData;