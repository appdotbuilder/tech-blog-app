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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Article title');
            $table->string('slug')->unique()->comment('URL-friendly version of title');
            $table->text('excerpt')->nullable()->comment('Short description/summary');
            $table->longText('content')->comment('Article content in Markdown');
            $table->string('featured_image')->nullable()->comment('Featured image URL');
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->integer('views_count')->default(0)->comment('Article view count');
            $table->integer('reading_time')->nullable()->comment('Estimated reading time in minutes');
            $table->timestamps();
            
            $table->index('title');
            $table->index('slug');
            $table->index('status');
            $table->index(['status', 'published_at']);
            $table->index('category_id');
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};