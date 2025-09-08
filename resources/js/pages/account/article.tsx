import Breadcrumbs from '@/components/shared/atoms/breadcrumbs';
import LikeBtn from '@/components/shared/atoms/like-btn';
import LazyImage from '@/components/user/atoms/lazy-image';
import AppLayout from '@/layouts/user/app-layout';
import { Article as ArticleType } from '@/types/model';
import { usePage } from '@inertiajs/react';

export default function Article() {
    const { article, isFavorite,labels } = usePage<{
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
                    className="my-7 sm:my-11 md:my-15 xl:my-18"
                    itemName={`Совет №${article.id}`}
                    labels={labels}
                />
                <h1 className="text-center font-heading text-2xl font-medium text-balance text-text-black uppercase md:text-5xl xl:text-6xl">
                    {article.title}
                </h1>

                <LikeBtn
                    className="mx-auto mt-3 md:mt-6 lg:absolute lg:top-0 lg:right-0 lg:mt-0"
                    route={route('nutrition.articles.favorite', article.id)}
                    isFavorite={isFavorite}
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
