import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HealthData = () => {
  return (
    <PageLayout title="Dados de Saúde">
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="blood-type">Tipo Sanguíneo</Label>
          <Input id="blood-type" type="text" className="bg-gray-800 border-gray-700 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="allergies">Alergias</Label>
          <Input id="allergies" type="text" className="bg-gray-800 border-gray-700 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emergency-contact">Contato de Emergência</Label>
          <Input id="emergency-contact" type="text" className="bg-gray-800 border-gray-700 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emergency-phone">Telefone de Emergência</Label>
          <Input id="emergency-phone" type="tel" className="bg-gray-800 border-gray-700 text-white" />
        </div>
        <Button className="w-full bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-12 mt-4">
          Salvar
        </Button>
      </form>
    </PageLayout>
  );
};

export default HealthData;