<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ComentarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comentarios = Comentario::all();
        return $comentarios;
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
        $request["nome"] = Auth::user()->nome;
        $request["image"] = Auth::user()->image;
        $comentario = Comentario::create($request->all());
        return response()->json([
            "status" => "success",
            "message" => "Comentario criado com Sucesso!",
            "comentario" => $comentario,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id_denuncia, string $id_usuario)
    {
        if (Auth::user()->tipo_usuario != 1) {
            $id_usuario = Auth::id();
        }
        $comentario = Comentario::where(["id_denuncia" => $id_denuncia, "id_usuario" => $id_usuario])->get();
        return $comentario;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comentario $comentario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comentario $comentario)
    {
        $comentario->fill($request->all());
        $comentario->save();
        return "Comentario Atualizada com Sucesso!";
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id_comentario)
    {
        Comentario::destroy($id_comentario);
        return "Comentario Deletada com Sucesso!";
    }
}
