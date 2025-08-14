import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icon';
import { 
    Book, 
    ChevronRight, 
    Bookmark, 
    Share2, 
    ThumbsUp, 
    ThumbsDown,
    Twitter,
    Linkedin,
    Link as LinkIcon
} from 'lucide-react';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
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

interface Props {
    article: Article;
    [key: string]: unknown;
}

export default function ArticleShow({ article }: Props) {
    // Simple markdown to HTML conversion for demonstration
    const formatContent = (content: string) => {
        return content
            .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-slate-900 mb-6 mt-8">$1</h1>')
            .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-slate-900 mb-4 mt-6">$1</h2>')
            .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-slate-900 mb-3 mt-5">$1</h3>')
            .replace(/```(\w+)?\n([\s\S]*?)\n```/g, '<pre class="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto mb-4"><code>$2</code></pre>')
            .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm">$1</code>')
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
            .replace(/^- (.*)$/gm, '<li class="mb-2">$1</li>')
            .replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside mb-4 space-y-2 text-slate-700">$1</ul>')
            .replace(/\n\n/g, '</p><p class="mb-4 text-slate-700 leading-relaxed">')
            .replace(/^(?!<[h|u|p|c])(.+)$/gm, '<p class="mb-4 text-slate-700 leading-relaxed">$1</p>');
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
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="text-slate-600 hover:text-slate-900">
                            Home
                        </Link>
                        <Icon iconNode={ChevronRight} className="w-4 h-4 text-slate-400" />
                        <Link href="/articles" className="text-slate-600 hover:text-slate-900">
                            Articles
                        </Link>
                        <Icon iconNode={ChevronRight} className="w-4 h-4 text-slate-400" />
                        <Link href={`/categories/${article.category.slug}`} className="text-slate-600 hover:text-slate-900">
                            {article.category.name}
                        </Link>
                        <Icon iconNode={ChevronRight} className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-900 font-medium truncate">{article.title}</span>
                    </div>
                </div>
            </div>

            {/* Article */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Article Header */}
                <header className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span 
                            className="px-3 py-1 text-sm font-medium rounded-full text-white"
                            style={{ backgroundColor: article.category.color }}
                        >
                            {article.category.name}
                        </span>
                        <div className="flex items-center text-sm text-slate-500 space-x-3">
                            <span>{article.reading_time} min read</span>
                            <span>•</span>
                            <span>{article.views_count} views</span>
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
                        {article.title}
                    </h1>

                    {article.excerpt && (
                        <p className="text-xl text-slate-600 leading-relaxed mb-6">
                            {article.excerpt}
                        </p>
                    )}

                    <div className="flex items-center justify-between py-4 border-t border-b border-slate-200">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                    {article.user.name.charAt(0)}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-900">{article.user.name}</p>
                                <p className="text-sm text-slate-500">
                                    {new Date(article.published_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                                <Icon iconNode={Bookmark} className="w-4 h-4 mr-2" />
                                Save
                            </Button>
                            <Button variant="outline" size="sm">
                                <Icon iconNode={Share2} className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                {article.featured_image && (
                    <div className="mb-8">
                        <img 
                            src={article.featured_image} 
                            alt={article.title}
                            className="w-full rounded-lg shadow-sm"
                        />
                    </div>
                )}

                {/* Article Content */}
                <div className="prose prose-slate max-w-none">
                    <div 
                        className="article-content"
                        dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
                    />
                </div>

                {/* Article Footer */}
                <footer className="mt-12 pt-8 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-slate-600">Was this article helpful?</span>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                    <Icon iconNode={ThumbsUp} className="w-4 h-4 mr-1" />
                                    Yes
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Icon iconNode={ThumbsDown} className="w-4 h-4 mr-1" />
                                    No
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-slate-600">Share:</span>
                            <Button variant="ghost" size="sm">
                                <Icon iconNode={Twitter} className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Icon iconNode={Linkedin} className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Icon iconNode={LinkIcon} className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </footer>
            </article>

            {/* Related Articles CTA */}
            <section className="bg-slate-100 py-12 mt-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        Want to read more articles like this?
                    </h2>
                    <p className="text-slate-600 mb-6">
                        Join our community and get access to exclusive content, early access to new articles, and more.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/articles">
                            <Button>
                                Browse More Articles
                            </Button>
                        </Link>
                        <Link href={route('register')}>
                            <Button variant="outline">
                                Join Community
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{__html: `
                .article-content h1,
                .article-content h2,
                .article-content h3 {
                    font-weight: bold;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                }
                
                .article-content p {
                    margin-bottom: 1rem;
                    line-height: 1.75;
                }
                
                .article-content pre {
                    background-color: #0f172a;
                    color: #f1f5f9;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                    margin: 1rem 0;
                }
                
                .article-content ul {
                    list-style-type: disc;
                    list-style-position: inside;
                    margin: 1rem 0;
                }
                
                .article-content li {
                    margin-bottom: 0.5rem;
                }
            `}}></style>
        </div>
    );
}