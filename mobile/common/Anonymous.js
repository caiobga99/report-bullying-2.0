import { createContext, useContext, useState } from "react";

export const AnonymousContext = createContext();

export const AnonymousProvider = ({ children }) => {
  const [viewReport, setViewReport] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  return (
    <AnonymousContext.Provider
      value={{ viewReport, setViewReport, isAnonymous, setIsAnonymous }}
    >
      {children}
    </AnonymousContext.Provider>
  );
};

export const useAnonymous = () => {
  const anonymous = useContext(AnonymousContext);
  return anonymous;
};
export default useAnonymous;
