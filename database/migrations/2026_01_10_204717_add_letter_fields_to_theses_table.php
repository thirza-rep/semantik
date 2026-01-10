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
        Schema::table('theses', function (Blueprint $table) {
            $table->string('letter_number', 50)->nullable();
            $table->timestamp('letter_issued_at')->nullable();
            $table->foreignId('letter_issued_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('letter_file_path')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('theses', function (Blueprint $table) {
            $table->dropForeign(['letter_issued_by']);
            $table->dropColumn(['letter_number', 'letter_issued_at', 'letter_issued_by', 'letter_file_path']);
        });
    }
};
