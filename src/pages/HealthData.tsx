import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import registerBg from "@/assets/gavioes-wallpaper.png";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";

const HealthData = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [tipoSanguineo, setTipoSanguineo] = useState("");
  const [diabetes, setDiabetes] = useState("");
  const [cardiaco, setCardiaco] = useState("");
  const [pressao, setPressao] = useState("");
  const [remedios, setRemedios] = useState("");
  const [alergiaMedicamento, setAlergiaMedicamento] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        showError("Você precisa estar logado para acessar esta página.");
        navigate("/login");
      } else {
        setUser(data.user);
        // Load existing data if available
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (profileError) {
          console.error("Error fetching profile:", profileError);
        } else if (profile) {
          setTipoSanguineo(profile.tipo_sanguineo || "");
          setDiabetes(profile.diabetes || "");
          setCardiaco(profile.cardiaco === "Problemas Cardíacos" ? "Sim" : profile.cardiaco || "");
          setPressao(profile.pressao === "Pressão Alta" ? "Sim" : profile.pressao || "");
          setRemedios(profile.remedios || "");
          setAlergiaMedicamento(profile.alergia_medicamento || "");
        }
      }
    };
    getUser();
  }, [navigate]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showError("Usuário não encontrado.");
      return;
    }
    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        tipo_sanguineo: tipoSanguineo,
        diabetes: diabetes,
        cardiaco: cardiaco === "Sim" ? "Problemas Cardíacos" : cardiaco,
        pressao: pressao === "Sim" ? "Pressão Alta" : pressao,
        remedios: remedios,
        alergia_medicamento: alergiaMedicamento,
      })
      .eq("id", user.id);

    if (error) {
      showError(error.message);
    } else {
      showSuccess("Dados de saúde salvos com sucesso!");
      navigate("/emergency-contact-form");
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
        <header className="p-4 flex items-center space-x-4 sticky top-0 bg-black/80 backdrop-blur-sm z-20">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Dados de Saúde</h1>
        </header>

        <main className="flex-grow p-6 overflow-y-auto">
          <div className="max-w-sm mx-auto">
            <p className="text-gray-400 mb-6 text-center">
              Preencha seus dados de saúde. Essas informações são importantes em caso de emergência.
            </p>
            <form onSubmit={handleSave} className="w-full space-y-4 text-left">
              <Input placeholder="Tipo sanguineo ?" value={tipoSanguineo} onChange={(e) => setTipoSanguineo(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
              
              <div>
                <Label className="text-sm text-gray-400">Diabetes?</Label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setDiabetes("Sim")}
                    className={`w-full rounded-lg border h-12 transition-colors ${
                      diabetes === "Sim"
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white border-white hover:bg-white hover:text-black"
                    }`}
                  >
                    Sim
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setDiabetes("Não")}
                    className={`w-full rounded-lg border h-12 transition-colors ${
                      diabetes === "Não"
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white border-white hover:bg-white hover:text-black"
                    }`}
                  >
                    Não
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-400">Problema Cardíaco?</Label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setCardiaco("Sim")}
                    className={`w-full rounded-lg border h-12 transition-colors ${
                      cardiaco === "Sim"
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white border-white hover:bg-white hover:text-black"
                    }`}
                  >
                    Sim
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setCardiaco("Não")}
                    className={`w-full rounded-lg border h-12 transition-colors ${
                      cardiaco === "Não"
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white border-white hover:bg-white hover:text-black"
                    }`}
                  >
                    Não
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-400">Pressão Alta?</Label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setPressao("Sim")}
                    className={`w-full rounded-lg border h-12 transition-colors ${
                      pressao === "Sim"
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white border-white hover:bg-white hover:text-black"
                    }`}
                  >
                    Sim
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setPressao("Não")}
                    className={`w-full rounded-lg border h-12 transition-colors ${
                      pressao === "Não"
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white border-white hover:bg-white hover:text-black"
                    }`}
                  >
                    Não
                  </Button>
                </div>
              </div>

              <Input placeholder="Quais remédios você usa? (separe por vírgula)" value={remedios} onChange={(e) => setRemedios(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
              <Input placeholder="Quais alergias a medicamentos? (separe por vírgula)" value={alergiaMedicamento} onChange={(e) => setAlergiaMedicamento(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />

              <Button type="submit" disabled={loading} className="w-full bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-14 !mt-8">
                {loading ? "Salvando..." : "Salvar e Continuar"}
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HealthData;