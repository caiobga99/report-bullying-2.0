<?php

use App\Models\Denuncia;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comentarios', function (Blueprint $table) {
            $table->uuid("id_comentario")->primary();
            $table->longText("mensagem");
            $table->string("nome", 45);
            $table->string('image');
            $table->foreignIdFor(User::class, "id_usuario")->nullable();
            $table->foreignIdFor(Denuncia::class, "id_denuncia");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comentarios');
    }
};
