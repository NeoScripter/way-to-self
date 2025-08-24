import { Article } from '@/types/model';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import ArticleCard from '../../atoms/article-card';
import SecondaryHeading from '../../atoms/secondary-heading';
import { cn } from '@/lib/utils';

type ArticlesSectionProps = {
    titleClass?: string;
    subtitleClass?: string;
    articleClass?: string;
}

export default function ArticlesSection({titleClass, subtitleClass, articleClass}: ArticlesSectionProps) {
    const { articles } = usePage<{ articles: Article[] }>().props;

    return (
        <>
            <SecondaryHeading
                text="Последние новости"
                className={cn("font-medium text-dark-green", titleClass)}
            />

            <span
                className="sr-only"
                id="articles-section-title"
            >
                Последние новости
            </span>

            <Link
                as="button"
                href={route('user.articles.index')}
                className={cn("transiton-colors mx-auto mt-7 mb-10 block w-max cursor-pointer tracking-wider text-gray-500 duration-200 ease-in hover:text-bright-salad sm:mt-9 sm:mb-12 lg:mr-0", subtitleClass)}
            >
                Все записи
                <ChevronDoubleRightIcon className="ml-3 inline size-3.5 text-inherit" />
            </Link>

            <ul className="mb-11 grid grid-cols-[repeat(auto-fit,_minmax(18.75rem,_1fr))] place-content-center gap-x-7.5 gap-y-14 sm:mb-16 xl:mb-20">
                {articles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        className={articleClass}
                    />
                ))}
            </ul>
        </>
    );
}
