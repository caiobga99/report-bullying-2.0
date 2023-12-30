import { useEffect, useState, useRef } from "react";
// import ReportCard from "../../components/ReportCard";
import { Spinner, Tooltip, Modal, Button } from "flowbite-react";
import { format, isToday, formatDistanceToNow, isThisYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import showToastMessage from "../../utils/showToastMessage";
import { Data, User, Denuncia } from "../../utils/protocols";
import { useTema } from "../../common/Tema";
import useUser from "../../common/User";
import { useParams, useNavigate, Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { updateFields } from "../../constants/formFields";
import { useForm } from "react-hook-form";
import FormInput from "../../components/FormInput";
import ModalComponent from "../../components/ModalComponent";
import CommentModal from "../../components/CommentModal";
import api from "../../lib/api";
import * as val from "validator";
import { Accordion, AccordionBody } from "@material-tailwind/react";
const Profile = () => {
  interface FormData {
    nome: string;
    email: string;
    senha: string;
    ra: string;
    imagem: HTMLInputElement;
  }

  const { id_usuario } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Data[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [open, setOpen] = useState<number>(0);
  const [openResponseModal, setOpenResponseModal] = useState<number>(0);
  const [openCommentModal, setOpenCommentModal] = useState<number>(0);
  const handleOpen = (
    value: number,
    set: (value: number) => void,
    valueOpen: number
  ) => set(valueOpen === value ? 0 : value);

  const emailInputRef = useRef<HTMLInputElement>(null);

  const { pegarTema } = useTema() as {
    pegarTema: string;
  };
  const { setToken, setIsLogged, setIsAdmin } = useUser() as {
    setToken: (value: string) => void;
    setIsLogged: (value: boolean) => void;
    setIsAdmin: (value: boolean) => void;
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (id_usuario) {
      api
        .get(`/usuario/${id_usuario}`)
        .then((response) => {
          setIsLoadingUser(false);
          setUser(response.data[0]);
        })
        .catch((err) => console.log(err.message));
      api
        .get(`/denuncia/${id_usuario}`)
        .then((response) => {
          console.log(response.data);
          const denunciasAnonimas = JSON.parse(
            localStorage.getItem("denuncias_anonimas")
          );
          console.log(denunciasAnonimas.length);
          setIsLoading(false);
          response.data <= 0 &&
            showToastMessage(
              "Este usuario não realizou nenhuma denuncia ainda!",
              "info"
            );
          setData(response.data);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err.message);
        });
    } else if (localStorage.getItem("usuario_anonimo") !== "logado") {
      api
        .get("/usuario")
        .then((response) => {
          setIsLoadingUser(false);
          setUser(response.data[0]);
          const url: string =
            response.data[0].email === "adm@adm.com"
              ? `/denuncia/${response.data[0].id_usuario}`
              : `/denuncia`;
          api
            .get(url)
            .then((response) => {
              setData(response.data);
              console.log(response.data);
              setIsLoading(false);
              response.data <= 0 &&
                showToastMessage(
                  "Nenhuma Denuncia foi Realizada ainda!",
                  "info"
                );
            })
            .catch((err) => {
              setIsLoading(false);
              console.log(err.message);
            });
        })
        .catch((err) => console.log(err.message));
    } else {
      api
        .get("/usuario")
        .then((response) => {
          setIsLoadingUser(false);
          setUser(response.data[0]);
        })
        .catch((err) => console.log(err.message));
      const denuncias_anonimas: null | string =
        localStorage.getItem("denuncias_anonimas");

      if (!denuncias_anonimas) {
        setData([]);
      } else {
        setData(JSON.parse(denuncias_anonimas));
      }
      setIsLoading(false);
    }
  }, [id_usuario]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<FormData>();
  const onSubmit = ({ nome, senha, ra, imagem }: FormData) => {
    const formData = new FormData();

    formData.append("image", imagem[0]);
    formData.append("password", senha);
    formData.append("RA", ra);
    formData.append("nome", nome);
    formData.append("deletedImage", user.image);
    api
      .post(`/usuarios/${user?.id_usuario}?_method=PATCH`, formData)
      .then((res) => {
        console.log(res.data);
        {
          showToastMessage(res.data.message, "sucess");
          setUser(res.data.user);
          setOpenEditModal(false);
          reset();
        }
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "Request failed with status code 500") {
          showToastMessage("Ocorreu um erro ao editar o seu usuario!", "error");
        }
      });
  };

  const onDelete = () => {
    api.delete(`usuarios/${user.id_usuario}`).then((res) => {
      showToastMessage(res.data.message, "sucess");
      if (
        localStorage.getItem("admin") &&
        id_usuario &&
        user.email !== "adm@adm.com"
      ) {
        navigate("/dashboard");
      } else {
        setOpenModal(false);
        navigate("/login");
        setUser(null);
        setToken(null);
        setIsLogged(false);
        setIsAdmin(false);
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("admin");
      }
    });
  };
  const watchPassword = watch("senha");
  return (
    <div
      className={
        pegarTema === "dark"
          ? "bg-dark  py-8 min-h-screen font-dm transition-all duration-500"
          : "bg-light text-black py-8 min-h-screen font-dm transition-all duration-500"
      }
    >
      <div className="container mx-auto flex flex-col items-start md:flex-row">
        <div className="flex flex-col w-full sticky md:top-36 lg:w-1/3 px-8">
          {isLoading || isLoadingUser ? (
            <>
              <Spinner />
            </>
          ) : (
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={`http://127.0.0.1:8000/storage/image_profile/${
                      user?.image.split("/")[1]
                    }`}
                    alt="User Image"
                    className="w-32 h-32 rounded-full mb-4 shrink-0 "
                  />
                  <h1 className="text-xl font-bold ">{user?.nome}</h1>
                  <p className="text-gray-700">{user?.email}</p>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    {user?.RA !== "Anonimo" && (
                      <>
                        <span
                          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
                          onClick={() => setOpenEditModal(true)}
                        >
                          Editar
                        </span>
                        <span
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded cursor-pointer"
                          onClick={() => setOpenModal(true)}
                        >
                          Deletar
                        </span>
                      </>
                    )}
                    {id_usuario && (
                      <Tooltip
                        content={`Navegue para a pagina de TimeLine do ${user?.nome}!`}
                        animation="duration-500"
                      >
                        <Link to={`/timeline/${id_usuario}`}>
                          <span className="bg-transparent mr-auto  hover:bg-yellow-300 text-yellow-300 hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
                            Ir para a TimeLine
                          </span>
                        </Link>
                      </Tooltip>
                    )}
                  </div>
                </div>
                <Modal
                  show={openModal}
                  size="md"
                  onClose={() => setOpenModal(false)}
                  popup
                >
                  <Modal.Header />
                  <Modal.Body>
                    <div className="text-center">
                      <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                      <div>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Tem certeza de que deseja excluir o usuario: "
                          {user?.nome}"?
                        </h3>
                      </div>
                      <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={() => onDelete()}>
                          {"Sim, eu tenho certeza."}
                        </Button>
                        <Button
                          color="gray"
                          onClick={() => setOpenModal(false)}
                        >
                          Não, cancelar.
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
                <Modal
                  show={openEditModal}
                  size="xl"
                  popup
                  onClose={() => setOpenEditModal(false)}
                  initialFocus={emailInputRef}
                >
                  <Modal.Header />
                  <Modal.Body>
                    <div className="space-y-6">
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        Atualize seu Usuario
                      </h3>
                      {updateFields.map((field) => (
                        <FormInput
                          key={field.id}
                          labelText={field.labelText}
                          labelFor={field.labelFor}
                          id={field.id}
                          type={field.type}
                          isRequired={field.isRequired}
                          placeholder={field.placeholder}
                          registerInput={register(field.name, {
                            required: field.isRequired,
                            minLength: field.name === "ra" ? 9 : undefined,
                            maxLength:
                              field.name === "nome"
                                ? 30
                                : field.name === "ra"
                                ? 20
                                : undefined,
                            validate: (value: string) => {
                              if (field.name === "confirmar-senha") {
                                return value === watchPassword;
                              } else if (field.name === "email") {
                                return val.default.isEmail(value);
                              } else if (field.name === "imagem") {
                                if (value.length === 0) {
                                  return true;
                                }
                                const acceptedFormats: string[] = [
                                  "jpeg",
                                  "png",
                                  "jpg",
                                  "gif",
                                  "svg",
                                ];
                                const fileExtension: string = value[0]?.name
                                  .split(".")
                                  .pop()
                                  .toLowerCase();
                                if (!acceptedFormats.includes(fileExtension)) {
                                  return false;
                                }
                                return true;
                              }
                            },
                          })}
                          typeError={errors[field.name]?.type}
                        />
                      ))}
                      <div className="w-full">
                        <Button onClick={handleSubmit(onSubmit)}>
                          Atualizar Usuario
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    Informações
                  </span>
                  <ul>
                    <li className="mb-2">
                      RA: {user?.RA === "Anonimo" ? "**********" : user?.RA}
                    </li>

                    <li className="mb-2">Denuncias: {data.length}</li>
                    <li className="mb-2">
                      Tipo:{" "}
                      {user?.nome === "Anonimo"
                        ? "Anonimo"
                        : user?.tipo_usuario
                        ? "Admin"
                        : "Comum"}
                    </li>
                    <li className="mb-2">
                      Criado em:{" "}
                      {user?.RA === "Anonimo"
                        ? "**********"
                        : format(
                            new Date(user!.created_at),
                            "dd/MM/yyyy"
                          ).toString()}
                    </li>
                    <li className="mb-2">
                      Atualizado em:{" "}
                      {user?.RA === "Anonimo"
                        ? "**********"
                        : format(
                            new Date(user!.updated_at),
                            "dd/MM/yyyy"
                          ).toString()}
                    </li>

                    <li className="mb-2">
                      ID:{" "}
                      {user?.RA === "Anonimo" ? "**********" : user?.id_usuario}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="ml-0 md:ml-12 lg:w-2/3 sticky ">
          <div
            className={
              isLoading
                ? `container mx-auto py-4 flex flex-wrap transition-all duration-500 gap-4 items-center justify-center min-h-screen  min-w-full ${
                    pegarTema === "dark" ? " bg-dark " : " bg-light"
                  }`
                : pegarTema === "light"
                ? " container mx-auto py-4 flex flex-wrap gap-4 min-w-full min-h-screen items-center flex-col justify-center transition-all duration-500 bg-light"
                : " container mx-auto py-4 flex flex-wrap gap-4 min-w-full min-h-screen items-center flex-col justify-center bg-dark text-white transition-all duration-500"
            }
          >
            {isLoading || isLoadingUser ? (
              <div className="flex items-center transition-all dark:bg-dark duration-500 justify-center h-full">
                <Spinner />
              </div>
            ) : data.length <= 0 ? (
              <div className="flex items-center justify-center w-full h-24">
                <p className=" text-xl">
                  Nenhuma Denuncia foi Realizada ainda! 😄
                </p>
              </div>
            ) : (
              data.map(({ denuncia }: Denuncia, index: number) => (
                <div
                  className="flex items-center  flex-col w-[80%]"
                  key={index}
                >
                  <div className="bg-white p-8 rounded-lg shadow-md w-full">
                    <div className="flex items-center justify-between mb-4 flex-wrap">
                      <div className="flex items-center space-x-2">
                        <img
                          src={`http://127.0.0.1:8000/storage/image_profile/${
                            user?.image.split("/")[1]
                          }`}
                          alt="User Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-gray-800 font-semibold">
                            {user?.nome}
                          </p>
                          <p className="text-gray-500 text-sm">
                            Criada em{" "}
                            {format(
                              new Date(denuncia!.created_at),
                              "dd/MM/yyyy"
                            ).toString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-gray-500 cursor-pointer">
                        <button
                          className="hover:bg-gray-50 rounded-full p-1 "
                          onClick={() =>
                            handleOpen(
                              index + 1,
                              setOpenResponseModal,
                              openResponseModal
                            )
                          }
                        >
                          Ver Resposta
                        </button>
                      </div>
                    </div>
                    <ModalComponent
                      openModal={openResponseModal === index + 1}
                      close={setOpenResponseModal}
                      titulo={denuncia.titulo}
                      id_denuncia={denuncia.id_denuncia}
                      id_usuario={denuncia.id_usuario}
                    />
                    <CommentModal
                      openModal={openCommentModal === index + 1}
                      setOpenModal={setOpenCommentModal}
                      id_denuncia={denuncia.id_denuncia}
                      id_usuario={denuncia.id_usuario}
                    />
                    {/* <!-- Tittle --> */}
                    {/* <div className="text-center mb-[0.3rem]">
                      <p className="text-gray-900 font-semibold">
                        {denuncia.titulo}
                      </p>
                    </div> */}
                    {/* <!-- Message --> */}
                    <div className="mb-4 ml-[0.5rem]">
                      <p className="text-gray-800">{denuncia.mensagem}</p>
                    </div>
                    {/* <!-- Image --> */}

                    {/* <!-- Like and Comment Section --> */}
                    {user?.id_usuario !== "Anonimo" && (
                      <>
                        <div className="flex items-center justify-between text-gray-500">
                          <div className="flex items-center space-x-2">
                            <button
                              className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
                              onClick={() =>
                                handleOpen(
                                  index + 1,
                                  setOpenCommentModal,
                                  openCommentModal
                                )
                              }
                            >
                              <svg
                                className="w-5 h-5 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
                              </svg>
                              <span>Responder</span>
                            </button>
                          </div>
                          <button
                            className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
                            onClick={() => handleOpen(index + 1, setOpen, open)}
                          >
                            <svg
                              width="22px"
                              height="22px"
                              viewBox="0 0 24 24"
                              className="w-5 h-5 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
                                ></path>
                              </g>
                            </svg>
                            <span>
                              {denuncia.comentarios_relacionados !== undefined
                                ? denuncia.comentarios_relacionados[0]
                                    .id_comentario === null
                                  ? 0
                                  : denuncia.comentarios_relacionados.length
                                : "0"}{" "}
                              Comentarios
                            </span>
                          </button>
                        </div>
                        <hr className="mt-2 mb-2" />
                        <Accordion open={open === index + 1}>
                          <AccordionBody>
                            <p className="text-gray-800 font-semibold">
                              Comentarios
                            </p>
                            <hr className="mt-2 mb-2" />
                            <div className="mt-4">
                              {/* <!-- Comment 1 --> */}
                              {denuncia.comentarios_relacionados[0]
                                .id_comentario === null ? (
                                <div>
                                  <p className="text-gray-800 font-semibold">
                                    Nenhum Comentario Ainda!
                                  </p>
                                </div>
                              ) : (
                                denuncia.comentarios_relacionados.map(
                                  (comentario, index) => (
                                    <div
                                      className={`flex items-center space-x-2 ${
                                        index !== 0 && "mt-2"
                                      }`}
                                      key={index}
                                    >
                                      <img
                                        src={`http://127.0.0.1:8000/storage/image_profile/${
                                          comentario?.image.split("/")[1]
                                        }`}
                                        alt="User Avatar"
                                        className="w-6 h-6 rounded-full"
                                      />
                                      <div>
                                        <p className="text-gray-800 font-semibold flex items-center  gap-2">
                                          {comentario.nome}
                                          <p className="text-gray-800 font-normal">
                                            {" ~ "}
                                            {/* {isToday(new Date(comentario!.created_at)) ?formatDistanceToNow(new Date(comentario!.created_at), {addSuffix: true}) : isThisYear(new Date(comentario!.created_at) ? formatDistanceToNow(new Date(comentario!.created_at), {addSuffix: true, includeSeconds: true}) : formatDistanceToNow(new Date(comentario!.created_at, {addSuffix: true, includeSeconds: true, includeMonth: true})} */}
                                            {isToday(
                                              new Date(comentario!.created_at)
                                            )
                                              ? formatDistanceToNow(
                                                  new Date(
                                                    comentario!.created_at
                                                  ),
                                                  {
                                                    addSuffix: true,
                                                    locale: ptBR,
                                                  }
                                                )
                                              : isThisYear(
                                                  new Date(
                                                    comentario!.created_at
                                                  )
                                                )
                                              ? formatDistanceToNow(
                                                  new Date(
                                                    comentario!.created_at
                                                  ),
                                                  {
                                                    addSuffix: true,
                                                    includeSeconds: true,
                                                    locale: ptBR,
                                                  }
                                                )
                                              : formatDistanceToNow(
                                                  new Date(
                                                    comentario!.created_at
                                                  ),
                                                  {
                                                    addSuffix: true,
                                                    includeSeconds: true,
                                                    includeMonth: true,
                                                    locale: ptBR,
                                                  }
                                                )}
                                          </p>
                                        </p>
                                        <p className="text-gray-500 text-sm ">
                                          {comentario.mensagem}
                                        </p>
                                      </div>
                                    </div>
                                  )
                                )
                              )}
                              {/* <!-- Add more comments and replies as needed --> */}
                            </div>
                          </AccordionBody>
                        </Accordion>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
