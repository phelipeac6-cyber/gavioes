import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import registerBg from "@/assets/gavioes-wallpaper.png";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";

const EmergencyContactForm = () => {
  const navigate = useNavigate();

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
          <h1 className="text-xl font-bold">Contato Emergência</h1>
        </header>

        <main className="flex-grow p-6">
          <form className="w-full max-w-sm mx-auto space-y-5">
            <Input placeholder="Nome" className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
            <Input placeholder="Telefone com whatsapp" className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
            <Input placeholder="Grau parentesco" className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
            <Input type="email" placeholder="E-mail" className="bg-transparent border-white rounded-lg h-14 placeholder:text-gray-400 text-base" />
            
            <div className="flex items-center space-x-2 pt-4">
              <Checkbox
                id="terms"
                className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Concordo com a <a href="#" className="underline">privacidade e a política</a>
              </label>
            </div>

            <Button className="w-full bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-14 !mt-8">
              Salvar
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

export default EmergencyContactForm;