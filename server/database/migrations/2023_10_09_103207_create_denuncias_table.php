<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("denuncias", function (Blueprint $table) {
            $table->uuid("id_denuncia")->primary();
            $table->string("titulo");
            $table->string("mensagem");
            $table->string("email")->nullable();
            $table->string("nome")->nullable();
            $table->string("RA")->nullable();
            $table->foreignIdFor(User::class, "id_usuario")->nullable();
            // $table->foreign("fk_usuario_id")->references("id")->on("usuarios");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("denuncias");
    }
};