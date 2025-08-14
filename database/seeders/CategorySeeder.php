<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Web Development', 'description' => 'Modern web development techniques and frameworks', 'color' => '#3B82F6'],
            ['name' => 'Mobile Development', 'description' => 'iOS and Android app development', 'color' => '#10B981'],
            ['name' => 'DevOps', 'description' => 'Deployment, CI/CD, and infrastructure management', 'color' => '#F59E0B'],
            ['name' => 'Machine Learning', 'description' => 'AI and machine learning algorithms and applications', 'color' => '#8B5CF6'],
            ['name' => 'Cloud Computing', 'description' => 'AWS, Azure, GCP and cloud-native development', 'color' => '#06B6D4'],
            ['name' => 'Backend Development', 'description' => 'Server-side development and APIs', 'color' => '#EF4444'],
            ['name' => 'Frontend Development', 'description' => 'UI development with modern frameworks', 'color' => '#EC4899'],
            ['name' => 'Database Management', 'description' => 'SQL, NoSQL, and database optimization', 'color' => '#84CC16'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}