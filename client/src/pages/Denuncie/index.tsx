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
import { is } from "date-fns/locale";
const Denuncie: React.FC = () => {
  const fields = reportFields;
  const fieldsState: any = {};
  fields.forEach((field) => (fieldsState[field.id] = ""));
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };
  const navigate = useNavigate();
  const { setIsLogged, isAnonymous } = useUser() as {
    setIsLogged: (value: boolean) => void;
    isAdmin: boolean;
    isAnonymous: boolean;
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
              console.log("e usuario anonimo");
              const denunciasLocalStorage: any =
                localStorage.getItem("denuncias_anonimas");
              if (!denunciasLocalStorage) {
                const arr: any = [res.data.denuncia];
                localStorage.setItem("denuncias_anonimas", JSON.stringify(arr));
              } else {
                const arr = JSON.parse(denunciasLocalStorage);
                arr.push(res.data.denuncia);
                localStorage.setItem("denuncias_anonimas", JSON.stringify(arr));
              }
            }
            setIsLoading(false);
            setIsLogged(true);
            console.log(res.data);
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
          ? "min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 "
          : "min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-dark"
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
