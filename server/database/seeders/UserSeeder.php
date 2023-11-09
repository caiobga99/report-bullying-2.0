<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('usuarios')->insert([
            'nome' => "Anonimo",
            'email' => "Anonimo" . '@gmail.com',
            'password' => "Anonimo@123",
            'RA' => "Anonimo",
            'tipo_usuario' => false,
            'id_usuario' => "Anonimo",
        ]);
    }
}
