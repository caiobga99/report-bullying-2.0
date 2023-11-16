import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Notfound from "./pages/NotFound";
import Denuncie from "./pages/Denuncie";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logOut" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/denuncie" element={<Denuncie />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default MyRoutes;
