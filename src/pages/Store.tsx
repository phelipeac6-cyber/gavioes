import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const products = [
  {
    id: 1,
    name: "Camiseta Gaviões",
    price: "R$ 89,90",
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Boné Exclusivo",
    price: "R$ 59,90",
    image: "https://images.pexels.com/photos/1878821/pexels-photo-1878821.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Pulseira Oficial",
    price: "R$ 29,90",
    image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "Moletom Torcedor",
    price: "R$ 149,90",
    image: "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const Store = () => {
  return (
    <PageLayout title="Loja">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="bg-gray-900/50 border-gray-700 overflow-hidden text-white">
            <CardHeader className="p-0">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <CardTitle className="text-base font-bold leading-tight">{product.name}</CardTitle>
              <p className="text-lg font-semibold text-red-500">{product.price}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full bg-white text-black font-bold rounded-lg hover:bg-gray-200">
                Comprar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};

export default Store;