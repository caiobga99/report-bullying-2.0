<?php


class Denuncia
{

    private string $id;

    private string $titulo;

    private string $mensagem;

    private bool $isAnon;

    private string $email;

    private string $RA;

    private string $fk_Usuario_id;


    public function __construct(string $id, string $titulo, string $mensagem, bool $isAnon, string $email = null, string $RA = null, string $fk_Usuario_id = '1a3330ce-2a61-4631-bd51-e643c105cb0e-ANONIMO')
    {
        $this->id = $id;
        $this->titulo = $titulo;
        $this->mensagem = $mensagem;
        $this->isAnon = $isAnon;
        $this->email = $email;
        $this->RA = $RA;
        $this->fk_Usuario_id = $fk_Usuario_id;
    }


    ######################################################################################
    # GETTERS E SETTERS:
    ######################################################################################

    public function setId($newId){
        $this->id = $newId;
        return;
    }

    public function setTitulo($newTitulo){
        $this->titulo = $newTitulo;
        return;
    }

    public function setMensagem($newMensagem){
        $this->mensagem = $newMensagem;
        return;
    }

    public function setIsAnon($newIsAnon){
        $this->isAnon = $newIsAnon;
        return;
    }

    public function setEmail($newEmail){
        $this->email = $newEmail;
        return;
    }

    public function setRA($newRA){
        $this->RA = $newRA;
        return;
    }

    public function setFk_Usuario_id($newFk_Usuario_id){
        $this->fk_Usuario_id = $newFk_Usuario_id;
        return;
    }



    public function getId(){
        return $this->id;
    }

    public function getTitulo(){
        return $this->titulo;
    }

    public function getMensagem(){
        return $this->mensagem;
    }

    public function getIsAnon(){
        return $this->isAnon;
    }

    public function getEmail(){
        return $this->email;
    }

    public function getRA(){
        return $this->RA;
    }

    public function getfk_Usuario_id(){
        return $this->fk_Usuario_id;
    }


}
