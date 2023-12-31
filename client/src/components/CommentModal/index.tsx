import { Modal, Button } from "flowbite-react";
import api from "../../lib/api";
import { commentFields } from "../../constants/formFields";
import { useForm } from "react-hook-form";
import FormInput from "../../components/FormInput";
import showToastMessage from "../../utils/showToastMessage";

interface ModalComponentProps {
  openModal: boolean;
  id_denuncia: string;
  id_usuario: string;
  setOpenModal: (value: number) => void;
  adicionarComentarioNaDenuncia: (idDenuncia: string, comentario) => void;
}
interface FormData {
  mensagem: string;
}

const ModalComponent = ({
  openModal,
  setOpenModal,
  id_denuncia,
  id_usuario,
  adicionarComentarioNaDenuncia,
}: ModalComponentProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>();
  const onSubmit = ({ mensagem }: FormData) => {
    api
      .post("/comentarios", {
        id_usuario: id_usuario,
        mensagem: mensagem,
        id_denuncia: id_denuncia,
      })
      .then((res) => {
        {
          showToastMessage(res.data.message, "sucess");
          setOpenModal(0);
          adicionarComentarioNaDenuncia(id_denuncia, res.data.comentario);
          reset();
        }
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "Request failed with status code 500") {
          showToastMessage("Ocorreu um erro ao criar seu comentario!", "error");
        }
      });
  };
  return (
    <Modal
      show={openModal}
      onClose={() => setOpenModal(0)}
      size="md"
      className="font-dm "
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Faça um comentario!
          </h3>
          {commentFields.map((field) => (
            <FormInput
              key={field.id}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
              registerInput={register(field.name, {
                required: field.isRequired,
              })}
              typeError={errors[field.name]?.type}
            />
          ))}
          <div className="w-full">
            <Button onClick={handleSubmit(onSubmit)}>Comentar!</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default ModalComponent;
