import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle } from "lucide-react";
import gavioesLogo from "@/assets/gavioes-logo.png";

const Socio = () => {
  return (
    <PageLayout title="Socio Gavião">
      <div className="relative flex flex-col items-center space-y-6">
        {/* Background Logo */}
        <img
          src={gavioesLogo}
          alt="Gaviões da Fiel Logo"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-xs h-auto opacity-10 z-0"
        />

        <div className="relative z-10 w-full space-y-4 text-black">
          {/* User Info Card */}
          <div className="bg-white p-4 rounded-2xl flex items-center space-x-3 w-full">
            <div className="relative flex-shrink-0">
              <Avatar className="w-14 h-14">
                <AvatarImage src="https://github.com/shadcn.png" alt="Alê" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <CheckCircle size={20} className="absolute -bottom-1 -right-1 text-yellow-400 bg-white rounded-full" fill="white" />
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
                <CheckCircle size={16} className="text-green-500" fill="white" />
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
    </PageLayout>
  );
};

export default Socio;