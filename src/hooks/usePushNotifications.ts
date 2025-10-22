import { useEffect, useState } from 'react';

interface NotificationPermission {
  permission: NotificationPermission;
  requestPermission: () => Promise<boolean>;
  isSupported: boolean;
}

export const usePushNotifications = (): NotificationPermission => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Verificar se o navegador suporta notificações
    if ('Notification' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
    } else {
      setIsSupported(false);
    }
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    if (!isSupported) {
      console.warn('Este navegador não suporta notificações push');
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Erro ao solicitar permissão de notificação:', error);
      return false;
    }
  };

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (!isSupported || permission !== 'granted') {
      console.warn('Permissão de notificação não concedida');
      return;
    }

    try {
      new Notification(title, {
        icon: '/pwa-logo.png',
        badge: '/pwa-logo.png',
        ...options
      });
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
    }
  };

  return {
    permission,
    requestPermission,
    isSupported,
    sendNotification
  };
};