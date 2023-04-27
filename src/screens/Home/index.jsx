import "./styles.css";

import placaEsquerda from "../../assets/images/placa-esquerda.svg";
import placaDireita from "../../assets/images/placa-direita.svg";
import maoDireita from "../../assets/images/mao-direita.svg";
import maoEsquerda from "../../assets/images/mao-esquerda.svg";
import patoAnonimo from "../../assets/images/pato-anonimo.svg";
import iconePessoa from "../../assets/images/icone-pessoa.svg";
import patoNormal from "../../assets/images/pato-normal.svg";

import Navbar from "../../components/Navbar/index";
import Footer from "../../components/Footer/index";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container-home">
        <div className="esquerda">
          <div className="placa-container">
            <img
              src={placaEsquerda}
              className="image-placa placa-esquerda icon"
              alt="Placa escrita Denuncie Anonimamente"
            />
            <img
              src={maoEsquerda}
              className="mao-esquerda"
              alt="Icone de uma Mao apontando para a Esquerda"
            />
            <div className="conteudo-placa">
              <p>
                <h3 className="text-responsive text-esquerda">
                  Denuncie anônimamente
                </h3>
              </p>
            </div>
          </div>
          <div className="pato">
            <img
              src={patoAnonimo}
              className="icon"
              alt="Icone do pato com chapéu"
            />
          </div>
          <div>
            <p>
              <h4 className="text-responsive">
                Faça sua denuncia clicando na placa
              </h4>
            </p>
          </div>
        </div>
        <div className="meio">
          <div>
            <img src={iconePessoa} className="icon" alt="Icone Pessoa" />
          </div>
          <button className="custom-button text-responsive">
            Sou professor
          </button>
        </div>
        <div className="direita">
          <div>
            <p>
              <h4 className="text-responsive">Ou clique nessa outra</h4>
            </p>
          </div>
          <div className="pato">
            <img src={patoNormal} className="icon" alt="Icone de um Pato" />
          </div>
          <div className="placa-container">
            <img
              src={placaDireita}
              className="icon placa-direita"
              alt="Icone placa escrito Denuncie Abertamente"
            />
            <img
              src={maoDireita}
              className="mao-direita"
              alt="Icone de uma Mão Apontada para Direita"
            />
            <div className="conteudo-placa">
              <p>
                <h3 className="text-responsive text-direita">
                  Denuncie abertamente
                </h3>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
