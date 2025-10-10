import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { showError } from "@/utils/toast";
import { CreateChannelDialog } from "@/components/CreateChannelDialog";
import gavioesLogo from "@/assets/gavioes-logo.png";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";

type Channel = {
  id: string;
  name: string;
  is_admin_channel: boolean;
};

const getAvatarForChannel = (name: string) => {
  if (name.toLowerCase().includes('esporte da sorte')) {
    return esportesDaSorteLogo;
  }
  return gavioesLogo;
};

const Channels = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchChannels = async () => {
    const { data, error } = await supabase
      .from("channels")
      .select("id, name, is_admin_channel")
      .order("created_at", { ascending: true });

    if (error) {
      showError("Erro ao carregar canais.");
    } else {
      setChannels(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <header className="p-4 flex items-center justify-between sticky top-0 bg-black z-10 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Canais</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setDialogOpen(true)}>
          <PlusCircle size={24} />
        </Button>
      </header>
      <main className="flex-grow">
        {loading ? (
          <div className="p-4 space-y-4">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {channels.map((channel) => (
              <Link to={`/chat/${channel.id}`} key={channel.id} className="flex items-center p-4 space-x-4 hover:bg-gray-900/50 transition-colors">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={getAvatarForChannel(channel.name)} />
                  <AvatarFallback>{channel.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <h2 className="font-bold">{channel.name}</h2>
                </div>
                <ChevronRight size={20} className="text-gray-500" />
              </Link>
            ))}
          </div>
        )}
      </main>
      <CreateChannelDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onChannelCreated={fetchChannels}
      />
    </div>
  );
};

export default Channels;