import { useState } from "react";
import { DashboardLayout } from "@/components/admin/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess, showError } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";

const SeedData = () => {
  const [loading, setLoading] = useState(false);

  const runSeed = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("seed-sample-data");
    if (error) {
      showError(`Falha ao criar dados: ${error.message}`);
    } else if (data?.ok) {
      showSuccess("Dados de exemplo criados com sucesso!");
    } else {
      showError("Falha ao criar dados de exemplo.");
    }
    setLoading(false);
  };

  return (
    <DashboardLayout pageTitle="Seed de Dados">
      <main className="p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Criar dados de exemplo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Este botão criará 3 usuários em auth (carlos, ana, roberto), completará seus perfis, inserirá 10 pulseiras (3 atribuídas e 7 disponíveis), criará configurações de privacidade e canais.</p>
            <Button onClick={runSeed} disabled={loading}>
              {loading ? "Criando..." : "Criar dados de exemplo"}
            </Button>
          </CardContent>
        </Card>
      </main>
    </DashboardLayout>
  );
};

export default SeedData;