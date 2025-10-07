import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { events } from "@/data/events";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const event = events.find(e => e.id === Number(id));

  if (!event) {
    return <PageLayout title="Evento não encontrado"><div>Evento não encontrado.</div></PageLayout>;
  }

  return (
    <PageLayout title={event.title}>
      <div className="flex flex-col gap-6">
        <img src={event.image} alt={event.title} className="w-full h-64 rounded-lg object-cover" />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <div className="text-lg text-gray-400 space-y-2">
            <div className="flex items-center gap-3">
              <Calendar size={20} />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={20} />
              <span>{event.location}</span>
            </div>
          </div>
          <p className="text-gray-300 pt-2">{event.description}</p>
        </div>
        <div className="pt-4">
           <Button className="w-full bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-12">
              Confirmar Presença
            </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default EventDetail;