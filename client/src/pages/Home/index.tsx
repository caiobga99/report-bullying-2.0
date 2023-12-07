import { useTema } from "../../common/Tema";
import imgFamilia from "../../assets/bullying_cyberllying_minuto_saudavel_c2ed1c8f59-PhotoRoom.png-PhotoRoom.png";
import { Link } from "react-router-dom";
import useUser from "../../common/User";
const Home: React.FC = () => {
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };
  const { isLogged } = useUser() as {
    isLogged: boolean;
  };
  console.log(isLogged);
  return (
    <div
      className={`flex flex-col items-center justify-center w-[100%] h-screen font-dm transition-all duration-500 ${
        pegarTema === "dark" ? "bg-dark text-white" : "bg-light"
      }`}
    >
      <div className="h-[90%] w-full flex flex-col items-center justify-center gap-10 sm:gap-20 2xl:gap-24">
        <div className="flex flex-col items-center sm:gap-3">
          <span className="text-xl sm:text-2xl 2xl:text-2xl">Faça uma</span>
          <h1
            className={`text-3xl sm:text-4xl underline 2xl:text-4xl ${
              isLogged && "hover:text-blue-600"
            }`}
          >
            {!isLogged ? "Denuncia" : <Link to={"/denuncie"}>Denuncia!</Link>}
          </h1>
        </div>
        <div className="text-center text-lg 2xl:text-2xl">
          <p>"Não deixe que o bullying te defina,</p>
          <p> deixe que sua resiliencia inspire o mundo!"</p>
        </div>
      </div>
      <div className="h-[50%] w-[100%] flex items-end lg:justify-center">
        <img
          src={imgFamilia}
          alt=""
          className="w-full  sm:h-[90%] lg:w-[90%] xl:w-[50%] 2xl:w-[50%]"
        />
      </div>
    </div>
  );
};

export default Home;
