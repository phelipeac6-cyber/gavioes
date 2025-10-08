import { PageLayout } from "@/components/PageLayout";
import { estatutoContent } from "@/data/estatuto-content";

const Estatuto = () => {
  return (
    <PageLayout title="Estatuto">
      <div className="prose prose-invert max-w-none text-gray-300">
        {estatutoContent.map((item, index) => {
          if (item.type === 'h1') {
            return <h1 key={index} className="text-white !mb-8 !text-center">{item.text}</h1>;
          }
          if (item.type === 'h2') {
            return <h2 key={index} className="text-red-500 !mt-10 !mb-4">{item.text}</h2>;
          }
          return <p key={index} className="text-justify">{item.text}</p>;
        })}
      </div>
    </PageLayout>
  );
};

export default Estatuto;