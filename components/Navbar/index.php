<?php
require_once("../../partials/header.php");
?>
<header class="header">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#">Home</a>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav d-flex align-items-center justify-content-lg-between w-100">
                    <div class="d-flex row-nav">
                        <a class="nav-link" href="#">Sobre Nós</a>
                        <a class="nav-link" href="#">Denuncie</a>
                    </div>
                    <div class="d-flex row-nav">
                        <a class="nav-link" href="../../screens/FaleConosco/index.php">
                            <img src="../../images/whatsapp-icon.svg" alt="Icone do WhatsApp">
                        </a>
                        <a class="nav-link" href="../../screens/FaleConosco/index.php">
                            <img src="../../images/tel-icon.svg" alt="Icone do Telefone">
                        </a>
                        <a class="nav-link" href="../../screens/FaleConosco/index.php">
                            <img src="../../images/email-icon.svg" alt="Icone do Email">
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </nav>
</header>
<?php
require_once("../../partials/footer.php");
?>