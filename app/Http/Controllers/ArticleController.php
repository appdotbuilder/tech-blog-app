<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Article::with(['category', 'user'])
            ->latest('created_at');

        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'LIKE', '%' . $request->search . '%')
                  ->orWhere('content', 'LIKE', '%' . $request->search . '%');
            });
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        } else {
            $query->published();
        }

        $articles = $query->paginate(12);
        $categories = Category::orderBy('name')->get();

        return Inertia::render('articles/index', [
            'articles' => $articles,
            'categories' => $categories,
            'filters' => $request->only(['category', 'search', 'status'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::orderBy('name')->get();

        return Inertia::render('articles/create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        
        if ($data['status'] === 'published' && !isset($data['published_at'])) {
            $data['published_at'] = now();
        }

        $article = Article::create($data);

        return redirect()->route('articles.show', $article)
            ->with('success', 'Article created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        $article->load(['category', 'user']);
        
        // Increment view count
        $article->increment('views_count');

        return Inertia::render('articles/show', [
            'article' => $article
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        $categories = Category::orderBy('name')->get();

        return Inertia::render('articles/edit', [
            'article' => $article,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        $data = $request->validated();
        
        if ($data['status'] === 'published' && $article->status === 'draft') {
            $data['published_at'] = now();
        }

        $article->update($data);

        return redirect()->route('articles.show', $article)
            ->with('success', 'Article updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $article->delete();

        return redirect()->route('articles.index')
            ->with('success', 'Article deleted successfully.');
    }
}