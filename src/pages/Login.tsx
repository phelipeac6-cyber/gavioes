import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import gavioesLogo from "@/assets/gavioes-logo.png";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/profile');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans p-6">
      <main className="flex-grow flex flex-col items-center justify-center">
        <img
          src={gavioesLogo}
          alt="Gaviões da Fiel Logo"
          className="w-40 h-auto mx-auto mb-10"
        />
        <div className="w-full max-w-sm">
          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#dc2626', // red-600
                    brandAccent: '#b91c1c', // red-700
                    defaultButtonBackground: '#ffffff',
                    defaultButtonBackgroundHover: '#f3f4f6',
                    defaultButtonText: '#000000',
                    inputText: '#ffffff',
                    inputBackground: 'transparent',
                    inputBorder: '#ffffff',
                  },
                  radii: {
                    borderRadiusButton: '0.5rem',
                    buttonBorderRadius: '0.5rem',
                    inputBorderRadius: '0.5rem',
                  }
                }
              }
            }}
            providers={[]}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'E-mail',
                  password_label: 'Senha',
                  button_label: 'Entrar',
                  social_provider_text: 'Entrar com {{provider}}',
                  link_text: 'Já tem uma conta? Entre',
                  forgot_your_password: 'Esqueceu sua senha?',
                },
                sign_up: {
                  email_label: 'E-mail',
                  password_label: 'Senha',
                  button_label: 'Cadastrar',
                  link_text: 'Não tem uma conta? Cadastre-se',
                },
                forgotten_password: {
                  email_label: 'E-mail',
                  button_label: 'Enviar instruções',
                  link_text: 'Voltar para o login',
                }
              },
            }}
            theme="dark"
          />
        </div>
      </main>
    </div>
  );
};

export default Login;