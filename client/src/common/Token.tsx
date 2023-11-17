import { createContext, useContext, useState } from "react";

type TokenContextType = {
  token: string;
  setToken: (value: string) => void;
};
export const TokenContext = createContext<TokenContextType | undefined>(
  undefined
);

export const TokenProvider = ({ children }: any) => {
  const [token, setToken] = useState("");
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const token = useContext(TokenContext);
  return token;
};
export default useToken;
