<?php
require_once('Database.php');
class User
{
    private string $id;

    private string $email;

    private string $senha;

    private string $RA;

    private bool $isAdmin;

    function __construct(string $id, string $email, string $senha, string $RA, $isAdmin = false)
    {

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
        return;
    }

    public function setEmail($newEmail)
    {
        $this->email = $newEmail;
        return;
    }

    public function setSenha($newSenha)
    {
        $this->senha = $newSenha;
        return;
    }

    public function setRA($newRA)
    {
        $this->RA = $newRA;
        return;
    }

    public function setIsAdmin($newIsAdmin)
    {
        $this->isAdmin = $newIsAdmin;
        return;
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
