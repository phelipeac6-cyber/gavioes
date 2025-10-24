import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import feelOneLogo from "@/assets/feel-one-logo.png";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Garante que o perfil existe; se não existir, cria/atualiza com dados mínimos
  const ensureProfile = async (userId: string, meta: any) => {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, username")
      .eq("id", userId)
      .maybeSingle();

    if (profileData?.id) {
      return profileData;
    }

    const first = meta?.first_name ?? "";
    const last = meta?.last_name ?? "";
    const username = meta?.username ?? `user_${userId.slice(0, 8)}`;

    const { error: upsertError } = await supabase
      .from("profiles")
      .upsert(
        {
          id: userId,
          first_name: first,
          last_name: last,
          username,
        },
        { onConflict: "id" }
      );

    if (upsertError) {
      return null;
    }

    const { data: profileAfterUpsert } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, username")
      .eq("id", userId)
      .maybeSingle();

    return profileAfterUpsert ?? null;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: loginData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        showError(error.message);
        return;
      } else if (loginData.user) {
        showSuccess("Login realizado com sucesso!");

        // Garante que o perfil existe e tem os dados mínimos (inclui username)
        const ensuredProfile = await ensureProfile(
          loginData.user.id,
          loginData.user.user_metadata
        );

        // Ir direto para a página de perfil usando o username
        if (ensuredProfile?.username) {
          navigate(`/${ensuredProfile.username}`);
        } else {
          // Fallback caso username não esteja disponível
          navigate("/profile");
        }
      } else {
        showError("Ocorreu um erro inesperado. Tente novamente.");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1800AD] flex flex-col font-sans">
      <header className="p-4 flex items-center space-x-4 sticky top-0 bg-white z-10">
        <button onClick={() => navigate(-1)} className="p-2 text-[#1800AD]">
          <ArrowLeft size={24} />
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center px-6 pt-2 pb-6">
        <img
          src={feelOneLogo}
          alt="FeelOne Logo"
          className="w-[16.8rem] md:w-[21rem] h-auto mx-auto mb-4"
        />

        <div className="w-full max-w-sm text-left">
          <h1 className="text-4xl font-bold mb-8 text-[#1800AD]">Login</h1>

          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-2 border-[#1800AD] rounded-lg h-14 placeholder:text-gray-500 text-base text-[#1800AD] focus-visible:ring-[#1800AD]"
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border-2 border-[#1800AD] rounded-lg h-14 pr-12 placeholder:text-gray-500 text-base text-[#1800AD] focus-visible:ring-[#1800AD]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-4 flex items-center text-[#1800AD]"
              >
                {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm pt-2">
              <span className="text-[#1800AD]">Lembrar senha</span>
              <Link to="#" className="font-semibold text-[#1800AD] hover:underline">
                Esqueceu sua senha
              </Link>
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-[#1800AD] text-white font-bold rounded-lg text-lg hover:bg-[#1800AD]/90 h-14 !mt-8">
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <p className="text-sm text-center text-[#1800AD] mt-8">
            Não tem uma conta?{" "}
            <Link to="/register" className="font-bold text-[#1800AD] hover:underline">
              Cadastrar
            </Link>
          </p>
        </div>

        <img
          src={esportesDaSorteLogo}
          alt="Esportes da Sorte Logo"
          className="w-48 md:w-56 h-auto mx-auto mt-8"
        />
      </main>
    </div>
  );
};

export default Login;