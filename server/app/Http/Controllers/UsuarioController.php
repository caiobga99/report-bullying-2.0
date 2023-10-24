<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {

        $token = csrf_token();
        $usuarios = User::all();
        echo $token . "\n";
        return $usuarios;
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Auth::check() && Auth::user()->tipo_usuario != 1) {
            return "esta logado e nao e admin";
        }
        $data = $request->except("password");
        $password = $request->input("password");
        $data["tipo_usuario"] = 0;
        $email = $request->input("email");
        if ($email == "adm@adm.com") {
            $data["tipo_usuario"] = 1;
        }
        $passwordHash = Hash::make($password);
        $data["password"] = $passwordHash;
        User::create($data);
        if (!Auth::check()) {
            app("App\Http\Controllers\LoginController")->authenticate($request);
            return "Usuario Criado e logado com sucesso!";
        }
        return "Usuario Criado com sucesso!";
        // return redirect()->route('dashboard')  dashboard e a tela de visualização das denuncias exemplo
        // ->withSuccess('You have successfully registered & logged in!');
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $token = csrf_token();
        echo $token . "\n";
        $id = Auth::id();
        $usuario = User::all()->where('id_usuario', $id);
        return $usuario;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $usuario)
    {
        $usuario->fill($request->all());
        $usuario->save();
        return "Usuario Atualizado com Sucesso!";
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        User::destroy($id);
        return "Usuario Deletado com Sucesso!";
    }
    // public function login(Request $request)
    // {
    //     $dados = $request->only("email", "password");
    //     $credentials = $request->validate([
    //         "email" => ["required"],
    //         "password" => ["required"],
    //     ]);
    //     // echo $credentials["email"] . "\n";
    //     // echo $credentials["password"] . "\n";
    //     if (Auth::attempt($dados)) {
    //         $tipoUsuario = Auth::user()->tipo_usuario;
    //         if ($tipoUsuario === 0) {
    //             session(["tipo" => "comum"]);
    //         } elseif ($tipoUsuario === 1) {
    //             session(["tipo" => "administrador"]);
    //         }
    //         echo $tipoUsuario . "\n";
    //         return "Usuario Logado com Sucesso!";
    //     } else {
    //         return "Usuario ou senha incorretos!";
    //     }
    // }
    // public function logout(Request $request)
    // {
    //     Auth::logout();
    //     $request->session()->invalidate();
    //     $request->session()->regenerateToken();
    //     return "Usuario Deslogado!";
    //     // return redirect("/login");
    // }
    // public function telaLogin()
    // {
    //     $token = csrf_token();
    //     echo $token . "\n token telaLogin usuario conjtroller";
    //     return "Tela Login!";
    // }
}