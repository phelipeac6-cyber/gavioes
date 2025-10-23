import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import registerBg from "@/assets/gavioes-wallpaper.png";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";

const SocialMedia = () => {
  const navigate = useNavigate();
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [site, setSite] = useState("");
  const [pix, setPix] = useState("");
  const [loading, setLoading] = useState(false);

  const [facebookDisabled, setFacebookDisabled] = useState(false);
  const [instagramDisabled, setInstagramDisabled] = useState(false);
  const [whatsappDisabled, setWhatsappDisabled] = useState(false);
  const [siteDisabled, setSiteDisabled] = useState(false);
  const [pixDisabled, setPixDisabled] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from("profiles")
        .update({
          facebook_url: facebookDisabled ? null : facebook,
          instagram_url: instagramDisabled ? null : instagram,
          whatsapp_number: whatsappDisabled ? null : whatsapp,
          site_url: siteDisabled ? null : site,
          pix_key: pixDisabled ? null : pix,
        })
        .eq("id", user.id);

      if (error) {
        showError(error.message);
      } else {
        showSuccess("Redes sociais salvas com sucesso!");
        navigate("/address");
      }
    } else {
      showError("Usuário não encontrado. Faça o login novamente.");
      navigate("/login");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#1800AD] font-sans relative overflow-x-hidden">
      <img
        src={registerBg}
        alt="Gaviões da Fiel background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-20 z-0"
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="p-4 flex items-center space-x-4 sticky top-0 bg-white z-20 border-b border-[#1800AD]/20">
          <button onClick={() => navigate(-1)} className="p-2 text-[#1800AD]">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Redes Sociais</h1>
        </header>

        <main className="flex-grow p-6">
          <form onSubmit={handleSave} className="w-full max-w-sm mx-auto space-y-6">
            <div className="space-y-3">
              <Input
                placeholder="Link Facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="bg-transparent border-2 border-[#1800AD] rounded-lg h-14 placeholder:text-[#1800AD]/60 text-base text-[#1800AD]"
                disabled={facebookDisabled}
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="no-facebook"
                  className="border-[#1800AD] data-[state=checked]:bg-[#1800AD] data-[state=checked]:text-white"
                  checked={facebookDisabled}
                  onCheckedChange={(checked) => setFacebookDisabled(!!checked)}
                />
                <label htmlFor="no-facebook" className="text-sm font-medium">Não desejo colocar</label>
              </div>
            </div>

            <div className="space-y-3">
              <Input
                placeholder="Link Instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="bg-transparent border-2 border-[#1800AD] rounded-lg h-14 placeholder:text-[#1800AD]/60 text-base text-[#1800AD]"
                disabled={instagramDisabled}
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="no-instagram"
                  className="border-[#1800AD] data-[state=checked]:bg-[#1800AD] data-[state=checked]:text-white"
                  checked={instagramDisabled}
                  onCheckedChange={(checked) => setInstagramDisabled(!!checked)}
                />
                <label htmlFor="no-instagram" className="text-sm font-medium">Não desejo colocar</label>
              </div>
            </div>

            <div className="space-y-3">
              <Input
                placeholder="Celular Whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="bg-transparent border-2 border-[#1800AD] rounded-lg h-14 placeholder:text-[#1800AD]/60 text-base text-[#1800AD]"
                disabled={whatsappDisabled}
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="no-whatsapp"
                  className="border-[#1800AD] data-[state=checked]:bg-[#1800AD] data-[state=checked]:text-white"
                  checked={whatsappDisabled}
                  onCheckedChange={(checked) => setWhatsappDisabled(!!checked)}
                />
                <label htmlFor="no-whatsapp" className="text-sm font-medium">Não desejo colocar</label>
              </div>
            </div>

            <div className="space-y-3">
              <Input
                placeholder="Site"
                value={site}
                onChange={(e) => setSite(e.target.value)}
                className="bg-transparent border-2 border-[#1800AD] rounded-lg h-14 placeholder:text-[#1800AD]/60 text-base text-[#1800AD]"
                disabled={siteDisabled}
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="no-site"
                  className="border-[#1800AD] data-[state=checked]:bg-[#1800AD] data-[state=checked]:text-white"
                  checked={siteDisabled}
                  onCheckedChange={(checked) => setSiteDisabled(!!checked)}
                />
                <label htmlFor="no-site" className="text-sm font-medium">Não desejo colocar</label>
              </div>
            </div>

            <div className="space-y-3">
              <Input
                placeholder="Chave Pix"
                value={pix}
                onChange={(e) => setPix(e.target.value)}
                className="bg-transparent border-2 border-[#1800AD] rounded-lg h-14 placeholder:text-[#1800AD]/60 text-base text-[#1800AD]"
                disabled={pixDisabled}
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="no-pix"
                  className="border-[#1800AD] data-[state=checked]:bg-[#1800AD] data-[state=checked]:text-white"
                  checked={pixDisabled}
                  onCheckedChange={(checked) => setPixDisabled(!!checked)}
                />
                <label htmlFor="no-pix" className="text-sm font-medium">Não desejo colocar</label>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-[#1800AD] text-white font-bold rounded-lg text-lg hover:bg-[#1800AD]/90 h-14 !mt-10">
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </form>
        </main>

        <footer className="p-6 flex justify-center">
          <img
            src={esportesDaSorteLogo}
            alt="Esportes da Sorte Logo"
            className="w-40 h-auto"
          />
        </footer>
      </div>
    </div>
  );
};

export default SocialMedia;