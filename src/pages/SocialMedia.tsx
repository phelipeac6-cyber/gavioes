import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SocialMedia = () => {
  return (
    <PageLayout title="Redes Sociais">
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="instagram">Instagram</Label>
          <Input id="instagram" type="text" placeholder="@usuario" className="bg-gray-800 border-gray-700 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="facebook">Facebook</Label>
          <Input id="facebook" type="text" placeholder="/usuario" className="bg-gray-800 border-gray-700 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="twitter">X (Twitter)</Label>
          <Input id="twitter" type="text" placeholder="@usuario" className="bg-gray-800 border-gray-700 text-white" />
        </div>
        <Button className="w-full bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-12 mt-4">
          Salvar
        </Button>
      </form>
    </PageLayout>
  );
};

export default SocialMedia;