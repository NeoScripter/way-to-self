import ArticleUpsert from '@/components/admin/molecules/article-upsert';
import EditingLayout from '@/layouts/admin/editing-layout';
import { usePage } from '@inertiajs/react';

export default function Create() {
    const { namespace = 'news' } = usePage<{
        namespace: 'news';
    }>().props;

    return (
        <EditingLayout
            navKey="articles"
            title="Создать статью"
        >
            <ArticleUpsert
                routeName={route(`admin.${namespace}.articles.store`)}
            />
        </EditingLayout>
    );
}
