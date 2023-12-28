import { Modal, Spinner } from "flowbite-react";
import api from "../../lib/api";
import { useState, useEffect } from "react";
import { Resposta } from "../../utils/protocols";

interface ModalComponentProps {
  openModal: number;
  id_denuncia: string;
  id_usuario: string;
  titulo: string;
  close: (value: number) => void;
}
const ModalComponent = ({
  openModal,
  id_denuncia,
  id_usuario,
  titulo,
  close,
}: ModalComponentProps) => {
  const [resposta, setResposta] = useState<Resposta | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (openModal) {
      setIsLoading(true);
      api
        .get(`/resposta/${id_denuncia}/${id_usuario}`)
        .then((response) => {
          response.data.length <= 0
            ? setResposta({
                conselho:
                  "Desculpe, não foi possivel gerar uma Resposta para essa denuncia, Tente novamente!",
                created_at: undefined,
                id_denuncia: id_denuncia,
                id_usuario: id_usuario,
                id_resposta: undefined,
                updated_at: undefined,
              })
            : setResposta(response.data[0]);
          setIsLoading(false);
        })
        .catch((err) => console.log(err.message));
    }
  }, [id_denuncia, id_usuario, openModal]);
  return (
    <Modal show={openModal} onClose={() => close(0)} className="font-dm ">
      <Modal.Header>{titulo}</Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 ">
              {resposta!.conselho}
            </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};
export default ModalComponent;
