import { Link } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <PageLayout title="Carrinho">
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-4">Seu carrinho está vazio.</p>
          <Button asChild>
            <Link to="/store">Voltar para a Loja</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-lg">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
              <div className="flex-grow">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-red-500">R$ {item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 bg-transparent border-white rounded-lg h-10 text-center"
                  min="1"
                />
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
          <div className="mt-6 pt-6 border-t border-gray-700 text-right">
            <h2 className="text-2xl font-bold">Total: R$ {cartTotal.toFixed(2)}</h2>
            <Button asChild className="mt-4 bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-12">
              <Link to="/checkout">Finalizar Compra</Link>
            </Button>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Cart;