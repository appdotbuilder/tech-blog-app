<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);

        // Seed categories
        $this->call(CategorySeeder::class);

        // Create articles with the test user
        \App\Models\Article::factory(25)
            ->for($user)
            ->published()
            ->create();

        \App\Models\Article::factory(8)
            ->for($user)
            ->draft()
            ->create();
    }
}
