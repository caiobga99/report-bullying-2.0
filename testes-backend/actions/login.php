<?php
require_once('../models/User.php');
require_once('../models/Denuncia.php');
require_once('../functions/uuid4.php');


$database = new Database();


$emailToLogin = $_POST['email'];

$passwordToLogin = $_POST['senha'];

$rememberMe = false;


if(isset($_POST['rememberMe'])){
    $rememberMe = true;
}


session_start();

$_SESSION['userId'] = $database->loginUser($emailToLogin, $passwordToLogin, $rememberMe)->getId();

header('location: ../logged-debugger.php');

$database->getUserById($_SESSION['userId']);

?>