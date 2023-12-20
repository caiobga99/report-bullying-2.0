import { UseFormRegisterReturn } from "react-hook-form";
import { useTema } from "../../common/Tema";
interface FormInput {
  value?: string;
  labelText?: string;
  labelFor?: string;
  id: string;
  type: string;
  isRequired: boolean;
  placeholder: string;
  customClass?: string;
  registerInput: UseFormRegisterReturn<string>;
  typeError: unknown;
  inputType?: string;
}

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
  typeError,
  inputType,
}: FormInput) {
  const { pegarTema } = useTema() as {
    setPegarTema: (value: string) => void;
    pegarTema: string;
  };
  const fixedInputClass: string =
    pegarTema === "light"
      ? "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm "
      : "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm ";

  const inputErrorClass =
    "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-red-700 mb-3 leading-tight focus:outline-none focus:shadow-outline";
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
            rows={4}
            required={isRequired}
            className={
              typeError ? inputErrorClass : fixedInputClass + customClass
            }
            placeholder={placeholder}
            {...registerInput}
          />
        </>
      ) : type === "file" ? (
        <>
          <input
            value={value}
            id={id}
            className={
              typeError
                ? "border-red-500 rounded-lg block w-full text-sm text-red-500 border cursor-pointer bg-gray-50 dark:text-red-500 focus:outline-none dark:bg-gray-700 dark:border-red-500 dark:placeholder-gray-400"
                : "block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            }
            required={isRequired}
            type="file"
            {...registerInput}
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            *Opcional* SVG, PNG, JPG, JPEG or GIF.
          </p>
        </>
      ) : (
        <>
          <input
            value={value}
            id={id}
            type={type}
            required={isRequired}
            className={
              typeError ? inputErrorClass : fixedInputClass + customClass
            }
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
      {typeError === "validate" && id === "imagem" ? (
        <div className="text-red-500 text-sm italic">
          Formato de arquivo inválido. Somente arquivos png/jpeg/jpg/gif/svg são
          permitidos.
        </div>
      ) : null}
      {typeError === "minLength" && id === "ra" ? (
        <div className="text-red-500 text-sm italic">
          RA precisa ter no minimo 9 caracteres
        </div>
      ) : null}
    </div>
  );
}
