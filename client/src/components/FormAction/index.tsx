interface FormActionProps {
  onClick: () => void;
  type?: string;
  action?: "button" | "submit";
  text: string;
  disabled?: boolean;
}

export default function FormAction({
  onClick,
  type = "button",
  action = "submit",
  disabled = false,
  text,
}: FormActionProps) {
  return (
    <>
      {type === "button" ? (
        <button
          type={action}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
