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
import Cookies from "js-cookie";
const Register = () => {
  const fields = signupFields;
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
  const onSubmit = ({ nome, email, senha, ra }: any) => {
    api
      .get("/sanctum/csrf-cookie", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.headers);
        const token: string = "teste";
        console.log(response + " Token");
        api
          .post(
            `/usuarios`,
            {
              email: email,
              password: senha,
              RA: ra,
              nome: nome,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
              xsrfHeaderName: "X-XSRF-TOKEN",
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res + " POST");
            {
              if (
                res.data ===
                "Usuario Administrador Criado e logado com sucesso!"
              ) {
                setIsAdmin(true);
              }
              showToastMessage(res.data, "sucess");
              setIsLogged(true);
              console.log(res.data);
              navigate("/Home");
            }
          })
          .catch((error) => {
            console.log(error.message);
            if (error.message === "Request failed with status code 500") {
              showToastMessage("Usuario já existente", "error");
            }
          });
      });
  };
  const watchPassword = watch("senha");
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full space-y-8">
        <FormHeader
          heading="Cadastre-se para criar uma conta"
          paragraph="Já tem uma conta? "
          linkName="Login"
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
