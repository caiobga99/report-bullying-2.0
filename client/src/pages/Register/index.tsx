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
    imagem: HTMLInputElement;
  }
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };
  const navigate = useNavigate();
  const { setIsLogged, setIsAdmin, setToken, setUser } = useUser() as {
    setIsLogged: (value: boolean) => void;
    isLogged: boolean;
    isAdmin: boolean;
    setIsAdmin: (value: boolean) => void;
    setToken: (value: string) => void;
    setUser: (value: string) => void;
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormData>();
  const onSubmit = ({ nome, email, senha, ra, imagem }: FormData) => {
    const formData = new FormData();

    formData.append("image", imagem[0]);
    formData.append("email", email);
    formData.append("password", senha);
    formData.append("RA", ra);
    formData.append("nome", nome);
    console.log(formData);
    api
      .post(`/usuarios`, formData)
      .then((res) => {
        {
          showToastMessage(res.data.message, "sucess");
          setIsLogged(true);
          setUser(res.data.user);
          setToken(res.data.token);
          if (
            res.data.message ===
            "Usuario Administrador Criado e logado com sucesso!"
          ) {
            setIsAdmin(true);
            navigate("/dashboard");
          } else {
            navigate("/");
          }
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
          ? "h-full lg:h-full md:h-full sm:h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-all duration-500 bg-light font-dm"
          : "h-full lg:h-full md:h-full sm:h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-dark transition-all duration-500 font-dm"
      }
    >
      <div className="max-w-md w-full min-h-full space-y-8">
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
                  minLength: field.name === "ra" ? 9 : undefined,
                  maxLength:
                    field.name === "nome" || field.name === "email"
                      ? 30
                      : field.name === "ra"
                      ? 20
                      : undefined,
                  validate: (value: string) => {
                    if (field.name === "confirmar-senha") {
                      return value === watchPassword;
                    } else if (field.name === "email") {
                      return val.default.isEmail(value);
                    } else if (field.name === "imagem") {
                      if (value.length === 0) {
                        return true;
                      }
                      const acceptedFormats: string[] = [
                        "jpeg",
                        "png",
                        "jpg",
                        "gif",
                        "svg",
                      ];
                      const fileExtension: string = value[0]?.name
                        .split(".")
                        .pop()
                        .toLowerCase();
                      if (!acceptedFormats.includes(fileExtension)) {
                        return false;
                      }
                      return true;
                    }
                  },
                })}
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
