import { useTema } from "../../common/Tema";

const FAQ = (): JSX.Element => {
  const { pegarTema } = useTema() as {
    pegarTema: string;
  };
  pegarTema === "dark"
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");
  return (
    <section className="bg-light dark:bg-gray-900 lg:h-screen h-full transition-all duration-500 font-dm">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Perguntas frequentes
        </h2>
        <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
          <div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"></path>
                </svg>
                Como funciona o Report Bullying?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                O Report Bullying é uma aplicação web/mobile onde o usuário tem
                a possibilidade de realizar denuncias. Diante disso, para
                realiza-las é necessário efetuar o cadastro/login ou entrar como
                usuário{" "}
                <span className="font-medium text-primary-600 dark:text-primary-500 hover:no-underline">
                  anonimo
                </span>
                .
              </p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"></path>
                </svg>
                Como funciona o Cadastro?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Para efetuar o cadastro é necessário as informações(nome, ra,
                email, senha, confirmar senha). É importante ressaltar que as
                informações sensíveis como a senha são criptografadas de forma
                segura onde ninguem tem acesso!
              </p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"></path>
                </svg>
                Como funciona o Login?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Para efetuar o login é necessário as informações(email, senha)
                ou efetuar o login de forma{" "}
                <span className="font-medium text-primary-600 dark:text-primary-500 hover:no-underline">
                  anonima
                </span>
                .
              </p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"></path>
                </svg>
                Como funciona o Usuário Anonimo?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                O usuário{" "}
                <span className="font-medium text-primary-600 dark:text-primary-500 hover:no-underline">
                  anonimo
                </span>{" "}
                é uma forma de fazer o login, onde suas informações como (nome,
                email, etc...) não sera necessário, ou seja, não sera possivel
                acessar as denuncias/respostas realizadas anonimamente em outro
                navegador.
              </p>
            </div>
          </div>
          <div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"></path>
                </svg>
                Qual a segurança do Report Bullying?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                O Report Bullying oferece uma alta segurança. Informações
                sensíveis como a senha é criptografada usando o{" "}
                <a
                  href="https://laravel.com/docs/10.x/hashing"
                  className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline"
                >
                  HASH
                </a>{" "}
                fornecido pelo Laravel, contudo, ninguem tera acesso a elas.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"></path>
                </svg>
                Não tenho meu R.A?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                O R.A é necessário para fazer o cadastro no Report Bullying,
                para consulta-lo basta entrar no site da{" "}
                <a
                  href="https://sed.educacao.sp.gov.br/NCA/CadastroAluno/ConsultaRAAluno/"
                  className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline"
                >
                  Secretaria da Educação
                </a>{" "}
                e consultar seu R.A
              </p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"></path>
                </svg>
                Como funciona as denuncias?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Para realizar uma denuncia é necessário preencher os
                campos(titulo e mensagem). Com base nisso as denuncias são
                realizadas e enviadas para uma inteligencia artificial(IA) que
                ira fornecer um conselho sobre tal, no entanto, é importante
                ressaltar que o Report Bullying não equivale a um profissional
                da area.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"></path>
                </svg>
                Como uso o Report Bullying em meu dispositivo mobile?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                O Report Bullying ainda não esta disponivel em uma loja de
                aplicativos, porem, em breve, pretendemos disponibiliza-lo para
                o uso em dispositivos Android/IoS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
