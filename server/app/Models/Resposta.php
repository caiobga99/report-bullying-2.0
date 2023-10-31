<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resposta extends Model
{
    use HasUuids;
    use HasFactory;

    protected $table = "respostas";
    protected $primaryKey = "id_resposta";
    protected $fillable = ["id_resposta", "conselho", "id_usuario", "id_denuncia"];

    public function usuario()
    {
        return $this->hasMany(User::class, "id_usuario");
    }
    public function denuncias()
    {
        return $this->hasMany(Denuncia::class, "id_usuario");
    }
}
