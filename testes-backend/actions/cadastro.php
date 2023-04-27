<?php
require_once('../models/User.php');
require_once('../models/Database.php');
require_once('../functions/uuid4.php');



$database = new Database();

$uuid4 = genUuid4();

$email = $_POST['email'];

$senha = $_POST['senha'];

$RA = $_POST['RA'];

$isAdmin = false;

if(isset($_POST['isAdmin'])){
    $isAdmin = true;
}

$userCadastro = new User(
    $uuid4,
    $email,
    $senha,
    $RA,
    $isAdmin
);

$database->dumpUser($userCadastro);


session_start();

$_SESSION['userId'] = $database->getUserById($uuid4)->getId();
?>