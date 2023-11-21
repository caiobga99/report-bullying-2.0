import FormHeader from "../../components/FormHeader";
import { reportFields, signupFields } from "../../constants/formFields";
import FormInput from "../../components/FormInput";
import FormAction from "../../components/FormAction";
import { useForm } from "react-hook-form";
import * as val from "validator";
import showToastMessage from "../../utils/showToastMessage";
import api from "../../lib/api";
import useUser from "../../common/User";
import { useNavigate } from "react-router-dom";

const Denuncie = () => {
  const fields = reportFields;
  let fieldsState: any = {};
  fields.forEach((field) => (fieldsState[field.id] = ""));

  const navigate = useNavigate();
  const { setIsLogged, isLogged, setViewReport, setIsAnonymous, setIsAdmin } =
    useUser() as {
      setIsLogged: (value: boolean) => void;
      isLogged: boolean;
      isAdmin: boolean;
      setViewReport: (value: boolean) => void;
      setIsAnonymous: (value: boolean) => void;
      setIsAdmin: (value: boolean) => void;
    };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const onSubmit = ({ titulo, mensagem, senha, ra }: any) => {
    api.get("/sanctum/csrf-cookie").then((response) => {
      console.log(response);
      api
        .post(`/denuncia`, {
          titulo: titulo,
          mensagem: mensagem,
        })
        .then((res) => {
          {
            showToastMessage(res.data, "sucess");
            setIsLogged(true);
            console.log(res.data);
            navigate("/denuncias");
          }
        })
        .catch((error) => {
          console.log(error.message);
          showToastMessage(error.message, "error");
        });
    });
  };
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full space-y-8">
        <FormHeader
          heading="Realize sua denuncia já!"
          paragraph="Deseja ver suas denuncias? "
          linkName="Perfil"
          linkUrl="/profile"
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
        <FormAction onClick={handleSubmit(onSubmit)} text="Denunciar" />
      </div>
    </div>
  );
};

export default Denuncie;
