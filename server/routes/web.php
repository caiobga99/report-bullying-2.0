<?php

use App\Http\Controllers\DenunciaController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Autenticador;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get("/", function () {
    return view("welcome");
});

Route::get("/login", [LoginController::class, "displayLogin"])->name("login");
Route::post("/login", [LoginController::class, "authenticate"]);

Route::post("/denuncias", [DenunciaController::class, "store"]);

Route::get("/naoadm", function () {
    return "nao é administrador!";
});




Route::middleware(["autenticador"])->group(function () {

    Route::get("/logout", [LogoutController::class, "logout"])->name("logout");

    Route::resource("/usuarios", UsuarioController::class);
    Route::get("/usuario", [UsuarioController::class, "show"]);
    Route::get("/usuarios", [UsuarioController::class, "index"])->block();

    Route::get("/denuncia", [DenunciaController::class, "show"]);
    Route::resource("denuncias", DenunciaController::class);

    Route::middleware(["admin"])->group(function () {
        Route::get("/usuarios", [UsuarioController::class, "index"]);
        Route::post("/usuarios", [UsuarioController::class, "store"]);

        Route::resource("denuncias", DenunciaController::class);
    });
});