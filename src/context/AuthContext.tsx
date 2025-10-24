import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useIsMobile } from "@/hooks/use-mobile";

type Profile = {
  id: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  username: string;
  pulseira_id: string;
  sub_sede: string;
  gender: string;
  cep: string;
  endereco: string;
  numero: string;
  cidade: string;
  complemento: string;
  facebook_url: string;
  instagram_url: string;
  whatsapp_number: string;
  site_url: string;
  pix_key: string;
  tipo_sanguineo: string;
  diabetes: string;
  cardiaco: string;
  pressao: string;
  remedios: string;
  alergia_medicamento: string;
  laudo_pdf_url: string;
  contato_emergencia_nome: string;
  contato_emergencia_telefone: string;
  contato_emergencia_parentesco: string;
  contato_emergencia_email: string;
  bairro: string;
  estado: string;
  bio: string;
  associated_at: string;
  membership_expires_at: string;
  role: string | null;
};

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => void;
  wristbandCode: string | null;
  refreshProfile: (userId: string) => Promise<Profile | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [wristbandCode, setWristbandCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
    return data as Profile;
  };

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session ?? null);
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(profileData as Profile);
        // Carrega o código da pulseira atribuída (status atribuida)
        const { data: wb } = await supabase
          .from("pulseira")
          .select("id, status")
          .eq("assigned_profile_id", session.user.id)
          .order("assigned_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        setWristbandCode(wb && wb.status === "atribuida" ? (wb as any).id : null);
      }
      setLoading(false);
    };

    getSession();

    // Listener for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session ?? null);

      // Assim que receber a sessão inicial, encerra o loading para liberar a UI
      if (event === "INITIAL_SESSION") {
        setLoading(false);
      }

      if (session?.user) {
        setUser(session.user);
        // Fetch profile and assigned wristband
        const profileData = await fetchProfile(session.user.id);
        setProfile(profileData);
        const { data: wristband } = await supabase
          .from("pulseira")
          .select("id")
          .eq("assigned_profile_id", session.user.id)
          .eq("status", "atribuida")
          .order("assigned_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        setWristbandCode((wristband as any)?.id ?? null);

        // Ao logar, libera a UI (não redirecionar; a página de Login cuida de ir ao perfil)
        if (event === "SIGNED_IN") {
          setLoading(false);
          // REMOVED: navigate("/");
        }
      } else {
        setUser(null);
        setProfile(null);
        setWristbandCode(null);

        // Ao sair, libera a UI; o RouteGuard decide para onde ir
        if (event === "SIGNED_OUT") {
          setLoading(false);
        }
      }
    });

    return () => {
      // Cleanup da inscrição do listener
      authListener.subscription?.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
    
    if (isMobile) {
      navigate("/login", { replace: true });
    } else {
      navigate("/dashboard/login", { replace: true });
    }
  };

  const value = {
    session,
    user,
    profile,
    wristbandCode,
    loading,
    signOut,
    refreshProfile: fetchProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};