import EntityHeader from '@/components/account/molecules/entity-header';
import Breadcrumbs from '@/components/shared/atoms/breadcrumbs';
import LazyImage from '@/components/user/atoms/lazy-image';
import AppLayout from '@/layouts/user/app-layout';
import { Article as ArticleType } from '@/types/model';
import { usePage } from '@inertiajs/react';

export default function Article() {
    const { article, isFavorite, labels } = usePage<{
        article: ArticleType;
        isFavorite: boolean;
        labels: string[];
    }>().props;

    return (
        <AppLayout
            variant="tier"
            layoutClass="bg-light-bg"
            pageClass="px-3 md:px-11 xl:px-25"
        >
            <article className="relative mx-auto max-w-330">
                <Breadcrumbs
                    className="mt-7 sm:mt-11 md:mt-15 xl:mt-18"
                    itemName={`Совет №${article.id}`}
                    labels={labels}
                />

                <EntityHeader
                    title={article.title}
                    isFavorite={isFavorite}
                    favoriteRoute={route(
                        'nutrition.articles.favorite',
                        article.id,
                    )}
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
