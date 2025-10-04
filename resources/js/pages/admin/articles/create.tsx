import ArticleUpsert from '@/components/admin/molecules/article-upsert';
import EditingLayout from '@/layouts/admin/editing-layout';

export default function Create() {
    return (
        <EditingLayout
            navKey="articles"
            title="Создать статью"
        >
            <ArticleUpsert
                routeName={route('admin.articles.store')}
            />
        </EditingLayout>
    );
}
