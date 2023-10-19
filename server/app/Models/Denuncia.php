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
    protected $primaryKey = "id_denuncia";
    protected $fillable = ["id_denuncia", "titulo", "mensagem", "tipo_denuncia", "email", "RA", "id_usuario"];
    public function usuario()
    {
        return $this->hasMany(User::class, "id_usuario");
    }
}