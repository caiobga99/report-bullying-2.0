import { Spinner } from "flowbite-react";
import TimeLineComponent from "../../components/TimeLineComponent";
import api from "../../lib/api";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Denuncias, User } from "../../utils/protocols";
import showToastMessage from "../../utils/showToastMessage";
import UserCard from "../../components/UserCard";
import { useTema } from "../../common/Tema";
const TimeLine = () => {
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
            showToastMessage("Nenhuma denuncia foi realizada ainda!", "info");
          }
          setIsLoading(false);
          setDenuncias(response.data);
        })
        .catch((err) => console.log(err.message));
    } else {
      const denuncias_anonimas = JSON.parse(
        localStorage.getItem("denuncias_anonimas")
      );
      if (!localStorage.getItem("denuncias_anonimas")) {
        setDenuncias([]);
      } else {
        setDenuncias(denuncias_anonimas);
      }
      setIsLoading(false);
    }
    api
      .get("/usuario")
      .then((response) => {
        setIsLoadingUser(false);
        setUser(response.data[0]);
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <div
      className={
        pegarTema === "dark"
          ? "bg-dark text-white py-8 min-h-screen font-dm transition-all duration-500"
          : "bg-light text-black py-8 min-h-screen font-dm transition-all duration-500"
      }
    >
      <div className="container mx-auto flex flex-col items-start md:flex-row my-12 md:my-24">
        <div className="flex flex-col w-full sticky md:top-36 lg:w-1/3 mt-2 md:mt-12 px-8">
          <p className="ml-2 text-yellow-300 uppercase tracking-loose">
            TIMELINE das Denuncias
          </p>
          <p className="text-3xl md:text-4xl leading-normal md:leading-relaxed mb-2">
            Todas denuncias realizadas
          </p>
          <p
            className={
              pegarTema === "dark"
                ? "text-sm md:text-base text-gray-50 mb-4"
                : "text-sm md:text-base text-gray-600 mb-4"
            }
          >
            Aqui está todas as suas denuncias divididas em uma linha do tempo,
            ordenada de forma decrescente.
          </p>
          <Link to={"/denuncie"}>
            <span className="bg-transparent mr-auto  hover:bg-yellow-300 text-yellow-300 hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
              Denuncie Agora
            </span>
          </Link>
          <div>
            {isLoadingUser ? (
              <div className="flex items-center justify-center h-80">
                <Spinner />
              </div>
            ) : (
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
            )}
          </div>
        </div>
        <div className="ml-0 md:ml-12 lg:w-2/3 sticky">
          <div className="container mx-auto w-full h-full">
            {!isLoading ? (
              <>
                <div className="relative wrap overflow-hidden p-10 h-full">
                  {denuncias.length <= 0 ? (
                    <div className="flex items-end justify-center text-xl">
                      Nenhuma Denuncia Foi Realizada Ainda!
                    </div>
                  ) : (
                    <></>
                  )}
                  {denuncias.length !== 0 && (
                    <>
                      <div className="border-2-2 border-yellow-555 absolute h-full  right-1/2 border-solid border-2 border-borderColor rounded"></div>
                      <div className="border-2-2 border-yellow-555 absolute h-full  right-1/2 border-solid border-2 border-borderColor rounded"></div>
                    </>
                  )}
                  {denuncias.map((value: Denuncias, index: number) => (
                    <TimeLineComponent
                      key={index}
                      content={value.mensagem}
                      title={value.titulo}
                      date={format(
                        new Date(value.created_at),
                        "dd/MM/yyyy"
                      ).toString()}
                      position={index % 2 != 0 ? "right" : "left"}
                      theme={pegarTema}
                    />
                  ))}
                </div>
                {denuncias.length !== 0 && (
                  <>
                    <div className="mx-auto -mt-20 md:-mt-20"></div>
                    <img
                      className="mx-auto -mt-20 md:-mt-20"
                      src="https://user-images.githubusercontent.com/54521023/116968861-ef21a000-acd2-11eb-95ac-a34b5b490265.png"
                    />
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-60">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
