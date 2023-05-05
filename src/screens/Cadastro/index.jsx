import "./styles.css";

import patoAnonima from "../../assets/images/pato-anonimo.svg";

const Cadastro = () => {
  return (
    <>
      <div class="container-cadastro">
        <img src={patoAnonima} class="pato" alt="Pato com Chapéu" />
        <form action="" method="post">
          <div class="form-group-cadastro">
            <label for="">E-mail</label>
            <input type="email" />
          </div>
          <div class="form-group-cadastro">
            <label for="">Senha</label>
            <input type="password" />
          </div>
          <div class="form-group-cadastro">
            <label for="">RA</label>
            <input type="text" />
          </div>
          <div class="form-group-cadastro">
            <div class="button-group">
              <button type="submit">Entrar</button>
            </div>
          </div>
        </form>
        <div class="circle-container">
          <div class="circle"></div>
        </div>
        <div class="barra-navegacao none">
          <div>
            <img
              src="../../images/icone-pessoa-barra-navegacao.svg"
              alt="Icone de Login"
            />
            Login
          </div>
          <div>
            <img
              src="../../images/icone-pessoa-sorrindo-navegacao.svg"
              alt="Icone de Pessoa Sorrindo"
            />
            Saude
          </div>
          <div>
            <img
              src="../../images/icone-carta-navegacao.svg"
              alt="Icone de uma Carta"
            />
            Denuncia
          </div>
        </div>
      </div>
    </>
  );
};

export default Cadastro;
