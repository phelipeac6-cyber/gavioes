import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Camera, Eye, EyeOff, User, Loader2 } from "lucide-react";
import registerBg from "@/assets/gavioes-wallpaper.png";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";
import { SubSedeCombobox } from "@/components/SubSedeCombobox";

const Register = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [gender, setGender] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [subSede, setSubSede] = useState("");
  const [bio, setBio] = useState("");

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleAvatarClick = () => {
    if (avatarLoading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    setAvatarLoading(true);
    const file = event.target.files[0];
    setAvatarFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
      setAvatarLoading(false);
    };
    reader.onerror = () => {
      showError("Erro ao ler o arquivo de imagem.");
      setAvatarLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showError("As senhas não coincidem.");
      return;
    }
    setLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (authError) {
      showError(authError.message);
      setLoading(false);
      return;
    }

    const user = authData.user;
    if (!user) {
      showError("Não foi possível criar o usuário.");
      setLoading(false);
      return;
    }

    let avatarUrl = null;

    if (avatarFile) {
      const fileExt = avatarFile.name.split('.').pop();
      const filePath = `${user.id}/${new Date().getTime()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile);

      if (uploadError) {
        showError(`Erro ao enviar avatar: ${uploadError.message}`);
      } else {
        const { data: urlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);
        avatarUrl = urlData.publicUrl;
      }
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ 
        sub_sede: subSede, 
        gender: gender,
        avatar_url: avatarUrl,
        bio: bio,
      })
      .eq("id", user.id);
    
    if (profileError) {
      showError(profileError.message);
    } else {
      showSuccess("Cadastro realizado com sucesso! Complete seu perfil.");
      navigate("/address");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden">
      <img
        src={registerBg}
        alt="Gaviões da Fiel background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-20 z-0"
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="p-4 flex items-center space-x-4 sticky top-0 bg-black/80 backdrop-blur-sm z-20">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Cadastro</h1>
        </header>

        <main className="flex-grow p-6 overflow-y-auto">
          <div className="flex flex-col items-center space-y-6 max-w-sm mx-auto">
            <button onClick={handleAvatarClick} className="relative" disabled={avatarLoading}>
              <Avatar className="w-24 h-24 border-2 border-gray-700">
                <AvatarImage src={avatarPreview || ""} alt="User avatar" />
                <AvatarFallback className="bg-gray-800">
                  {avatarLoading ? (
                    <Loader2 size={32} className="animate-spin text-gray-500" />
                  ) : (
                    <User size={48} className="text-gray-500" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 bg-red-600 p-2 rounded-full border-2 border-black">
                <Camera size={16} className="text-white" />
              </div>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />

            <form onSubmit={handleRegister} className="w-full space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Nome" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="bg-transparent border-white rounded-lg placeholder:text-gray-400" />
                <Input placeholder="Sobrenome" value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-transparent border-white rounded-lg placeholder:text-gray-400" />
              </div>
              <Input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent border-white rounded-lg placeholder:text-gray-400" />
              
              <div>
                <Label htmlFor="bio" className="text-sm text-gray-400">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Fale um pouco sobre você..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={80}
                  className="bg-transparent border-white rounded-lg mt-1 placeholder:text-gray-400"
                />
                <p className="text-right text-xs text-gray-500 mt-1">
                  {bio.length}/80
                </p>
              </div>

              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Senha" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent border-white rounded-lg pr-10 placeholder:text-gray-400" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400">
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>

              <div className="relative">
                <Input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Confirma Senha" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-transparent border-white rounded-lg pr-10 placeholder:text-gray-400" 
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400">
                  {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>

              <div>
                <Label className="text-sm text-gray-400">Sub-Sede</Label>
                <SubSedeCombobox value={subSede} onChange={setSubSede} />
              </div>

              <div>
                <Label className="text-sm text-gray-400">Gênero</Label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setGender("male")}
                    className={`w-full rounded-lg border h-12 transition-colors ${
                      gender === "male"
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white border-white hover:bg-white hover:text-black"
                    }`}
                  >
                    Homem
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setGender("female")}
                    className={`w-full rounded-lg border h-12 transition-colors ${
                      gender === "female"
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white border-white hover:bg-white hover:text-black"
                    }`}
                  >
                    Mulher
                  </Button>
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-12 !mt-8">
                {loading ? "Salvando..." : "Salvar"}
              </Button>
            </form>
            
            <p className="text-sm text-center text-gray-400 pt-4">
              Já tem uma conta?{" "}
              <Link to="/login" className="font-semibold text-red-500 hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Register;