import { createContext, useContext, useState } from "react";

interface DenunciaContextType {
  denuncia?: object[];
  setDenuncias: (value: object) => void;
  respostas?: object[];
  setRespostas: (value: object) => void;
}

export const DenunciaContext = createContext<DenunciaContextType | undefined>(
  undefined
);

export const DenunciaProvider = ({ children }: any) => {
  const [denuncias, setDenuncias] = useState([]);
  const [respostas, setRespostas] = useState([]);
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
