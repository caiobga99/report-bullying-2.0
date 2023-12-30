interface UserCardProps {
  nome?: string;
  email?: string;
  ra?: string;
  tipo_usuario?: "Anonimo" | "Admin" | "Comum";
  created_at?: string;
  quantidade_denuncias?: number;
  theme: string;
}
const UserCard = ({
  nome,
  email,
  ra,
  tipo_usuario,
  created_at,
  quantidade_denuncias,
  theme,
}: UserCardProps) => {
  return (
    <div
      className={
        theme === "dark"
          ? "max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-24 border-gray-200  hover:bg-gray-100 font-dm"
          : "max-w-xs mx-auto bg-dark rounded-lg shadow-md overflow-hidden mt-24 border-gray-700 hover:bg-gray-700 font-dm"
      }
    >
      <div
        className={
          theme === "dark" ? "bg-gray-100 px-4 py-2" : "px-4 py-2 bg-gray-700"
        }
      >
        <h2
          className={
            theme === "light"
              ? "text-lg font-bold text-white"
              : "text-lg font-bold text-gray-900"
          }
        >
          {nome}
        </h2>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-col items-start justify-between mb-6">
          <span
            className={
              theme === "light"
                ? "text-sm font-medium text-white"
                : "text-sm font-medium text-gray-600"
            }
          >
            E-mail
          </span>
          <span
            className={
              theme === "light"
                ? "text-lg font-medium text-white"
                : "text-lg font-medium text-gray-900"
            }
          >
            {nome === "Anonimo" ? "**********" : email}
          </span>
        </div>
        <div className="flex flex-col items-start justify-between mb-6">
          <span
            className={
              theme === "light"
                ? "text-sm font-medium text-white"
                : "text-sm font-medium text-gray-600"
            }
          >
            Nome
          </span>
          <span
            className={
              theme === "light"
                ? "text-lg font-medium text-white"
                : "text-lg font-medium text-gray-900"
            }
          >
            {nome === "Anonimo" ? "**********" : nome}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between mb-6">
          <div className="flex flex-col items-start">
            <span
              className={
                theme === "light"
                  ? "text-sm font-medium text-white"
                  : "text-sm font-medium text-gray-600"
              }
            >
              Usuario criado em
            </span>
            <span
              className={
                theme === "light"
                  ? "text-lg font-medium text-white"
                  : "text-lg font-medium text-gray-900"
              }
            >
              {nome === "Anonimo" ? "**********" : created_at}
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span
              className={
                theme === "light"
                  ? "text-sm font-medium text-white"
                  : "text-sm font-medium text-gray-600"
              }
            >
              Denuncias
            </span>
            <span
              className={
                theme === "light"
                  ? "text-lg font-medium text-white"
                  : "text-lg font-medium text-gray-900"
              }
            >
              {quantidade_denuncias}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-start">
            <span
              className={
                theme === "light"
                  ? "text-sm font-medium text-white"
                  : "text-sm font-medium text-gray-600"
              }
            >
              RA
            </span>
            <span
              className={
                theme === "light"
                  ? "text-lg font-medium text-white"
                  : "text-lg font-medium text-gray-900"
              }
            >
              {nome === "Anonimo" ? "**********" : ra}
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span
              className={
                theme === "light"
                  ? "text-sm font-medium text-white"
                  : "text-sm font-medium text-gray-600"
              }
            >
              Tipo Usuario
            </span>
            <span
              className={
                theme === "light"
                  ? "text-lg font-medium text-white"
                  : "text-lg font-medium text-gray-900"
              }
            >
              {tipo_usuario}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
