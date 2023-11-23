import { useTema } from "../../common/Tema";

export default function FormInput({
  value,
  labelText,
  labelFor,
  id,
  type,
  isRequired = false,
  placeholder,
  customClass,
  registerInput,
  errors,
  typeError,
  inputType,
}: any) {
  const { pegarTema } = useTema() as {
    setPegarTema: (value: string) => void;
    pegarTema: string;
  };
  const fixedInputClass: string =
    pegarTema === "light"
      ? "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm "
      : "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm ";

  const inputErrorClass =
    "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline";
  return (
    <div className="my-5">
      <label htmlFor={labelFor} className="sr-only">
        {labelText}
      </label>
      {inputType === "textarea" ? (
        <>
          <textarea
            value={value}
            id={id}
            type={type}
            rows={4}
            required={isRequired}
            className={errors ? inputErrorClass : fixedInputClass + customClass}
            placeholder={placeholder}
            {...registerInput}
          />
        </>
      ) : (
        <>
          <input
            value={value}
            id={id}
            type={type}
            required={isRequired}
            className={errors ? inputErrorClass : fixedInputClass + customClass}
            placeholder={placeholder}
            {...registerInput}
          />
        </>
      )}

      {typeError === "required" && (
        <div className="text-red-500 text-sm italic">
          Preencha o campo {id} corretamente!
        </div>
      )}
      {typeError === "validate" && id === "email" && (
        <div className="text-red-500 text-sm italic">Email invalido!</div>
      )}
      {typeError === "validate" && id === "confirmar-senha" ? (
        <div className="text-red-500 text-sm italic">Senhas não conferem</div>
      ) : null}
      {typeError === "minLength" && id === "ra" ? (
        <div className="text-red-500 text-sm italic">
          RA precisa ter no minimo 9 caracteres
        </div>
      ) : null}
    </div>
  );
}
