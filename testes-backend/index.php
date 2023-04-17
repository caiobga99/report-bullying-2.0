<?php
require_once('./models/User.php');
require_once('./models/Denuncia.php');
require_once('./functions/uuid4.php');

$userUuid4 = genUuid4();
$denunciaUuid4 = genUuid4();


$database = new Database();


$userCadastro = new User(
    $id = $userUuid4,
    $email = 'email@gmail.com',
    $senha = 'senha123123',
    $RA = '23132131523SP',
    $isAdmin = false
);


$denunciaCadastro = new Denuncia(
    $id = $denunciaUuid4,
    $titulo = 'TITULO DA DENUNCIA',
    $mensagem = "MENSAGEM DA DENUNCIA LOREM IPSUM LOREM IPSUM",
    $isAnon = true,
    $email = "emaildenuncia@gmail.com",
    $RA = '49408243223sp',
    $fk_Usuario_id = $userUuid4
);


$database->dumpUser($userCadastro);
$database->dumpDenuncia($denunciaCadastro);


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> </title>
</head>

<body>
    <?php
    $newUser = $database->getUserById($userCadastro->getId());
    $newDenuncia = $database->getDenunciaById($denunciaCadastro->getId());


    echo "<h2>TESTES USUARIO: </h2>";
    echo "<h3><br>";
    echo "ID: ", $newUser->getId();
    echo "<br>";

    echo "EMAIL: ", $newUser->getEmail();
    echo "<br>";

    echo "SENHA: ", $newUser->getSenha();
    echo "<br>";

    echo "RA: ", $newUser->getRA();
    echo "<br>";

    echo "ISADMIN: ", $newUser->getIsAdmin();
    echo "<br></h3>";



    echo "<h2>TESTES DENUNCIA: </h2>";

    echo "<h3><br>";
    echo "ID: ", $newDenuncia->getId();
    echo "<br>";

    echo "TITULO: ", $newDenuncia->getTitulo();
    echo "<br>";

    echo "MENSAGEM: ", $newDenuncia->getMensagem();
    echo "<br>";

    echo "ISANON: ", $newDenuncia->getIsAnon();
    echo "<br>";

    echo "EMAIL: ", $newDenuncia->getEmail();
    echo "<br>";

    echo "RA: ", $newDenuncia->getRA();
    echo "<br>";

    echo "FK_USUARIO_ID: ", $newDenuncia->getfk_Usuario_id();
    echo "<br></h3>";


    echo "<h1>OBJETO USUARIO PELO FK_USUARIO_ID DA DENUNCIA</h1>";
    print_r($database->getUserById($newDenuncia->getfk_Usuario_id()));

    $database->deleteUserById($userCadastro->getId());

    ?>
</body>

</html>