import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/admin/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  sub_sede: string;
};

const Torcedores = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // In a real app, you might redirect to login
        setError("Você precisa estar logado para ver os torcedores.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, avatar_url, sub_sede");

      if (error) {
        setError(error.message);
      } else {
        // The auth object doesn't expose email, so we can't easily get it here
        // without more complex queries or functions.
        setProfiles(data as Profile[]);
      }
      setLoading(false);
    };

    fetchProfiles();
  }, []);

  return (
    <DashboardLayout>
      <main className="p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Torcedores</h1>
          <p className="text-gray-500">Lista de todos os usuários cadastrados</p>
        </header>
        <div className="bg-white p-6 rounded-2xl">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Sub-Sede</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={profile.avatar_url} />
                          <AvatarFallback>
                            <User />
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-800">
                          {profile.first_name} {profile.last_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{profile.sub_sede || "Não informado"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Torcedores;