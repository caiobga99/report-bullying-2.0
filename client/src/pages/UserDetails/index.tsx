import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../lib/api";
import { Denuncias, User } from "../../utils/protocols";
import { Spinner } from "flowbite-react";
import UserCard from "../../components/UserCard";
import { useTema } from "../../common/Tema";
import showToastMessage from "../../utils/showToastMessage";
import { format } from "date-fns";
const UserDetails = () => {
  const { id_usuario } = useParams();
  const [denuncias, setDenuncias] = useState<Denuncias[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };
  useEffect(() => {
    if (localStorage.getItem("usuario_anonimo") !== "logado") {
      api
        .get("/denuncia")
        .then((response) => {
          if (response.data.length <= 0) {
            showToastMessage(
              `Este usuario nâo realizou nenhuma denuncia ainda!`,
              "info"
            );
          }
          setIsLoading(false);
          setDenuncias(response.data);
        })
        .catch((err) => console.log(err.message));
    } else {
      const denuncias_anonimas: string | null =
        localStorage.getItem("denuncias_anonimas");
      if (!denuncias_anonimas) {
        setDenuncias([]);
      } else {
        setDenuncias(JSON.parse(denuncias_anonimas));
      }
      setIsLoading(false);
    }
    api
      .get(`/usuario/${id_usuario}`)
      .then((res) => {
        setUser(res.data[0]);
        console.log(res.data[0].image);
        setIsLoadingUser(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoadingUser(false);
      });
  }, [id_usuario]);
  return (
    <div className="container min-h-screen min-w-full flex justify-center items-center bg-light dark:bg-gray-900 transition-all duration-500 font-dm  dark:text-blue-gray-500">
      {isLoadingUser || isLoading ? (
        <Spinner />
      ) : (
        <div className="min-w-full min-h-full">
          <img
            src={`http://127.0.0.1:8000/storage/image_profile/${
              user?.image.split("/")[1]
            }`}
          />
          <UserCard
            created_at={format(
              new Date(user!.created_at),
              "dd/MM/yyyy"
            ).toString()}
            email={user?.email}
            nome={user?.nome}
            quantidade_denuncias={denuncias.length}
            ra={user?.RA}
            theme={pegarTema}
            tipo_usuario={
              user?.nome === "Anonimo"
                ? "Anonimo"
                : user?.tipo_usuario
                ? "Admin"
                : "Comum"
            }
            key={user?.id_usuario}
          />
        </div>
      )}
    </div>
  );
};

export default UserDetails;
