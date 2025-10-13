import LazyImage from '@/components/user/atoms/lazy-image';
import EntityHeader from '@/components/user/molecules/entity-header';
import AppLayout from '@/layouts/user/app-layout';
import { Article as ArticleType } from '@/types/model';
import { usePage } from '@inertiajs/react';

export default function Article() {
    const { article, isFavorite } = usePage<{
        article: ArticleType;
        isFavorite: boolean | null;
    }>().props;

    return (
        <AppLayout
            variant="guest"
            layoutClass="bg-light-bg"
            pageClass="px-3 md:px-11 xl:px-25"
            headerClass="bg-light-swamp"
        >
            <article className="mx-auto max-w-330">
                <EntityHeader
                    title={article.title}
                    isFavorite={isFavorite}
                    favoriteRoute={route('user.articles.favorite', article.id)}
                />
                {article.image && (
                    <LazyImage
                        parentClass="aspect-video rounded-2xl my-9 md:my-12.5 xl:my-15"
                        img={article.image.path}
                        alt={article.image.alt}
                        tinyImg={article.image.tiny_path}
                    />
                )}

                <div
                    className="prose prose-sm mb-43 max-w-full prose-neutral md:prose-base md:mb-47 xl:prose-xl xl:mb-63"
                    dangerouslySetInnerHTML={{ __html: article.html }}
                ></div>
            </article>
        </AppLayout>
    );
}
