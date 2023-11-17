import FormHeader from "../../components/FormHeader";
import { signupFields } from "../../constants/formFields";
import FormInput from "../../components/FormInput";
import FormAction from "../../components/FormAction";
import { useForm } from "react-hook-form";
import * as val from "validator";
import showToastMessage from "../../utils/showToastMessage";

const Register = () => {
  const fields = signupFields;
  let fieldsState: any = {};
  fields.forEach((field) => (fieldsState[field.id] = ""));

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    reset();
    showToastMessage("Conta Criada e Logado com sucesso!", "sucess");
  };
  const watchPassword = watch("senha");
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full space-y-8">
        <FormHeader
          heading="Cadastre-se para criar uma conta"
          paragraph="Já tem uma conta? "
          linkName="Login"
          linkUrl="/Login"
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
