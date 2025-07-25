<?php

namespace Database\Seeders;

use App\Models\FaqItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FaqItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FaqItem::factory(6)->withFixture()->create();
    }
}
