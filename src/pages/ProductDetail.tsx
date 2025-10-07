import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { showSuccess } from "@/utils/toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <PageLayout title="Produto não encontrado"><div>Produto não encontrado.</div></PageLayout>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showSuccess(`${quantity}x ${product.name} adicionado ao carrinho!`);
  };

  return (
    <PageLayout title={product.name}>
      <div className="flex flex-col md:flex-row gap-8">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 rounded-lg object-cover" />
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold text-red-500">R$ {product.price.toFixed(2)}</p>
          <p className="text-gray-300">{product.description}</p>
          <div className="flex items-center space-x-4">
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 bg-transparent border-white rounded-lg h-12 text-center"
              min="1"
            />
            <Button onClick={handleAddToCart} className="bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-12 flex-grow">
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetail;