<?php

namespace App\Http\Controllers;

use App\Models\Denuncia;
use Auth;
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

        //arrumar foreign key
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
        // $id_usuario = $request["id_usuario"];
        // $email = $request["email"];
        // echo ($email);
        Denuncia::create($request->all());
        return "Denuncia Criada com Sucesso!";
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $id = Auth::id();
        $denuncia = Denuncia::all()->where('id_usuario', $id);
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