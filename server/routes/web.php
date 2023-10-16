<?php

use App\Http\Controllers\DenunciaController;
use App\Http\Controllers\UsuarioController;
use App\Models\Denuncia;
use Illuminate\Support\Facades\Route;

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
Route::get('/token', function () {
    $token = csrf_token();

    return $token;
});

Route::resource('/usuarios', UsuarioController::class);
Route::resource("/denuncias", DenunciaController::class);