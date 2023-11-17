import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import TemaProvider from "./common/Tema.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./common/User.tsx";
import { TokenProvider } from "./common/Token.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <TokenProvider>
      <UserProvider>
        <TemaProvider>
          <App />
          <ToastContainer />
        </TemaProvider>
      </UserProvider>
    </TokenProvider>
  </Router>
);
