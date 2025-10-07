import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Address = () => {
  return (
    <PageLayout title="Endereço">
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cep">CEP</Label>
          <Input id="cep" type="text" className="bg-gray-800 border-gray-700 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="street">Rua</Label>
          <Input id="street" type="text" className="bg-gray-800 border-gray-700 text-white" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="number">Número</Label>
            <Input id="number" type="text" className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="complement">Complemento</Label>
            <Input id="complement" type="text" className="bg-gray-800 border-gray-700 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input id="neighborhood" type="text" className="bg-gray-800 border-gray-700 text-white" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">Cidade</Label>
            <Input id="city" type="text" className="bg-gray-800 border-gray-700 text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">Estado</Label>
            <Input id="state" type="text" className="bg-gray-800 border-gray-700 text-white" />
          </div>
        </div>
        <Button className="w-full bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-12 mt-6">
          Salvar
        </Button>
      </form>
    </PageLayout>
  );
};

export default Address;