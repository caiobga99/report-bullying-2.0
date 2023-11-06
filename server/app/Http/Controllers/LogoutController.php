<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class LogoutController extends Controller
{

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        // Session::flush();
        return response()->json([
            "status" => "success",
            "message" => "Usuario deslogado com sucesso!",
            "token" => csrf_token(),
        ]);
        // return redirect('login');
    }
}