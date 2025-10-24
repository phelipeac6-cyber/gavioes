"use client";

import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Eye, EyeOff, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Campos do formulário
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState<"" | "masculino" | "feminino">("");

  // Avatar (preview local)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados de UI
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            bio,
            gender,
          },
        },
      });

      if (error) {
        toast({
          title: "Erro no cadastro",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data?.user) {
        // Se já houver sessão (autoconfirm), atualizar perfil
        if (data.session) {
          await supabase.from("profiles").update({ gender }).eq("id", data.user.id);
        } else {
          // Se não houver sessão (projeto com confirmação), tentar login imediato
          const { data: signInData, error: loginErr } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (loginErr) {
            toast({
              title: "Confirmação necessária",
              description: "Verifique seu e-mail para confirmar o cadastro. Você pode continuar o fluxo agora e finalizar depois.",
            });
            // Continua o fluxo, mesmo sem sessão
          } else if (signInData?.user) {
            // Com sessão criada pelo signIn, atualizar perfil
            await supabase.from("profiles").update({ gender }).eq("id", data.user.id);
          }
        }

        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Vamos continuar seu cadastro.",
        });
        navigate("/social", { replace: true });
      }
    } catch (err: any) {
      toast({
        title: "Erro inesperado",
        description: err?.message || "Não foi possível concluir o cadastro.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1800AD] font-sans relative overflow-x-hidden">
      {/* Cabeçalho */}
      <header className="p-4 flex items-center space-x-4 sticky top-0 bg-white z-20">
        <button onClick={() => navigate(-1)} className="p-2 text-[#1800AD]" aria-label="Voltar">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Cadastro</h1>
      </header>

      <main className="p-6">
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Avatar com botão de câmera */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <Avatar className="h-20 w-20 border-2 border-[#1800AD] bg-white">
                {avatarPreview ? (
                  <AvatarImage src={avatarPreview} alt="Avatar" />
                ) : (
                  <AvatarFallback className="bg-muted text-[#1800AD]">IMG</AvatarFallback>
                )}
              </Avatar>
              <button
                type="button"
                onClick={handleAvatarClick}
                className="absolute -bottom-1 -right-1 bg-black/80 text-white rounded-md p-1.5 shadow"
                aria-label="Alterar foto"
              >
                <Camera size={16} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          {/* Nome e Sobrenome */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-sm text-[#1800AD]">Nome</Label>
              <Input
                id="firstName"
                placeholder="Nome"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-transparent border-2 border-[#1800AD] rounded-lg placeholder:text-[#1800AD]/60 mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-sm text-[#1800AD]">Sobrenome</Label>
              <Input
                id="lastName"
                placeholder="Sobrenome"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-transparent border-2 border-[#1800AD] rounded-lg placeholder:text-[#1800AD]/60 mt-1"
                required
              />
            </div>
          </div>

          {/* E-mail */}
          <div>
            <Label htmlFor="email" className="text-sm text-[#1800AD]">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-2 border-[#1800AD] rounded-lg placeholder:text-[#1800AD]/60 mt-1"
              required
            />
          </div>

          {/* Senha */}
          <div className="relative">
            <Label htmlFor="password" className="text-sm text-[#1800AD]">Senha</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-2 border-[#1800AD] rounded-lg placeholder:text-[#1800AD]/60 mt-1 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute bottom-3 right-3 text-[#1800AD]"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirmar Senha */}
          <div className="relative">
            <Label htmlFor="confirmPassword" className="text-sm text-[#1800AD]">Confirma Senha</Label>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirma Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-transparent border-2 border-[#1800AD] rounded-lg placeholder:text-[#1800AD]/60 mt-1 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute bottom-3 right-3 text-[#1800AD]"
              aria-label={showConfirmPassword ? "Ocultar confirmação" : "Mostrar confirmação"}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Biografia */}
          <div>
            <Label htmlFor="bio" className="text-sm text-[#1800AD]">Biografia</Label>
            <Textarea
              id="bio"
              placeholder="Biografia"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-transparent border-2 border-[#1800AD] rounded-lg placeholder:text-[#1800AD]/60 mt-1"
            />
          </div>

          {/* Gênero */}
          <div>
            <Label className="text-sm text-[#1800AD]">Gênero</Label>
            <div className="grid grid-cols-2 gap-4 mt-1">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setGender("masculino")}
                className={cn(
                  "rounded-lg h-12",
                  gender === "masculino"
                    ? "bg-[#1800AD] text-white hover:bg-[#1800AD]/90"
                    : "bg-transparent border-2 border-[#1800AD] text-[#1800AD] hover:bg-[#1800AD]/10"
                )}
              >
                Homem
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setGender("feminino")}
                className={cn(
                  "rounded-lg h-12",
                  gender === "feminino"
                    ? "bg-[#1800AD] text-white hover:bg-[#1800AD]/90"
                    : "bg-transparent border-2 border-[#1800AD] text-[#1800AD] hover:bg-[#1800AD]/10"
                )}
              >
                Mulher
              </Button>
            </div>
          </div>

          {/* Salvar */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1800AD] text-white font-bold rounded-lg text-lg hover:bg-[#1800AD]/90 h-12 !mt-2"
          >
            {loading ? "Salvando..." : "Salvar"}
          </Button>

          {/* Link de login */}
          <div className="flex items-center justify-between text-sm text-[#1800AD]">
            <span>Já tem uma conta?</span>
            <Link to="/login" className="font-semibold hover:underline">
              Entrar
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Register;