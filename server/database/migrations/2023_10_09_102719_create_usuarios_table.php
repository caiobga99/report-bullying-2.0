<?php

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
        Schema::create("usuarios", function (Blueprint $table) {
            $table->uuid("id_usuario")->primary();
            $table->string("email", 100)->unique();
            $table->string("nome", 45);
            $table->string("password");
            $table->string("RA")->nullable();
            $table->boolean("tipo_usuario");
            $table->string('image')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("usuarios");
    }
};
