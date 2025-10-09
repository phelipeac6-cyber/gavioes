import { usePwaInstall } from '@/hooks/usePwaInstall';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import pwaLogo from '@/assets/pwa-install-logo.png';

export const PwaInstallPrompt = () => {
  const { showInstallPrompt, handleInstall, handleDismiss } = usePwaInstall();

  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50 animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-gray-800 text-white rounded-xl shadow-lg p-4 flex items-center space-x-4">
        <img src={pwaLogo} alt="Gaviões da Fiel Logo" className="w-12 h-12" />
        <div className="flex-grow">
          <h3 className="font-bold">Instale o App Gaviões</h3>
          <p className="text-sm text-gray-300">Acesso rápido na sua tela inicial.</p>
        </div>
        <Button
          onClick={handleInstall}
          className="bg-white text-black font-bold rounded-lg hover:bg-gray-200 whitespace-nowrap px-3 h-9"
        >
          Instalar
        </Button>
        <button onClick={handleDismiss} className="p-2 text-gray-400 hover:text-white">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};