import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MoreVertical, Smile, Paperclip, Camera, Mic, Info } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Message = {
  id: number;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    first_name: string | null;
    avatar_url: string | null;
  } | null;
};

type Channel = {
  id: string;
  name: string;
  is_admin_channel: boolean;
};

const Chat = () => {
  const { id: channelId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [channel, setChannel] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChannelAndMessages = async () => {
      if (!channelId) return;
      setLoading(true);

      // Fetch channel details
      const { data: channelData, error: channelError } = await supabase
        .from("channels")
        .select("*")
        .eq("id", channelId)
        .single();

      if (channelError || !channelData) {
        navigate("/channels");
        return;
      }
      setChannel(channelData);

      // Fetch messages
      const { data: messagesData, error: messagesError } = await supabase
        .from("messages")
        .select("*, profiles(first_name, avatar_url)")
        .eq("channel_id", channelId)
        .order("created_at", { ascending: true });

      if (messagesError) {
        console.error("Error fetching messages:", messagesError);
      } else {
        setMessages(messagesData as Message[]);
      }
      setLoading(false);
    };

    fetchChannelAndMessages();

    const subscription = supabase
      .channel(`chat:${channelId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `channel_id=eq.${channelId}` },
        async (payload) => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('first_name, avatar_url')
            .eq('id', payload.new.user_id)
            .single();
          
          const newMessageWithProfile = { ...payload.new, profiles: profileData } as Message;
          setMessages((prevMessages) => [...prevMessages, newMessageWithProfile]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [channelId, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !channelId) return;

    const { error } = await supabase
      .from("messages")
      .insert([{ content: newMessage, user_id: user.id, channel_id: channelId }]);

    if (error) {
      console.error("Error sending message:", error);
    } else {
      setNewMessage("");
    }
  };

  const isAdmin = profile?.role === 'admin';
  const canPost = !channel?.is_admin_channel || isAdmin;

  if (loading) {
    return <ChatSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white text-[#1800AD] flex flex-col font-sans">
      <header className="p-3 flex items-center justify-between sticky top-0 bg-white z-10 border-b border-[#1800AD]/20">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate(-1)} className="p-2 text-[#1800AD]"><ArrowLeft size={24} /></button>
          <Avatar className="w-10 h-10"><AvatarFallback>{channel?.name.charAt(0)}</AvatarFallback></Avatar>
          <div><h1 className="text-lg font-bold">{channel?.name}</h1></div>
        </div>
        <button className="p-2 text-[#1800AD]"><MoreVertical size={24} /></button>
      </header>

      <main className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex", msg.user_id === user?.id ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-xs md:max-w-md p-3 rounded-xl", {
              "bg-[#1800AD] text-white": msg.user_id === user?.id,
              "bg-[#1800AD]/10 text-[#1800AD]": msg.user_id !== user?.id,
            })}>
              {msg.user_id !== user?.id && <p className="font-bold text-red-500 text-sm mb-1">{msg.profiles?.first_name || "Usuário"}</p>}
              <p>{msg.content}</p>
              <p className={cn("text-xs mt-1 text-right", msg.user_id === user?.id ? "text-gray-500" : "text-gray-400")}>
                {format(new Date(msg.created_at), 'p', { locale: ptBR })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-2 sticky bottom-0 bg-white">
        {!canPost ? (
          <div className="flex items-center justify-center bg-[#1800AD]/10 rounded-full p-3 text-[#1800AD] text-sm">
            <Info size={16} className="mr-2" />
            Apenas administradores podem enviar mensagens neste canal.
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="flex items-center bg-[#1800AD]/10 rounded-full p-2">
            <button type="button" className="p-2 text-[#1800AD]"><Smile size={24} /></button>
            <Input
              placeholder="Mensagem"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-transparent border-none focus-visible:ring-0 text-[#1800AD] placeholder:text-[#1800AD]/60 flex-grow"
            />
            <button type="button" className="p-2 text-[#1800AD]"><Paperclip size={24} /></button>
            <button type="button" className="p-2 text-[#1800AD]"><Camera size={24} /></button>
            <Button type="submit" size="icon" className="p-2 bg-[#1800AD] rounded-full text-white ml-2 h-10 w-10">
              <Mic size={24} />
            </Button>
          </form>
        )}
      </footer>
    </div>
  );
};

const ChatSkeleton = () => (
  <div className="min-h-screen bg-white text-[#1800AD] flex flex-col font-sans">
    <header className="p-3 flex items-center space-x-3 sticky top-0 bg-white z-10 border-b border-[#1800AD]/20">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </header>
    <main className="flex-grow p-4 space-y-4">
      <Skeleton className="h-16 w-3/4 rounded-xl" />
      <Skeleton className="h-12 w-1/2 rounded-xl self-end ml-auto" />
      <Skeleton className="h-20 w-2/3 rounded-xl" />
    </main>
    <footer className="p-2 sticky bottom-0 bg-white">
      <Skeleton className="h-14 w-full rounded-full" />
    </footer>
  </div>
);

export default Chat;