import { createContext, ReactNode, useContext, useState } from "react";

type TemaContextType = {
  pegarTema: string;
  setPegarTema: (value: string) => void;
};

const temaContext = createContext<TemaContextType | undefined>(undefined);

type TemaProps = {
  children: ReactNode;
};

export default function TemaProvider({ children }: TemaProps) {
  const temaInicial = localStorage.getItem("tema") || "dark";
  const [pegarTema, setPegarTema] = useState<string>(temaInicial);

  const atualizarTema = (novoTema: string) => {
    setPegarTema(novoTema);
    localStorage.setItem("tema", novoTema);
  };

  return (
    <temaContext.Provider value={{ pegarTema, setPegarTema: atualizarTema }}>
      {children}
    </temaContext.Provider>
  );
}

export function useTema(): TemaContextType | undefined {
  const tema = useContext(temaContext);
  return tema;
}
