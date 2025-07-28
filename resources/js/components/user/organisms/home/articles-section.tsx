import { Link, usePage } from "@inertiajs/react";
import SecondaryHeading from "../../atoms/secondary-heading"
import { Article } from "@/types/model";
import ArticleCard from "../../atoms/article-card";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

export default function ArticlesSection() {
    const { articles } = usePage<{articles: Article[]}>().props;

    return (
        <>
            <SecondaryHeading text="Последние новости" className="font-medium text-dark-green" />

            <span className="sr-only" id="articles-section-title">Последние новости</span>

            <Link
                href={route('user.articles.index')}
                className="text-gray-500 tracking-wider mb-10 mt-7 sm:mb-12 sm:mt-9 block w-max mx-auto lg:mr-0 transiton-colors duration-200 ease-in hover:text-bright-salad"
            >
                Все записи
                <ChevronDoubleRightIcon className="inline text-inherit size-3.5 ml-3" />
            </Link>

            <ul className="mb-11 grid grid-cols-[repeat(auto-fit,_minmax(18.75rem,_1fr))] place-content-center gap-y-14 gap-x-7.5 sm:mb-16 xl:mb-20">
                {articles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </ul>

        </>

    )
}

