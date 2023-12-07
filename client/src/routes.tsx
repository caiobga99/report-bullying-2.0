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
import FAQ from "./pages/FAQ";

const MyRoutes = () => {
  const { setIsLogged } = useUser() as {
    setIsLogged: (value: boolean) => void;
  };
  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN")) {
      setIsLogged(true);
    }
  }, [setIsLogged]);
  return (
    <Routes>
      <Route
        path="/timeLine"
        element={
          <ProtectedRoute token={localStorage.getItem("ACCESS_TOKEN")}>
            <TimeLine />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute token={localStorage.getItem("ACCESS_TOKEN")}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/denuncie"
        element={
          <ProtectedRoute token={localStorage.getItem("ACCESS_TOKEN")}>
            <Denuncie />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default MyRoutes;
