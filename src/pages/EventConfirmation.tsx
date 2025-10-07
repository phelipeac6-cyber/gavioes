import { Link, useParams } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { events } from "@/data/events";

const EventConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const event = events.find(e => e.id === Number(id));

  return (
    <PageLayout title="Presença Confirmada">
      <div className="text-center flex flex-col items-center space-y-6">
        <CheckCircle2 size={80} className="text-green-500" />
        <h1 className="text-3xl font-bold">Presença confirmada!</h1>
        {event && (
           <p className="text-gray-300">
            Sua presença no evento <strong>{event.title}</strong> foi registrada com sucesso.
          </p>
        )}
        <p className="text-gray-300">
          Nos vemos lá!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <Button asChild className="bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-12 flex-grow">
            <Link to="/events">Ver Outros Eventos</Link>
          </Button>
           <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black h-12 flex-grow">
            <Link to="/profile">Voltar para o Início</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default EventConfirmation;