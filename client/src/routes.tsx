import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Notfound from "./pages/NotFound";
import Denuncie from "./pages/Denuncie";
import useUser from "./common/User";
import { useEffect } from "react";
import TimeLine from "./pages/TimeLine";
import ProtectedRoute from "./utils/ProtectedRoute";

const MyRoutes = () => {
  const { setIsLogged, token } = useUser() as {
    setIsLogged: (value: boolean) => void;
    isLogged: boolean;
    isAdmin: boolean;
    token: string | null;
  };
  useEffect(() => {
    // api.get("/logout");
    // api.get("/token").then((res) => {
    //   setToken(res.data);
    // });
    if (localStorage.getItem("ACCESS_TOKEN")) {
      setIsLogged(true);
    }
  }, [setIsLogged]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/timeLine" element={
        <ProtectedRoute token={token}>
          <TimeLine />
        </ProtectedRoute>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={
        <ProtectedRoute token={token} >
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/denuncie" element={
        <ProtectedRoute token={token}>
          <Denuncie />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default MyRoutes;
