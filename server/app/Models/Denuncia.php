<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Denuncia extends Model
{
    use HasUuids;
    use HasFactory;

    protected $table = "denuncias";
    protected $primaryKey = "id_denuncia";
    protected $fillable = ["id_denuncia", "titulo", "mensagem", "nome", "email", "RA", "id_usuario"];
    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }

    public function comentarios()
    {
        return $this->hasMany(Comentario::class, 'id_denuncia');
    }
}
