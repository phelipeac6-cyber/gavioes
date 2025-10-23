import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import registerBg from "@/assets/gavioes-wallpaper.png";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";

const Address = () => {
  const navigate = useNavigate();
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
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

    fetchAddress();
  }, [cep]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      showError("Usuário não encontrado. Faça o login novamente.");
      navigate("/login");
      setLoading(false);
      return;
    }

    // Garantir que o profile exista
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (!existingProfile) {
      // Criar profile mínimo se não existir
      const { error: insertErr } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          username: `user_${String(user.id).slice(0, 8)}`,
        });
      if (insertErr) {
        showError("Erro ao criar profile: " + insertErr.message);
        setLoading(false);
        return;
      }
    }

    const updateData: any = {};
    if (cep) updateData.cep = cep;
    if (endereco) updateData.endereco = endereco;
    if (numero) updateData.numero = numero;
    if (complemento) updateData.complemento = complemento;
    if (bairro) updateData.bairro = bairro;
    if (cidade) updateData.cidade = cidade;
    if (estado) updateData.estado = estado;

    const { error } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("id", user.id);

    if (error) {
      showError(error.message);
    } else {
      showSuccess("Endereço salvo com sucesso!");
      navigate("/");
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
          <h1 className="text-xl font-bold">Endereço</h1>
        </header>

        <main className="flex-grow p-6">
          <form onSubmit={handleSave} className="w-full max-w-sm mx-auto space-y-5">
            <Input placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)} maxLength={9} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
            <Input placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
            <Input placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
            <Input placeholder="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
            <Input placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
            <Input placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
            <Input placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
            
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

export default Address;