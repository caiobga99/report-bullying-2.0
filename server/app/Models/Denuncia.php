<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Denuncia extends Model
{
    use HasUuids;
    use HasFactory;

    protected $table = "denuncias";
    protected $primaryKey = "id";
    protected $fillable = ["id", "titulo", "mensagem", "isAnon", "email", "RA", "id_usuario"];
    public function usuario()
    {
        return $this->hasMany(Usuario::class, "id_usuario");
    }
}