import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { SubSede } from "@/pages/admin/SubSedes";

interface SubSedeFormProps {
  initialData: SubSede | null;
  onSave: () => void;
}

export const SubSedeForm = ({ initialData, onSave }: SubSedeFormProps) => {
  const [name, setName] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCidade(initialData.cidade || "");
      setEstado(initialData.estado || "");
    } else {
      setName("");
      setCidade("");
      setEstado("");
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const sedeData = { name, cidade, estado };

    let error;
    if (initialData) {
      // Update
      const { error: updateError } = await supabase
        .from("sub_sedes")
        .update(sedeData)
        .eq("id", initialData.id);
      error = updateError;
    } else {
      // Insert
      const { error: insertError } = await supabase
        .from("sub_sedes")
        .insert([sedeData]);
      error = insertError;
    }

    if (error) {
      showError(error.message);
    } else {
      showSuccess(`Sub-sede ${initialData ? "atualizada" : "criada"} com sucesso!`);
      onSave();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cidade">Cidade</Label>
        <Input id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="estado">Estado</Label>
        <Input id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
};