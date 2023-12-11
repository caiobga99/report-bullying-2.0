import { useEffect, useMemo, useState } from "react";
import reportBullyingLogo from "../../assets/logo.svg";
import api from "../../lib/api";
import { User } from "../../utils/protocols";
import { Spinner } from "flowbite-react";
import { Dropdown, Alert } from "flowbite-react";
import {
  EllipsisHorizontalCircleIcon,
  IdentificationIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
  Avatar,
  ListItemPrefix,
  List,
  ListItem,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
const Dashboard = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [searchType, setSearchType] = useState<
    "email" | "RA" | "id_usuario" | "nome"
  >("email");
  useEffect(() => {
    api
      .get("/usuarios")
      .then((res) => {
        setIsLoading(false);
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  const filteredUsers = useMemo(() => {
    const check = users?.filter((user) =>
      user[searchType]?.toLowerCase().includes(search.trim().toLowerCase())
    );
    check?.length === 0 && search.length !== 0 ? setShow(true) : setShow(false);
    return check;
  }, [search, users, searchType]);
  return (
    <div className="container min-h-screen min-w-full flex justify-center items-center bg-light dark:bg-gray-900 transition-all duration-500 font-dm">
      {isLoading ? (
        <div className="min-h-screen min-w-screen flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-w-[80%] min-h-full">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-light dark:bg-gray-900">
            <div className="flex gap-4 items-center">
              <Dropdown
                label="Pesquise por"
                size="sm"
                color="gray"
                value={searchType}
              >
                <Dropdown.Item
                  onClick={() => setSearchType("email")}
                  className={
                    searchType === "email"
                      ? "dark:bg-blue-gray-600 bg-blue-gray-100"
                      : ""
                  }
                >
                  E-mail
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setSearchType("nome")}
                  className={
                    searchType === "nome"
                      ? "dark:bg-blue-gray-600 bg-blue-gray-100"
                      : ""
                  }
                >
                  Nome
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setSearchType("RA")}
                  className={
                    searchType === "RA"
                      ? "dark:bg-blue-gray-600 bg-blue-gray-100"
                      : ""
                  }
                >
                  RA
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setSearchType("id_usuario")}
                  className={
                    searchType === "id_usuario"
                      ? "dark:bg-blue-gray-600 bg-blue-gray-100"
                      : ""
                  }
                >
                  ID
                </Dropdown.Item>
              </Dropdown>
              <Tooltip
                content="Selecione a forma do filtro de pesquisa!"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5 cursor-pointer text-blue-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
              </Tooltip>
            </div>
            <label className="sr-only">Pesquisar</label>
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={`Pesquisar usuarios por ${searchType}`}
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              {show && (
                <div className="block pt-2 ps-10">
                  <Alert color="warning" withBorderAccent>
                    <span className="font-medium">
                      Não foi possivel encontrar nenhum usuario com esse{" "}
                      {searchType}!
                    </span>{" "}
                  </Alert>
                </div>
              )}
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-light dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3">
                  RA
                </th>
                <th scope="col" className="px-6 py-3">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-3">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              {search.length <= 0
                ? users?.map((user) => {
                    return (
                      <Popover
                        placement="bottom-end"
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                        key={user.id_usuario}
                      >
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          key={user.id_usuario}
                        >
                          <th
                            scope="row"
                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <img
                              className="w-10 h-10 rounded-full"
                              src={reportBullyingLogo}
                              alt="User Image"
                            />
                            <div className="ps-3">
                              <div className="text-base font-semibold">
                                {user?.nome}
                              </div>
                              <div className="font-normal text-gray-500">
                                {user?.email}
                              </div>
                            </div>
                          </th>
                          <td className="px-6 py-4">{user?.RA}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div
                                className={`h-2.5 w-2.5 rounded-full me-2 ${
                                  user?.tipo_usuario
                                    ? "bg-green-500"
                                    : user?.RA === "Anonimo"
                                    ? "bg-brown-500"
                                    : "bg-gray-500"
                                }`}
                              ></div>
                              {user?.tipo_usuario
                                ? "Admin"
                                : user?.RA === "Anonimo"
                                ? "Anonimo"
                                : "Comum"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <PopoverHandler>
                                <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer">
                                  Visualizar Usuario
                                </span>
                              </PopoverHandler>
                              <Tooltip
                                content="Clique em 'Visualizar Usuario' para abrir um popover!"
                                animate={{
                                  mount: { scale: 1, y: 0 },
                                  unmount: { scale: 0, y: 25 },
                                }}
                              >
                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="h-5 w-5 cursor-pointer text-blue-gray-500"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                    />
                                  </svg>
                                </div>
                              </Tooltip>
                            </div>
                          </td>
                        </tr>
                        <PopoverContent className="w-72">
                          <div className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4">
                            <Avatar
                              src={reportBullyingLogo}
                              alt="Report Bullying Logo"
                            />
                            <div>
                              <Typography variant="h6" color="blue-gray">
                                {user.nome}
                              </Typography>
                              <Typography
                                variant="small"
                                color="gray"
                                className="font-medium text-blue-gray-500"
                              >
                                {user.email}
                              </Typography>
                            </div>
                          </div>
                          <List>
                            <ListItem
                              className="hover:bg-white hover:text-gray-600 hover:cursor-default"
                              ripple={false}
                              selected={false}
                            >
                              <ListItemPrefix>
                                <IdentificationIcon
                                  width="20"
                                  height="20"
                                  fill="none"
                                />
                              </ListItemPrefix>
                              {user.id_usuario}
                            </ListItem>
                            <ListItem
                              className="hover:bg-white hover:text-gray-600 hover:cursor-default"
                              ripple={false}
                              selected={false}
                            >
                              <ListItemPrefix>
                                <CalendarDaysIcon width={20} height={20} />
                              </ListItemPrefix>
                              {format(
                                new Date(user.created_at),
                                "dd/MM/yyyy"
                              ).toString()}
                            </ListItem>
                            <Tooltip
                              content="Clique em 'Mais detalhes' para à uma nova pagina!"
                              animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                              }}
                            >
                              <Link to={`/user/${user.id_usuario}`}>
                                <ListItem
                                  color="blue"
                                  selected={true}
                                  defaultChecked={true}
                                  className="hover:bg-blue-300 hover:text-black"
                                >
                                  <ListItemPrefix>
                                    <EllipsisHorizontalCircleIcon
                                      width="20"
                                      height="20"
                                      fill="none"
                                    />
                                  </ListItemPrefix>
                                  Mais detalhes
                                </ListItem>
                              </Link>
                            </Tooltip>
                          </List>
                        </PopoverContent>
                      </Popover>
                    );
                  })
                : filteredUsers?.map((user) => {
                  return (
                    <Popover
                      placement="bottom-end"
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                      key={user.id_usuario}
                    >
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        key={user.id_usuario}
                      >
                        <th
                          scope="row"
                          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <img
                            className="w-10 h-10 rounded-full"
                            src={reportBullyingLogo}
                            alt="User Image"
                          />
                          <div className="ps-3">
                            <div className="text-base font-semibold">
                              {user?.nome}
                            </div>
                            <div className="font-normal text-gray-500">
                              {user?.email}
                            </div>
                          </div>
                        </th>
                        <td className="px-6 py-4">{user?.RA}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div
                              className={`h-2.5 w-2.5 rounded-full me-2 ${
                                user?.tipo_usuario
                                  ? "bg-green-500"
                                  : user?.RA === "Anonimo"
                                  ? "bg-brown-500"
                                  : "bg-gray-500"
                              }`}
                            ></div>
                            {user?.tipo_usuario
                              ? "Admin"
                              : user?.RA === "Anonimo"
                              ? "Anonimo"
                              : "Comum"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <PopoverHandler>
                              <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer">
                                Visualizar Usuario
                              </span>
                            </PopoverHandler>
                            <Tooltip
                              content="Clique em 'Visualizar Usuario' para abrir um popover!"
                              animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                              }}
                            >
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  className="h-5 w-5 cursor-pointer text-blue-gray-500"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                  />
                                </svg>
                              </div>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                      <PopoverContent className="w-72">
                        <div className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4">
                          <Avatar
                            src={reportBullyingLogo}
                            alt="Report Bullying Logo"
                          />
                          <div>
                            <Typography variant="h6" color="blue-gray">
                              {user.nome}
                            </Typography>
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-medium text-blue-gray-500"
                            >
                              {user.email}
                            </Typography>
                          </div>
                        </div>
                        <List>
                          <ListItem
                            className="hover:bg-white hover:text-gray-600 hover:cursor-default"
                            ripple={false}
                            selected={false}
                          >
                            <ListItemPrefix>
                              <IdentificationIcon
                                width="20"
                                height="20"
                                fill="none"
                              />
                            </ListItemPrefix>
                            {user.id_usuario}
                          </ListItem>
                          <ListItem
                            className="hover:bg-white hover:text-gray-600 hover:cursor-default"
                            ripple={false}
                            selected={false}
                          >
                            <ListItemPrefix>
                              <CalendarDaysIcon width={20} height={20} />
                            </ListItemPrefix>
                            {format(
                              new Date(user.created_at),
                              "dd/MM/yyyy"
                            ).toString()}
                          </ListItem>
                          <Tooltip
                            content="Clique em 'Mais detalhes' para à uma nova pagina!"
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}
                          >
                            <Link to={`/user/${user.id_usuario}`}>
                              <ListItem
                                color="blue"
                                selected={true}
                                defaultChecked={true}
                                className="hover:bg-blue-300 hover:text-black"
                              >
                                <ListItemPrefix>
                                  <EllipsisHorizontalCircleIcon
                                    width="20"
                                    height="20"
                                    fill="none"
                                  />
                                </ListItemPrefix>
                                Mais detalhes
                              </ListItem>
                            </Link>
                          </Tooltip>
                        </List>
                      </PopoverContent>
                    </Popover>
                  );
                  })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
