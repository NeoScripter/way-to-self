import ArticleUpsert from '@/components/admin/molecules/article-upsert';
import EditingLayout from '@/layouts/admin/editing-layout';
import { Article } from '@/types/model';
import { usePage } from '@inertiajs/react';

export default function Show() {
    const { article, namespace = 'news' } = usePage<{
        article: Article;
        namespace: 'news';
    }>().props;

    return (
        <EditingLayout
            navKey="articles"
            title="Редактировать статью"
            updatedAt={article.updated_at}
        >
            <ArticleUpsert
                article={article}
                routeName={route(
                    `admin.${namespace}.articles.update`,
                    article.id,
                )}
            />
        </EditingLayout>
    );
}
