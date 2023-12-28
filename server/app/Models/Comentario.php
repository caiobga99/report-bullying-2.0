<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    use HasUuids;
    use HasFactory;

    protected $table = "comentarios";
    protected $primaryKey = "id_comentario";
    protected $fillable = ["id_comentario", "mensagem", "id_usuario", "id_denuncia", "nome", "image"];

    public function usuarios()
    {
        return $this->hasMany(User::class, "id_usuario");
    }
    public function denuncias()
    {
        return $this->hasMany(Denuncia::class, "id_usuario");
    }
}
