import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Icon } from '@/components/icon';
import { 
    Book, 
    Search,
    Tag,
    X
} from 'lucide-react';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image?: string;
    reading_time: number;
    views_count: number;
    published_at: string;
    category: {
        name: string;
        slug: string;
        color: string;
    };
    user: {
        name: string;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
}

interface PaginationLink {
    url?: string;
    label: string;
    active: boolean;
}

interface Props {
    articles: {
        data: Article[];
        links: PaginationLink[];
        meta: {
            total: number;
        };
    };
    categories: Category[];
    filters: {
        search?: string;
        category?: string;
    };
    [key: string]: unknown;
}

export default function ArticlesIndex({ articles, categories, filters }: Props) {
    const [search, setSearch] = React.useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/articles', { search, category: filters.category }, { preserveState: true });
    };

    const handleCategoryFilter = (categorySlug: string | null) => {
        router.get('/articles', { search, category: categorySlug }, { preserveState: true });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Icon iconNode={Book} className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-900">TechBlog</span>
                        </Link>
                        
                        <nav className="flex items-center space-x-6">
                            <Link href="/" className="text-slate-600 hover:text-slate-900">
                                Home
                            </Link>
                            <Link href="/articles" className="text-blue-600 font-medium">
                                Articles
                            </Link>
                            <Link href={route('login')}>
                                <Button variant="outline" size="sm">
                                    Sign In
                                </Button>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">All Articles</h1>
                    <p className="text-slate-600">
                        {articles.meta.total} technical articles to help you grow as a developer
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-lg border border-slate-200 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <form onSubmit={handleSearch} className="flex-1 flex gap-3">
                            <Input
                                type="text"
                                placeholder="Search articles..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1"
                            />
                            <Button type="submit">
                                <Icon iconNode={Search} className="w-4 h-4" />
                            </Button>
                        </form>
                        
                        <div className="flex gap-3">
                            <Select 
                                value={filters.category || ''} 
                                onValueChange={(value) => handleCategoryFilter(value || null)}
                            >
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">All Categories</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.slug}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {(filters.search || filters.category) && (
                        <div className="mt-4 flex items-center gap-2">
                            <span className="text-sm text-slate-600">Active filters:</span>
                            {filters.search && (
                                <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                    <Icon iconNode={Search} className="w-3 h-3" />
                                    {filters.search}
                                    <button 
                                        onClick={() => router.get('/articles', { category: filters.category })}
                                        className="ml-1 hover:text-blue-600"
                                    >
                                        <Icon iconNode={X} className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                            {filters.category && (
                                <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                    <Icon iconNode={Tag} className="w-3 h-3" />
                                    {categories.find(c => c.slug === filters.category)?.name}
                                    <button 
                                        onClick={() => router.get('/articles', { search: filters.search })}
                                        className="ml-1 hover:text-purple-600"
                                    >
                                        <Icon iconNode={X} className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                            <button 
                                onClick={() => router.get('/articles')}
                                className="text-sm text-slate-500 hover:text-slate-700"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>

                {/* Articles Grid */}
                {articles.data.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {articles.data.map((article) => (
                            <article key={article.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group">
                                {article.featured_image && (
                                    <div className="aspect-video bg-slate-100 overflow-hidden">
                                        <img 
                                            src={article.featured_image} 
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                        />
                                    </div>
                                )}
                                
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span 
                                            className="px-3 py-1 text-xs font-medium rounded-full text-white"
                                            style={{ backgroundColor: article.category.color }}
                                        >
                                            {article.category.name}
                                        </span>
                                        <div className="flex items-center text-xs text-slate-500 space-x-2">
                                            <span>{article.reading_time} min</span>
                                            <span>•</span>
                                            <span>{article.views_count} views</span>
                                        </div>
                                    </div>
                                    
                                    <h2 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                        <Link href={`/articles/${article.slug}`}>
                                            {article.title}
                                        </Link>
                                    </h2>
                                    
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {article.excerpt}
                                    </p>
                                    
                                    <div className="flex items-center justify-between text-sm text-slate-500">
                                        <span>By {article.user.name}</span>
                                        <span>{new Date(article.published_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                        <Icon iconNode={Search} className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-2">No articles found</h3>
                        <p className="text-slate-600 mb-4">
                            {filters.search || filters.category 
                                ? "Try adjusting your search criteria" 
                                : "No articles have been published yet"
                            }
                        </p>
                        {(filters.search || filters.category) && (
                            <Button onClick={() => router.get('/articles')} variant="outline">
                                Clear filters
                            </Button>
                        )}
                    </div>
                )}

                {/* Pagination */}
                {articles.data.length > 0 && articles.links && (
                    <div className="flex items-center justify-center space-x-2">
                        {articles.links.map((link, index: number) => (
                            <Button
                                key={index}
                                variant={link.active ? "default" : "outline"}
                                size="sm"
                                onClick={() => link.url && router.get(link.url)}
                                disabled={!link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}