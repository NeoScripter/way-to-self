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
        Schema::create('tier_tier_cart', function (Blueprint $table) {
            $table->unsignedInteger('tier_id');
            $table->unsignedInteger('tier_cart_id');
            $table->timestamps();
            $table->primary(['tier_id', 'tier_cart_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tier_tier_cart');
    }
};
