<?php
require("../../components/Navbar/index.php");
?>
<div class="container-cadastro">
    <img src="../../images/pato-anonimo.svg" class="pato" alt="Pato com Chapéu">
    <form action="" method="post">
        <div class="form-group-cadastro">
            <label for="">
                E-mail
            </label>
            <input type="email" />
        </div>
        <div class="form-group-cadastro">
            <label for="">
                Senha
            </label>
            <input type="password" />
        </div>
        <div class="form-group-cadastro">
            <label for="">
                RA
            </label>
            <input type="text" />
        </div>
        <div class="form-group-cadastro">
            <div class="button-group"><button type="submit">Entrar</button></div>
        </div>
    </form>
    <div class="circle-container">
        <div class="circle"></div>
    </div>
    <div class="barra-navegacao none">
        <div>
            <img src="../../images/icone-pessoa-barra-navegacao.svg" alt="Icone de Login">
            Login
        </div>
        <div>
            <img src="../../images/icone-pessoa-sorrindo-navegacao.svg" alt="Icone de Pessoa Sorrindo">
            Saude
        </div>
        <div>
            <img src="../../images/icone-carta-navegacao.svg" alt="Icone de uma Carta">
            Denuncia
        </div>
    </div>
</div>
<script>
    const circle = document.querySelector(".circle");
    const header = document.querySelector(".header");
    const barraNavegacao = document.querySelector(".barra-navegacao");

    if (circle.clientHeight <= 45 || circle.clientWidth <= 45) {
        barraNavegacao.classList.remove("none");
        header.remove();
    }
</script>
<?php
require("../../components/Footer/index.php");
?>