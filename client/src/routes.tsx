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
import Dashboard from "./pages/Dashboard";
import Faq from "./pages/FAQ";
import UserDetails from "./pages/UserDetails";

const MyRoutes = () => {
  const { setIsLogged, setIsAdmin } = useUser() as {
    setIsLogged: (value: boolean) => void;
    isAdmin: boolean;
    setIsAdmin: (value: boolean) => void;
  };
  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN")) {
      setIsLogged(true);
    }
    if (localStorage.getItem("admin")) {
      setIsAdmin(true);
    }
  }, [setIsLogged, setIsAdmin]);
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
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            token={localStorage.getItem("ACCESS_TOKEN")}
            pathName="dashboard"
            isAdmin={localStorage.getItem("admin") === "logado"}
          >
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/:id_usuario"
        element={
          <ProtectedRoute
            token={localStorage.getItem("ACCESS_TOKEN")}
            pathName="user/:id_usuario"
            isAdmin={localStorage.getItem("admin") === "logado"}
          >
            <UserDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedRoute
            token={localStorage.getItem("ACCESS_TOKEN")}
            pathName="login"
          >
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute
            token={localStorage.getItem("ACCESS_TOKEN")}
            pathName="register"
          >
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path="/timeline/:id_usuario"
        element={
          <ProtectedRoute
            token={localStorage.getItem("ACCESS_TOKEN")}
            pathName="timeline/:id_usuario"
            isAdmin={localStorage.getItem("admin") === "logado"}
          >
            <TimeLine />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:id_usuario"
        element={
          <ProtectedRoute
            token={localStorage.getItem("ACCESS_TOKEN")}
            pathName="profile/:id_usuario"
            isAdmin={localStorage.getItem("admin") === "logado"}
          >
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Home />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default MyRoutes;
