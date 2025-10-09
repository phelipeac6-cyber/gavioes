import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/admin/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { showError, showSuccess } from "@/utils/toast";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { SubSedeForm } from "@/components/admin/SubSedeForm";

export type SubSede = {
  id: string;
  name: string;
  estado: string | null;
  cidade: string | null;
  created_at: string;
};

const SubSedes = () => {
  const [subSedes, setSubSedes] = useState<SubSede[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [selectedSede, setSelectedSede] = useState<SubSede | null>(null);

  const fetchSubSedes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("sub_sedes")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      showError("Erro ao carregar sub-sedes: " + error.message);
    } else {
      setSubSedes(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubSedes();
  }, []);

  const handleSave = () => {
    setDialogOpen(false);
    setSelectedSede(null);
    fetchSubSedes();
  };

  const handleDelete = async () => {
    if (!selectedSede) return;

    const { error } = await supabase
      .from("sub_sedes")
      .delete()
      .eq("id", selectedSede.id);

    if (error) {
      showError("Erro ao excluir sub-sede: " + error.message);
    } else {
      showSuccess("Sub-sede excluída com sucesso!");
      fetchSubSedes();
    }
    setDeleteAlertOpen(false);
    setSelectedSede(null);
  };

  return (
    <DashboardLayout pageTitle="Sub-Sedes">
      <main className="p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Sub-Sedes</h1>
            <p className="text-gray-500">Gerencie as sub-sedes cadastradas</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setSelectedSede(null)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Nova Sub-Sede
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedSede ? "Editar" : "Nova"} Sub-Sede</DialogTitle>
              </DialogHeader>
              <SubSedeForm initialData={selectedSede} onSave={handleSave} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="bg-white p-6 rounded-2xl">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Cidade</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subSedes.map((sede) => (
                    <TableRow key={sede.id}>
                      <TableCell className="font-medium">{sede.name}</TableCell>
                      <TableCell>{sede.cidade}</TableCell>
                      <TableCell>{sede.estado}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => { setSelectedSede(sede); setDialogOpen(true); }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => { setSelectedSede(sede); setDeleteAlertOpen(true); }}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
      <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente a sub-sede "{selectedSede?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default SubSedes;