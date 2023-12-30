import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface TemaContextType {
  pegarTema?: string;
  setPegarTema?: (value: string) => void;
}

const temaContext = createContext<TemaContextType>({});

type TemaProps = {
  children: ReactNode;
};

export default function TemaProvider({ children }: TemaProps) {
  const temaInicial = localStorage.getItem("tema") || "dark";
  const [pegarTema, setPegarTema] = useState<string>(temaInicial);
  useEffect(() => {
    localStorage.setItem("tema", pegarTema);
  }, [pegarTema]);

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
