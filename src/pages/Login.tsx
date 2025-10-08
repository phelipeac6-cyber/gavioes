import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import gavioesLogo from "@/assets/gavioes-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <header className="p-4 flex items-center space-x-4 sticky top-0 bg-black z-10">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft size={24} />
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center p-6">
        <img
          src={gavioesLogo}
          alt="Gaviões da Fiel Logo"
          className="w-40 h-auto mx-auto mb-10"
        />

        <div className="w-full max-w-sm text-left">
          <h1 className="text-4xl font-bold mb-8">Login</h1>

          <form className="space-y-5">
            <Input
              type="email"
              placeholder="E-mail"
              className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base"
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                className="bg-transparent border-white rounded-lg h-14 pr-12 placeholder:text-gray-400 text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-400"
              >
                {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm pt-2">
              <span className="text-gray-300">Lembrar senha</span>
              <Link to="#" className="font-semibold text-red-500 hover:underline">
                Esqueceu sua senha
              </Link>
            </div>

            <Button asChild className="w-full bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-14 !mt-8">
              <Link to="/profile">Entrar</Link>
            </Button>
          </form>

          <p className="text-sm text-center text-gray-400 mt-8">
            Não tem uma conta?{" "}
            <Link to="/register" className="font-bold text-white hover:underline">
              Cadastrar
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;