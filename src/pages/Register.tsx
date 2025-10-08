"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useSession";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { UserAvatar } from "@/components/UserAvatar";

type Profile = {
  id: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  whatsapp_number: string | null;
  cep: string | null;
  endereco: string | null;
  numero: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
  complemento: string | null;
  tipo_sanguineo: string | null;
  diabetes: string | null;
  cardiaco: string | null;
  pressao: string | null;
  remedios: string | null;
  alergia_medicamento: string | null;
  contato_emergencia_nome: string | null;
  contato_emergencia_telefone: string | null;
  contato_emergencia_parentesco: string | null;
  username: string | null;
};

export default function Register() {
  const navigate = useNavigate();
  const { session, loading: sessionLoading } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    whatsapp_number: "",
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    complemento: "",
    tipo_sanguineo: "",
    diabetes: "nao",
    cardiaco: "nao",
    pressao: "normal",
    remedios: "",
    alergia_medicamento: "",
    contato_emergencia_nome: "",
    contato_emergencia_telefone: "",
    contato_emergencia_parentesco: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionLoading && !session) {
      navigate("/login");
    }
  }, [session, sessionLoading, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user) {
        setLoadingProfile(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching profile:", error);
          toast.error("Erro ao carregar perfil.");
        }

        if (data) {
          setProfile(data);
          setFormData((prev) => ({ ...prev, ...data }));
          setAvatarUrl(data.avatar_url);
        }
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = async () => {
    if (!session?.user) return;

    setIsSubmitting(true);
    const { error } = await supabase
      .from("profiles")
      .update({ ...formData, updated_at: new Date().toISOString() })
      .eq("id", session.user.id);

    if (error) {
      toast.error("Erro ao salvar os dados. Tente novamente.");
      console.error("Update error:", error);
    } else {
      setStep((prev) => prev + 1);
    }
    setIsSubmitting(false);
  };

  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleAvatarUploaded = async (url: string) => {
    if (!session?.user) {
      toast.error("Sessão expirada. Por favor, faça login novamente.");
      return;
    }
    setAvatarUrl(url);
    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: url, updated_at: new Date().toISOString() })
      .eq("id", session.user.id);

    if (error) {
      toast.error("Erro ao salvar a foto de perfil.");
      console.error("Update error:", error);
    }
  };

  const handleFinish = async () => {
    toast.success("Cadastro finalizado com sucesso!");
    if (session?.user?.id) {
      const { data: updatedProfile, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching updated profile:", error);
        navigate("/profile");
      } else if (updatedProfile?.username) {
        navigate(`/profile/${updatedProfile.username}`);
      } else {
        navigate("/profile");
      }
    } else {
      navigate("/login");
    }
  };

  if (sessionLoading || loadingProfile) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const renderStep = () => {
    if (step === 1) {
      return (
        <div>
          <h2 className="text-2xl font-bold mb-2">Informações Pessoais</h2>
          <p className="text-gray-400 mb-6">
            Preencha seus dados para continuar.
          </p>
          <div className="space-y-4">
            <Input
              name="first_name"
              placeholder="Nome"
              value={formData.first_name}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700"
            />
            <Input
              name="last_name"
              placeholder="Sobrenome"
              value={formData.last_name}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700"
            />
          </div>
        </div>
      );
    } else if (step === 2) {
      return (
        <div>
          <h2 className="text-2xl font-bold mb-2">Contato</h2>
          <p className="text-gray-400 mb-6">
            Como podemos entrar em contato com você?
          </p>
          <Input
            name="whatsapp_number"
            placeholder="Número do WhatsApp"
            value={formData.whatsapp_number || ""}
            onChange={handleInputChange}
            className="bg-gray-800 border-gray-700"
          />
        </div>
      );
    } else if (step === 3) {
      return (
        <div>
          <h2 className="text-2xl font-bold mb-2">Endereço</h2>
          <p className="text-gray-400 mb-6">Onde você mora?</p>
          <div className="space-y-4">
            <Input name="cep" placeholder="CEP" value={formData.cep || ""} onChange={handleInputChange} className="bg-gray-800 border-gray-700" />
            <Input name="endereco" placeholder="Endereço" value={formData.endereco || ""} onChange={handleInputChange} className="bg-gray-800 border-gray-700" />
            <div className="flex gap-4">
              <Input name="numero" placeholder="Número" value={formData.numero || ""} onChange={handleInputChange} className="bg-gray-800 border-gray-700" />
              <Input name="bairro" placeholder="Bairro" value={formData.bairro || ""} onChange={handleInputChange} className="bg-gray-800 border-gray-700" />
            </div>
            <div className="flex gap-4">
              <Input name="cidade" placeholder="Cidade" value={formData.cidade || ""} onChange={handleInputChange} className="bg-gray-800 border-gray-700" />
              <Input name="estado" placeholder="Estado" value={formData.estado || ""} onChange={handleInputChange} className="bg-gray-800 border-gray-700" />
            </div>
            <Input name="complemento" placeholder="Complemento" value={formData.complemento || ""} onChange={handleInputChange} className="bg-gray-800 border-gray-700" />
          </div>
        </div>
      );
    } else if (step === 4) {
      return (
        <div>
          <h2 className="text-2xl font-bold mb-2">Informações de Saúde</h2>
          <p className="text-gray-400 mb-6">
            Essas informações são importantes em caso de emergência.
          </p>
          <div className="space-y-4">
            <Input name="tipo_sanguineo" placeholder="Tipo Sanguíneo" value={formData.tipo_sanguineo || ""} onChange={handleInputChange} className="bg-gray-800 border-gray-700" />
            <Input name="remedios" placeholder="Remédios que utiliza" value={formData.remedios || ""} onChange={handleInputChange} className="bg-gray-800 border-gray-700" />
            <Input name="alergia_medicamento" placeholder="Alergia a medicamentos" value={formData.alergia_medicamento || ""} onChange={handleInputChange} className="bg-gray-800 border-gray-700" />
            <h3 className="text-lg font-semibold pt-4">Contato de Emergência</h3>
            <Input name="contato_emergencia_nome" placeholder="Nome do Contato" value={formData.contato_emergencia_nome || ""} onChange={handleInputChange} className="bg-gray-800 border-gray-700" />
            <Input name="contato_emergencia_telefone" placeholder="Telefone do Contato" value={formData.contato_emergencia_telefone || ""} onChange={handleInputChange} className="bg-gray-800 border-gray-700" />
            <Input name="contato_emergencia_parentesco" placeholder="Parentesco" value={formData.contato_emergencia_parentesco || ""} onChange={handleInputChange} className="bg-gray-800 border-gray-700" />
          </div>
        </div>
      );
    } else if (step === 5) {
      return (
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-2">Foto de Perfil</h2>
          <p className="text-gray-400 mb-6">
            Carregue uma foto para o seu perfil.
          </p>
          <div className="mb-6">
            <UserAvatar
              userId={session?.user?.id}
              initialUrl={avatarUrl}
              onUpload={handleAvatarUploaded}
              size={128}
            />
          </div>
          <Button onClick={handleFinish} className="w-full">
            Finalizar Cadastro
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
        <Progress value={progress} className="w-full" />
        
        <div className="form-content">{renderStep()}</div>

        {step < 5 && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={step === 1}
            >
              Voltar
            </Button>
            <Button onClick={handleNextStep} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Próximo"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}