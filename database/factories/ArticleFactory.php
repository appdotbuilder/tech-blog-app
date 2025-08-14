<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(random_int(3, 8));
        $content = fake()->paragraphs(random_int(5, 12), true);
        $isPublished = fake()->boolean(70);

        return [
            'title' => rtrim($title, '.'),
            'slug' => Str::slug($title),
            'excerpt' => fake()->paragraph(3),
            'content' => $this->generateMarkdownContent(),
            'featured_image' => fake()->boolean(60) ? fake()->imageUrl(1200, 630, 'technology') : null,
            'category_id' => Category::factory(),
            'user_id' => User::factory(),
            'status' => $isPublished ? 'published' : 'draft',
            'published_at' => $isPublished ? fake()->dateTimeBetween('-6 months', 'now') : null,
            'views_count' => $isPublished ? fake()->numberBetween(0, 5000) : 0,
            'reading_time' => fake()->numberBetween(2, 15),
        ];
    }

    /**
     * Generate realistic markdown content for technical articles.
     */
    protected function generateMarkdownContent(): string
    {
        $sections = [
            "# Introduction\n\n" . fake()->paragraph(4),
            "## Getting Started\n\n" . fake()->paragraph(3) . "\n\n```bash\nnpm install example-package\n```",
            "## Implementation\n\n" . fake()->paragraph(4) . "\n\n```javascript\nconst example = () => {\n  return 'Hello World';\n};\n```",
            "## Configuration\n\n" . fake()->paragraph(3) . "\n\n```json\n{\n  \"name\": \"example\",\n  \"version\": \"1.0.0\"\n}\n```",
            "## Best Practices\n\n" . fake()->paragraph(4) . "\n\n- " . fake()->sentence() . "\n- " . fake()->sentence() . "\n- " . fake()->sentence(),
            "## Conclusion\n\n" . fake()->paragraph(3),
        ];

        return implode("\n\n", array_slice($sections, 0, random_int(4, 6)));
    }

    /**
     * Indicate that the article is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'published_at' => fake()->dateTimeBetween('-3 months', 'now'),
        ]);
    }

    /**
     * Indicate that the article is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'published_at' => null,
            'views_count' => 0,
        ]);
    }
}