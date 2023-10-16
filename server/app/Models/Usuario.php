<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Usuario extends Model
{
    use HasFactory;
    protected $fillable = [
        'email',
        'senha',
        'RA',
        'isAdmin',

    ];
    protected $table = "usuarios";
    public function denuncias()
    {
        return $this->hasMany(Denuncia::class);
    }
    use HasUuids;
}