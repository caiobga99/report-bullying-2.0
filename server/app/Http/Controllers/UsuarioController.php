<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $token = csrf_token();
        $usuario = Usuario::all();
        echo $token . "\n";
        return $usuario;
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
        // $data=$request->except("password");
        // $password=$request->input("password");
        // $password=Hash::make($senha);
        // $data["password"]=$password;

        Usuario::create($request->all());
        return "Usuario Criado com sucesso!";
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function update(Request $request, Usuario $usuario)
    {
        $usuario->fill($request->all());
        $usuario->save();
        return "Usuario Atualizada com Sucesso!";
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Usuario::destroy($id);
        return "Usuario Deletada com Sucesso!";
    }
    public function login(Request $request)
    {
        $dados = $request->only("email", "password");

        if (\Auth::attempt($dados)) {
            return "Usuario Logado com Sucesso!";
        } else {
            return "Usuario ou senha incorretos!";
        }
    }
    public function logOut(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect("/");
    }
    public function telaLogin()
    {
        return "Tela Login!";
    }
}