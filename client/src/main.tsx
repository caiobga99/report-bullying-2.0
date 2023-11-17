import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import TemaProvider from "./common/Tema.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <TemaProvider>
      <App />
    </TemaProvider>
  </Router>
);