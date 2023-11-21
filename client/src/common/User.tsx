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
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: any) => {
  const [isLogged, setIsLogged] = useState(false);
  const [viewReport, setViewReport] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const user = useContext(UserContext);
  return user;
};
export default useUser;
