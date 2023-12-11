import { createContext, useContext, useState } from "react";

interface UserContextType {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
  viewReport: boolean;
  setViewReport: (value: boolean) => void;
  isAnonymous: boolean;
  setIsAnonymous: (value: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  token: string | null;
  setToken: (value: string) => void;
  user: object;
  setUser: (value: object) => void;
  lembrarMe: boolean;
  setLembrarMe: (value: boolean) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: any) => {
  const [isLogged, setIsLogged] = useState(false);
  const [viewReport, setViewReport] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [lembrarMe, setLembrarMe] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, _setToken] = useState(localStorage.getItem("ACESS_TOKEN"));
  const [user, setUser] = useState({});
  if (isAdmin) {
    localStorage.setItem("admin", "logado");
  }
  const setToken = (token: string | null) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };
  return (
    <UserContext.Provider
      value={{
        isLogged,
        setIsLogged,
        viewReport,
        setViewReport,
        isAnonymous,
        setIsAnonymous,
        isAdmin,
        setIsAdmin,
        token,
        setToken,
        user,
        setUser,
        lembrarMe,
        setLembrarMe,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const user = useContext(UserContext);
  return user;
};
export default useUser;
