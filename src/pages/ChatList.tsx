import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';
import { Skeleton } from '@/components/ui/skeleton';
import gavioesLogo from '@/assets/gavioes-logo.png';
import esportesDaSorteLogo from '@/assets/esportes-da-sorte-logo.png';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Channel = {
  id: string;
  name: string;
  is_admin_channel: boolean;
  created_at: string;
  last_message?: {
    content: string;
    created_at: string;
    profiles: {
      first_name: string | null;
    } | null;
  }
};

const ChatList = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    try {
      const { data, error } = await supabase
        .from('channels')
        .select(`
          *,
          messages(
            content,
            created_at,
            profiles(first_name)
          )
        `)
        .order('created_at', { ascending: true });

      if (error) {
        showError('Erro ao carregar canais');
        return;
      }

      // Processar para obter última mensagem de cada canal
      const channelsWithLastMessage = data?.map(channel => ({
        ...channel,
        last_message: channel.messages?.[0] || null
      })) || [];

      setChannels(channelsWithLastMessage);
    } catch (error) {
      showError('Erro ao carregar canais');
    } finally {
      setLoading(false);
    }
  };

  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAvatarForChannel = (name: string) => {
    if (name.toLowerCase().includes('esporte da sorte')) {
      return esportesDaSorteLogo;
    }
    return gavioesLogo;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-[#1800AD]">
        <header className="p-4 flex items-center space-x-4 sticky top-0 bg-white z-10 border-b border-[#1800AD]/20">
          <button onClick={() => navigate(-1)} className="p-2 text-[#1800AD]">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Conversas</h1>
        </header>
        <div className="p-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-lg">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex-grow space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1800AD]">
      <header className="p-4 flex items-center space-x-4 sticky top-0 bg-white z-10 border-b border-[#1800AD]/20">
        <button onClick={() => navigate(-1)} className="p-2 text-[#1800AD]">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Conversas</h1>
      </header>

      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#1800AD]/60" />
          <Input
            placeholder="Buscar conversas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-transparent border-2 border-[#1800AD] text-[#1800AD] placeholder:text-[#1800AD]/60"
          />
        </div>

        <div className="space-y-2">
          {filteredChannels.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma conversa encontrada</p>
            </div>
          ) : (
            filteredChannels.map((channel) => (
              <Link
                key={channel.id}
                to={`/chat/${channel.id}`}
                className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage src={getAvatarForChannel(channel.name)} />
                  <AvatarFallback>{channel.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold truncate">{channel.name}</h3>
                    {channel.last_message && (
                      <span className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(channel.last_message.created_at), { 
                          addSuffix: true, 
                          locale: ptBR 
                        })}
                      </span>
                    )}
                  </div>
                  
                  {channel.last_message ? (
                    <p className="text-sm text-gray-400 truncate">
                      <span className="font-medium">
                        {channel.last_message.profiles?.first_name || 'Anônimo'}:
                      </span>{' '}
                      {channel.last_message.content}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">Nenhuma mensagem ainda</p>
                  )}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;