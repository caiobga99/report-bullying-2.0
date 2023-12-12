<?php

namespace App\Http\Controllers;

use App\Mail\DenunciasCreated;
use App\Models\Denuncia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class DenunciaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Denuncia $denuncia)
    {
        $denuncia = Denuncia::all()->sortBy("created_at");
        // orderBy('created_at', 'ASC')->get()
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
        $request["id_usuario"] = Auth::id();
        $request["email"] = Auth::user()->email;
        $request["nome"] = Auth::user()->nome;
        $request["RA"] = Auth::user()->RA;



        $denuncia = Denuncia::create($request->all());
        $request["id_denuncia"] = $denuncia->id_denuncia;
        $resposta = app("App\Http\Controllers\RespostaController")->store($request);
        // $email = new DenunciasCreated($request["titulo"], $request["mensagem"]);
        // $email = new DenunciasCreated(
        //     $request["titulo"],
        //     $mensagemChat
        // );
        // \Mail::to(Auth::user())->send($email);
        // return "Denuncia Criada com sucesso!";
        // Denuncia::query("INSERT INTO denuncias (conselho) VALUES $mensagemChat");
        return response()->json([
            "status" => "success",
            "message" => "Denuncia Criada com Sucesso!",
            "denuncia" => $denuncia,
            "resposta" => $resposta->original,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $id = Auth::id();
        $denuncia = Denuncia::all()->where('id_usuario', $id)->sortByDesc("created_at")->values();
        return $denuncia;
    }

    public function getDenunciaById(string $id_usuario)
    {
        $denuncia = Denuncia::all()->where('id_usuario', $id_usuario)->sortByDesc("created_at")->values();
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
