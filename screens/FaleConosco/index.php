<?php
require_once("../../components/Navbar/index.php");
?>
<div class="container-fale-conosco">
    <div class="title-fale-conosco">
        <h1>Fale Conosco,</h1>
        <h1>Como Podemos Te Ajudar ?</h1>
    </div>
    <form action="" method="post">
        <div class="form-group">
            <label for="">
                Nome
            </label>
            <input type="text" name="nome" placeholder="Nome" />
        </div>
        <div class="form-group-double">
            <label for="">
                E-Mail
            </label>
            <input type="email" class="input-double" name="email" placeholder="E-Mail" />
            <label for="">
                RA </label>
            <input type="text" class="input-double" name="ra" placeholder="RA" />
        </div>
        <div class="form-group submit-group">
            <textarea name="mensagem" cols="20" rows="10" placeholder="Mensagem"></textarea>
            <button class="icon-area" type="submit"><img src="../../images/seta-direita-submit.svg" /></button>
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