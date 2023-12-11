import { useEffect, useMemo, useState } from "react";
import reportBullyingLogo from "../../assets/logo.svg";
import api from "../../lib/api";
import { User } from "../../utils/protocols";
import { Spinner } from "flowbite-react";
import { Dropdown, Alert } from "flowbite-react";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
  Avatar,
  ListItemPrefix,
  List,
  ListItem,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
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
    <div className="container min-h-screen min-w-full flex justify-center items-center bg-light dark:bg-gray-900 transition-all duration-500">
      {isLoading ? (
        <div className="min-h-screen min-w-screen flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-w-[80%] min-h-full">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-light dark:bg-gray-900">
            <div>
              <Dropdown
                label="Pesquise"
                size="sm"
                color="gray"
                value={searchType}
              >
                <Dropdown.Item
                  onClick={() => setSearchType("email")}
                  className={searchType === "email" ? "bg-blue-gray-600" : ""}
                >
                  E-mail
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setSearchType("nome")}
                  className={searchType === "nome" ? "bg-blue-gray-600" : ""}
                >
                  Nome
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setSearchType("RA")}
                  className={searchType === "RA" ? "bg-blue-gray-600" : ""}
                >
                  RA
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setSearchType("id_usuario")}
                  className={
                    searchType === "id_usuario" ? "bg-blue-gray-600" : ""
                  }
                >
                  ID
                </Dropdown.Item>
              </Dropdown>
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
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                            <PopoverHandler>
                              <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer">
                                Visualizar Usuario
                              </span>
                            </PopoverHandler>
                          </td>
                        </tr>
                        <PopoverContent className="w-72">
                          <div
                            className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4 hover:cursor-pointer"
                            onClick={() => navigate(`/user/${user.id_usuario}`)}
                          >
                            <Avatar
                              src={reportBullyingLogo}
                              alt="tania andrew"
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
                            <ListItem>
                              <ListItemPrefix>
                                <svg
                                  width="14"
                                  height="16"
                                  viewBox="0 0 14 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1 2C1 1.46957 1.21071 0.960859 1.58579 0.585786C1.96086 0.210714 2.46957 0 3 0H11C11.5304 0 12.0391 0.210714 12.4142 0.585786C12.7893 0.960859 13 1.46957 13 2V14C13.2652 14 13.5196 14.1054 13.7071 14.2929C13.8946 14.4804 14 14.7348 14 15C14 15.2652 13.8946 15.5196 13.7071 15.7071C13.5196 15.8946 13.2652 16 13 16H10C9.73478 16 9.48043 15.8946 9.29289 15.7071C9.10536 15.5196 9 15.2652 9 15V13C9 12.7348 8.89464 12.4804 8.70711 12.2929C8.51957 12.1054 8.26522 12 8 12H6C5.73478 12 5.48043 12.1054 5.29289 12.2929C5.10536 12.4804 5 12.7348 5 13V15C5 15.2652 4.89464 15.5196 4.70711 15.7071C4.51957 15.8946 4.26522 16 4 16H1C0.734784 16 0.48043 15.8946 0.292893 15.7071C0.105357 15.5196 0 15.2652 0 15C0 14.7348 0.105357 14.4804 0.292893 14.2929C0.48043 14.1054 0.734784 14 1 14V2ZM4 3H6V5H4V3ZM6 7H4V9H6V7ZM8 3H10V5H8V3ZM10 7H8V9H10V7Z"
                                    fill="#90A4AE"
                                  />
                                </svg>
                              </ListItemPrefix>
                              {user.id_usuario}
                            </ListItem>

                            <ListItem>
                              <ListItemPrefix>
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H3.153C3.38971 0.000108969 3.6187 0.0841807 3.79924 0.23726C3.97979 0.390339 4.10018 0.602499 4.139 0.836L4.879 5.271C4.91436 5.48222 4.88097 5.69921 4.78376 5.89003C4.68655 6.08085 4.53065 6.23543 4.339 6.331L2.791 7.104C3.34611 8.47965 4.17283 9.72928 5.22178 10.7782C6.27072 11.8272 7.52035 12.6539 8.896 13.209L9.67 11.661C9.76552 11.4695 9.91994 11.3138 10.1106 11.2166C10.3012 11.1194 10.5179 11.0859 10.729 11.121L15.164 11.861C15.3975 11.8998 15.6097 12.0202 15.7627 12.2008C15.9158 12.3813 15.9999 12.6103 16 12.847V15C16 15.2652 15.8946 15.5196 15.7071 15.7071C15.5196 15.8946 15.2652 16 15 16H13C5.82 16 0 10.18 0 3V1Z"
                                    fill="#90A4AE"
                                  />
                                </svg>
                              </ListItemPrefix>
                              {user.RA}
                            </ListItem>

                            <Link to={`/user/${user.id_usuario}`}>
                              <ListItem>
                                <ListItemPrefix>
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M2.00299 5.884L9.99999 9.882L17.997 5.884C17.9674 5.37444 17.7441 4.89549 17.3728 4.54523C17.0015 4.19497 16.5104 3.99991 16 4H3.99999C3.48958 3.99991 2.99844 4.19497 2.62717 4.54523C2.2559 4.89549 2.03259 5.37444 2.00299 5.884Z"
                                      fill="#90A4AE"
                                    />
                                    <path
                                      d="M18 8.11798L10 12.118L2 8.11798V14C2 14.5304 2.21071 15.0391 2.58579 15.4142C2.96086 15.7893 3.46957 16 4 16H16C16.5304 16 17.0391 15.7893 17.4142 15.4142C17.7893 15.0391 18 14.5304 18 14V8.11798Z"
                                      fill="#90A4AE"
                                    />
                                  </svg>
                                </ListItemPrefix>
                                Mais Detalhes
                              </ListItem>
                            </Link>
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
                              <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                              {user?.tipo_usuario ? "Admin" : "Comum"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <PopoverHandler>
                              <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer">
                                Visualizar Usuario
                              </span>
                            </PopoverHandler>
                          </td>
                        </tr>
                        <PopoverContent className="w-72">
                          <div
                            className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4 hover:cursor-pointer"
                            onClick={() =>
                              navigate(`/usuario/${user.id_usuario}`)
                            }
                          >
                            <Avatar
                              src={reportBullyingLogo}
                              alt="tania andrew"
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
                            <ListItem>
                              <ListItemPrefix>
                                <svg
                                  width="14"
                                  height="16"
                                  viewBox="0 0 14 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1 2C1 1.46957 1.21071 0.960859 1.58579 0.585786C1.96086 0.210714 2.46957 0 3 0H11C11.5304 0 12.0391 0.210714 12.4142 0.585786C12.7893 0.960859 13 1.46957 13 2V14C13.2652 14 13.5196 14.1054 13.7071 14.2929C13.8946 14.4804 14 14.7348 14 15C14 15.2652 13.8946 15.5196 13.7071 15.7071C13.5196 15.8946 13.2652 16 13 16H10C9.73478 16 9.48043 15.8946 9.29289 15.7071C9.10536 15.5196 9 15.2652 9 15V13C9 12.7348 8.89464 12.4804 8.70711 12.2929C8.51957 12.1054 8.26522 12 8 12H6C5.73478 12 5.48043 12.1054 5.29289 12.2929C5.10536 12.4804 5 12.7348 5 13V15C5 15.2652 4.89464 15.5196 4.70711 15.7071C4.51957 15.8946 4.26522 16 4 16H1C0.734784 16 0.48043 15.8946 0.292893 15.7071C0.105357 15.5196 0 15.2652 0 15C0 14.7348 0.105357 14.4804 0.292893 14.2929C0.48043 14.1054 0.734784 14 1 14V2ZM4 3H6V5H4V3ZM6 7H4V9H6V7ZM8 3H10V5H8V3ZM10 7H8V9H10V7Z"
                                    fill="#90A4AE"
                                  />
                                </svg>
                              </ListItemPrefix>
                              {user.id_usuario}
                            </ListItem>

                            <ListItem>
                              <ListItemPrefix>
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H3.153C3.38971 0.000108969 3.6187 0.0841807 3.79924 0.23726C3.97979 0.390339 4.10018 0.602499 4.139 0.836L4.879 5.271C4.91436 5.48222 4.88097 5.69921 4.78376 5.89003C4.68655 6.08085 4.53065 6.23543 4.339 6.331L2.791 7.104C3.34611 8.47965 4.17283 9.72928 5.22178 10.7782C6.27072 11.8272 7.52035 12.6539 8.896 13.209L9.67 11.661C9.76552 11.4695 9.91994 11.3138 10.1106 11.2166C10.3012 11.1194 10.5179 11.0859 10.729 11.121L15.164 11.861C15.3975 11.8998 15.6097 12.0202 15.7627 12.2008C15.9158 12.3813 15.9999 12.6103 16 12.847V15C16 15.2652 15.8946 15.5196 15.7071 15.7071C15.5196 15.8946 15.2652 16 15 16H13C5.82 16 0 10.18 0 3V1Z"
                                    fill="#90A4AE"
                                  />
                                </svg>
                              </ListItemPrefix>
                              {user.RA}
                            </ListItem>

                            <ListItem>
                              <ListItemPrefix>
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2.00299 5.884L9.99999 9.882L17.997 5.884C17.9674 5.37444 17.7441 4.89549 17.3728 4.54523C17.0015 4.19497 16.5104 3.99991 16 4H3.99999C3.48958 3.99991 2.99844 4.19497 2.62717 4.54523C2.2559 4.89549 2.03259 5.37444 2.00299 5.884Z"
                                    fill="#90A4AE"
                                  />
                                  <path
                                    d="M18 8.11798L10 12.118L2 8.11798V14C2 14.5304 2.21071 15.0391 2.58579 15.4142C2.96086 15.7893 3.46957 16 4 16H16C16.5304 16 17.0391 15.7893 17.4142 15.4142C17.7893 15.0391 18 14.5304 18 14V8.11798Z"
                                    fill="#90A4AE"
                                  />
                                </svg>
                              </ListItemPrefix>
                              person@example.com
                            </ListItem>
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
