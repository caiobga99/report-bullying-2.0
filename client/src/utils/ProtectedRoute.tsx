import { Navigate } from "react-router";
import showToastMessage from "./showToastMessage";

interface ProtectedRoutesProps {
  token: string | null;
  children: JSX.Element;
  isAdmin?: boolean;
  pathName: string;
  type?: string;
}

const ProtectedRoute = ({
  token,
  children,
  isAdmin,
  type,
}: ProtectedRoutesProps) => {
  if (type === "admin" && !isAdmin) {
    showToastMessage(
      "Voce precisa ser um Administrador para acessar essa rota!",
      "error"
    );
    return <Navigate to={"/"} replace />;
  }
  if (type === "deslogado" && token) {
    showToastMessage("Você já está logado!", "error");
    return <Navigate to={"/"} replace />;
  }
  if (!token && type === "logado") {
    showToastMessage(
      "Voce precisa estar logado para acessar essa rota!",
      "error"
    );
    return <Navigate to={"/login"} replace />;
  }

  return children;
};
export default ProtectedRoute;
