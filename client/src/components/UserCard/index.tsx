interface UserCardProps {
  nome?: string;
  email?: string;
  ra?: string;
  tipo_usuario?: "Anonimo" | "Admin" | "Comum";
  created_at?: string;
  quantidade_denuncias?: number;
}
const UserCard = ({
  nome,
  email,
  ra,
  tipo_usuario,
  created_at,
  quantidade_denuncias,
}: UserCardProps) => {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-24 border-gray-200  hover:bg-gray-100 font-dm">
      <div className="bg-gray-100 px-4 py-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {nome}
        </h2>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-col items-start justify-between mb-6">
          <span className="text-sm font-medium text-gray-600">E-mail</span>
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            {email}
          </span>
        </div>
        <div className="flex flex-col items-start justify-between mb-6">
          <span className="text-sm font-medium text-gray-600">Nome</span>
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            {nome}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between mb-6">
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-600">
              Usuario criado em
            </span>
            <span className="text-lg font-medium text-gray-900 dark:text-white">
              {nome === "Anonimo" ? "00/00/0000" : created_at}
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-600">Denuncias</span>
            <span className="text-lg font-medium text-gray-900 dark:text-white">
              {quantidade_denuncias}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-600">RA</span>
            <span className="text-lg font-medium text-gray-900 dark:text-white">
              {ra}
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-600">
              Tipo Usuario
            </span>
            <span className="text-lg font-medium text-gray-900 dark:text-white">
              {tipo_usuario}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
