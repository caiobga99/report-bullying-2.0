import { useEffect, useState } from "react";
import ReportCard from "../../components/ReportCard";
import api from "../../lib/api";
import { Spinner } from "flowbite-react";
const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  interface Denuncias {
    RA: string;
    created_at: string;
    email: string;
    id_denuncia: string;
    id_usuario: string;
    mensagem: string;
    nome: string;
    titulo: string;
    updated_at: string;
  }
  const [denuncias, setDenuncias] = useState<Denuncias[]>([]);
  useEffect(() => {
    api
      .get("denuncia")
      .then((response) => {
        setIsLoading(false);
        setDenuncias(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message);
      });
  }, []);
  return (
    <div
      className={
        isLoading
          ? "container mx-auto py-4 flex flex-wrap gap-4 items-center justify-center min-h-screen"
          : "container mx-auto py-4 flex flex-wrap gap-4 items-center justify-center"
      }
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : denuncias.length <= 0 ? (
        <p>Nenhuma Denuncia foi Realizada ainda!</p>
      ) : (
        denuncias.map((denuncia) => {
          return (
            <ReportCard
              key={denuncia.id_denuncia}
              titulo={denuncia.titulo}
              mensagem={denuncia.mensagem}
              nome={denuncia.nome}
              data={denuncia.created_at}
              id_denuncia={denuncia.id_denuncia}
              id_usuario={denuncia.id_usuario}
            />
          );
        })
      )}
    </div>
  );
};

export default Profile;
