import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import gavioesLogo from "@/assets/gavioes-logo.png";
import { showError, showSuccess } from "@/utils/toast";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showError("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      showError(error.message);
    } else {
      showSuccess("Cadastro realizado! Verifique seu e-mail para confirmar a conta.");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      <header className="p-4">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft size={24} />
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center px-6">
        <img
          src={gavioesLogo}
          alt="Gaviões da Fiel Logo"
          className="w-40 h-auto mb-10"
        />
        <h1 className="text-3xl font-bold self-start mb-8">Cadastrar</h1>

        <form onSubmit={handleRegister} className="w-full max-w-sm space-y-6">
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base"
            required
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400"
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-14 !mt-8"
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p>
            Já tem uma conta?{" "}
            <Link to="/login" className="font-bold hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;