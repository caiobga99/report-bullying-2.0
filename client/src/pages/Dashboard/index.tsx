import { useEffect, useCallback, useState } from "react";
import api from "../../lib/api";
import { Denuncias, User } from "../../utils/protocols";
import { Spinner } from "flowbite-react";
import { Dropdown, Alert, Tooltip } from "flowbite-react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as TooltipChart,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  IdentificationIcon,
  CalendarDaysIcon,
  UserCircleIcon,
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
  Tooltip as TooltipMaterial,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
// import { format } from "date-fns";
import showToastMessage from "../../utils/showToastMessage";
import axios from "axios";
interface Links {
  url: string;
  active: boolean;
  label: string;
}
interface PageDetails {
  to: number;
  total: number;
}
const Dashboard = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [respostasLength, setRespostasLength] = useState<number>(0);
  const [comentariosLength, setComentariosLength] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [denunciasIsLoading, setDenunciasIsLoading] = useState<boolean>(true);
  const [respostasIsLoading, setRespostasIsLoading] = useState<boolean>(true);
  const [detailsIsLoading, setDetailsIsLoading] = useState<boolean>(true);
  const [usersLength, setUsersLength] = useState<number>(0);
  const [comentariosIsLoading, setComentariosIsLoading] =
    useState<boolean>(true);
  const [show, setShow] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<string>(
    "http://127.0.0.1:8000/usuarios?page=1&searchTerm="
  );
  const [denuncias, setDenuncias] = useState<Denuncias[]>([]);
  const [usersIsLoading, setUsersIsLoading] = useState<boolean>(true);
  const [details, setDetails] = useState([]);
  const [pageDetails, setPageDetails] = useState<PageDetails>({
    total: 0,
    to: 0,
  });

  const [links, setLinks] = useState<Links[]>([]);

  const fetchUsers = useCallback(() => {
    axios
      .get(`${page}${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setShow(false);
        setUsersIsLoading(false);
        setLinks(res.data.users.links);
        setPageDetails({ to: res.data.users.to, total: res.data.users.total });
        setIsLoading(false);
        setUsers(res.data.users.data);
        setDetails(res.data.details);
        console.log(res.data.details);
        setDetailsIsLoading(false);
        setUsersLength(res.data.total_usuarios);

        if (res.data.users.data.length <= 0) {
          setShow(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
        showToastMessage(err.message, "error");
      });
  }, [page, searchQuery]);
  const handleSearchSubmit = () => {
    setSearchQuery(searchTerm);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUsers();
    api
      .get("/denuncias")
      .then((res) => {
        setDenuncias(res.data);
        setDenunciasIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        showToastMessage(err.message, "error");
      });
    api
      .get("/respostas")
      .then((res) => {
        setRespostasLength(res.data.length);
        setRespostasIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        showToastMessage(err.message, "error");
      });
    api
      .get("/comentarios")
      .then((res) => {
        setComentariosLength(res.data.length);
        setComentariosIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        showToastMessage(err.message, "error");
      });
  }, [fetchUsers, searchQuery]);
  return (
    <div className="container min-h-screen min-w-full flex justify-center items-center bg-light dark:bg-gray-900 transition-all duration-500 font-dm">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-w-[90%] min-h-full ">
        <div className="flex gap-5 flex-wrap items-center justify-center">
          <div className="min-w-0 w-[80%] lg:w-max md:w-max sm:w-max  rounded-lg shadow-xs overflow-hidden  bg-white dark:bg-gray-800 transition-all duration-500">
            <div className="p-4 flex items-center">
              <div className="p-3 rounded-full text-orange-500 transition-all duration-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-5 h-5"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
              </div>
              <div>
                <p className="mb-2 transition-all duration-500 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total de Usuarios
                </p>
                {usersIsLoading ? (
                  <div className="flex items-center justify-center pr-5">
                    <Spinner />
                  </div>
                ) : (
                  <p className="text-lg font-semibold transition-all duration-500 text-gray-700 dark:text-gray-200">
                    {usersLength}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="min-w-0 w-[80%] lg:w-max md:w-max sm:w-max  rounded-lg shadow-xs overflow-hidden bg-white  dark:bg-gray-800 transition-all duration-500">
            <div className="p-4 flex items-center">
              <div className="p-3 rounded-full text-teal-500 dark:text-teal-100 transition-all duration-500 bg-teal-100 dark:bg-[#8884D8] mr-4">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400 transition-all duration-500">
                  Total de Denuncias
                </p>
                {denunciasIsLoading ? (
                  <div className="flex items-center justify-center pr-5">
                    <Spinner />
                  </div>
                ) : (
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 transition-all duration-500">
                    {denuncias.length}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="min-w-0 w-[80%] lg:w-max md:w-max sm:w-max  rounded-lg shadow-xs overflow-hidden  bg-white dark:bg-gray-800 transition-all duration-500">
            <div className="p-4 flex items-center">
              <div className="p-3 rounded-full text-gray-500 transition-all duration-500 dark:text-gray-100 bg-gray-100 dark:bg-gray-500 mr-4">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400 transition-all duration-500">
                  Total de Respostas
                </p>
                {respostasIsLoading ? (
                  <div className="flex items-center justify-center pr-5">
                    <Spinner />
                  </div>
                ) : (
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 transition-all duration-500">
                    {respostasLength}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="min-w-0 w-[80%] lg:w-max md:w-max sm:w-max  rounded-lg shadow-xs overflow-hidden  bg-white dark:bg-gray-800 transition-all duration-500">
            <div className="p-4 flex items-center">
              <div className="p-3 rounded-full text-green-500 transition-all duration-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400 transition-all duration-500">
                  Total de Comentarios
                </p>
                {comentariosIsLoading ? (
                  <div className="flex items-center justify-center pr-5">
                    <Spinner />
                  </div>
                ) : (
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 transition-all duration-500">
                    {comentariosLength}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="h-[45vh] w-full mt-8">
          <ResponsiveContainer
            width={"100%"}
            height={300}
            className={detailsIsLoading && "flex items-center justify-center"}
          >
            {detailsIsLoading ? (
              <Spinner />
            ) : (
              <BarChart
                width={500}
                height={300}
                data={details}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <TooltipChart />
                <Legend />
                <Bar
                  dataKey="Denuncias"
                  fill="#8884d8"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
                <Bar
                  dataKey="Comentarios"
                  fill="#82ca9d"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-light dark:bg-gray-900 transition-all duration-500">
          <div className="flex gap-4 items-center">
            <Dropdown label="Pesquise por" size="sm" color="gray">
              <Dropdown.Item>E-mail</Dropdown.Item>
              <Dropdown.Item>Nome</Dropdown.Item>
              <Dropdown.Item>RA</Dropdown.Item>
              <Dropdown.Item>ID</Dropdown.Item>
            </Dropdown>
            <Tooltip
              theme={{
                style: {
                  dark: "bg-gray-900 text-white dark:bg-gray-600",
                },
                arrow: {
                  style: {
                    dark: "bg-gray-900 dark:bg-gray-600",
                  },
                },
              }}
              animation="duration-500"
              content="Aqui está todas as formas de pesquisa!"
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
              <Tooltip
                theme={{
                  style: {
                    dark: "bg-gray-900 text-white dark:bg-gray-600",
                  },
                  arrow: {
                    style: {
                      dark: "bg-gray-900 dark:bg-gray-600",
                    },
                  },
                }}
                animation="duration-500"
                content="Clique na lupa para pesquisar!"
              >
                <>
                  <div
                    className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 cursor-pointer"
                    onClick={handleSearchSubmit}
                  >
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
                    placeholder="Pesquise usuarios..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </>
              </Tooltip>
            </div>
            {show && !isLoading && (
              <div className="block pt-2 ps-10">
                <Alert color="warning" withBorderAccent>
                  <span className="font-medium">
                    Nenhum usuario foi encontrado com sua pesquisa!
                  </span>{" "}
                </Alert>
              </div>
            )}
          </div>
        </div>
        {isLoading ? (
          <div className="min-h-[15vh] min-w-[15vh] flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 transition-all duration-500">
              <thead className="text-xs text-gray-700 uppercase bg-light dark:bg-gray-700 dark:text-gray-400 transition-all duration-500">
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
                  <th scope="col" className="px-6 py-3 flex items-center gap-2">
                    Ação
                    <Tooltip
                      theme={{
                        style: {
                          dark: "bg-gray-900 text-white dark:bg-gray-600",
                        },
                        arrow: {
                          style: {
                            dark: "bg-gray-900 dark:bg-gray-600",
                          },
                        },
                      }}
                      animation="duration-500"
                      content="Clique em 'Visualizar Usuario' para abrir um popover!"
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
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => {
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
                        className="bg-white border-b dark:bg-gray-800 transition-all duration-500 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        key={user.id_usuario}
                      >
                        <th
                          scope="row"
                          className="flex items-center px-6 py-4 transition-all duration-500 text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <img
                            className="w-10 h-10 rounded-full"
                            src={`http://127.0.0.1:8000/storage/image_profile/${
                              user?.image.split("/")[1]
                            }`}
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
                          <PopoverHandler>
                            <span className="font-medium transition-all duration-500 text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer">
                              Visualizar Usuario
                            </span>
                          </PopoverHandler>
                        </td>
                      </tr>
                      <PopoverContent className="w-72">
                        <div className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4">
                          <Avatar
                            src={`http://127.0.0.1:8000/storage/image_profile/${
                              user?.image.split("/")[1]
                            }`}
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
                          >
                            <ListItemPrefix>
                              <CalendarDaysIcon width={20} height={20} />
                            </ListItemPrefix>
                            {user!.total_comentarios === 1
                              ? `${user!.total_comentarios} Comentario`
                              : `${user!.total_comentarios} Comentarios`}
                          </ListItem>{" "}
                          <ListItem
                            className="hover:bg-white hover:text-gray-600 hover:cursor-default"
                            ripple={false}
                          >
                            <ListItemPrefix>
                              <IdentificationIcon
                                width="20"
                                height="20"
                                fill="none"
                              />
                            </ListItemPrefix>
                            {user!.total_denuncias === 1
                              ? `${user!.total_denuncias} Denuncia`
                              : `${user!.total_denuncias} Denuncias`}
                          </ListItem>
                          <TooltipMaterial
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}
                            className="bg-gray-900 text-white dark:bg-gray-600 transition-all duration-500"
                            content="Clique em 'Perfil' para ir à uma nova pagina!"
                          >
                            <Link to={`/profile/${user.id_usuario}`}>
                              <ListItem
                                color="blue"
                                className="hover:bg-blue-300 hover:text-black w-full"
                              >
                                <ListItemPrefix>
                                  <UserCircleIcon
                                    width="20"
                                    height="20"
                                    fill="none"
                                  />
                                </ListItemPrefix>
                                Perfil
                              </ListItem>
                            </Link>
                          </TooltipMaterial>
                          <TooltipMaterial
                            className="bg-gray-900 text-white dark:bg-gray-600 transition-all duration-500"
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}
                            content="Clique em 'TimeLine' para ir à uma nova pagina!"
                          >
                            <Link to={`/timeline/${user.id_usuario}`}>
                              <ListItem
                                color="blue"
                                className="hover:bg-blue-300 hover:text-black"
                              >
                                <ListItemPrefix>
                                  <svg
                                    id="Timeline"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                  >
                                    <rect
                                      width="24"
                                      height="24"
                                      stroke="none"
                                      fill="#000000"
                                      opacity="0"
                                    />

                                    <g transform="matrix(0.48 0 0 0.48 12 12)">
                                      <path
                                        fill="rgb(0,0,0)"
                                        stroke="none"
                                        strokeWidth={1}
                                        strokeDasharray="none"
                                        strokeLinecap="butt"
                                        strokeDashoffset={0}
                                        strokeLinejoin="miter"
                                        strokeMiterlimit={4}
                                        fillRule="nonzero"
                                        opacity={1}
                                        transform=" translate(-25, -25)"
                                        d="M 4.984375 3.9863281 C 4.432858843006732 3.99494917319965 3.992447335556201 4.448468177176025 4 4.999999999999999 L 4 9.8320312 C 3.9821509739847603 9.940022572157691 3.98215097398476 10.050211627842309 4 10.158203 L 4 24.832031 C 3.9821509519471583 24.940022437464606 3.9821509519471583 25.050211562535395 4 25.158203 L 4 39.832031 C 3.9821509519471583 39.940022437464606 3.9821509519471583 40.050211562535395 4 40.158203 L 4 45 C 3.994899710454515 45.36063591657757 4.184375296169332 45.696081364571604 4.495872849714331 45.877887721486516 C 4.80737040325933 46.05969407840143 5.192629596740671 46.05969407840143 5.50412715028567 45.877887721486516 C 5.815624703830668 45.696081364571604 6.005100289545485 45.36063591657757 6 45 L 6 41 L 8.1445312 41 C 8.5944085 42.715786 10.149698 44 12 44 C 13.850301 44 15.405591 42.715786 15.855469 41 L 45 41 C 45.36063591657757 41.00510028954548 45.696081364571604 40.81562470383067 45.877887721486516 40.50412715028567 C 46.05969407840143 40.19262959674067 46.05969407840143 39.80737040325933 45.877887721486516 39.49587284971433 C 45.696081364571604 39.184375296169335 45.36063591657757 38.99489971045452 45 39 L 15.855469 39 C 15.405591 37.284214 13.850301 36 12 36 C 10.149698 36 8.5944085 37.284214 8.1445312 39 L 6 39 L 6 26 L 33.144531 26 C 33.594409 27.715786 35.149699 29 37 29 C 38.850301 29 40.405591 27.715786 40.855469 26 L 45 26 C 45.36063591657757 26.005100289545485 45.696081364571604 25.815624703830668 45.877887721486516 25.50412715028567 C 46.05969407840143 25.19262959674067 46.05969407840143 24.80737040325933 45.877887721486516 24.49587284971433 C 45.696081364571604 24.184375296169332 45.36063591657757 23.994899710454515 45 24 L 40.855469 24 C 40.405591 22.284214 38.850301 21 37 21 C 35.149699 21 33.594409 22.284214 33.144531 24 L 6 24 L 6 11 L 19.144531 11 C 19.594409 12.715786 21.149699 14 23 14 C 24.850301 14 26.405591 12.715786 26.855469 11 L 45 11 C 45.36063591657757 11.005100289545485 45.696081364571604 10.815624703830668 45.877887721486516 10.504127150285669 C 46.05969407840143 10.192629596740671 46.05969407840143 9.80737040325933 45.877887721486516 9.495872849714331 C 45.696081364571604 9.184375296169332 45.36063591657757 8.994899710454515 45 9 L 26.855469 9 C 26.405591 7.2842135 24.850301 6 23 6 C 21.149699 6 19.594409 7.2842135 19.144531 9 L 6 9 L 6 5 C 6.003701433733636 4.729699684396449 5.897823285435063 4.4694133893859505 5.706490296584608 4.278448343881243 C 5.515157307734153 4.087483298376533 5.25466768994374 3.982106371676088 4.984375 3.9863281 z M 23 8 C 24.085528 8 24.943181 8.837639 24.990234 9.9101562 C 24.984724270348547 9.970577787922918 24.984724270348547 10.03137541207708 24.990234 10.091797 C 24.94221 11.163368 24.084864 12 23 12 C 21.914472 12 21.056819 11.162361 21.009766 10.089844 C 21.01527573573066 10.029422378951342 21.01527573573066 9.968624721048657 21.009766 9.9082031 C 21.05779 8.8366323 21.915136 8 23 8 z M 37 23 C 38.085528 23 38.943181 23.837639 38.990234 24.910156 C 38.98472425819013 24.970577654174395 38.98472425819013 25.031375345825605 38.990234 25.091797 C 38.94221 26.163368 38.084864 27 37 27 C 35.914472 27 35.056819 26.162361 35.009766 25.089844 C 35.01527574180987 25.029422345825605 35.01527574180987 24.968624654174395 35.009766 24.908203 C 35.05779 23.836632 35.915136 23 37 23 z M 12 38 C 13.085528 38 13.943181 38.837639 13.990234 39.910156 C 13.984724258190125 39.9705776541744 13.984724258190125 40.0313753458256 13.990234 40.091797 C 13.94221 41.163368 13.084864 42 12 42 C 10.914472 42 10.056819 41.162361 10.009766 40.089844 C 10.015275741809875 40.0294223458256 10.015275741809875 39.9686246541744 10.009766 39.908203 C 10.05779 38.836632 10.915136 38 12 38 z"
                                      />
                                    </g>
                                  </svg>
                                </ListItemPrefix>
                                TimeLine
                              </ListItem>
                            </Link>
                          </TooltipMaterial>
                        </List>
                      </PopoverContent>
                    </Popover>
                  );
                })}
              </tbody>
            </table>
            <nav
              className="flex items-center flex-wrap md:flex-row justify-center md:justify-between lg:justify-between pt-4 "
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal  pl-2 text-gray-500 transition-all duration-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                Mostrando{" "}
                <span className="font-semibold text-gray-900 transition-all duration-500 dark:text-white">
                  {!pageDetails.to ? 0 : pageDetails.to}
                </span>{" "}
                de{" "}
                <span className="font-semibold text-gray-900 transition-all duration-500 dark:text-white">
                  {pageDetails.total}
                </span>
              </span>
              <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 pr-2 pb-10">
                {links.map((link, index) => (
                  <li key={index}>
                    <span
                      className={
                        !link.active
                          ? "flex items-center justify-center px-3 h-8 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 transition-all duration-500  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
                          : "flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 transition-all duration-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                      }
                      onClick={() => {
                        !link.url
                          ? setPage(
                              "http://127.0.0.1:8000/usuarios?page=1&searchTerm="
                            )
                          : setPage(link.url + "&searchTerm=");
                      }}
                    >
                      {link.label === "&laquo; Previous"
                        ? "Anterior"
                        : link.label === "Next &raquo;"
                        ? "Proximo"
                        : link.label}
                    </span>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
