import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const newsItems = [
  {
    id: 1,
    category: "Entretenimento",
    title: "Com enredo indígena, Gaviões da Fiel define samba para o Carnaval de 2026",
    image: "https://images.pexels.com/photos/1684151/pexels-photo-1684151.jpeg?auto=compress&cs=tinysrgb&w=800",
    layout: "image-right",
  },
  {
    id: 2,
    category: "Corinthians",
    title: "Gaviões da Fiel terá reunião com Osmar Stabile, presidente do Corinthians",
    image: "https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg?auto=compress&cs=tinysrgb&w=800",
    layout: "image-right",
  },
  {
    id: 3,
    category: "Corinthians",
    title: "Corinthians: Memphis se reúne com Gaviões da Fiel e mostra que quer ficar",
    image: "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800",
    layout: "image-top",
  },
  {
    id: 4,
    category: "Corinthians",
    title: "Técnico fala sobre a importância da torcida na próxima partida",
    image: "https://images.pexels.com/photos/1277397/pexels-photo-1277397.jpeg?auto=compress&cs=tinysrgb&w=800",
    layout: "image-top",
  },
];

const News = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <header className="p-4 flex items-center space-x-4 sticky top-0 bg-black z-10 border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Notícias</h1>
      </header>
      <div className="p-6 space-y-6">
        {newsItems.map((item) => (
          <div key={item.id}>
            {item.layout === "image-right" ? (
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <p className="font-semibold underline decoration-1 underline-offset-4 mb-1">
                    {item.category}
                  </p>
                  <h2 className="text-lg font-bold leading-tight">{item.title}</h2>
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-24 object-cover rounded-lg"
                />
              </div>
            ) : (
              <div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="font-semibold underline decoration-1 underline-offset-4 mb-1">
                  {item.category}
                </p>
                <h2 className="text-lg font-bold leading-tight">{item.title}</h2>
              </div>
            )}
            <Separator className="mt-6 bg-gray-800" />
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default News;