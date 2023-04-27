<?php
class Database
{
    private string $porta;
    private string $nomeDoBanco;
    private string $usuarioBanco;
    private string $senhaBanco;

    private $conexao;


    function __construct()
    {
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
    public function dumpUser(User $userToDump): bool
    {

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


    private function createUserByUserArray(array $userArray)
    {
        $id = $userArray['id'];
        $email = $userArray['email'];
        $senha = $userArray['senha'];
        $RA = $userArray['RA'];
        $isAdmin = $userArray['isAdmin'];


        return new User($id, $email, $senha, $RA, $isAdmin);
    }


    /**
     * RETORNA UM OBJETO USER PELO EMAIL E SENHA
     *
     * @author Gabriel Emerenciano
     * @param string $emailToLogin email do usuario que sera retornado.
     * @param string $senhaToLogin senha do usuario que sera retornado.
     * @return User o User do Email e Senha.
     *
     */
    public function loginUser(string $emailToLogin, string $passwordToLogin, bool $rememberMe): User
    {
        $prepare = $this->conexao->prepare("SELECT * FROM usuario WHERE email = :email AND senha = :senha");
        $prepare->bindParam(':email', $emailToLogin);
        $prepare->bindParam(':senha', $passwordToLogin);
        $prepare->execute();

        $userArray = $prepare->fetch(PDO::FETCH_ASSOC);

        if($rememberMe){
            $cookieId = genUuid4();


            setcookie('loginCookie', $cookieId, time() + (86400 * 30), '/'); // 86400 == 1 day


            $prepareCookie = $this->conexao->prepare("INSERT INTO cookies VALUES(:cookieId, :userId)");
            $prepareCookie->bindParam(':cookieId', $cookieId);
            $prepareCookie->bindParam(':userId', $userArray['id']);
            $prepareCookie->execute();

        }

        $User = $this->createUserByUserArray($userArray);

        session_start();

        $_SESSION['user'] = $User;


        return $User;
    }
    public function checkCookie(){
        if(isset($_COOKIE['loginCookie'])){
            $prepare = $this->conexao->prepare("SELECT fk_userId FROM cookies WHERE :cookieId = id");
            $prepare->bindParam(':cookieId', $_COOKIE['loginCookie']);
            $prepare->execute();

            $userId = $prepare->fetchColumn();
            
            session_destroy();
            session_start();

            $prepareUser = $this->conexao->prepare("SELECT * from usuario WHERE :id = id");

            $prepareUser->bindParam(':id', $userId);

            $prepareUser->execute();

            $userArray = $prepareUser->fetch(PDO::FETCH_ASSOC);

            if(!$prepareUser->rowCount()){
                echo 'erro';
                return false;
            }

            $User = $this->createUserByUserArray($userArray);

            $_SESSION['user'] = $User;
            
            return true;
        }

        return false;
    }

    /**
     * RETORNA O USUARIO DO BANCO DE DADOS PELO ID.
     *
     * @author Gabriel Emerenciano
     * @return User|bool Retorna os dados em um novo usuario do tipo User, se não encontrar retorna falso.
     * EXEMPLO: $newUser = getUserById($uuid); $newUser->getId();
     *
     */
    public function getUserById($uuid): User|bool
    {
        // Pega os dados do usuario em formato de array associativo ex: array['senha'] : 'exemplo@gmail.com'
        $prepare = $this->conexao->prepare("SELECT * FROM usuario WHERE id = :id");

        $prepare->bindParam(':id', $uuid);

        $prepare->execute();

        $userArray = $prepare->fetch(PDO::FETCH_ASSOC);

        if ($userArray == null) {
            return false;
        }


        return $this->createUserByUserArray($userArray);
    }

    /**
     * DELETA O USUARIO PELO ID
     *
     * @author Gabriel Emerenciano
     * @param string $idToDelete ID do usuario que será deletado.
     * @return bool True se executou sem problemas e False se ocorreu um erro.
     *
     */
    public function deleteUserById(string $idToDelete): bool
    {
        $prepare = $this->conexao->prepare("DELETE FROM denuncia WHERE fk_Usuario_id = :id");

        $prepare->bindParam(':id', $idToDelete);

        $prepare->execute();

        $prepare = $this->conexao->prepare("DELETE FROM usuario WHERE id = :id");

        $prepare->bindParam(':id', $idToDelete);

        $prepare->execute();

        if (!$prepare->rowCount()) {
            return false;
        }
        return true;
    }

    ######################################################################################
    # QUERYS DA DENUNCIA:
    ######################################################################################


    /**
     * CADASTRA UMA DENUNCIA NO BANCO DE DADOS.
     *
     * @author Gabriel Emerenciano
     * @param Denuncia $denunciaToDump Recebe uma Denuncia para ser cadastrado no banco de dados do tipo Denuncia;
     * @return bool True se executou sem problemas e False se ocorreu um erro.
     * EXEMPLO: dumpDenuncia(Denuncia $denunciaAtual);    
     *
     */
    public function dumpDenuncia(Denuncia $denunciaToDump): bool
    {
        $id = $denunciaToDump->getId();
        $titulo = $denunciaToDump->getTitulo();
        $mensagem = $denunciaToDump->getMensagem();
        $isAnon = $denunciaToDump->getIsAnon();
        $email = $denunciaToDump->getEmail();
        $RA = $denunciaToDump->getRA();
        $fk_Usuario_id = $denunciaToDump->getFk_Usuario_id();


        $prepare = $this->conexao->prepare("INSERT INTO denuncia(id, titulo, mensagem, isAnon, email, RA, fk_Usuario_id) VALUES(:id, :titulo, :mensagem, :isAnon, :email, :RA, :fk_Usuario_id)");

        $prepare->bindParam(':id', $id);
        $prepare->bindParam(':titulo', $titulo);
        $prepare->bindParam(':mensagem', $mensagem);
        $prepare->bindParam(':isAnon', $isAnon);
        $prepare->bindParam(':email', $email);
        $prepare->bindParam(':RA', $RA);
        $prepare->bindParam(':fk_Usuario_id', $fk_Usuario_id);

        return $prepare->execute();
    }


    /**
     * TRANSFORMA UM ARRAY DO PDO EM UM OBJETO DENUNCIA
     *
     * @author Gabriel Emerenciano
     * @param array $denunciaArray
     * @return Denuncia Retorna um objeto Denuncia.
     * EXEMPLO: $this->createDenunciaByDenunciaArray($arrayDenuncia);
     *
     */
    private function createDenunciaByDenunciaArray(array $denunciaArray): Denuncia
    {

        $id = $denunciaArray['id'];
        $titulo = $denunciaArray['titulo'];
        $mensagem = $denunciaArray['mensagem'];
        $isAnon = $denunciaArray['isAnon'];
        $email = $denunciaArray['email'];
        $RA = $denunciaArray['RA'];
        $fk_Usuario_id = $denunciaArray['fk_Usuario_id'];

        return new Denuncia($id, $titulo, $mensagem, $isAnon, $email, $RA, $fk_Usuario_id);
    }


    /**
     * RETORNA A DENUNCIA DO BANCO DE DADOS PELO ID.
     *
     * @author Gabriel Emerenciano
     * @return Denuncia|bool Retorna os dados em uma nova Denuncia do tipo Denuncia, se não encontrar retorna falso.
     * EXEMPLO: $newDenuncia = getDenunciaById($uuid); $newDenuncia->getId();
     *
     */
    public function getDenunciaById($uuid): Denuncia|bool
    {
        // Pega os dados do usuario em formato de array associativo ex: array['senha'] : 'exemplo@gmail.com'
        $prepare = $this->conexao->prepare("SELECT * FROM denuncia WHERE id = :id");

        $prepare->bindParam(':id', $uuid);

        $prepare->execute();

        $denunciaArray = $prepare->fetch(PDO::FETCH_ASSOC);

        if ($denunciaArray == null) {
            return false;
        }

        return $this->createDenunciaByDenunciaArray($denunciaArray);
    }

    /**
     * DELETA UMA DENUNCIA PELO ID
     *
     * @author Gabriel Emerenciano
     * @return bool
     *
     */
    public function deleteDenunciaById(string $idToDelete): bool
    {

        $prepare = $this->conexao->prepare("DELETE FROM denuncia WHERE id = :id");

        $prepare->bindParam(':id', $idToDelete);

        $prepare->execute();

        if (!$prepare->rowCount()) {
            return false;
        }
        return true;
    }
}
