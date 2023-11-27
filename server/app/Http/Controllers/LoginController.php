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

            return "usuario logado!";
        }
        $credentials = $request->validate([
            "email" => ["required", "email"],
            "password" => ["required"],
        ]);


        if ($credentials["email"] == "Anonimo@gmail.com" && $credentials["password"] == "Anonimo@123") {
            if (Auth::attempt($credentials)) {
                /** @var \App\Models\User $user */
                $user = Auth::user();
                $token = $user->createToken("main")->plainTextToken;
                return response()->json([
                    "status" => "success",
                    "message" => "Usuario Anonimo Logado com Sucesso!",
                    "user" => $user,
                    "token" => $token,
                ]);
            }
        }
        if (Auth::attempt($credentials)) {
            $typeUser = Auth::user()->tipo_usuario;
            /** @var \App\Models\User $user */
            $user = Auth::user();
            $token = $user->createToken("main")->plainTextToken;
            if ($typeUser == 0) {
                session(["tipo" => "comum"]);
            } elseif ($typeUser == 1) {
                session(["tipo" => "administrador"]);
                return response()->json([
                    "status" => "success",
                    "message" => "Usuario Administrador Logado com Sucesso!",
                    "user" => $user,
                    "token" => $token,
                ]);
            }
            return response()->json([
                "status" => "success",
                "message" => "Usuario Logado com Sucesso!",
                "user" => $user,
                "token" => $token,
            ]);
        } else {
            return response()->json([
                "status" => "error",
                "message" => "Usuario ou senha incorretos!",
            ]);
        }

        // return back()->withErrors([
        //     "email" => "The provided credentials do not match our records.",
        // ])->onlyInput("email");
    }

    public function checkLogged()
    {
        return Auth::check();
    }

    public function displayLogin()
    {
        $token = csrf_token();
        echo $token . "\n";
        return "Não esta logado!";
    }
}