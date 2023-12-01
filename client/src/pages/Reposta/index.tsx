import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../lib/api";
const Resposta: React.FC = () => {
  interface Resposta {
    conselho: string;
    created_at: string;
    id_denuncia: string;
    id_resposta: string;
    id_usuario: string;
    updated_at: string;
  }
  const [resposta, setResposta] = useState<Resposta[]>([]);
  const params = useParams();
  const { id_usuario, id_denuncia } = params;
  useEffect(() => {
    api
      .get(`/resposta/${id_denuncia}/${id_usuario}`)
      .then((response) => setResposta(response.data))
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <div>
      {resposta.map((resposta) => {
        return (
          <>
            <p>{resposta.conselho}</p>
          </>
        );
      })}
    </div>
  );
};

export default Resposta;
