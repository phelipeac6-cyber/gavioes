import { PageLayout } from "@/components/PageLayout";
import { EventCard } from "@/components/EventCard";
import { events } from "@/data/events";

const Events = () => {
  return (
    <PageLayout title="Eventos">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </PageLayout>
  );
};

export default Events;