<?php
require_once('Database.php');
class User{
    private string $id;

    private string $email;

    private string $senha;

    private string $RA;

    private int $isAdmin;

    function __construct(string $id, string $email, string $senha, string $RA, $isAdmin = 0){

        $this->id = $id;

        $this->email = $email;

        $this->senha = $senha;

        $this->RA = $RA;

        $this->isAdmin = $isAdmin;
    }

    ######################################################################################
    # GETTERS E SETTERS:
    ######################################################################################
    public function setId($newId)
    {
        $this->id = $newId;
    }

    public function setEmail($newEmail)
    {
        $this->email = $newEmail;
    }

    public function setSenha($newSenha)
    {
        $this->senha = $newSenha;
    }

    public function setRA($newRA)
    {
        $this->RA = $newRA;
    }

    public function setIsAdmin($newIsAdmin)
    {
        $this->isAdmin = $newIsAdmin;
    }
    


    public function getId()
    {
        return $this->id;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function getSenha()
    {
        return $this->senha;
    }

    public function getRA()
    {
        return $this->RA;
    }

    public function getIsAdmin()
    {
        return $this->isAdmin;
    }

}
?>