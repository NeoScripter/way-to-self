import LikeBtn from '@/components/shared/atoms/like-btn';
import LazyImage from '@/components/user/atoms/lazy-image';
import AppLayout from '@/layouts/user/app-layout';
import { cn } from '@/lib/utils';
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
                {isFavorite !== null && (
                    <LikeBtn
                        isLiked={isFavorite}
                        route={route('user.articles.favorite', article.id)}
                        className="mx-auto my-2 w-fit cursor-pointer md:my-8 lg:my-10"
                    />
                )}

                <h1
                    className={cn(
                        'text-center font-heading text-2xl font-medium text-balance text-text-black uppercase md:text-5xl xl:text-6xl',
                        isFavorite === null && 'mt-10 md:mt-20 xl:mt-30',
                    )}
                >
                    {article.title}
                </h1>

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
