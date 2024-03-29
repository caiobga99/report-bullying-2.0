import { useEffect, useState, useRef } from "react";
import ReportCard from "../../components/ReportCard";
import { Spinner, Tooltip, Modal, Button } from "flowbite-react";
import { format } from "date-fns";
import showToastMessage from "../../utils/showToastMessage";
import { Denuncias, User } from "../../utils/protocols";
import { useTema } from "../../common/Tema";
import useUser from "../../common/User";
import { useParams, useNavigate, Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { updateFields } from "../../constants/formFields";
import { useForm } from "react-hook-form";
import FormInput from "../../components/FormInput";
import api from "../../lib/api";
import * as val from "validator";
const ProfileDemo = () => {
  interface FormData {
    nome: string;
    email: string;
    senha: string;
    ra: string;
    imagem: HTMLInputElement;
  }
  const { id_usuario } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [denuncias, setDenuncias] = useState<Denuncias[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
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
        .get(`denuncia/${id_usuario}`)
        .then((response) => {
          setIsLoading(false);
          response.data <= 0 &&
            showToastMessage(
              "Este usuario não realizou nenhuma denuncia ainda!",
              "info"
            );
          setDenuncias(response.data);
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
        })
        .catch((err) => console.log(err.message));
      api
        .get("denuncia")
        .then((response) => {
          setIsLoading(false);
          response.data <= 0 &&
            showToastMessage("Nenhuma Denuncia foi Realizada ainda!", "info");
          setDenuncias(response.data);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err.message);
        });
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
        setDenuncias([]);
      } else {
        setDenuncias(JSON.parse(denuncias_anonimas));
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
      <div className="container mx-auto flex flex-col items-start md:flex-row ">
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

                    <li className="mb-2">Denuncias: {denuncias.length}</li>
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
        <div className="ml-0 md:ml-12 lg:w-2/3 sticky">
          <div
            className={
              isLoading
                ? `container mx-auto py-4 flex flex-wrap gap-4 items-center justify-center min-h-screen font-dm  min-w-full ${
                    pegarTema === "dark" ? "bg-dark" : "bg-light"
                  }`
                : pegarTema === "light"
                ? "font-dm container mx-auto py-4 flex flex-wrap gap-4 min-w-full min-h-screen items-start flex-col justify-center transition-all duration-500 bg-light"
                : "font-dm container mx-auto py-4 flex flex-wrap gap-4 min-w-full min-h-screen items-start flex-col justify-center bg-dark text-white transition-all duration-500"
            }
          >
            {isLoading || isLoadingUser ? (
              <div
                className={`flex items-center justify-center ${
                  pegarTema === "dark" && "bg-dark w-screen h-screen"
                }`}
              >
                <Spinner />
              </div>
            ) : denuncias.length <= 0 ? (
              <div className="flex items-center justify-center w-full h-24">
                <p className="font-dm text-xl">
                  Nenhuma Denuncia foi Realizada ainda! 😄
                </p>
              </div>
            ) : (
              denuncias.map((denuncia) => {
                return (
                  <ReportCard
                    key={denuncia.id_denuncia}
                    titulo={denuncia.titulo}
                    mensagem={denuncia.mensagem}
                    nome={denuncia.nome}
                    data={format(
                      new Date(denuncia.created_at),
                      "dd/MM/yyyy"
                    ).toString()}
                    id_denuncia={denuncia.id_denuncia}
                    id_usuario={denuncia.id_usuario}
                    theme={pegarTema}
                    image={user?.image}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileDemo;
