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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'dosen', 'mahasiswa'])->default('mahasiswa')->after('email');
            $table->string('nim')->nullable()->after('role');
            $table->string('nidn')->nullable()->after('nim');
            $table->string('phone')->nullable()->after('nidn');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'nim', 'nidn', 'phone']);
        });
    }
};
