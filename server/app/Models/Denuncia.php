<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Denuncia extends Model
{
    use HasFactory;
    protected $table = "denuncias";
    protected $primaryKey = "fk_usuario_id";
    protected $fillable = ["titulo", "mensagem", "isAnon", "email", "RA"];
}