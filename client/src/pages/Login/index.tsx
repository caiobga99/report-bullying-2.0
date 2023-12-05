import FormHeader from "../../components/FormHeader";
import { loginFields } from "../../constants/formFields";
import FormInput from "../../components/FormInput";
import FormAction from "../../components/FormAction";
import { useForm } from "react-hook-form";
import * as val from "validator";
import showToastMessage from "../../utils/showToastMessage";
import useUser from "../../common/User";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { useTema } from "../../common/Tema";
const Login = () => {
  const navigate = useNavigate();
  const fields = loginFields;
  interface FormData {
    email: string;
    password: string;
    lembrarMe?: boolean;
  }
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };
  const {
    setIsLogged,
    isLogged,
    setViewReport,
    setIsAnonymous,
    setIsAdmin,
    setToken,
    setUser,
  } = useUser() as {
    setIsLogged: (value: boolean) => void;
    isLogged: boolean;
    isAdmin: boolean;
    setViewReport: (value: boolean) => void;
    setIsAnonymous: (value: boolean) => void;
    setIsAdmin: (value: boolean) => void;
    setToken: (value: string) => void;
    setUser: (value: object) => void;
  };

  if (isLogged) {
    navigate("/");
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    api.post(`/login`, data).then((res) => {
      console.log(res.data);
      setUser(res.data.user);
      setToken(res.data.token);
      switch (res.data.message) {
        case "Usuario Logado com Sucesso!":
          setIsLogged(true);
          showToastMessage(res.data.message, "sucess");
          setViewReport(true);
          navigate("/");
          break;
        case "Usuario Anonimo Logado com Sucesso!":
          showToastMessage(res.data.message, "sucess");
          setViewReport(false);
          setIsAnonymous(true);
          setIsLogged(true);
          navigate("/");
          break;
        case "Usuario Administrador Logado com Sucesso!":
          showToastMessage(res.data.message, "sucess");
          setViewReport(true);
          setIsAdmin(true);
          setIsLogged(true);
          navigate("/");
          break;

        default:
          showToastMessage(res.data.message, "error");
          console.log(res.data.message);
          break;
      }
    });
  };

  return (
    <div
      className={
        pegarTema === "light"
          ? "min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
          : "min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-dark"
      }
    >
      <div className="max-w-md w-full space-y-8 ">
        <FormHeader
          heading="Faça login na sua conta"
          paragraph="Não tem uma conta ainda? "
          linkName="Registrar"
          linkUrl="/register"
          theme={pegarTema}
        />
        <form className="mt-8 space-y-6">
          <div className="-space-y-px">
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
                  validate:
                    field.name === "email"
                      ? (value) => val.default.isEmail(value)
                      : undefined,
                })}
                errors={errors[field.name]?.ref?.type === field.name}
                typeError={errors[field.name]?.type}
              />
            ))}
            <div className="w-full flex items-center justify-between flex-wrap">
              <div className="w-52 ">
                <FormAction onClick={handleSubmit(onSubmit)} text="Entrar" />
              </div>
              <div className="w-52 ">
                <FormAction
                  action="button"
                  onClick={() =>
                    onSubmit({
                      password: "Anonimo@123",
                      email: "Anonimo@gmail.com",
                    })
                  }
                  text="Entrar Anonimamente"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
