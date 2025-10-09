import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";
import gavioesWallpaper from "@/assets/gavioes-wallpaper.png";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { AppleIcon } from "@/components/icons/AppleIcon";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showError(error.message);
    } else {
      showSuccess("Login realizado com sucesso!");
      navigate("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${gavioesWallpaper})` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 w-full max-w-md text-white text-center">
        <h1 className="text-3xl font-bold">Olá!</h1>
        <h2 className="text-3xl font-bold mb-8">Bem-Vindo De Volta</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Login"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/90 text-black rounded-lg h-12 placeholder:text-gray-500"
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/90 text-black rounded-lg h-12 placeholder:text-gray-500"
            required
          />
          <div className="text-right">
            <Link to="#" className="text-sm hover:underline">
              Esqueceu A Senha?
            </Link>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-800/80 hover:bg-gray-700/80 text-white font-bold rounded-lg text-lg h-12"
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-400" />
          <span className="mx-4 text-sm text-gray-200">Ou Continuar Com</span>
          <div className="flex-grow border-t border-gray-400" />
        </div>

        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="icon" className="bg-white/90 rounded-full h-12 w-12">
            <GoogleIcon className="h-6 w-6" />
          </Button>
          <Button variant="outline" size="icon" className="bg-white/90 rounded-full h-12 w-12">
            <FacebookIcon className="h-6 w-6" />
          </Button>
          <Button variant="outline" size="icon" className="bg-white/90 rounded-full h-12 w-12 text-black">
            <AppleIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;