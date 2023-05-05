import iconePessoaBarraNavegacao from "../../assets/images/icone-pessoa-barra-navegacao.svg";
import iconePessoaSorrindo from "../../assets/images/icone-pessoa-sorrindo-navegacao.svg";
import iconeCartaNavegacao from "../../assets/images/icone-carta-navegacao.svg";

import patoNormal from "../../assets/images/pato-normal.svg";
import "./styles.css";

const Login = () => {
  return (
    <>
      <div class="container-login">
        <img src={patoNormal} class="pato" alt="Pato com Chapéu" />
        <form action="" method="post">
          <div class="form-group-login">
            <label for="">E-mail</label>
            <input type="email" />
          </div>
          <div class="form-group-login">
            <label for="">Senha</label>
            <input type="password" />
            <p>
              <a href="#">Esqueceu a senha? </a>
            </p>
          </div>
          <div class="form-group-login">
            <div class="button-group">
              <button type="submit">Entrar</button>
            </div>
          </div>
          <div class="form-group-login">
            <div class="login-foot">
              <p>Não tem uma conta ?</p>
              <p>Cadastre-se</p>
            </div>
          </div>
        </form>
        <div class="circle-container">
          <div class="circle"></div>
        </div>
        <div class="barra-navegacao none">
          <div>
            <img src={iconePessoaBarraNavegacao} alt="Icone de Login" />
            Login
          </div>
          <div>
            <img src={iconePessoaSorrindo} alt="Icone de Pessoa Sorrindo" />
            Saude
          </div>
          <div>
            <img src={iconeCartaNavegacao} alt="Icone de uma Carta" />
            Denuncia
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
