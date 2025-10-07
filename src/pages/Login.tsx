import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";
import gavioesLogo from "@/assets/gavioes-logo.png";

const Login = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-between p-6 font-sans text-center">
      <div />
      <div className="w-full max-w-sm space-y-8">
        <img
          src={gavioesLogo}
          alt="Gaviões da Fiel Logo"
          className="w-40 h-auto mx-auto"
        />
        <div>
          <h1 className="text-3xl font-bold">Acesse sua conta</h1>
        </div>
        <form className="space-y-6 text-left">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail ou CPF</Label>
            <Input id="email" type="text" placeholder="seuemail@email.com" className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" placeholder="********" className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div className="text-right">
            <Link to="#" className="text-sm text-gray-400 hover:underline">
              Esqueci minha senha
            </Link>
          </div>
          <Button asChild className="w-full bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-12">
            <Link to="/profile">Entrar</Link>
          </Button>
        </form>
        <p className="text-sm text-gray-400">
          Não tem uma conta?{" "}
          <Link to="/register" className="font-semibold text-white hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
      <img
        src={esportesDaSorteLogo}
        alt="Esportes da Sorte Logo"
        className="w-40 h-auto"
      />
    </div>
  );
};

export default Login;