import { Link } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const OrderConfirmation = () => {
  return (
    <PageLayout title="Pedido Confirmado">
      <div className="text-center flex flex-col items-center space-y-6">
        <CheckCircle2 size={80} className="text-green-500" />
        <h1 className="text-3xl font-bold">Obrigado pelo seu pedido!</h1>
        <p className="text-gray-300">
          Seu pedido foi recebido e está sendo processado. Você receberá uma confirmação por e-mail em breve.
        </p>
        <Button asChild className="bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-12">
          <Link to="/store">Continuar Comprando</Link>
        </Button>
      </div>
    </PageLayout>
  );
};

export default OrderConfirmation;