import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    // Carregar preferência do usuário ou do sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    setIsDark(theme === 'dark');
    applyTheme(theme === 'dark');
  }, []);

  useEffect(() => {
    // Salvar preferência do usuário se estiver logado
    if (profile) {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }, [isDark, profile]);

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    applyTheme(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative"
      aria-label="Alternar tema"
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={cn(
            "absolute inset-0 h-5 w-5 transition-all duration-300",
            isDark ? "opacity-0 scale-75 rotate-90" : "opacity-100 scale-100 rotate-0"
          )}
        />
        <Moon 
          className={cn(
            "absolute inset-0 h-5 w-5 transition-all duration-300",
            isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-90"
          )}
        />
      </div>
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
};