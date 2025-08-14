import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icon';
import { 
    Book, 
    ChevronRight, 
    Folder,
    ArrowLeft 
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
    user: {
        name: string;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    color: string;
    articles: Article[];
}

interface Props {
    category: Category;
    [key: string]: unknown;
}

export default function CategoryShow({ category }: Props) {
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
                            <Link href="/articles" className="text-slate-600 hover:text-slate-900">
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

            {/* Breadcrumb */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="text-slate-600 hover:text-slate-900">
                            Home
                        </Link>
                        <Icon iconNode={ChevronRight} className="w-4 h-4 text-slate-400" />
                        <Link href="/articles" className="text-slate-600 hover:text-slate-900">
                            Articles
                        </Link>
                        <Icon iconNode={ChevronRight} className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-900 font-medium">{category.name}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Category Header */}
                <div className="text-center mb-12">
                    <div 
                        className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                        style={{ backgroundColor: category.color }}
                    >
                        <Icon iconNode={Folder} className="w-8 h-8 text-white" />
                    </div>
                    
                    <h1 className="text-3xl font-bold text-slate-900 mb-3">{category.name}</h1>
                    
                    {category.description && (
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-4">
                            {category.description}
                        </p>
                    )}
                    
                    <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
                        <span>{category.articles.length} article{category.articles.length !== 1 ? 's' : ''}</span>
                    </div>
                </div>

                {/* Articles Grid */}
                {category.articles.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.articles.map((article) => (
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
                                            style={{ backgroundColor: category.color }}
                                        >
                                            {category.name}
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
                        <div 
                            className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                            style={{ backgroundColor: category.color + '40' }}
                        >
                            <Icon iconNode={Folder} className="w-6 h-6" style={{ color: category.color }} />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-2">No articles yet</h3>
                        <p className="text-slate-600 mb-4">
                            There are no published articles in this category yet.
                        </p>
                        <Link href="/articles">
                            <Button variant="outline">
                                Browse All Articles
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Back to Articles */}
                <div className="mt-12 text-center">
                    <Link href="/articles">
                        <Button variant="outline">
                            <Icon iconNode={ArrowLeft} className="w-4 h-4 mr-2" />
                            Back to All Articles
                        </Button>
                    </Link>
                </div>
            </div>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 mt-12">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Love {category.name}? 💙
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join our community to get notified when new {category.name.toLowerCase()} articles are published.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={route('register')}>
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50 text-lg px-8">
                                Join Community
                            </Button>
                        </Link>
                        <Link href="/articles">
                            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8">
                                Explore More Topics
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}