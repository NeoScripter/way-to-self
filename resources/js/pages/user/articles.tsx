import ArticleCard from "@/components/user/atoms/article-card";
import Pagination from "@/components/user/atoms/pagination";
import SpanHighlight from "@/components/user/atoms/span-highlight";
import UserLayout from "@/layouts/user/user-layout";
import { PaginationMeta } from "@/lib/types/pagination";
import { Article } from "@/types/model";
import { usePage } from "@inertiajs/react";

export default function Articles() {
    const { articles } = usePage<{ articles: PaginationMeta<Article> }>().props;

    return (
        <UserLayout layoutClass="bg-fade-olive-theme" pageClass="px-8 md:px-20 xl:px-22">

            <h1 id="body-section-title" className="my-13 sm:my-20 lg:my-25">
                <SpanHighlight
                    text='Новости платформы'
                    className="text-white text-[4rem] sm:text-[6rem] lg:text-[8rem] mx-auto mt-[0.1em]"
                />
            </h1>

            <ul className="mb-11 max-w-330 mx-auto grid grid-cols-[repeat(auto-fit,_minmax(18.75rem,_1fr))] place-content-center gap-y-14 gap-x-7.5 sm:mb-16 xl:mb-20">
                {articles.data.map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </ul>

            <Pagination meta={articles} label="статьи" className="max-w-330 mx-auto" />

        </UserLayout>
    )
}

