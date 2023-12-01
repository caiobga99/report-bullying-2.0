<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\DenunciaController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\RespostaController;
use App\Http\Controllers\UsuarioController;
use App\Mail\DenunciasCreated;
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

// Route::get("/email", function () {
//     return new DenunciasCreated("titulo de teste", "mensagem de teste");
// });


Route::get("/naoadm", function () {
    return response()->json(["Nao é admin"]);
});
Route::get("/token", function () {
    $token = csrf_token();
    return $token;
});

Route::get("/", function () {
    return view("welcome");
});

Route::get("/login", [LoginController::class, "displayLogin"])->name("login");
Route::post("/login", [LoginController::class, "authenticate"]);


Route::post("/usuarios", [UsuarioController::class, "store"]);
Route::post("/testeApi", [ChatController::class, "getConselho"]);


Route::middleware(["auth:sanctum"])->group(function () {
    Route::post("/userIsLogged", [LoginController::class, "checkLogged"]);
    Route::post("/logout", [LogoutController::class, "logout"])->name("logout");
    Route::get("/resposta/{id_denuncia}/{id_usuario}", [RespostaController::class, "show"]);
    Route::get("/usuario", [UsuarioController::class, "show"]);
    Route::get("/usuarios", [UsuarioController::class, "index"])->block();
    Route::get("/denuncia", [DenunciaController::class, "show"]);
    Route::post("/denuncias", [DenunciaController::class, "store"]);
    Route::resource("respostas", RespostaController::class);

    Route::middleware(["admin"])->group(function () {
        Route::get("/usuarios", [UsuarioController::class, "index"]);

        //   Route::post("/usuarios", [UsuarioController::class, "store"]);
        Route::get("/denuncias", [DenunciaController::class, "index"]);
        Route::patch("/denuncias", [DenunciaController::class, "update"]); // arrumar
        Route::delete("/denuncias", [DenunciaController::class, "destroy"]);

        //  Route::resource("denuncias", DenunciaController::class); 
    });
});
