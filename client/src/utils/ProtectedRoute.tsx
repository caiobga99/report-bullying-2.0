import { Navigate } from "react-router";
import showToastMessage from "./showToastMessage";

interface ProtectedRoutesProps {
  token: string | null;
  children: JSX.Element;
  isAdmin?: boolean;
  pathName?: string;
}

const ProtectedRoute = ({
  token,
  children,
  isAdmin,
  pathName,
}: ProtectedRoutesProps) => {
  if (!token) {
    showToastMessage(
      "Voce precisa estar logado para acessar essa rota!",
      "error"
    );

    return <Navigate to={"/login"} replace />;
  }
  if (
    (pathName === "dashboard" || pathName === "user/:id_usuario") &&
    !isAdmin
  ) {
    showToastMessage(
      "Voce precisa ser um Administrador para acessar essa rota!",
      "error"
    );
    return <Navigate to={"/"} replace />;
  }
  if ((pathName === "login" || pathName === "register") && token) {
    showToastMessage("Você já está logado!", "error");
    return <Navigate to={"/"} replace />;
  }
  return children;
};
export default ProtectedRoute;
