import { useTema } from "./common/Tema";
import Navbar from "./components/Navbar";
import MyRoutes from "./routes";
function App() {
  const { pegarTema } = useTema() as {
    setPegarTema: (value: string) => void;
    pegarTema: string;
  };
  return (
    <div>
      <Navbar />
      <div className={pegarTema === "dark" ? "bg-white" : "bg-white"}>
        <MyRoutes />
      </div>
    </div>
  );
}

export default App;
