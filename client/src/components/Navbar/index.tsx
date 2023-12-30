import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  SunIcon,
  XMarkIcon,
  MoonIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import reportBullyingLogo from "../../assets/logo.svg";
import { useTema } from "../../common/Tema";
import useUser from "../../common/User";
import api from "../../lib/api";
import showToastMessage from "../../utils/showToastMessage";
import { INavigation } from "../../utils/protocols";

const navigation: INavigation[] = [
  { name: "Home", href: "/" },
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
  { name: "FAQ", href: "/faq" },
];
const navigationLogged: INavigation[] = [
  { name: "Home", href: "/" },
  { name: "Denuncie", href: "/denuncie" },
  { name: "FAQ", href: "/faq" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { pegarTema, setPegarTema } = useTema() as {
    setPegarTema: (value: string) => void;
    pegarTema: string;
  };
  pegarTema === "dark"
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");
  const navigate = useNavigate();
  const location = useLocation();
  const {
    setIsLogged,
    isLogged,
    setViewReport,
    setIsAdmin,
    setToken,
    lembrarMe,
    isAdmin,
  } = useUser() as {
    setIsLogged: (value: boolean) => void;
    isLogged: boolean;
    isAdmin: boolean;
    setViewReport: (value: boolean) => void;
    setIsAnonymous: (value: boolean) => void;
    setIsAdmin: (value: boolean) => void;
    setToken: (value: string | null) => void;
    user: object;
    lembrarMe: boolean;
  };

  const logout = () => {
    api.post("/logout").then((res) => {
      localStorage.removeItem("usuario_anonimo");
      localStorage.removeItem("admin");
      localStorage.removeItem("user");
      if (!lembrarMe) {
        localStorage.removeItem("ACCESS_TOKEN");
      }
      setToken(null);
      setIsLogged(false);
      setPegarTema("dark");
      setViewReport(false);
      setIsAdmin(false);
      showToastMessage(res.data.message, "sucess");
      navigate("/login");
    });
  };
  return (
    <Disclosure
      as="nav"
      className={
        pegarTema === "dark"
          ? "bg-dark transition-all duration-500"
          : "bg-light dark:bg-gray-900 dark:border-gray-700 transition-all duration-500"
      }
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 font-dm">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to={"/"}>
                    <img
                      className="h-8 w-auto"
                      src={reportBullyingLogo}
                      alt="Report Bullying Logo"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {!isLogged
                      ? navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.href === location.pathname
                                ? pegarTema === "dark"
                                  ? "bg-[#1f2937] text-white"
                                  : "text-blue-700 bg-branco"
                                : pegarTema === "light"
                                ? "hover:bg-gray-300 hover:text-blue-900"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={
                              item.href !== location.pathname
                                ? "page"
                                : undefined
                            }
                          >
                            {item.name}
                          </Link>
                        ))
                      : navigationLogged.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.href === location.pathname
                                ? pegarTema === "dark"
                                  ? "bg-[#1f2937] text-white"
                                  : "text-blue-700 bg-branco"
                                : pegarTema === "light"
                                ? "hover:bg-gray-300 hover:text-blue-900"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={
                              item.href !== location.pathname
                                ? "page"
                                : undefined
                            }
                          >
                            {item.name}
                          </Link>
                        ))}
                    {localStorage.getItem("admin") && isAdmin && (
                      <Link
                        to={"/dashboard"}
                        className={classNames(
                          "/dashboard" === location.pathname
                            ? pegarTema === "dark"
                              ? "bg-[#1f2937] text-white"
                              : "text-blue-700 bg-branco"
                            : pegarTema === "light"
                            ? "hover:bg-gray-300 hover:text-blue-900"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={
                          "/dashboard" !== location.pathname
                            ? "page"
                            : undefined
                        }
                      >
                        {"Painel"}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className={
                    pegarTema === "dark"
                      ? "relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      : "relative rounded-full p-1  hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  }
                  onClick={() => {
                    pegarTema === "light"
                      ? setPegarTema("dark")
                      : setPegarTema("light");
                  }}
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Mudar Tema</span>
                  {pegarTema === "light" ? (
                    <MoonIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <SunIcon className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>

                {/* Profile dropdown */}
                {isLogged && (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button
                        className={
                          pegarTema === "dark"
                            ? "relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-light focus:ring-offset-2 focus:ring-offset-gray-800"
                            : "relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-wihte focus:ring-offset-2 focus:ring-offset-black-300"
                        }
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <UserCircleIcon
                          className="h-10 w-10 rounded-full"
                          color="gray"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {() => (
                            <Link
                              to="/profile"
                              className={classNames(
                                "/profile" === location.pathname
                                  ? "bg-gray-100"
                                  : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Perfil
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {() => (
                            <Link
                              to="/timeLine"
                              className={classNames(
                                "/timeLine" === location.pathname
                                  ? "bg-gray-100"
                                  : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              TimeLine
                            </Link>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {() => (
                            <button
                              className={
                                "block px-4 py-2 text-sm text-gray-700"
                              }
                              onClick={logout}
                            >
                              Sair
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {!isLogged
                ? navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.href === location.pathname
                          ? "bg-gray-900 text-white"
                          : pegarTema === "light"
                          ? "hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={
                        item.href !== location.pathname ? "page" : undefined
                      }
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))
                : navigationLogged.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.href === location.pathname
                          ? "bg-gray-900 text-white"
                          : pegarTema === "light"
                          ? "hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={
                        item.href !== location.pathname ? "page" : undefined
                      }
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
              {localStorage.getItem("admin") && isAdmin && (
                <>
                  <Disclosure.Button
                    as="a"
                    href={"/dashboard"}
                    className={classNames(
                      "/dashboard" === location.pathname
                        ? "bg-gray-900 text-white"
                        : pegarTema === "light"
                        ? "hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={
                      "/dashboard" !== location.pathname ? "page" : undefined
                    }
                  >
                    {"Painel"}
                  </Disclosure.Button>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
