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
        Schema::create('theses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->integer('year');
            $table->text('description');
            $table->string('category');
            $table->text('keywords')->nullable();
            $table->string('author_name');
            $table->string('file_path');
            $table->integer('file_size')->default(0);
            $table->integer('download_count')->default(0);
            $table->timestamps();
            
            // Indexes for search performance
            $table->index('title');
            $table->index('category');
            $table->index('year');
            $table->index('author_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('theses');
    }
};
