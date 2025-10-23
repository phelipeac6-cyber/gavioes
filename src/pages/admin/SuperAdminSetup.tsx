import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showError, showSuccess } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";

const DEFAULT_EMAIL = "phelipeac3@gmail.com";
const DEFAULT_PASSWORD = "15183020";
const DEFAULT_PULSE = "SUPER-ADMIN-001";

const SuperAdminSetup = () => {
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [pulse, setPulse] = useState(DEFAULT_PULSE);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-super-admin", {
        body: { email, password, pulseira_id: pulse },
      });

      if (error) {
        let detailed = error.message;
        const resp = (error as any)?.context?.response;
        if (resp) {
          try {
            const text = await resp.text();
            try {
              const parsed = JSON.parse(text);
              if (parsed?.error) {
                detailed = parsed.error;
              } else if (parsed?.message) {
                detailed = parsed.message;
              } else if (text) {
                detailed = text;
              }
            } catch {
              if (text) detailed = text;
            }
          } catch {
            // ignore
          }
        }
        showError(`Erro: ${detailed}`);
        return;
      }

      if (data?.ok) {
        showSuccess("Super Admin criado com sucesso!");
      } else {
        const msg = data?.error || "Falha ao criar Super Admin.";
        showError(`Erro: ${msg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Setup do Super Admin</CardTitle>
          <CardDescription>Crie o usuário com acesso total ao sistema.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label>Senha</Label>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
          </div>
          <div>
            <Label>Pulseira ID</Label>
            <Input value={pulse} onChange={(e) => setPulse(e.target.value)} />
          </div>
          <Button className="w-full" onClick={handleCreate} disabled={loading}>
            {loading ? "Criando..." : "Criar Super Admin"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminSetup;