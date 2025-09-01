import ArticleCard from '@/components/user/atoms/article-card';
import Pagination from '@/components/user/atoms/pagination';
import SpanHighlight from '@/components/user/atoms/span-highlight';
import AppLayout from '@/layouts/user/app-layout';
import { PaginationMeta } from '@/lib/types/pagination';
import { Article } from '@/types/model';
import { usePage } from '@inertiajs/react';

export default function Articles() {
    const { articles } = usePage<{ articles: PaginationMeta<Article> }>().props;

    return (
        <AppLayout
            variant="guest"
            layoutClass="bg-fade-olive-theme"
            pageClass="px-8 md:px-20 xl:px-22"
        >
            <h1 className="-mx-8 my-13 sm:my-20 lg:my-25">
                <SpanHighlight
                    text="Новости платформы"
                    className="mx-auto mt-[0.1em] text-[4rem] text-white sm:text-[6rem] lg:text-[8rem]"
                />
            </h1>

            <ul className="mx-auto mb-11 grid max-w-330 grid-cols-[repeat(auto-fit,_minmax(18.75rem,_1fr))] place-content-center gap-x-7.5 gap-y-14 sm:mb-16 xl:mb-20">
                {articles.data.map((article) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                    />
                ))}
            </ul>

            <Pagination
                meta={articles}
                label="статьи"
                className="mx-auto max-w-330 text-dark-green"
            />
        </AppLayout>
    );
}
