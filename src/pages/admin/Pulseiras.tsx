import { useEffect, useMemo, useState } from "react";
import { DashboardLayout } from "@/components/admin/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { showError, showSuccess } from "@/utils/toast";
import { Key, PlusCircle, UserPlus, XCircle, ShieldAlert } from "lucide-react";

type Pulseira = {
  id: string;
  codigo: string;
  status: string;
  assigned_profile_id: string | null;
  sub_sede: string | null;
  created_at: string;
  updated_at: string | null;
  assigned_at: string | null;
};

type ProfileLite = {
  id: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
};

const STATUSES = ["disponivel", "reservada", "atribuida", "desativada", "extraviada"] as const;

function generateCode() {
  const ts = Date.now();
  const rand = Math.random().toString(36).slice(2, 6);
  return `pulseira-${ts}-${rand}`;
}

const Pulseiras = () => {
  const [items, setItems] = useState<Pulseira[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<Pulseira | null>(null);

  // Create form
  const [codigo, setCodigo] = useState(generateCode());
  const [subSede, setSubSede] = useState<string>("");

  // Assign form
  const [usernameQuery, setUsernameQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProfileLite[]>([]);
  const [statusEdit, setStatusEdit] = useState<string>("disponivel");

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("pulseira")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) {
      showError("Erro ao carregar pulseiras: " + error.message);
    } else {
      setItems((data || []) as Pulseira[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreate = async () => {
    const code = codigo.trim();
    if (!code) {
      showError("Informe um código válido.");
      return;
    }
    const { error } = await supabase.from("pulseira").insert({
      codigo: code,
      sub_sede: subSede || null,
      status: "disponivel",
    } as any);
    if (error) {
      showError("Erro ao criar pulseira: " + error.message);
      return;
    }
    showSuccess("Pulseira criada!");
    setCreateOpen(false);
    setCodigo(generateCode());
    setSubSede("");
    fetchItems();
  };

  const searchUsernames = async () => {
    if (!usernameQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, first_name, last_name")
      .ilike("username", `%${usernameQuery.trim()}%`)
      .limit(20);
    if (error) {
      showError("Erro ao buscar usuários: " + error.message);
      return;
    }
    setSearchResults((data || []) as ProfileLite[]);
  };

  const handleAssign = async (profileId: string) => {
    if (!selected) return;
    if (selected.status === "atribuida" && selected.assigned_profile_id) {
      showError("Pulseira já atribuída; desatribua antes de reatribuir.");
      return;
    }
    const { error } = await supabase
      .from("pulseira")
      .update({ assigned_profile_id: profileId, status: "atribuida", assigned_at: new Date().toISOString() } as any)
      .eq("id", selected.id);
    if (error) {
      showError("Erro ao atribuir: " + error.message);
      return;
    }
    showSuccess("Pulseira atribuída!");
    setAssignOpen(false);
    setSelected(null);
    setUsernameQuery("");
    setSearchResults([]);
    fetchItems();
  };

  const handleUnassign = async (item: Pulseira) => {
    const { error } = await supabase
      .from("pulseira")
      .update({ assigned_profile_id: null, status: "disponivel", assigned_at: null } as any)
      .eq("id", item.id);
    if (error) {
      showError("Erro ao desatribuir: " + error.message);
      return;
    }
    showSuccess("Pulseira desatribuída!");
    fetchItems();
  };

  const openEdit = (item: Pulseira) => {
    setSelected(item);
    setStatusEdit(item.status);
    setEditOpen(true);
  };

  const handleEdit = async () => {
    if (!selected) return;
    const { error } = await supabase
      .from("pulseira")
      .update({ status: statusEdit } as any)
      .eq("id", selected.id);
    if (error) {
      showError("Erro ao atualizar status: " + error.message);
      return;
    }
    showSuccess("Status atualizado!");
    setEditOpen(false);
    setSelected(null);
    fetchItems();
  };

  const deleteIfAllowed = async (item: Pulseira) => {
    if (item.status === "atribuida") {
      showError("Não é possível excluir uma pulseira atribuída.");
      return;
    }
    const { error } = await supabase.from("pulseira").delete().eq("id", item.id);
    if (error) {
      showError("Erro ao excluir: " + error.message);
      return;
    }
    showSuccess("Pulseira excluída!");
    fetchItems();
  };

  return (
    <DashboardLayout pageTitle="Pulseiras">
      <main className="p-4 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Key className="h-6 w-6 text-red-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Pulseiras</h1>
              <p className="text-gray-500">Gerencie códigos, status e atribuições</p>
            </div>
          </div>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setCodigo(generateCode()); setSubSede(""); }}>
                <PlusCircle className="mr-2 h-4 w-4" /> Nova Pulseira
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Pulseira</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Código</label>
                  <Input value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Sub-Sede (opcional)</label>
                  <Input value={subSede} onChange={(e) => setSubSede(e.target.value)} />
                </div>
                <Button onClick={handleCreate}>Salvar</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-2xl p-4">
          {loading ? (
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sub-Sede</TableHead>
                    <TableHead>Atribuído</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((it) => (
                    <TableRow key={it.id}>
                      <TableCell className="font-mono">{it.codigo}</TableCell>
                      <TableCell>{it.status}</TableCell>
                      <TableCell>{it.sub_sede || "-"}</TableCell>
                      <TableCell>{it.assigned_profile_id ? "Sim" : "Não"}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => openEdit(it)}>Status</Button>
                        {!it.assigned_profile_id ? (
                          <Dialog open={assignOpen && selected?.id === it.id} onOpenChange={setAssignOpen}>
                            <DialogTrigger asChild>
                              <Button size="sm" onClick={() => { setSelected(it); setAssignOpen(true); }}>
                                <UserPlus className="mr-2 h-4 w-4" /> Atribuir
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Atribuir Pulseira</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-3">
                                <div>
                                  <label className="text-sm text-gray-600">Buscar por username</label>
                                  <div className="flex space-x-2">
                                    <Input value={usernameQuery} onChange={(e) => setUsernameQuery(e.target.value)} placeholder="ex.: user_1234" />
                                    <Button onClick={searchUsernames}>Buscar</Button>
                                  </div>
                                </div>
                                <div className="space-y-2 max-h-56 overflow-y-auto">
                                  {searchResults.map((u) => (
                                    <Button key={u.id} variant="ghost" className="w-full justify-start"
                                      onClick={() => handleAssign(u.id)}>
                                      {u.username} — {u.first_name || ""} {u.last_name || ""}
                                    </Button>
                                  ))}
                                  {searchResults.length === 0 && (
                                    <p className="text-sm text-gray-500">Nenhum resultado</p>
                                  )}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => handleUnassign(it)}>
                              <XCircle className="mr-2 h-4 w-4" /> Desatribuir
                            </Button>
                          </>
                        )}
                        {it.status !== "atribuida" && (
                          <Button variant="destructive" size="sm" onClick={() => deleteIfAllowed(it)}>
                            Excluir
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>

      {/* Edit status dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atualizar Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Status</label>
              <Select value={statusEdit} onValueChange={setStatusEdit}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleEdit}>Salvar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Pulseiras;