import { Link, useLocation } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Ticket } from "@/types";

const TicketConfirmation = () => {
  const location = useLocation();
  const { ticket, quantity } = location.state as { ticket: Ticket, quantity: number };

  return (
    <PageLayout title="Compra Confirmada">
      <div className="text-center flex flex-col items-center space-y-6">
        <CheckCircle2 size={80} className="text-green-500" />
        <h1 className="text-3xl font-bold">Obrigado pela sua compra!</h1>
        {ticket && quantity && (
           <p className="text-gray-300">
            Você comprou <strong>{quantity} ingresso(s)</strong> para o evento <strong>{ticket.eventName}</strong>.
          </p>
        )}
        <p className="text-gray-300">
          Seus ingressos foram enviados para o seu e-mail.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <Button asChild className="bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-12 flex-grow">
            <Link to="/tickets">Comprar mais ingressos</Link>
          </Button>
           <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black h-12 flex-grow">
            <Link to="/profile">Voltar para o Início</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default TicketConfirmation;