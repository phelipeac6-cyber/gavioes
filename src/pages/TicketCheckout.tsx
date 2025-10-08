import { useLocation, useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Ticket } from "@/types";

const TicketCheckout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ticket, quantity } = location.state as { ticket: Ticket, quantity: number };

  if (!ticket || !quantity) {
    navigate('/tickets');
    return null;
  }

  const total = ticket.price * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/ticket-confirmation", { state: { ticket, quantity } });
  };

  return (
    <PageLayout title="Finalizar Compra">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3 space-y-6">
          <h2 className="text-2xl font-bold">Dados do Comprador</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label htmlFor="name">Nome Completo</Label><Input id="name" className="bg-transparent" /></div>
            <div><Label htmlFor="cpf">CPF</Label><Input id="cpf" className="bg-transparent" /></div>
          </div>
          <h2 className="text-2xl font-bold pt-4">Pagamento</h2>
          <div>
            <Label htmlFor="card-number">Número do Cartão</Label>
            <Input id="card-number" placeholder="0000 0000 0000 0000" className="bg-transparent" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label htmlFor="expiry">Validade</Label><Input id="expiry" placeholder="MM/AA" className="bg-transparent" /></div>
            <div><Label htmlFor="cvc">CVC</Label><Input id="cvc" placeholder="123" className="bg-transparent" /></div>
          </div>
        </div>
        <div className="w-full md:w-1/3 space-y-4 bg-gray-900/50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold">Resumo do Pedido</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{quantity}x {ticket.eventName}</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>
          <Separator className="bg-gray-700" />
          <div className="flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <Button type="submit" className="w-full bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-12 !mt-6">
            Finalizar Compra
          </Button>
        </div>
      </form>
    </PageLayout>
  );
};

export default TicketCheckout;