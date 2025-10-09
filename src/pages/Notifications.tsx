import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { showError } from "@/utils/toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, Circle } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Notification = {
  id: string;
  title: string;
  message: string;
  link: string | null;
  is_read: boolean;
  created_at: string;
};

const NotificationItem = ({ notification, onClick }: { notification: Notification, onClick: (notification: Notification) => void }) => (
  <div
    className={`p-4 rounded-lg flex items-start space-x-4 cursor-pointer transition-colors ${
      notification.is_read ? 'bg-gray-900/30' : 'bg-gray-800/70 hover:bg-gray-700/70'
    }`}
    onClick={() => onClick(notification)}
  >
    {!notification.is_read && (
      <div className="pt-1">
        <Circle size={12} className="text-red-500" fill="currentColor" />
      </div>
    )}
    <div className={`flex-1 ${notification.is_read ? 'pl-7' : ''}`}>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-base">{notification.title}</h3>
        <p className="text-xs text-gray-400 whitespace-nowrap pl-4">
          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true, locale: ptBR })}
        </p>
      </div>
      <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
    </div>
  </div>
);

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        showError("Você precisa estar logado.");
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        showError("Erro ao carregar notificações.");
      } else {
        setNotifications(data);
      }
      setLoading(false);
    };

    fetchNotifications();
  }, [navigate]);

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.is_read) {
      const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", notification.id);

      if (error) {
        showError("Não foi possível marcar a notificação como lida.");
      } else {
        setNotifications((prev) =>
          prev.map((n) => (n.id === notification.id ? { ...n, is_read: true } : n))
        );
      }
    }

    if (notification.link) {
      navigate(notification.link);
    }
  };

  return (
    <PageLayout title="Notificações">
      <div className="space-y-4">
        {loading ? (
          [...Array(5)].map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-lg" />)
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} onClick={handleNotificationClick} />
          ))
        ) : (
          <div className="text-center py-16 text-gray-500 flex flex-col items-center">
            <Bell size={48} className="mb-4" />
            <h3 className="text-xl font-bold">Nenhuma notificação</h3>
            <p>Você está em dia!</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Notifications;