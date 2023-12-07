import { useTema } from "./common/Tema";
import Navbar from "./components/Navbar";
import MyRoutes from "./routes";
import VLibras from "@moreiraste/react-vlibras";
function App() {
  const { pegarTema } = useTema() as {
    setPegarTema: (value: string) => void;
    pegarTema: string;
  };
  return (
    <div>
      <VLibras forceOnload={true} />
      <Navbar />
      <div className={pegarTema === "dark" ? "bg-white" : "bg-white"}>
        <MyRoutes />
      </div>
    </div>
  );
}

export default App;
