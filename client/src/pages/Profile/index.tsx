import { useEffect, useState } from "react";
import ReportCard from "../../components/ReportCard";
import api from "../../lib/api";
import { Spinner } from "flowbite-react";
import { Denuncias } from "../../utils/protocols";
import { format } from "date-fns";
import showToastMessage from "../../utils/showToastMessage";
import { useTema } from "../../common/Tema";
const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [denuncias, setDenuncias] = useState<Denuncias[]>([]);
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };
  useEffect(() => {
    if (localStorage.getItem("usuario_anonimo") !== "logado") {
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
  }, []);
  return (
    <div
      className={
        isLoading
          ? "container mx-auto py-4 flex flex-wrap gap-4 items-center justify-center min-h-screen"
          : pegarTema === "light"
          ? "container mx-auto py-4 flex flex-wrap gap-4 min-w-full min-h-screen items-center flex-col justify-center transition-all duration-500"
          : "container mx-auto py-4 flex flex-wrap gap-4 min-w-full min-h-screen items-center flex-col justify-center bg-dark text-white transition-all duration-500"
      }
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
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
            />
          );
        })
      )}
    </div>
  );
};

export default Profile;
