import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, CheckCircle } from "lucide-react";
import newBg from "@/assets/bg.png";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";

const Socio = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden">
      <img
        src={newBg}
        alt="Gaviões da Fiel background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-20 z-0"
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="p-4 flex items-center space-x-4 sticky top-0 bg-black/80 backdrop-blur-sm z-20 border-b border-gray-800">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Socio Gavião</h1>
        </header>

        <main className="flex-grow p-6">
          <div className="relative flex flex-col items-center space-y-6">
            <div className="relative z-10 w-full space-y-4 text-black">
              {/* User Info Card */}
              <div className="bg-white p-4 rounded-2xl flex items-center space-x-3 w-full">
                <div className="relative flex-shrink-0">
                  <Avatar className="w-14 h-14">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Alê"
                    />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <CheckCircle
                    size={20}
                    className="absolute -bottom-1 -right-1 text-yellow-400 bg-white rounded-full"
                    fill="white"
                  />
                </div>
                <div className="font-bold text-xl flex-1">Alê</div>
                <div className="text-center text-xs">
                  <p className="font-semibold">Data vencimento</p>
                  <p className="font-bold">30/10/2025</p>
                </div>
                <div className="text-center text-xs">
                  <p className="font-semibold">Mensalidade</p>
                  <div className="flex items-center justify-center space-x-1">
                    <span className="font-bold">Pago</span>
                    <CheckCircle
                      size={16}
                      className="text-green-500"
                      fill="white"
                    />
                  </div>
                </div>
              </div>

              {/* Membership Duration Card */}
              <div className="bg-white p-4 rounded-2xl w-full text-center">
                <p className="font-bold">Gavião á 25 anos 10 meses e 5 dias</p>
              </div>

              {/* Pay Button */}
              <Button className="w-full bg-white text-black font-bold rounded-2xl text-lg hover:bg-gray-200 h-14">
                Pagar
              </Button>
            </div>
          </div>
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

export default Socio;