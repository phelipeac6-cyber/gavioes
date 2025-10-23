import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(): boolean | undefined {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(() => {
    // Se window estiver disponível, inicializa o estado sincronamente para evitar undefined no primeiro render
    if (typeof window === "undefined") return undefined;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  React.useEffect(() => {
    // Se window não estiver disponível por alguma razão, mantemos undefined até o ambiente ficar pronto
    if (typeof window === "undefined") {
      return;
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Compatibilidade: alguns navegadores implementam addEventListener no MediaQueryList,
    // outros ainda usam addListener / removeListener.
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
    } else if (typeof (mql as any).addListener === "function") {
      (mql as any).addListener(onChange);
    }

    // Ajusta imediatamente para garantir que o estado está correto após montar
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    return () => {
      if (typeof mql.removeEventListener === "function") {
        mql.removeEventListener("change", onChange);
      } else if (typeof (mql as any).removeListener === "function") {
        (mql as any).removeListener(onChange);
      }
    };
  }, []);

  // Retorna o valor (agora tipado como boolean | undefined para compatibilidade com o resto do código)
  return isMobile;
}