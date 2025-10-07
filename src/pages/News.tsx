import { MainLayout } from "@/components/MainLayout";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const newsItems = [
  {
    id: 1,
    title: "Gaviões da Fiel anuncia novo enredo para o Carnaval 2025",
    date: "25 de Julho, 2024",
  },
  {
    id: 2,
    title: "Ação social na comunidade: Gaviões distribui cestas básicas",
    date: "22 de Julho, 2024",
  },
  {
    id: 3,
    title: "Convocação para a próxima caravana: Todos para o jogo de domingo!",
    date: "20 de Julho, 2024",
  },
];

const News = () => {
  return (
    <MainLayout>
      <header className="p-4 flex items-center border-b border-gray-800 sticky top-0 bg-black z-10">
        <h1 className="text-xl font-bold mx-auto">Notícias</h1>
      </header>
      <div className="p-6 space-y-6">
        {newsItems.map((item) => (
          <Card key={item.id} className="bg-gray-900 border-gray-800 text-white overflow-hidden">
            <img src={`https://via.placeholder.com/400x200.png/000000/FFFFFF?text=Noticia+${item.id}`} alt={item.title} className="w-full h-40 object-cover" />
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardFooter>
              <p className="text-sm text-gray-400">{item.date}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default News;