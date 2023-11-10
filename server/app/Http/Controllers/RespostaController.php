<?php

namespace App\Http\Controllers;

use App\Models\Denuncia;
use App\Models\Resposta;
use Auth;
use Illuminate\Http\Request;

class RespostaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $token = csrf_token();
        $repostas = Resposta::all();
        echo $token . "\n";
        return $repostas;
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

        $mensagemChat = app("App\Http\Controllers\ChatController")->getConselho($request["mensagem"]);
        $request["conselho"] = $mensagemChat;
        if (Auth::check()) {
            $request["id_usuario"] = Auth::id();
        } else {
            $request["id_usuario"] = "";
        }
        Resposta::create($request->all());
        return "Resposta criada com sucesso!";
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id_denuncia, string $id_usuario)
    {
        if (Auth::user()->tipo_usuario != 1) {
            $id_usuario = Auth::id();
        }
        $resposta = Resposta::where(["id_denuncia" => $id_denuncia, "id_usuario" => $id_usuario])->get();
        return $resposta;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Resposta $resposta)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Resposta $resposta)
    {
        $resposta->fill($request->all());
        $resposta->save();
        return "Resposta Atualizado com Sucesso!";
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Resposta::destroy($id);
        return "Usuario Deletado com Sucesso!";
    }
}
