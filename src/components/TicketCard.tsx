import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ticket } from "@/types";
import { Calendar, MapPin, Ticket as TicketIcon } from "lucide-react";

interface TicketCardProps {
  ticket: Ticket;
}

export const TicketCard = ({ ticket }: TicketCardProps) => {
  return (
    <Card className="bg-gray-900/50 border-gray-700 overflow-hidden text-white flex flex-col">
      <Link to={`/ticket/${ticket.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0">
          <img src={ticket.image} alt={ticket.eventName} className="w-full h-40 object-cover" />
        </CardHeader>
        <CardContent className="p-4 space-y-2 flex-grow">
          <CardTitle className="text-lg font-bold leading-tight">{ticket.eventName}</CardTitle>
          <div className="text-sm text-gray-400 space-y-1">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>{ticket.eventDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>{ticket.location}</span>
            </div>
             <div className="flex items-center gap-2 pt-1">
              <TicketIcon size={14} />
              <span className="font-semibold text-white">{ticket.available} disponíveis</span>
            </div>
          </div>
           <p className="text-xl font-semibold text-red-500 pt-2">R$ {ticket.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full bg-white text-black font-bold rounded-lg hover:bg-gray-200">
            Comprar Ingresso
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};