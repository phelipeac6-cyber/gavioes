import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import registerBg from "@/assets/gavioes-wallpaper.png";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";

const HealthData = () => {
  const navigate = useNavigate();
  const [tipoSanguineo, setTipoSanguineo] = useState("");
  const [diabetes, setDiabetes] = useState("");
  const [cardiaco, setCardiaco] = useState("");
  const [pressao, setPressao] = useState("");
  const [remedios, setRemedios] = useState("");
  const [alergia, setAlergia] = useState("");
  const [laudo, setLaudo] = useState(""); // Placeholder for file upload
  const [loading, setLoading] = useState(false);

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
        navigate("/emergency-contact-form");
      }
    } else {
      showError("Usuário não encontrado. Faça o login novamente.");
      navigate("/login");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden">
      <img
        src={registerBg}
        alt="Gaviões da Fiel background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-20 z-0"
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="p-4 flex items-center space-x-4 sticky top-0 bg-black/80 backdrop-blur-sm z-20 border-b border-gray-800">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Dados de Saúde</h1>
        </header>

        <main className="flex-grow p-6">
          <form onSubmit={handleSave} className="w-full max-w-sm mx-auto space-y-5">
            <Input placeholder="Tipo sanguineo ?" value={tipoSanguineo} onChange={(e) => setTipoSanguineo(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
            <Input placeholder="Diabetes ?" value={diabetes} onChange={(e) => setDiabetes(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
            <Input placeholder="Cardíaco ?" value={cardiaco} onChange={(e) => setCardiaco(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
            <Input placeholder="Pressão ?" value={pressao} onChange={(e) => setPressao(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
            <Input placeholder="Faz uso de remédios ?" value={remedios} onChange={(e) => setRemedios(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
            <Input placeholder="Alergia a medicamento ?" value={alergia} onChange={(e) => setAlergia(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
            <Input placeholder="Laudo em PDF" value={laudo} onChange={(e) => setLaudo(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
            <Button type="submit" disabled={loading} className="w-full bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-14 !mt-8">
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

export default HealthData;