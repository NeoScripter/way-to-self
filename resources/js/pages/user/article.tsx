import LazyImage from '@/components/user/atoms/lazy-image';
import UserLayout from '@/layouts/user/user-layout';
import { Article as ArticleType } from '@/types/model';
import { router, usePage } from '@inertiajs/react';

export default function Article() {
    const { article } = usePage<{ article: ArticleType }>().props;

    // router.on('navigate', () => {
    //     setTimeout(() => {
    //         window.scrollTo({
    //             top: 0,
    //             behavior: 'smooth',
    //         });
    //     }, 200);
    //     console.log('fired');
    // });

    return (
        <UserLayout
            layoutClass="bg-light-bg"
            pageClass="px-3 md:px-11 xl:px-25"
            headerClass="bg-light-swamp"
        >
            <article className="mx-auto max-w-330">
                <h1 className="mt-10 text-center font-heading text-2xl font-medium text-text-black uppercase md:mt-20 md:text-5xl xl:mt-30 xl:text-6xl">
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
        </UserLayout>
    );
}
