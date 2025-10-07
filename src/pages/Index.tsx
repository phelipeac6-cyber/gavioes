import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redireciona para a página de login, que é o ponto de entrada da aplicação.
    navigate("/login");
  }, [navigate]);

  // Não renderiza nada enquanto o redirecionamento ocorre.
  return null;
};

export default Index;