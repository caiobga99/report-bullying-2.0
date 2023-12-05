import { Navigate } from "react-router";
import showToastMessage from "./showToastMessage";

interface ProtectedRoutesProps {
  token: string | null;
  children: JSX.Element;
}

const ProtectedRoute = ({ token, children }: ProtectedRoutesProps) => {
  console.log(token);
  if (!token) {
    showToastMessage(
      "Voce precisa estar logado para acessar essa rota!",
      "error"
    );
    return <Navigate to={"/"} replace />;
  }
  return children;
};
export default ProtectedRoute;
