<?php
class Database
{
    private string $porta;
    private string $nomeDoBanco;
    private string $usuarioBanco;
    private string $senhaBanco;

    private $conexao;


    function __construct(){
        $this->porta = "localhost";
        $this->nomeDoBanco = "report_bullying";
        $this->usuarioBanco = "root";
        $this->senhaBanco = "";


        $this->conexao = new PDO(
            "mysql:host=$this->porta;
            dbname=$this->nomeDoBanco",
            $this->usuarioBanco,
            $this->senhaBanco
        );
    }




    ######################################################################################
    # QUERYS GERAIS:
    ######################################################################################

    /**
    * ENVIA UMA QUERY AO BANCO DE DADOS.
    * 
    * @param string $query QUERY QUE DESEJA ENVIAR AO BANCO DE DADOS.
    * @author Gabriel Emerenciano
    * @return PDOStatement|bool Retorna o objeto PDOStatement ou false se ocorrer um erro.
    *
    */ 
    public function query(string $query)
    {
        return $this->conexao->query($query);
    }

     /**
    * ENVIA UMA QUERY AO BANCO DE DADOS.
    * 
    * @param string $query QUERY QUE DESEJA ENVIAR AO BANCO DE DADOS.
    * @author Gabriel Emerenciano
    * @return PDO Retorna conexao.
    *
    */ 
    public function getConexao()
    {
        return $this->conexao;
    }


    ######################################################################################
    # QUERYS DE USER:
    ######################################################################################


    /**
    * CADASTRA UM USUARIO NO BANCO DE DADOS.
    *
    * @author Gabriel Emerenciano
    * @param User $userToDump Recebe um Usuario para ser cadastrado no banco de dados do tipo User;
    * @return bool True se executou sem problemas e False se ocorreu um erro.
    * EXEMPLO: dumpUser(User $usuarioAtual);    
    *
    */ 
    public function dumpUser(User $userToDump){
        $id = $userToDump->getId();
        $email = $userToDump->getEmail();
        $senha = $userToDump->getSenha();
        $RA = $userToDump->getRA();
        $isAdmin = $userToDump->getIsAdmin();

        $prepare = $this->conexao->prepare("INSERT INTO usuario(id, email, senha, RA, isAdmin) VALUES(:id, :email, :senha, :RA, :isAdmin)");

        $prepare->bindParam(':id', $id);
        $prepare->bindParam(':email', $email);
        $prepare->bindParam(':senha', $senha);
        $prepare->bindParam(':RA', $RA);
        $prepare->bindParam(':isAdmin', $isAdmin);

        return $prepare->execute();
    }

    /**
    * RETORNA TODOS OS USUARIOS DO BANCO DE DADOS.
    *
    * @author Gabriel Emerenciano
    * @return array Retorna um array associativo, com outros arrays que seriam as rows, cada row é associado pela column e o valor
    *
    */ 
    public function getAllUsers()
    {
        return $this->query("SELECT * FROM usuario")->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
    * RETORNA O USUARIO DO BANCO DE DADOS PELO ID.
    *
    * @author Gabriel Emerenciano
    * @return User|bool Retorna os dados em um novo usuario do tipo User, se não encontrar retorna falso.
    * EXEMPLO: $newUser = getUserById($uuid); $newUser->getId();
    *
    */ 
    public function getUserById($uuid){
        // Pega os dados do usuario em formato de array associativo ex: array['senha'] : 'exemplo@gmail.com'
        $prepare = $this->conexao->prepare("SELECT * FROM usuario WHERE id = :id");

        $prepare->bindParam(':id', $uuid);

        $prepare->execute();

        $userArray = $prepare->fetch(PDO::FETCH_ASSOC);

        if($userArray == null){
            return false;
        }


        // Transforma os dados do usuario de array para um novo objeto User e o retorna.
        $id = $userArray['id'];
        $email = $userArray['email'];
        $senha = $userArray['senha'];
        $RA = $userArray['RA'];
        $isAdmin = $userArray['isAdmin'];

        return new User($id, $email, $senha, $RA, $isAdmin);
    }

    /**
    * DELETA O USUARIO PELO ID
    *
    * @author Gabriel Emerenciano
    * @param string $idToDelete ID do usuario que será deletado.
    * @return bool True se executou sem problemas e False se ocorreu um erro.
    *
    */ 
    public function deleteUserById(string $idToDelete){
        $prepare = $this->conexao->prepare("DELETE FROM usuario WHERE id = :id");

        $prepare->bindParam(':id', $idToDelete);

        $prepare->execute();

        if($prepare->rowCount() == 0){
            return false;
        }
        return true;
    }

}