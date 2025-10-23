"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubSedeCombobox } from "@/components/SubSedeCombobox";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [subSede, setSubSede] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          username,
          sub_sede: subSede,
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
    } else if (data.user) {
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Verifique seu e-mail para confirmar sua conta.",
      });
      navigate("/social-media");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#1800AD] font-sans relative overflow-x-hidden">
      <header className="p-4 flex items-center space-x-4 sticky top-0 bg-white z-20">
        <button onClick={() => navigate(-1)} className="p-2 text-[#1800AD]">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Cadastro</h1>
      </header>
      <main className="p-6">
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-sm text-[#1800AD]/80">Nome</Label>
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
              <Label htmlFor="lastName" className="text-sm text-[#1800AD]/80">Sobrenome</Label>
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
          <div>
            <Label htmlFor="username" className="text-sm text-[#1800AD]/80">Nome de usuário</Label>
            <Input
              id="username"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent border-2 border-[#1800AD] rounded-lg placeholder:text-[#1800AD]/60 mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm text-[#1800AD]/80">E-mail</Label>
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
          <div>
            <Label htmlFor="subSede" className="text-sm text-[#1800AD]/80">Sub-Sede</Label>
            <SubSedeCombobox value={subSede} onChange={setSubSede} />
          </div>
          <div>
            <Label className="text-sm text-[#1800AD]/80">Gênero</Label>
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
                Masculino
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
                Feminino
              </Button>
            </div>
          </div>
          <div className="relative">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-2 border-[#1800AD] rounded-lg placeholder:text-[#1800AD]/60 mt-1"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute bottom-3 right-3 text-[#1800AD]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="relative">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-transparent border-2 border-[#1800AD] rounded-lg placeholder:text-[#1800AD]/60 mt-1"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute bottom-3 right-3 text-[#1800AD]"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1800AD] text-white font-bold rounded-lg text-lg hover:bg-[#1800AD]/90 h-12 !mt-8"
          >
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Register;