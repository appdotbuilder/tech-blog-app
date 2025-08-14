<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page - show latest published articles
Route::get('/', function () {
    $articles = Article::with(['category', 'user'])
        ->published()
        ->latest('published_at')
        ->take(6)
        ->get();
    
    $categories = Category::withCount('articles')
        ->orderBy('name')
        ->take(8)
        ->get();

    return Inertia::render('welcome', [
        'articles' => $articles,
        'categories' => $categories,
    ]);
})->name('home');

// Public article routes
Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
Route::get('/articles/{article:slug}', [ArticleController::class, 'show'])->name('articles.show');
Route::get('/categories/{category:slug}', [CategoryController::class, 'show'])->name('categories.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Protected article and category management routes
    Route::resource('manage/articles', ArticleController::class)->except(['index', 'show']);
    Route::resource('manage/categories', CategoryController::class)->except(['show']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
