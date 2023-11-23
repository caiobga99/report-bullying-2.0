import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Notfound from "./pages/NotFound";
import Denuncie from "./pages/Denuncie";
import useToken from "./common/Token";
import useUser from "./common/User";
import { useEffect } from "react";
import api from "./lib/api";
import Resposta from "./pages/Reposta";

const MyRoutes = () => {
  const { setToken } = useToken() as {
    setToken: (value: string) => void;
  };
  const { setIsLogged, isLogged, isAdmin } = useUser() as {
    setIsLogged: (value: boolean) => void;
    isLogged: boolean;
    isAdmin: boolean;
  };
  useEffect(() => {
    // api.get("/logout");
    // api.get("/token").then((res) => {
    //   setToken(res.data);
    // });
    api.get("/sanctum/csrf-cookie").then((response) => {
      api.get("/userIsLogged").then((res) => {
        setIsLogged(res.data);
        console.log(res.data === "" ? "nao esta logado" : res.data);
      });
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/denuncie" element={<Denuncie />} />
      <Route path="/resposta/:id" element={<Resposta />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default MyRoutes;
