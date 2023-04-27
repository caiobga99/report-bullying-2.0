
<?php
require_once('./models/Database.php');
require_once('./models/User.php');

$database = new Database();

if($database->checkCookie()){
    echo '$database->checkCookie()';
    header('location: ./logged-debugger.php');
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>LOGIN DEBUGGER</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<center>

<body>

<h1>
    LOGIN 
</h1>
<form action="./actions/login.php" method="post">
    <h3>Email</h3>
    <input type="email" name="email" id="email" />

    <br><br>

    <h3>Senha</h3>
    <input type="password" name="senha" id="senha" />
    <br><br>
    <button type="submit">LOGAR</button>
    <br>
    <p>remember me?</p>
    <input type="checkbox" name="rememberMe" id="rememberMe" />
</form>

<h1>
    CADASTRO 
</h1>
<form action="./actions/cadastro.php" method="post">
    <h3>Email</h3>
    <input type="email" name="email" id="email" />

    <br><br>

    <h3>Senha</h3>
    <input type="password" name="senha" id="senha" />
    <br><br>
    
    <h3>RA</h3>
    <input type="text" name="RA" id="RA" />
    <br><br>

    <h3>É ADMIN?</h3>
    marque aqui -> <input type="checkbox" name="isAdmin" id="isAdmin" />
    <br><br>
    <button type="submit">LOGAR</button>
</form>

    
</body>
</center>

</html>