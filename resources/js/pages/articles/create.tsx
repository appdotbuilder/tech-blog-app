import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/icon';
import { 
    ArrowLeft,
    Lightbulb,
    Code,
    Image as ImageIcon,
    Eye
} from 'lucide-react';
import { AppShell } from '@/components/app-shell';

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
}



interface Props {
    categories: Category[];
    [key: string]: unknown;
}

export default function ArticleCreate({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        excerpt: '',
        content: '',
        featured_image: '',
        category_id: '',
        status: 'draft',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('articles.store'));
    };

    return (
        <AppShell>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Create New Article</h1>
                            <p className="text-slate-600 mt-1">Share your technical knowledge with the community</p>
                        </div>
                        <Link href={route('articles.index')}>
                            <Button variant="outline">
                                <Icon iconNode={ArrowLeft} className="w-4 h-4 mr-2" />
                                Back to Articles
                            </Button>
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Article Content</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="mt-1"
                                            placeholder="Enter article title..."
                                        />
                                        {errors.title && (
                                            <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="excerpt">Excerpt</Label>
                                        <Textarea
                                            id="excerpt"
                                            value={data.excerpt}
                                            onChange={(e) => setData('excerpt', e.target.value)}
                                            className="mt-1"
                                            rows={3}
                                            placeholder="Brief description of your article (optional)..."
                                        />
                                        {errors.excerpt && (
                                            <p className="text-red-600 text-sm mt-1">{errors.excerpt}</p>
                                        )}
                                        <p className="text-xs text-slate-500 mt-1">
                                            This will be shown in article previews and search results
                                        </p>
                                    </div>

                                    <div>
                                        <Label htmlFor="content">Content</Label>
                                        <Textarea
                                            id="content"
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            className="mt-1 font-mono text-sm"
                                            rows={20}
                                            placeholder="Write your article content using Markdown...

# Example Article

## Introduction
Your introduction here...

## Code Example
```javascript
const example = () => {
    return 'Hello World';
};
```

## Conclusion
Your conclusion here..."
                                        />
                                        {errors.content && (
                                            <p className="text-red-600 text-sm mt-1">{errors.content}</p>
                                        )}
                                        <p className="text-xs text-slate-500 mt-1">
                                            You can use Markdown formatting (headings, code blocks, lists, etc.)
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Article Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="status">Status</Label>
                                        <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">
                                                    <div className="flex items-center">
                                                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                                                        Draft
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="published">
                                                    <div className="flex items-center">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                                        Published
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.status && (
                                            <p className="text-red-600 text-sm mt-1">{errors.status}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="category_id">Category</Label>
                                        <Select value={data.category_id} onValueChange={(value) => setData('category_id', value)}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select category..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>
                                                        <div className="flex items-center">
                                                            <div 
                                                                className="w-3 h-3 rounded-full mr-2"
                                                                style={{ backgroundColor: category.color }}
                                                            ></div>
                                                            {category.name}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.category_id && (
                                            <p className="text-red-600 text-sm mt-1">{errors.category_id}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="featured_image">Featured Image URL</Label>
                                        <Input
                                            id="featured_image"
                                            type="url"
                                            value={data.featured_image}
                                            onChange={(e) => setData('featured_image', e.target.value)}
                                            className="mt-1"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        {errors.featured_image && (
                                            <p className="text-red-600 text-sm mt-1">{errors.featured_image}</p>
                                        )}
                                        <p className="text-xs text-slate-500 mt-1">
                                            Optional. Recommended size: 1200x630px
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Publishing Tips</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-slate-600 space-y-2">
                                    <div className="flex items-start space-x-2">
                                        <Icon iconNode={Lightbulb} className="w-4 h-4 mt-0.5 text-yellow-500" />
                                        <span>Use descriptive headings to structure your content</span>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <Icon iconNode={Code} className="w-4 h-4 mt-0.5 text-blue-500" />
                                        <span>Include code examples with proper syntax highlighting</span>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <Icon iconNode={ImageIcon} className="w-4 h-4 mt-0.5 text-green-500" />
                                        <span>Add a featured image to make your article more engaging</span>
                                    </div>
                                    <div className="flex items-start space-x-2">
                                        <Icon iconNode={Eye} className="w-4 h-4 mt-0.5 text-purple-500" />
                                        <span>Save as draft first to review before publishing</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t">
                        <Link href={route('articles.index')}>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </Link>
                        
                        <div className="flex space-x-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setData('status', 'draft');
                                    setTimeout(() => post(route('articles.store')), 100);
                                }}
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Save as Draft'}
                            </Button>
                            <Button
                                type="button"
                                onClick={() => {
                                    setData('status', 'published');
                                    setTimeout(() => post(route('articles.store')), 100);
                                }}
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {processing ? 'Publishing...' : 'Publish Article'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}