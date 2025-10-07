import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";
import gavioesLogo from "@/assets/gavioes-logo.png";

const Register = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6 font-sans">
      <div className="w-full max-w-sm space-y-6 mt-8 flex-grow">
        <img
          src={gavioesLogo}
          alt="Gaviões da Fiel Logo"
          className="w-40 h-auto mx-auto"
        />
        <div className="text-center">
          <h1 className="text-3xl font-bold">Crie sua conta</h1>
        </div>
        <form className="space-y-4 text-left">
          <div className="space-y-1">
            <Label htmlFor="name">Nome Completo</Label>
            <Input id="name" type="text" className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="cpf">CPF</Label>
            <Input id="cpf" type="text" className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" type="tel" className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirm-password">Confirmar Senha</Label>
            <Input id="confirm-password" type="password" className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <Button asChild className="w-full bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-12 mt-6">
            <Link to="/profile">Criar conta</Link>
          </Button>
        </form>
        <p className="text-sm text-center text-gray-400 pt-4">
          Já tem uma conta?{" "}
          <Link to="/login" className="font-semibold text-white hover:underline">
            Faça login
          </Link>
        </p>
      </div>
      <img
        src={esportesDaSorteLogo}
        alt="Esportes da Sorte Logo"
        className="w-40 h-auto mt-8"
      />
    </div>
  );
};

export default Register;