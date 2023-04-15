<?php
require_once("./components/navbar.php");
?>
<div class="container-home">
    <div class="esquerda">
        <div class="placa-container">
            <img src="./images/placa-esquerda.svg" class="image-placa icon" alt="Placa escrita Denuncie Anonimamente">
            <img src="./images/mao-esquerda.svg" class="mao-esquerda"
                alt="Icone de uma Mao apontando para a Esquerda">
            <div class="conteudo-placa">
                <p>
                <h3 class="text-responsive">Denuncie anônimamente</h3>
                </p>
            </div>
        </div>
        <div class="pato">
            <img src="./images/pato-anonimo.svg" class="icon" alt="Icone do pato com chapéu">
        </div>
        <div>
            <p>
            <h4 class="text-responsive">Faça sua denuncia clicando na placa</h4>
            </p>
        </div>
    </div>
    <div class="meio">
        <div><img src="./images/icone-pessoa.svg" class="icon" alt="Icone Pessoa"></div>
        <button class="custom-button text-responsive">Sou professor</button>
    </div>
    <div class="direita">
        <div>
            <p>
            <h4 class="text-responsive">Ou clique nessa outra</h4>
            </p>
        </div>
        <div class="pato">
            <img src="./images/pato-normal.svg" class="icon" alt="Icone de um Pato">

        </div>
        <div class="placa-container">
            <img src="./images/placa-direita.svg" class="icon" alt="Icone placa escrito Denuncie Abertamente">
            <img src="./images/mao-direita.svg" class="mao-direita" alt="Icone de uma Mão Apontada para Direita">
            <div class="conteudo-placa">
                <p>
                <h3 class="text-responsive">Denuncie abertamente</h3>
                </p>
            </div>
        </div>
    </div>
</div>
<?php
require("./components/footer.php");
?>