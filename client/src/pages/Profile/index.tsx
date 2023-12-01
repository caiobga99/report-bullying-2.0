import { useEffect, useState } from "react";
import ReportCard from "../../components/ReportCard";
import api from "../../lib/api";
const Profile = () => {
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
        setDenuncias(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="container mx-auto py-4 flex flex-wrap gap-4 items-center justify-center">
      {denuncias.map((denuncia) => {
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
      })}
    </div>
  );
};

export default Profile;
