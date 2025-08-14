<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->randomElement([
            'Web Development',
            'Mobile Development',
            'DevOps',
            'Machine Learning',
            'Data Science',
            'Backend Development',
            'Frontend Development',
            'Cloud Computing',
            'Cybersecurity',
            'UI/UX Design',
            'Database Management',
            'API Development'
        ]);

        $colors = [
            '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
            '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16',
            '#F97316', '#6366F1', '#14B8A6', '#F43F5E'
        ];

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->sentence(10),
            'color' => fake()->randomElement($colors),
        ];
    }
}