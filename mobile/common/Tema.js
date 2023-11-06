import { createContext, useContext, useState } from "react";

export const TemaContext = createContext();

export const TemaProvider = ({ children }) => {
  const [tema, setTema] = useState("dark");
  console.log(tema);
  return (
    <TemaContext.Provider value={{ tema, setTema }}>
      {children}
    </TemaContext.Provider>
  );
};

const useTema = () => {
  const tema = useContext(TemaContext);
  return tema;
};

export default useTema;
