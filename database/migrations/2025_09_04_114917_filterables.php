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
        Schema::create('filterables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_filter_id')
                ->constrained('category_filters')
                ->onDelete('cascade');

            $table->morphs('filterable');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('filterables');
    }
};
