import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";
import { useAuth } from "@/context/AuthContext";

interface CreateChannelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChannelCreated: () => void;
}

export const CreateChannelDialog = ({ open, onOpenChange, onChannelCreated }: CreateChannelDialogProps) => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) {
      showError("O nome do canal não pode ser vazio.");
      return;
    }
    if (!user) {
      showError("Você precisa estar logado para criar um canal.");
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from("channels")
      .insert([{ name, created_by: user.id }]);

    if (error) {
      showError(error.message);
    } else {
      showSuccess("Canal criado com sucesso!");
      setName("");
      onChannelCreated();
      onOpenChange(false);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle>Criar Novo Canal</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor="channel-name">Nome do Canal</Label>
          <Input
            id="channel-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border-white mt-2"
            placeholder="Ex: Jogos de Quinta"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="bg-transparent border-white">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleCreate} disabled={loading} className="bg-white text-black hover:bg-gray-200">
            {loading ? "Criando..." : "Criar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};