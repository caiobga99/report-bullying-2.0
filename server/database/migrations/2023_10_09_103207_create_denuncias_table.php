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
        Schema::create('denuncias', function (Blueprint $table) {
            $table->uuid('id');
            $table->string("titulo");
            $table->string("mensagem");
            $table->boolean("isAnon");
            $table->string("email")->unique();
            $table->string("RA");
            $table->uuid('fk_usuario_id')->nullable(false);
            $table->foreign('fk_usuario_id')->references('id')->on('usuarios')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('denuncias');
    }
};
