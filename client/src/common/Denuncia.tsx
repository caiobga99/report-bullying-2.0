import { createContext, useContext, useState } from "react";
import { Denuncias } from "../utils/protocols";

interface DenunciaContextType {
  denuncias?: Denuncias[];
  setDenuncias: (value: Denuncias[]) => void;
  respostas?: object[];
  setRespostas: (value: object[]) => void;
}

export const DenunciaContext = createContext<DenunciaContextType | undefined>(
  undefined
);

export const DenunciaProvider = ({ children }: any) => {
  const [denuncias, setDenuncias] = useState<Denuncias[]>([]);
  const [respostas, setRespostas] = useState<object[]>([]);
  return (
    <DenunciaContext.Provider
      value={{
        denuncias,
        setDenuncias,
        respostas,
        setRespostas,
      }}
    >
      {children}
    </DenunciaContext.Provider>
  );
};

export const useDenuncia = () => {
  const denuncia = useContext(DenunciaContext);
  return denuncia;
};
export default useDenuncia;
