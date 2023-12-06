import {
  UserCircleIcon,
  ChatBubbleBottomCenterIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
interface ReportCardProps {
  titulo: string;
  mensagem: string;
  nome: string;
  data: string;
  id_denuncia: string;
  id_usuario: string;
  theme: string;
}
import ModalComponent from "../../components/ModalComponent";

const ReportCard = ({
  titulo,
  mensagem,
  nome,
  data,
  id_denuncia,
  id_usuario,
  theme,
}: ReportCardProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="max-w-sm bg-pink-800 w-full lg:max-w-fit lg:flex items-center justify-center font-dm">
      <div
        className={
          theme === "light"
            ? "border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
            : "border-r border-b border-l border-gray-50 lg:border-l-0 lg:border-t lg:border-gray-50 bg-dark rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
        }
      >
        <div className="mb-8">
          <p
            className={
              theme === "light"
                ? "text-sm text-gray-600 flex items-center gap-2"
                : "text-sm text-gray-100 flex items-center gap-2"
            }
          >
            <ChatBubbleBottomCenterIcon width={27} height={27} />
            <button onClick={() => setOpenModal(true)}>
              Visualize sua resposta
            </button>
          </p>
          <div
            className={
              theme === "light"
                ? "text-gray-900 font-bold text-xl mb-2"
                : "text-white font-bold text-xl mb-2"
            }
          >
            {titulo}
          </div>
          <p
            className={
              theme === "light"
                ? "text-gray-700 text-base"
                : "text-gray-100 text-base"
            }
          >
            {mensagem}
          </p>
        </div>
        <div className="flex items-center">
          {nome !== "Anonimo" ? (
            <UserCircleIcon width={50} height={50} />
          ) : (
            <EyeSlashIcon width={35} height={35} />
          )}
          {/* <img
            className="w-10 h-10 rounded-full mr-4"
            src="/img/jonathan.jpg"
            alt="Avatar of Jonathan Reinink"
          /> */}
          <div className="text-sm">
            <p
              className={
                theme === "light"
                  ? "text-gray-900 leading-none"
                  : "text-gray-200 leading-none"
              }
            >
              {nome}
            </p>
            <p className={theme === "light" ? "text-gray-600" : "text-gray-50"}>
              {data}
            </p>
          </div>
        </div>
      </div>
      <ModalComponent
        openModal={openModal}
        setOpenModal={setOpenModal}
        titulo={titulo}
        id_denuncia={id_denuncia}
        id_usuario={id_usuario}
      />
    </div>
  );
};

export default ReportCard;
