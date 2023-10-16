<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Denuncia extends Model
{
    use HasUuids;
    protected $table = "denuncias";
    protected $primaryKey = "id";
    protected $foreignKey = "fk_usuario_id";
    protected $fillable = ["titulo", "mensagem", "isAnon", "email", "RA"];
}