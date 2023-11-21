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
import useToken from "../../common/Token";
const Login = () => {
  const navigate = useNavigate();
  const fields = loginFields;
  let fieldsState: any = {};
  fields.forEach((field) => (fieldsState[field.id] = ""));
  const { setIsLogged, isLogged, setViewReport, setIsAnonymous, setIsAdmin } =
    useUser() as {
      setIsLogged: (value: boolean) => void;
      isLogged: boolean;
      isAdmin: boolean;
      setViewReport: (value: boolean) => void;
      setIsAnonymous: (value: boolean) => void;
      setIsAdmin: (value: boolean) => void;
    };

  if (isLogged) {
    navigate("Home");
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const { token } = useToken() as {
    token: string;
  };
  const onSubmit = (data: any) => {
    api.get("/sanctum/csrf-cookie").then((response) => {
      console.log(response.config);
      // api.post(`/login`, data).then((res: any) => {
      //   showToastMessage(res.data, "sucess");
      //   if (res.data === "Usuario Logado com Sucesso!") {
      //     setIsLogged(true);
      //     setViewReport(true);
      //     navigate("/");
      //   } else if (res.data === "Usuario Anonimo Logado com Sucesso!") {
      //     setViewReport(false);
      //     setIsAnonymous(true);
      //     setIsLogged(true);
      //     navigate("/");
      //   } else if (res.data === "Usuario Administrador Logado com Sucesso!") {
      //     setViewReport(true);
      //     setIsAdmin(true);
      //     setIsLogged(true);
      //     navigate("/");
      //   } else {
      //     console.log(res.data);
      //   }
      // });
    });
  };

  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full space-y-8">
        <FormHeader
          heading="Faça login na sua conta"
          paragraph="Não tem uma conta ainda? "
          linkName="Registrar"
          linkUrl="/register"
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
          </div>
        </form>
        <FormAction onClick={handleSubmit(onSubmit)} text="Entrar" />
      </div>
    </div>
  );
};

export default Login;