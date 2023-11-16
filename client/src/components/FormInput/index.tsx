const fixedInputClass =
  "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";
import { useForm } from "react-hook-form";
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
}: any) {
  const {} = useForm();
  return (
    <div className="my-5">
      <label htmlFor={labelFor} className="sr-only">
        {labelText}
      </label>
      <input
        value={value}
        id={id}
        type={type}
        required={isRequired}
        className={fixedInputClass + customClass}
        placeholder={placeholder}
        {...registerInput}
      />
    </div>
  );
}
