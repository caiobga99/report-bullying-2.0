import FormHeader from "../../components/FormHeader";
import { reportFields } from "../../constants/formFields";
import FormInput from "../../components/FormInput";
import FormAction from "../../components/FormAction";
import { useForm } from "react-hook-form";
import showToastMessage from "../../utils/showToastMessage";
import api from "../../lib/api";
import useUser from "../../common/User";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTema } from "../../common/Tema";
import useDenuncia from "../../common/Denuncia";
import { Denuncias } from "../../utils/protocols";
const Denuncie: React.FC = () => {
  const fields = reportFields;
  const fieldsState: any = {};
  fields.forEach((field) => (fieldsState[field.id] = ""));
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };
  const navigate = useNavigate();
  const { setIsLogged } = useUser() as {
    setIsLogged: (value: boolean) => void;
    isAdmin: boolean;
    isAnonymous: boolean;
  };
  const { setDenuncias, setRespostas } = useDenuncia() as {
    setDenuncias: (value: object) => void;
    setRespostas: (value: object) => void;
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  // interface FormValues {
  //   titulo: string;
  //   mensagem: string;
  //   senha: string;
  //   ra: string;
  // }
  const onSubmit = ({ titulo, mensagem }: any) => {
    setIsLoading(true);
    showToastMessage(
      "Denuncia Criada com sucesso!",
      "promise",
      api
        .post(`/denuncias`, {
          titulo: titulo,
          mensagem: mensagem,
        })
        .then((res) => {
          {
            if (localStorage.getItem("usuario_anonimo") === "logado") {
              const denunciasLocalStorage: string | null =
                localStorage.getItem("denuncias_anonimas");
              // const respostasLocalStorage: string | null =
              //   localStorage.getItem("respostas_anonimas");
              if (!denunciasLocalStorage) {
                const arrDenuncias: Denuncias[] = [res.data.denuncia];
                const arrRespostas: object[] = [res.data.resposta.denuncia];
                localStorage.setItem(
                  "denuncias_anonimas",
                  JSON.stringify(arrDenuncias)
                );
                setDenuncias(arrDenuncias);
                localStorage.setItem(
                  "respostas_anonimas",
                  JSON.stringify(arrRespostas)
                );
                setDenuncias(arrDenuncias);
              } else {
                const arrDenuncias: Denuncias[] = JSON.parse(
                  denunciasLocalStorage
                );
                const arrRespostas: object[] = JSON.parse(
                  denunciasLocalStorage
                );
                arrDenuncias.push(res.data.denuncia);
                arrRespostas.push(res.data.resposta.denuncia);
                localStorage.setItem(
                  "denuncias_anonimas",
                  JSON.stringify(arrDenuncias)
                );
                localStorage.setItem(
                  "respostas_anonimas",
                  JSON.stringify(arrRespostas)
                );
                setDenuncias(arrDenuncias);
                setRespostas(arrDenuncias);
              }
            }
            setIsLoading(false);
            setIsLogged(true);
            navigate("/profile");
          }
        })
        .catch((error) => {
          console.log(error.message);
        }),
      "Criando Denuncia..."
    );
  };
  return (
    <div
      className={
        pegarTema === "light"
          ? "min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8  transition-all duration-500 bg-light"
          : "min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-dark transition-all duration-500"
      }
    >
      <div className="max-w-md w-full space-y-8">
        <FormHeader
          heading="Realize sua denuncia já!"
          paragraph="Deseja ver suas denuncias? "
          linkName="Perfil"
          linkUrl="/profile"
          theme={pegarTema}
        />
        <form className="mt-8 space-y-6">
          <div>
            {fields.map((field) => (
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
                inputType={field.inputType}
                errors={errors[field.name]?.ref?.type === field.name}
                typeError={errors[field.name]?.type}
              />
            ))}
          </div>
        </form>
        <FormAction
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          text="Denunciar"
        />
      </div>
    </div>
  );
};

export default Denuncie;
