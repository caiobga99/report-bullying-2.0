<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Usuario extends Model
{
    use HasUuids;
    use HasFactory;
    protected $table = "usuarios";
    protected $primaryKey = "id_usuario";
    protected $fillable = [
        'email',
        'password',
        'RA',
        'isAdmin',
        "id_usuario",
    ];
    public function denuncias()
    {
        return $this->hasMany(Denuncia::class, "id_usuario");
    }
}