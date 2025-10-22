import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Bell, Eye, EyeOff, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';

type PrivacySettings = {
  profile_visibility: 'public' | 'private';
  show_phone: boolean;
  show_email: boolean;
  show_social_media: boolean;
  allow_location: boolean;
  allow_push_notifications: boolean;
  allow_email_notifications: boolean;
  allow_marketing: boolean;
  data_sharing: boolean;
};

const PrivacySettings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<PrivacySettings>({
    profile_visibility: 'private',
    show_phone: false,
    show_email: false,
    show_social_media: false,
    allow_location: false,
    allow_push_notifications: true,
    allow_email_notifications: true,
    allow_marketing: false,
    data_sharing: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Simular carregamento de configurações (em um app real, viria do banco)
      const { data } = await supabase
        .from('privacy_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('privacy_settings')
        .upsert({
          user_id: user.id,
          ...settings
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        showError('Erro ao salvar configurações');
        return;
      }

      showSuccess('Configurações salvas com sucesso!');
    } catch (error) {
      showError('Erro ao salvar configurações');
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (key: keyof PrivacySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-4 flex items-center space-x-4 sticky top-0 bg-black z-10 border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Privacidade</h1>
      </header>

      <main className="p-4 space-y-6">
        {/* Visibilidade do Perfil */}
        <div className="bg-gray-900/50 rounded-lg p-4 space-y-4">
          <div className="flex items-center space-x-3">
            <Eye className="text-red-500" size={20} />
            <h2 className="text-lg font-semibold">Visibilidade do Perfil</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="profile-visibility" className="text-sm font-medium">
                  Quem pode ver seu perfil?
                </Label>
                <p className="text-xs text-gray-400">
                  {settings.profile_visibility === 'public' 
                    ? 'Qualquer membro da torcida pode ver' 
                    : 'Apenas administradores podem ver'}
                </p>
              </div>
              <select
                id="profile-visibility"
                value={settings.profile_visibility}
                onChange={(e) => updateSetting('profile_visibility', e.target.value)}
                className="bg-gray-800 border-gray-700 rounded px-3 py-1 text-sm"
              >
                <option value="private">Privado</option>
                <option value="public">Público</option>
              </select>
            </div>
          </div>
        </div>

        {/* Informações de Contato */}
        <div className="bg-gray-900/50 rounded-lg p-4 space-y-4">
          <div className="flex items-center space-x-3">
            <Lock className="text-red-500" size={20} />
            <h2 className="text-lg font-semibold">Informações de Contato</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-phone" className="text-sm font-medium">
                  Mostrar telefone
                </Label>
                <p className="text-xs text-gray-400">
                  Permitir que outros membros vejam seu telefone
                </p>
              </div>
              <Switch
                id="show-phone"
                checked={settings.show_phone}
                onCheckedChange={(checked) => updateSetting('show_phone', checked)}
              />
            </div>

            <Separator className="bg-gray-700" />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-email" className="text-sm font-medium">
                  Mostrar e-mail
                </Label>
                <p className="text-xs text-gray-400">
                  Permitir que outros membros vejam seu e-mail
                </p>
              </div>
              <Switch
                id="show-email"
                checked={settings.show_email}
                onCheckedChange={(checked) => updateSetting('show_email', checked)}
              />
            </div>

            <Separator className="bg-gray-700" />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-social" className="text-sm font-medium">
                  Mostrar redes sociais
                </Label>
                <p className="text-xs text-gray-400">
                  Exibir links das suas redes sociais
                </p>
              </div>
              <Switch
                id="show-social"
                checked={settings.show_social_media}
                onCheckedChange={(checked) => updateSetting('show_social_media', checked)}
              />
            </div>
          </div>
        </div>

        {/* Notificações */}
        <div className="bg-gray-900/50 rounded-lg p-4 space-y-4">
          <div className="flex items-center space-x-3">
            <Bell className="text-red-500" size={20} />
            <h2 className="text-lg font-semibold">Notificações</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications" className="text-sm font-medium">
                  Notificações push
                </Label>
                <p className="text-xs text-gray-400">
                  Receber notificações no aplicativo
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={settings.allow_push_notifications}
                onCheckedChange={(checked) => updateSetting('allow_push_notifications', checked)}
              />
            </div>

            <Separator className="bg-gray-700" />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="text-sm font-medium">
                  Notificações por e-mail
                </Label>
                <p className="text-xs text-gray-400">
                  Receber atualizações importantes por e-mail
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.allow_email_notifications}
                onCheckedChange={(checked) => updateSetting('allow_email_notifications', checked)}
              />
            </div>

            <Separator className="bg-gray-700" />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing" className="text-sm font-medium">
                  Marketing e promoções
                </Label>
                <p className="text-xs text-gray-400">
                  Receber ofertas e novidades
                </p>
              </div>
              <Switch
                id="marketing"
                checked={settings.allow_marketing}
                onCheckedChange={(checked) => updateSetting('allow_marketing', checked)}
              />
            </div>
          </div>
        </div>

        {/* Dados e Localização */}
        <div className="bg-gray-900/50 rounded-lg p-4 space-y-4">
          <div className="flex items-center space-x-3">
            <Shield className="text-red-500" size={20} />
            <h2 className="text-lg font-semibold">Dados e Localização</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="location" className="text-sm font-medium">
                  Compartilhar localização
                </Label>
                <p className="text-xs text-gray-400">
                  Permitir uso de localização para eventos próximos
                </p>
              </div>
              <Switch
                id="location"
                checked={settings.allow_location}
                onCheckedChange={(checked) => updateSetting('allow_location', checked)}
              />
            </div>

            <Separator className="bg-gray-700" />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="data-sharing" className="text-sm font-medium">
                  Compartilhamento de dados
                </Label>
                <p className="text-xs text-gray-400">
                  Compartilhar dados anonimizados para melhorias
                </p>
              </div>
              <Switch
                id="data-sharing"
                checked={settings.data_sharing}
                onCheckedChange={(checked) => updateSetting('data_sharing', checked)}
              />
            </div>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="bg-gray-900/50 rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-3">Sobre suas configurações</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Suas configurações de privacidade são salvas de forma segura e podem ser alteradas a qualquer momento. 
            Para exercer seus direitos de proteção de dados, entre em contato pelo suporte.
          </p>
        </div>

        {/* Botão Salvar */}
        <Button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white h-12"
        >
          {loading ? 'Salvando...' : 'Salvar Configurações'}
        </Button>
      </main>
    </div>
  );
};

export default PrivacySettings;