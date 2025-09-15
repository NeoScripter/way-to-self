import Breadcrumbs from '@/components/shared/atoms/breadcrumbs';
import LikeBtn from '@/components/shared/atoms/like-btn';
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
                <LikeBtn
                    isLiked={isFavorite}
                    route={route('nutrition.articles.favorite', article.id)}
                    className="mx-auto mb-2 w-fit cursor-pointer md:mb-8 lg:mb-10"
                />
                <h1 className="text-center font-heading text-2xl font-medium text-balance text-text-black uppercase sm:text-3xl md:text-5xl xl:text-6xl">
                </h1>
                    {article.title}

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
