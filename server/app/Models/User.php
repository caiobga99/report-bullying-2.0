<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasUuids;
    use HasFactory;
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = "usuarios";
    protected $primaryKey = "id_usuario";
    protected $fillable = [
        "email",
        "nome",
        "RA",
        "tipo_usuario",
        "id_usuario",
        "password",
    ];


    public function denuncias()
    {
        return $this->hasMany(Denuncia::class, "id_usuario");
    }
}