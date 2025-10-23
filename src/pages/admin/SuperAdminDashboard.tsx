import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, Users, Key, Database, Activity, AlertTriangle, CheckCircle, Menu, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSuperAdmin } from '@/hooks/useSuperAdmin';
import { showSuccess, showError } from '@/utils/toast';
import { DashboardLayout } from '@/components/admin/DashboardLayout';

type UserProfile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  role: string | null;
  pulseira_id: string | null;
  sub_sede: string | null;
  associated_at: string | null;
  updated_at: string | null;
};

type SystemStats = {
  totalUsers: number;
  totalAdmins: number;
  totalPulses: number;
  recentActivity: number;
};

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const { isSuperAdmin } = useSuperAdmin();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 0,
    totalAdmins: 0,
    totalPulses: 0,
    recentActivity: 0
  });
  const [loading, setLoading] = useState(false);
  const [newPulsePrefix, setNewPulsePrefix] = useState('pulseira');

  useEffect(() => {
    if (!isSuperAdmin) {
      navigate('/dashboard/login');
      return;
    }
    fetchSystemData();
  }, [isSuperAdmin, navigate]);

  const fetchSystemData = async () => {
    setLoading(true);
    try {
      // Buscar usuários
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select(`
          id,
          first_name,
          last_name,
          email,
          role,
          pulseira_id,
          sub_sede,
          associated_at,
          updated_at
        `)
        .order('created_at', { ascending: false })
        .limit(100);

      if (usersError) throw usersError;
      setUsers(usersData || []);

      // Buscar estatísticas
      const totalUsers = (usersData || []).length;
      const totalAdmins = (usersData || []).filter(u => u.role === 'admin' || u.role === 'super_admin').length;
      const totalPulses = (usersData || []).filter(u => u.pulseira_id).length;

      setStats({
        totalUsers,
        totalAdmins,
        totalPulses,
        recentActivity: 0
      });
    } catch (error) {
      showError('Erro ao carregar dados do sistema');
    }
    setLoading(false);
  };

  const generateNewPulse = async () => {
    setLoading(true);
    try {
      // Gerar novo pulseira_id único
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 6);
      const newPulseId = `${newPulsePrefix}-${timestamp}-${random}`;

      // Simular criação de pulseira (em um sistema real, isso seria mais complexo)
      showSuccess(`Novo pulseira gerado: ${newPulseId}`);
      
      // Recarregar dados
      fetchSystemData();
    } catch (error) {
      showError('Erro ao gerar novo pulseira');
    }
    setLoading(false);
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      showSuccess('Função atualizada com sucesso');
      fetchSystemData();
    } catch (error) {
      showError('Erro ao atualizar função do usuário');
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Tem certeza que deseja excluir este usuário? Esta ação é irreversível.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      showSuccess('Usuário excluído com sucesso');
      fetchSystemData();
    } catch (error) {
      showError('Erro ao excluir usuário');
    }
  };

  if (!isSuperAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Acesso Negado</h1>
          <p className="text-gray-600">Você não tem permissão para acessar esta área.</p>
          <Button onClick={() => navigate('/dashboard/login')} className="mt-4">
            Voltar para Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout pageTitle="Super Admin Dashboard">
      <main className="p-4 md:p-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-red-600" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Super Admin</h1>
              <p className="text-gray-500">Painel de controle total do sistema</p>
            </div>
          </div>
          <Badge variant="destructive" className="ml-auto">
            phelipeac3@gmail.com
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="pulses">Pulseiras</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Administradores</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalAdmins}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pulseiras Ativas</CardTitle>
                  <Key className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalPulses}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Atividade Recente</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.recentActivity}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Nova Pulseira</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Prefixo"
                    value={newPulsePrefix}
                    onChange={(e) => setNewPulsePrefix(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={generateNewPulse} disabled={loading}>
                    Gerar
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  IDs gerados: pulseira-timestamp-random
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Função</TableHead>
                        <TableHead>Pulseira ID</TableHead>
                        <TableHead>Sub-Sede</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.first_name} {user.last_name}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'super_admin' ? 'destructive' : 'secondary'}>
                              {user.role || 'user'}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {user.pulseira_id || '-'}
                          </TableCell>
                          <TableCell>{user.sub_sede || '-'}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateUserRole(user.id, user.role === 'admin' ? 'user' : 'admin')}
                              >
                                {user.role === 'admin' ? 'Rebaixar' : 'Promover'}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => deleteUser(user.id)}
                                disabled={user.role === 'super_admin'}
                              >
                                Excluir
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pulses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Pulseiras</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <p>Total de pulseiras geradas: {stats.totalPulses}</p>
                    <p>Formato: pulseira-timestamp-random</p>
                  </div>
                  <Button onClick={generateNewPulse} disabled={loading}>
                    Gerar Nova Pulseira
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Log de Auditoria</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  <p>Todas as ações dos administradores são registradas no log de auditoria.</p>
                  <p>IP e User Agent são capturados para rastreabilidade.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurações de Segurança</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Autenticação de Dois Fatores</Label>
                    <Badge variant="secondary">Desabilitado</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Login por SSO</Label>
                    <Badge variant="secondary">Desabilitado</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Session Timeout</Label>
                    <Badge variant="secondary">24 horas</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;