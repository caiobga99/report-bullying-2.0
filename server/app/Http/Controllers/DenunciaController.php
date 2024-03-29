<?php

namespace App\Http\Controllers;

use App\Mail\DenunciasCreated;
use App\Models\Denuncia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DenunciaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Denuncia $denuncia)
    {

        // $denunciasComComentarios = Denuncia::select('denuncias.*')
        //     ->addSelect(DB::raw('JSON_ARRAYAGG(JSON_OBJECT("id_comentario", comentarios.id_comentario, "id_usuario", comentarios.id_usuario, "mensagem", comentarios.mensagem, "created_at", comentarios.created_at, "updated_at", comentarios.updated_at)) AS comentarios_relacionados'))
        //     ->leftJoin('comentarios', 'denuncias.id_denuncia', '=', 'comentarios.id_denuncia')
        //     ->groupBy('denuncias.id_denuncia', 'denuncias.titulo', 'denuncias.mensagem', 'denuncias.id_usuario', 'denuncias.created_at', 'denuncias.updated_at', 'denuncias.email', 'denuncias.nome', 'denuncias.RA')
        //     ->get();

        // $denunciasFormatadas = $denunciasComComentarios->map(function ($denuncia) {
        //     $denuncia['comentarios_relacionados'] = json_decode($denuncia['comentarios_relacionados'], true);
        //     return [
        //         'denuncia' => $denuncia,
        //     ];
        // })->toArray();

        // $denuncia = Denuncia::all()->sortBy("created_at")
        //     ->orderBy('created_at', 'ASC')
        //     ->get();
        $denuncia = Denuncia::all();
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
        $denunciasComComentarios = Denuncia::select('denuncias.*')
            ->addSelect(DB::raw('JSON_ARRAYAGG(JSON_OBJECT("id_comentario", comentarios.id_comentario, "id_usuario", comentarios.id_usuario, "mensagem", comentarios.mensagem, "nome", comentarios.nome, "image", comentarios.image, "created_at", comentarios.created_at, "updated_at", comentarios.updated_at)) AS comentarios_relacionados'))
            ->leftJoin('comentarios', 'denuncias.id_denuncia', '=', 'comentarios.id_denuncia')
            ->where('denuncias.id_usuario', $id)
            ->groupBy('denuncias.id_denuncia', 'denuncias.titulo', 'denuncias.mensagem', 'denuncias.id_usuario', 'denuncias.created_at', 'denuncias.updated_at', 'denuncias.email', 'denuncias.nome', 'denuncias.RA')
            ->get();
        $denunciasFormatadas = $denunciasComComentarios->map(function ($denuncia) {
            $denuncia['comentarios_relacionados'] = json_decode($denuncia['comentarios_relacionados'], true);
            return [
                'denuncia' => $denuncia,
            ];
        })->toArray();
        return $denunciasFormatadas;
    }

    public function getDenunciaById(string $id_usuario)
    {
        if ($id_usuario == null) {
            $id = Auth::id();
        } else {
            $id = $id_usuario;
        }
        $denunciasComComentarios = Denuncia::select('denuncias.*')
        ->addSelect(DB::raw('JSON_ARRAYAGG(JSON_OBJECT("id_comentario", comentarios.id_comentario, "id_usuario", comentarios.id_usuario, "mensagem", comentarios.mensagem, "nome", comentarios.nome, "image", comentarios.image, "created_at", comentarios.created_at, "updated_at", comentarios.updated_at)) AS comentarios_relacionados'))
        ->leftJoin('comentarios', 'denuncias.id_denuncia', '=', 'comentarios.id_denuncia')
        ->where('denuncias.id_usuario', $id)
        ->groupBy('denuncias.id_denuncia', 'denuncias.titulo', 'denuncias.mensagem', 'denuncias.id_usuario', 'denuncias.created_at', 'denuncias.updated_at', 'denuncias.email', 'denuncias.nome', 'denuncias.RA')
        ->get();
    $denunciasFormatadas = $denunciasComComentarios->map(function ($denuncia) {
        $denuncia['comentarios_relacionados'] = json_decode($denuncia['comentarios_relacionados'], true);
        return [
            'denuncia' => $denuncia,
        ];
    })->toArray();
    return $denunciasFormatadas;
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
