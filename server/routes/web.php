<?php

use App\Http\Controllers\DenunciaController;
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

Route::get('/', function () {
    return view('welcome');
});



Route::resource('/usuarios', UsuarioController::class);
Route::get("/login", [UsuarioController::class, "telaLogin"])->name("login");
Route::post("/login", [UsuarioController::class, "login"]);
Route::get("/logout", [UsuarioController::class, "logout"])->name("logout");


Route::middleware(['autenticador'])->group(function () {
    Route::get('/', function () {
        return "ola";
    });
    Route::resource("/denuncias", DenunciaController::class);
    Route::get('/token', function () {
        $token = csrf_token();
        return $token;
    });
});