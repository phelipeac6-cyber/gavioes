import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Event } from "@/types";
import { Calendar, MapPin } from "lucide-react";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card className="bg-gray-900/50 border-gray-700 overflow-hidden text-white flex flex-col">
      <Link to={`/event/${event.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0">
          <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
        </CardHeader>
        <CardContent className="p-4 space-y-2 flex-grow">
          <CardTitle className="text-lg font-bold leading-tight">{event.title}</CardTitle>
          <div className="text-sm text-gray-400 space-y-1">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>{event.location}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full bg-white text-black font-bold rounded-lg hover:bg-gray-200">
            Ver Detalhes
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};