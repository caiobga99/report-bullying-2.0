<?php
require_once('./models/User.php');
require_once('./functions/uuid4.php');

$uuid = genUuid4();


$database = new Database();


$userCadastro = new User(
    $id = $uuid,
    $email = 'email@gmail.com',
    $senha = 'senha123123',
    $RA = '23132131523SP',
    $isAdmin = 1
);

$database->dumpUser($userCadastro);

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
    $newUser = $database->getUserById($uuid);

    echo "<br>";
    echo "ID: ", $newUser->getId();
    echo "<br>";

    echo "EMAIL: ", $newUser->getEmail();
    echo "<br>";

    echo "SENHA: ", $newUser->getSenha();
    echo "<br>";

    echo "RA: ", $newUser->getRA();
    echo "<br>";

    echo "ISADMIN: ", $newUser->getIsAdmin();
    echo "<br>";

    $database->deleteUserById($userCadastro->getId());


    //MOSTRANDO O TRATAMENTO DE ERROS.
    echo $database->deleteUserById('fdsafad');
    echo $database->getUserById('fdsjafsda');
    ?>
</body>

</html>