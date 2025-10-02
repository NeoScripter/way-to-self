import ArticleUpsert from '@/components/admin/molecules/article-upsert';
import EditingLayout from '@/layouts/admin/editing-layout';
import { Article } from '@/types/model';
import { usePage } from '@inertiajs/react';

export default function Show() {
    const { article } = usePage<{
        article: Article;
    }>().props;

    return (
        <EditingLayout
            navKey="articles"
            title="Редактировать статью"
            updatedAt={article.updated_at}
        >
            <ArticleUpsert
                article={article}
                routeName={route('admin.articles.update', article.id)}
            />
        </EditingLayout>
    );
}
