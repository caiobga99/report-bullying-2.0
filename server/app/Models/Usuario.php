<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Usuario extends Model
{
    protected $fillable = [
        'email',
        'senha',
        'RA',
        'isAdmin',

    ];
    use HasUuids;
}