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

Route::resource("/usuarios", UsuarioController::class);

Route::get("/login", [LoginController::class, "displayLogin"])->name("login");
Route::post("/login", [LoginController::class, "authenticate"]);

Route::resource("/denuncias", DenunciaController::class);
// Route::resource("/denuncias", DenunciaController::class)->middleware("auth:administrador");
// user comum so pode ver as denuncias realizadas 



Route::middleware(["autenticador"])->group(function () {
    Route::get("/teste", function () {
        return "ola";
    });
    Route::get("/logout", [LogoutController::class, "logout"])->name("logout");

    Route::get("/token", function () {
        $token = csrf_token();
        return $token;
    });
});