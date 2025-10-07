import { Link } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/data/products";

const Store = () => {
  return (
    <PageLayout title="Loja">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="bg-gray-900/50 border-gray-700 overflow-hidden text-white flex flex-col">
            <Link to={`/product/${product.id}`} className="flex flex-col h-full">
              <CardHeader className="p-0">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
              </CardHeader>
              <CardContent className="p-4 space-y-2 flex-grow">
                <CardTitle className="text-base font-bold leading-tight">{product.name}</CardTitle>
                <p className="text-lg font-semibold text-red-500">R$ {product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-white text-black font-bold rounded-lg hover:bg-gray-200">
                  Ver Detalhes
                </Button>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};

export default Store;