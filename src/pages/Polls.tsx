import { PageLayout } from "@/components/PageLayout";
import { PollCard } from "@/components/PollCard";
import { polls } from "@/data/polls";

const Polls = () => {
  return (
    <PageLayout title="Enquetes">
      <div className="space-y-6">
        {polls.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>
    </PageLayout>
  );
};

export default Polls;