import FormHeader from "../../components/FormHeader";
import { signupFields } from "../../constants/formFields";
import FormInput from "../../components/FormInput";
import FormAction from "../../components/FormAction";
import { useForm } from "react-hook-form";
import * as val from "validator";
import showToastMessage from "../../utils/showToastMessage";
import api from "../../lib/api";
import useUser from "../../common/User";
import { useNavigate } from "react-router-dom";
import { useTema } from "../../common/Tema";
const Register = () => {
  const fields = signupFields;
  interface FormData {
    nome: string;
    email: string;
    senha: string;
    ra: string;
  }
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };
  const navigate = useNavigate();
  const { setIsLogged, setIsAdmin, setToken } = useUser() as {
    setIsLogged: (value: boolean) => void;
    isLogged: boolean;
    isAdmin: boolean;
    setViewReport: (value: boolean) => void;
    setIsAnonymous: (value: boolean) => void;
    setIsAdmin: (value: boolean) => void;
    setToken: (value: string) => void;
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormData>();
  const onSubmit = ({ nome, email, senha, ra }: FormData) => {
    api
      .post(`/usuarios`, {
        email: email,
        password: senha,
        RA: ra,
        nome: nome,
      })
      .then((res) => {
        console.log(res + " POST");
        setToken(res.data.token);
        {
          if (
            res.data === "Usuario Administrador Criado e logado com sucesso!"
          ) {
            setIsAdmin(true);
          }
          showToastMessage(res.data.message, "sucess");
          setIsLogged(true);
          console.log(res.data);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "Request failed with status code 500") {
          showToastMessage("Usuario já existente", "error");
        }
      });
  };
  const watchPassword = watch("senha");
  return (
    <div
      className={
        pegarTema === "light"
          ? "min-h-full h-full sm:h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-all duration-500"
          : "min-h-full h-full sm:h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-dark transition-all duration-500"
      }
    >
      <div className="max-w-md w-full h-full space-y-8">
        <FormHeader
          heading="Cadastre-se para criar uma conta"
          paragraph="Já tem uma conta? "
          linkName="Login"
          theme={pegarTema}
          linkUrl="/login"
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
                  minLength: field.name === "ra" ? 0 : undefined,
                  validate: (value: string) => {
                    if (field.name === "confirmar-senha") {
                      return value === watchPassword;
                    } else if (field.name === "email") {
                      return val.default.isEmail(value);
                    }
                  },
                })}
                errors={errors[field.name]?.ref?.type === field.name}
                typeError={errors[field.name]?.type}
              />
            ))}
          </div>
        </form>
        <FormAction onClick={handleSubmit(onSubmit)} text="Cadastrar" />
      </div>
    </div>
  );
};

export default Register;
