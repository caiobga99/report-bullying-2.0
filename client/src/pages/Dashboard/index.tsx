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
const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
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
    const check = users?.filter(({ email }) =>
      email?.toLowerCase().includes(search.trim().toLowerCase())
    );
    check?.length === 0 ? setShow(true) : setShow(false);
    return check;
  }, [search, users]);
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
              <Dropdown label="Ação" size="sm" color="gray">
                <Dropdown.Item>Reward</Dropdown.Item>
                <Dropdown.Item>Promote</Dropdown.Item>
                <Dropdown.Item>Activate account</Dropdown.Item>
                <Dropdown.Item>Deletar</Dropdown.Item>
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
                  placeholder="Pesquisar usuarios por email"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              {show && (
                <div className="block pt-2 ps-10">
                  <Alert color="warning" withBorderAccent>
                    <span className="font-medium">
                      Não foi possivel encontrar nenhum usuario com esse email!
                    </span>{" "}
                  </Alert>
                </div>
              )}
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="sr-only">checkbox</label>
                  </div>
                </th>
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
                      <Popover placement="bottom-end">
                        <PopoverHandler>
                          <tr
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:cursor-pointer"
                            key={user.id_usuario}
                          >
                            <td className="w-4 p-4">
                              <div className="flex items-center">
                                <input
                                  id="checkbox-table-search-1"
                                  type="checkbox"
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label className="sr-only">checkbox</label>
                              </div>
                            </td>
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
                              {/* <!-- Modal toggle --> */}
                              <a
                                href="#"
                                type="button"
                                data-modal-target="editUserModal"
                                data-modal-show="editUserModal"
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                              >
                                Editar Usuario
                              </a>
                            </td>
                          </tr>
                        </PopoverHandler>
                        <PopoverContent className="w-72">
                          {/* <ListItem>
                            <ListItemPrefix> */}
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
                            {/* </ListItemPrefix>
                          </ListItem> */}
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
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M1 2C1 1.46957 1.21071 0.960859 1.58579 0.585786C1.96086 0.210714 2.46957 0 3 0H11C11.5304 0 12.0391 0.210714 12.4142 0.585786C12.7893 0.960859 13 1.46957 13 2V14C13.2652 14 13.5196 14.1054 13.7071 14.2929C13.8946 14.4804 14 14.7348 14 15C14 15.2652 13.8946 15.5196 13.7071 15.7071C13.5196 15.8946 13.2652 16 13 16H10C9.73478 16 9.48043 15.8946 9.29289 15.7071C9.10536 15.5196 9 15.2652 9 15V13C9 12.7348 8.89464 12.4804 8.70711 12.2929C8.51957 12.1054 8.26522 12 8 12H6C5.73478 12 5.48043 12.1054 5.29289 12.2929C5.10536 12.4804 5 12.7348 5 13V15C5 15.2652 4.89464 15.5196 4.70711 15.7071C4.51957 15.8946 4.26522 16 4 16H1C0.734784 16 0.48043 15.8946 0.292893 15.7071C0.105357 15.5196 0 15.2652 0 15C0 14.7348 0.105357 14.4804 0.292893 14.2929C0.48043 14.1054 0.734784 14 1 14V2ZM4 3H6V5H4V3ZM6 7H4V9H6V7ZM8 3H10V5H8V3ZM10 7H8V9H10V7Z"
                                    fill="#90A4AE"
                                  />
                                </svg>
                              </ListItemPrefix>
                              ABC Construction
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
                  })
                : filteredUsers?.map((user) => {
                    return (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        key={user.id_usuario}
                      >
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input
                              id="checkbox-table-search-1"
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label className="sr-only">checkbox</label>
                          </div>
                        </td>
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
                            {user?.id_usuario ? "Admin" : user?.tipo_usuario}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {/* <!-- Modal toggle --> */}
                          <a
                            href="#"
                            type="button"
                            data-modal-target="editUserModal"
                            data-modal-show="editUserModal"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Editar Usuario
                          </a>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
          {/* <!-- Edit user modal --> */}
          <div
            id="editUserModal"
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative w-full max-w-2xl max-h-full">
              {/* <!-- Modal content --> */}
              <form className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit user
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="editUserModal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Bonnie"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Green"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="example@company.com"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        name="phone-number"
                        id="phone-number"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="e.g. +(12)3456 789"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Department
                      </label>
                      <input
                        type="text"
                        name="department"
                        id="department"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Development"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Company
                      </label>
                      <input
                        type="number"
                        name="company"
                        id="company"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="123456"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="current-password"
                        id="current-password"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="new-password"
                        id="new-password"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save all
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
