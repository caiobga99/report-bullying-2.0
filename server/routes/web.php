<?php

use App\Http\Controllers\DenunciaController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------s------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get("/naoadm", function () {
    return response()->json(["Nao é administrador"]);
});

Route::get("/teste", function () {
    return response()->json(["Teste funcionou"]);
    ;
});

Route::get("/", function () {
    return view("welcome");
});

Route::get("/login", [LoginController::class, "displayLogin"])->name("login");
Route::post("/login", [LoginController::class, "authenticate"]);




Route::post("/usuarios", [UsuarioController::class, "store"]);

Route::get("/denuncia", [DenunciaController::class, "show"]);
Route::post("/denuncias", [DenunciaController::class, "store"]);

Route::middleware(["autenticador"])->group(function () {
    Route::get("/logout", [LogoutController::class, "logout"])->name("logout");

    Route::get("/usuario", [UsuarioController::class, "show"]);
    Route::get("/usuarios", [UsuarioController::class, "index"])->block();


    Route::middleware(["admin"])->group(function () {
        Route::get("/usuarios", [UsuarioController::class, "index"]);

        //   Route::post("/usuarios", [UsuarioController::class, "store"]);
        Route::get("/denuncias", [DenunciaController::class, "index"]);
        Route::patch("/denuncias", [DenunciaController::class, "update"]); // arrumar
        Route::delete("/denuncias", [DenunciaController::class, "destroy"]);

        //  Route::resource("denuncias", DenunciaController::class); 
    });
});