<?php

namespace App\Http\Controllers;

use App\Mail\DenunciasCreated;
use App\Models\Denuncia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class DenunciaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Denuncia $denuncia)
    {
        $token = csrf_token();
        $denuncia = Denuncia::all();
        echo $token . "\n";
        return $denuncia;
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
        //problema do tempo da requisicao é algo relacionado a request

        if (Auth::check()) {
            $request["id_usuario"] = Auth::id();
            $request["email"] = Auth::user()->email;
            $request["nome"] = Auth::user()->nome;

            $request["RA"] = Auth::user()->RA;
            $request["tipo_denuncia"] = false;
            $request["conselho"] = $mensagemChat;
        } else {
            $request["id_usuario"] = "";
            $request["email"] = "";
            $request["nome"] = "";
            $request["RA"] = "";
            $request["tipo_denuncia"] = true;
        }
        Denuncia::create($request->all());

        // $email = new DenunciasCreated($request["titulo"], $request["mensagem"]);
        // $email = new DenunciasCreated(
        //     $request["titulo"],
        //     $mensagemChat
        // );
        // \Mail::to(Auth::user())->send($email);
        // return "Denuncia Criada com sucesso!";

        // Denuncia::query("INSERT INTO denuncias (conselho) VALUES $mensagemChat");
        return "Denuncia Criada com Sucesso! " . "\n" . $mensagemChat;
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $id = Auth::id();
        $denuncia = Denuncia::all()->where('id_usuario', $id)->values();
        return $denuncia;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Denuncia $denuncia)
    {
        $denuncia->fill($request->all());
        $denuncia->save();
        return "Denuncia Atualizada com Sucesso!";
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Denuncia::destroy($id);
        return "Denuncia Deletada com Sucesso!";
    }
}