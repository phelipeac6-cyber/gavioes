import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Mic, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { channels } from "@/data/chat";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";

const Channels = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <header className="p-4 flex items-center space-x-4 sticky top-0 bg-black z-10 border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Canais</h1>
      </header>
      <main className="flex-grow">
        <div className="divide-y divide-gray-800">
          {channels.map((channel) => (
            <Link to={`/chat/${channel.id}`} key={channel.id} className="flex items-center p-4 space-x-4 hover:bg-gray-900/50 transition-colors">
              <Avatar className="w-12 h-12">
                <AvatarImage src={channel.avatar} />
                <AvatarFallback>{channel.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <h2 className="font-bold">{channel.name}</h2>
                <div className="flex items-center space-x-1 text-gray-400 text-sm">
                  {channel.type === 'audio' ? (
                    <Mic size={16} />
                  ) : (
                    channel.read && <CheckCircle2 size={16} className="text-blue-500" />
                  )}
                  <span>{channel.lastMessage}</span>
                </div>
              </div>
              <div className="flex flex-col items-end text-sm text-gray-400">
                <span>{channel.timestamp}</span>
                <ChevronRight size={20} className="text-gray-500 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </main>
      <footer className="p-6 flex justify-center">
        <img
          src={esportesDaSorteLogo}
          alt="Esportes da Sorte Logo"
          className="w-40 h-auto"
        />
      </footer>
    </div>
  );
};

export default Channels;