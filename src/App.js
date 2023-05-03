import "./App.css";
import Home from "./screens/Home/index";
import Cadastro from "./screens/Cadastro/index";
import Login from "./screens/Login/index";
import FaleConosco from "./screens/FaleConosco/index";
import Faq from "./screens/Faq/index";
import NotFound from "./screens/NotFound/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Home />} />
        <Route path="/fale-conosco" element={<FaleConosco />} />
        <Route path="/cadastrar" element={<Cadastro />} />
        <Route path="/entrar" element={<Login />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
