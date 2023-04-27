<?php
require_once('./models/User.php');
require_once('./models/Denuncia.php');
require_once('./functions/uuid4.php');
require_once('./models/Database.php');

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LOGGED DEBUGGER</title>
</head>
<body>
    <?php
    session_start();
    $database = new Database();
    $database->checkCookie();
    if(isset($_SESSION['user'])){
        $loggedUser = $_SESSION['user'];
        echo 'session encontrado';
        print_r($loggedUser);
    }
    else{
        echo 'session nao encontrado';
    }



    ?>
</body>
</html>