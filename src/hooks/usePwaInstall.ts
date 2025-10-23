import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const usePwaInstall = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      // Intercepta o banner nativo
      event.preventDefault();
      setInstallPromptEvent(event as BeforeInstallPromptEvent);

      // Detecta se já está instalado (standalone em Android/desktop e iOS)
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        // @ts-expect-error - propriedade específica do iOS Safari
        (window.navigator && (window.navigator as any).standalone === true);

      if (!isStandalone) {
        setShowInstallPrompt(true);
      }
    };

    const handleAppInstalled = () => {
      // App instalado: esconde prompt e limpa evento
      setShowInstallPrompt(false);
      setInstallPromptEvent(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPromptEvent) {
      return;
    }
    await installPromptEvent.prompt();
    await installPromptEvent.userChoice;
    setInstallPromptEvent(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
  };

  return { showInstallPrompt, handleInstall, handleDismiss };
};