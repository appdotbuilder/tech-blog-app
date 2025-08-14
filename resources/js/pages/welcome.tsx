import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icon';
import { 
    ArrowRight, 
    Book, 
    Code, 
    TrendingUp, 
    Users, 
    Folder
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
    articles_count: number;
}

interface Props {
    articles: Article[];
    categories: Category[];
    [key: string]: unknown;
}

export default function Welcome({ articles, categories }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Icon iconNode={Book} className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                TechBlog
                            </h1>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <Link href="/articles" className="text-slate-600 hover:text-slate-900 font-medium">
                                Articles
                            </Link>
                            <Link href={route('login')}>
                                <Button variant="ghost" size="sm">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href={route('register')}>
                                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative py-20 sm:py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                            <span className="block text-slate-900">Technical insights for</span>
                            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                modern developers 🚀
                            </span>
                        </h1>
                        <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Discover cutting-edge techniques, best practices, and deep dives into the technologies 
                            shaping the future of software development.
                        </p>
                        
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/articles">
                                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8">
                                    Explore Articles
                                    <Icon iconNode={ArrowRight} className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href={route('register')}>
                                <Button variant="outline" size="lg" className="text-lg px-8">
                                    Join Community
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Background decoration */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">Why developers choose TechBlog</h2>
                        <p className="mt-4 text-xl text-slate-600">Everything you need to stay ahead in tech</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-colors">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
                                <Icon iconNode={Code} className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Deep Technical Content</h3>
                            <p className="text-slate-600">In-depth tutorials, code examples, and real-world implementations from industry experts.</p>
                        </div>
                        
                        <div className="text-center p-8 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 transition-colors">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
                                <Icon iconNode={TrendingUp} className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Latest Technologies</h3>
                            <p className="text-slate-600">Stay current with emerging frameworks, tools, and development practices.</p>
                        </div>
                        
                        <div className="text-center p-8 rounded-2xl bg-white border border-slate-200 hover:border-green-300 transition-colors">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
                                <Icon iconNode={Users} className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">Expert Community</h3>
                            <p className="text-slate-600">Learn from experienced developers and share knowledge with peers.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Articles */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Latest Articles</h2>
                            <p className="mt-2 text-slate-600">Fresh insights from the development world</p>
                        </div>
                        <Link href="/articles">
                            <Button variant="outline">
                                View All
                                <Icon iconNode={ArrowRight} className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <article key={article.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-lg transition-all duration-200">
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
                                    <div className="flex items-center gap-2 mb-3">
                                        <span 
                                            className="px-3 py-1 text-xs font-medium rounded-full text-white"
                                            style={{ backgroundColor: article.category.color }}
                                        >
                                            {article.category.name}
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            {article.reading_time} min read
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                        <Link href={`/articles/${article.slug}`}>
                                            {article.title}
                                        </Link>
                                    </h3>
                                    
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
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900">Explore Categories</h2>
                        <p className="mt-4 text-xl text-slate-600">Find articles in your favorite tech topics</p>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <Link key={category.id} href={`/categories/${category.slug}`}>
                                <div className="p-6 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 text-center group">
                                    <div 
                                        className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform"
                                        style={{ backgroundColor: category.color }}
                                    >
                                        <Icon iconNode={Folder} className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-slate-900 mb-2">{category.name}</h3>
                                    <p className="text-sm text-slate-600">
                                        {category.articles_count} article{category.articles_count !== 1 ? 's' : ''}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to level up your development skills? 📈
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of developers who trust TechBlog for their daily dose of technical knowledge.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={route('register')}>
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50 text-lg px-8">
                                Start Reading Free
                            </Button>
                        </Link>
                        <Link href="/articles">
                            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8">
                                Browse Articles
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Icon iconNode={Book} className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">TechBlog</span>
                    </div>
                    <p className="text-slate-500">
                        © 2024 TechBlog. Empowering developers with knowledge.
                    </p>
                </div>
            </footer>
        </div>
    );
}