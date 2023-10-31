<?php

use App\Models\Denuncia;
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
        Schema::create("respostas", function (Blueprint $table) {
            $table->uuid("id_resposta")->primary();
            $table->longText("conselho");
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
        Schema::dropIfExists("respostas");
    }
};
