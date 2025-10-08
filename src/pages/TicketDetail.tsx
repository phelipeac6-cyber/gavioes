import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tickets } from "@/data/tickets";
import { Calendar, MapPin } from "lucide-react";

const TicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const ticket = tickets.find(t => t.id === Number(id));

  if (!ticket) {
    return <PageLayout title="Ingresso não encontrado"><div>Ingresso não encontrado.</div></PageLayout>;
  }

  const handleBuyTicket = () => {
    navigate(`/ticket-checkout`, { state: { ticket, quantity } });
  };

  return (
    <PageLayout title={ticket.eventName}>
      <div className="flex flex-col gap-6">
        <img src={ticket.image} alt={ticket.eventName} className="w-full h-64 rounded-lg object-cover" />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{ticket.eventName}</h1>
          <div className="text-lg text-gray-400 space-y-2">
            <div className="flex items-center gap-3">
              <Calendar size={20} />
              <span>{ticket.eventDate}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} />
              <span>{ticket.location}</span>
            </div>
          </div>
          <p className="text-2xl font-semibold text-red-500 pt-2">R$ {ticket.price.toFixed(2)}</p>
          <p className="text-gray-300 pt-2">Garanta seu lugar para apoiar o Timão! Ingressos limitados a {ticket.available} unidades.</p>
        </div>
        <div className="pt-4 flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(ticket.available, parseInt(e.target.value) || 1)))}
                className="w-24 bg-transparent border-white rounded-lg h-12 text-center"
                min="1"
                max={ticket.available}
              />
              <Button onClick={handleBuyTicket} className="w-full bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-12 flex-grow">
                Comprar
              </Button>
            </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TicketDetail;