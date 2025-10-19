<?php

namespace Database\Seeders;

use App\Models\LegalInfo;
use App\Support\LegalInfoFixtures;
use Illuminate\Database\Seeder;

class LegalInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $infoData = LegalInfoFixtures::getFixtures();

        $infoData->each(function (array $raw) {
            LegalInfo::factory(
                [
                    'key' => $raw['key'],
                    'title' => $raw['title'],
                    'body' => $raw['body'],
                ]
            )->create();
        });
    }
}
