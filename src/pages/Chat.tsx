import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MoreVertical, Smile, Paperclip, Camera, Mic } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { channels, messages } from "@/data/chat";
import { cn } from "@/lib/utils";

const Chat = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const channel = channels.find(c => c.id === Number(id));

  if (!channel) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Canal não encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <header className="p-3 flex items-center justify-between sticky top-0 bg-black z-10 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={24} />
          </button>
          <Avatar className="w-10 h-10">
            <AvatarImage src={channel.avatar} />
            <AvatarFallback>{channel.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-bold">{channel.name}</h1>
            <p className="text-sm text-gray-400">Online</p>
          </div>
        </div>
        <button className="p-2">
          <MoreVertical size={24} />
        </button>
      </header>

      <main className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => {
          if (msg.type === 'date') {
            return (
              <div key={index} className="text-center my-4">
                <span className="bg-gray-800 text-xs font-semibold px-3 py-1 rounded-full">{msg.content}</span>
              </div>
            );
          }
          return (
            <div key={msg.id} className={cn("flex", msg.sentByMe ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-xs md:max-w-md p-3 rounded-xl", {
                "bg-white text-black": msg.sentByMe,
                "bg-gray-800 text-white": !msg.sentByMe,
              })}>
                {!msg.sentByMe && <p className="font-bold text-red-500 text-sm mb-1">{msg.sender}</p>}
                <p>{msg.content}</p>
                <p className={cn("text-xs mt-1 text-right", msg.sentByMe ? "text-gray-500" : "text-gray-400")}>{msg.time}</p>
              </div>
            </div>
          );
        })}
      </main>

      <footer className="p-2 sticky bottom-0 bg-black">
        <div className="flex items-center bg-gray-800 rounded-full p-2">
          <button className="p-2 text-gray-400"><Smile size={24} /></button>
          <Input
            placeholder="Message"
            className="bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-gray-400 flex-grow"
          />
          <button className="p-2 text-gray-400"><Paperclip size={24} /></button>
          <button className="p-2 text-gray-400"><Camera size={24} /></button>
          <button className="p-2 bg-red-600 rounded-full text-white ml-2">
            <Mic size={24} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Chat;