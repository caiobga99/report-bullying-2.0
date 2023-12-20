import { useEffect, useState } from "react";
import ReportCard from "../../components/ReportCard";
import api from "../../lib/api";
import { Spinner, Tooltip } from "flowbite-react";
import { format } from "date-fns";
import showToastMessage from "../../utils/showToastMessage";
import { useTema } from "../../common/Tema";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const Profile = () => {
  const { id_usuario } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [denuncias, setDenuncias] = useState<Denncias[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  useEffect(() => {
    if (id_usuario) {
      api
        .get(`/usuario/${id_usuario}`)
        .then((response) => {
          setIsLoadingUser(false);
          setUser(response.data[0]);
        })
        .catch((err) => console.log(err.message));
      api
        .get(`denuncia/${id_usuario}`)
        .then((response) => {
          setIsLoading(false);
          response.data <= 0 &&
            showToastMessage(
              "Este usuario não realizou nenhuma denuncia ainda!",
              "info"
            );
          setDenuncias(response.data);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err.message);
        });
    } else if (localStorage.getItem("usuario_anonimo") !== "logado") {
      api
        .get("/usuario")
        .then((response) => {
          setIsLoadingUser(false);
          setUser(response.data[0]);
        })
        .catch((err) => console.log(err.message));
      api
        .get("denuncia")
        .then((response) => {
          setIsLoading(false);
          response.data <= 0 &&
            showToastMessage("Nenhuma Denuncia foi Realizada ainda!", "info");
          setDenuncias(response.data);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err.message);
        });
    } else {
      api
        .get("/usuario")
        .then((response) => {
          setIsLoadingUser(false);
          setUser(response.data[0]);
        })
        .catch((err) => console.log(err.message));
      const denuncias_anonimas: null | string =
        localStorage.getItem("denuncias_anonimas");

      if (!denuncias_anonimas) {
        setDenuncias([]);
      } else {
        setDenuncias(JSON.parse(denuncias_anonimas));
      }
      setIsLoading(false);
    }
  }, [id_usuario]);
  return (
    <div
      className={
        isLoading
          ? `container mx-auto py-4 flex flex-wrap gap-4 items-center justify-center min-h-screen font-dm  min-w-full ${
              pegarTema === "dark" ? "bg-dark" : "bg-light"
            }`
          : pegarTema === "light"
          ? "font-dm container mx-auto py-4 flex flex-wrap gap-4 min-w-full min-h-screen items-center flex-col justify-center transition-all duration-500 bg-light"
          : "font-dm container mx-auto py-4 flex flex-wrap gap-4 min-w-full min-h-screen items-center flex-col justify-center bg-dark text-white transition-all duration-500"
      }
    >
      {id_usuario && (
        <div className="absolute top-[10vh] right-[10vh]">
          <Tooltip
            content="Navegue para a pagina de TimeLine deste usuario!"
            animation="duration-500"
          >
            <Link to={`/timeline/${id_usuario}`}>
              <span className="bg-transparent mr-auto  hover:bg-yellow-300 text-yellow-300 hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
                Ir para a TimeLine
              </span>
            </Link>
          </Tooltip>
        </div>
      )}
      {isLoading | isLoadingUser? (
        <div
          className={`flex items-center justify-center ${
            pegarTema === "dark" && "bg-dark w-screen h-screen"
          }`}
        >
          <Spinner />
        </div>
      ) : denuncias.length <= 0 ? (
        <div className="flex items-center justify-center h-24">
          <p className="font-dm text-xl">
            Nenhuma Denuncia foi Realizada ainda! 😄
          </p>
        </div>
      ) : (
        denuncias.map((denuncia) => {
          return (
            <ReportCard
              key={denuncia.id_denuncia}
              titulo={denuncia.titulo}
              mensagem={denuncia.mensagem}
              nome={denuncia.nome}
              data={format(
                new Date(denuncia.created_at),
                "dd/MM/yyyy"
              ).toString()}
              id_denuncia={denuncia.id_denuncia}
              id_usuario={denuncia.id_usuario}
              theme={pegarTema}
              image={user?.image}
            />
          );
        })
      )}
    </div>
  );
};

export default Profile;
