import { useState } from "react";
import FormHeader from "../../components/FormHeader";
import { loginFields } from "../../constants/formFields";
import FormInput from "../../components/FormInput";
import FormAction from "../../components/FormAction";
import { useForm } from "react-hook-form";

const Login = () => {
  const fields = loginFields;
  let fieldsState: any = {};
  fields.forEach((field) => (fieldsState[field.id] = ""));

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };

  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <FormHeader
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="Signup"
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
                })}
                customClass={errors?.name ? "outline-red-600" : ""}
              />
            ))}
          </div>
        </form>
        <FormAction onClick={handleSubmit(onSubmit)} text="Login" />
      </div>
    </div>
  );
};

export default Login;
