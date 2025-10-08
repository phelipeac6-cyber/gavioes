import { PageLayout } from "@/components/PageLayout";
import { TicketCard } from "@/components/TicketCard";
import { tickets } from "@/data/tickets";

const Tickets = () => {
  return (
    <PageLayout title="Ingressos">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </PageLayout>
  );
};

export default Tickets;