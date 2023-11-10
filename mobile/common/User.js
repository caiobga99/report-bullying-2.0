import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [viewReport, setViewReport] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  console.log(isAdmin);
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
