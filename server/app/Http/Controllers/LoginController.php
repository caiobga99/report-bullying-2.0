<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Handle an authentication attempt.
     */
    public function authenticate(Request $request)
    // public function authenticate(Request $request): RedirectResponse
    {
        if (Auth::check() && Auth::user()->tipo_usuario != 1) {
            return "ja esta logado!";
        }
        $credentials = $request->validate([
            "email" => ["required", "email"],
            "password" => ["required"],
        ]);
        if (Auth::attempt($credentials)) {
            $typeUser = Auth::user()->tipo_usuario;
            if ($typeUser == 0) {
                session(["tipo" => "comum"]);
            } elseif ($typeUser == 1) {
                session(["tipo" => "administrador"]);
            }
            return "Usuario Logado com Sucesso!";
        } else {
            return "Usuario ou senha incorretos!";
        }

        // return back()->withErrors([
        //     "email" => "The provided credentials do not match our records.",
        // ])->onlyInput("email");
    }

    public function displayLogin()
    {
        $token = csrf_token();
        echo $token . "\n";
        return "Não esta logado!";
    }
}